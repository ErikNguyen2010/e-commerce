const keyModel = require("../models/keyToken.model");

class KeyTokenService {
  constructor() {}

  static createKeyToken = async ({ userId, publicKey }) => {
    try {
      const tokenKey = await keyModel.create({
        user: userId,
        publicKey,
      });

      return tokenKey ? publicKey : null;
    } catch (err) {
      return err;
    }
  };
}

module.exports = KeyTokenService;
