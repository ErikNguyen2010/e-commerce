const keyModel = require("../models/keyToken.model");

class KeyTokenService {
  constructor() {}

  static createKeyToken = async ({ userId, publicKey, privateKey }) => {
    try {
      const tokenKey = await keyModel.create({
        user: userId,
        publicKey,
        privateKey,
      });

      return tokenKey ? tokenKey.publicKey : null;
    } catch (err) {
      return err;
    }
  };
}

module.exports = KeyTokenService;
