const { ROLE } = require("../constants");
const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createKeyPair } = require("../auth/authUtils");

class AccessService {
  constructor() {}

  static signUp = async ({ email, password, name }) => {
    try {
      const hasEmail = await shopModel.findOne({ email }).lean();

      if (hasEmail) {
        return {
          code: "xxx",
          message: "Email has been used, shop already registered",
        };
      }
      const hashPass = await bcrypt.hash(password, 10);

      const newShop = await shopModel.create({
        email,
        password: hashPass,
        name,
        role: [ROLE.SHOP],
      });

      if (newShop) {
        const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
        });

        const resToken = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
        });

        if (!resToken) {
          return {
            code: "xxx",
            message: "Create token failed",
          };
        }

        const res = await createKeyPair(
          { userId: newShop._id, email },
          resToken,
          privateKey,
        );
        return {
          code: 201,
          metaData: {
            shop: newShop,
            tokens: res,
          },
        };
      }

      return {
        code: 200,
        metadata: null,
      };
    } catch (err) {
      return {
        code: "xxx",
        message: err.message,
        status: "err",
      };
    }
  };
}

module.exports = AccessService;
