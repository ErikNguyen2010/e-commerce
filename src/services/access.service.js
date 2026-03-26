const { ROLE } = require("../constants");
const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createKeyPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const { ForbiddenRequestError } = require("../core/error.response");

const GET_DATA = ["_id", "name", "email", "roles"];
class AccessService {
  constructor() {}

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

        const publicKey = crypto.randomBytes(64).toString("hex");
        const privateKey = crypto.randomBytes(64).toString("hex");

        const resToken = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
          privateKey,
        });

        if (!resToken) {
          throw new Error("Create token failed");
        }

        const res = await createKeyPair(
          { userId: newShop._id, email },
          publicKey,
          privateKey,
        );

        return {
          shop: getInfoData(newShop, GET_DATA),
          tokens: res,
        };
      }

      return null
    } catch (err) {
      throw err;
    }
  };
}

module.exports = AccessService;
