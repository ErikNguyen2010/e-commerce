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

const GET_DATA = ["_id", "name", "email", "roles"];
class AccessService {
  constructor() {}
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
