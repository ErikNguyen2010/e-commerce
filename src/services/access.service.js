const { ROLE } = require("../constants");
const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const KeyTokenService = require("./keyToken.service");
const { getInfoData } = require("../utils");
const {
  ForbiddenRequestError,
  AuthFailureError,
} = require("../core/error.response");
const { findByEmail } = require("./shop.service");
const JWT = require("jsonwebtoken");
const { createKeyPair } = require("../auth/authUtils");

const GET_DATA = ["_id", "name", "email", "roles"];
class AccessService {
  constructor() {}

  static handleRefreshToken = async ({ refreshToken }) => {
    const foundTokenUsed = await KeyTokenService.findUsedRefreshToken({
      refreshToken,
    });

    if (foundTokenUsed) {
      const { userId } = await JWT.verify(
        refreshToken,
        foundTokenUsed.privateKey,
      );

      await KeyTokenService.deleteKeyByUserId({ userId });
      throw new ForbiddenRequestError("Something went wrong, please relogin");
    }

    const foundRefreshToken = await KeyTokenService.findByRefreshToken({
      refreshToken,
    });

    if (!foundRefreshToken)
      throw new AuthFailureError("Shop has not been registered");

    const { userId, email } = await JWT.verify(
      refreshToken,
      foundRefreshToken.privateKey,
    );

    const foundShop = await findByEmail(email);
    if (!foundShop) throw new AuthFailureError("Shop has not been registered");

    const newTokens = await createKeyPair(
      { userId, email },
      foundRefreshToken.publicKey,
      foundRefreshToken.privateKey,
    );

    await foundRefreshToken.update({
      $set: {
        refreshToken: newTokens.refreshToken,
      },
      $addToSet: {
        refreshTokenUsed: refreshToken,
      },
    });

    return {
      tokens: newTokens,
      user: { userId, email },
    };
  };

  static login = async ({ email, password, refreshToken = null }) => {
    try {
      const foundShop = await findByEmail(email);
      if (!foundShop)
        throw new ForbiddenRequestError("Shop has not been registered");

      const matchPassword = bcrypt.compare(password, foundShop.password);
      if (!matchPassword) throw new AuthFailureError("Password not match");

      const tokens = await KeyTokenService.createTokens({
        shop: foundShop,
      });

      return {
        shop: getInfoData(foundShop, GET_DATA),
        tokens,
      };
    } catch (err) {
      throw err;
    }
  };

  static signUp = async ({ email, password, name }) => {
    try {
      const hasEmail = await shopModel.findOne({ email }).lean();

      if (hasEmail) {
        throw new ForbiddenRequestError("Error: Shop already registered");
      }
      const hashPass = await bcrypt.hash(password, 10);

      const newShop = await shopModel.create({
        email,
        password: hashPass,
        name,
        role: [ROLE.SHOP],
      });

      if (newShop) {
        // RSA JWT
        // const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        //   modulusLength: 4096,
        //   publicKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        //   privateKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        // });

        const tokens = await KeyTokenService.createTokens({
          shop: newShop,
        });

        return {
          shop: getInfoData(newShop, GET_DATA),
          tokens,
        };
      }

      return null;
    } catch (err) {
      throw err;
    }
  };

  static logout = async (keyStore) => {
    const delKey = await KeyTokenService.removeKeyTokenModel(keyStore._id);
    return delKey;
  };
}

module.exports = AccessService;
