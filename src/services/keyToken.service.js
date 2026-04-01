const { Types } = require("mongoose");
const { createKeyPair } = require("../auth/authUtils");
const keyModel = require("../models/keyToken.model");
const crypto = require("crypto");

class KeyTokenService {
  constructor() {}

  static createKeyTokenModel = async ({
    userId,
    refreshToken,
    publicKey,
    privateKey,
  }) => {
    try {
      const filter = {
        user: userId,
      };

      const update = {
        publicKey,
        privateKey,
        refreshToken,
        refreshTokensUsed: [],
      };

      const options = {
        upsert: true,
        new: true,
      };

      const tokens = await keyModel
        .findOneAndUpdate(filter, update, options)
        .lean();

      return tokens ? tokens.publicKey : null;
    } catch (err) {
      throw err;
    }
  };

  static createTokens = async ({ shop }) => {
    const publicKey = crypto.randomBytes(64).toString("hex");
    const privateKey = crypto.randomBytes(64).toString("hex");

    const tokens = await createKeyPair(
      { userId: shop._id, email: shop.email },
      publicKey,
      privateKey,
    );

    const resToken = await this.createKeyTokenModel({
      userId: shop._id,
      refreshToken: tokens.refreshToken,
      publicKey,
      privateKey,
    });

    if (!resToken) throw new Error("Create token failed");

    return tokens;
  };

  static findByUserId = async ({ userId }) => {
    return await keyModel.findOne({ user: new Types.ObjectId(userId) }).lean();
  };

  static removeKeyTokenModel = async (id) => {
    return await keyModel.deleteOne(id);
  };

  static findUsedRefreshToken = async ({ refreshToken }) => {
    return await keyModel.findOne({ refreshTokensUsed: refreshToken }).lean();
  };

  static deleteKeyByUserId = async ({ userId }) => {
    await keyModel.findOneAndDelete({ user: new Types.ObjectId(userId) });
  };

  static findByRefreshToken = async ({ refreshToken }) => {
    return await keyModel.findOne({ refreshToken });
  };
}

module.exports = KeyTokenService;
