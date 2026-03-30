const apiKeyModel = require("../models/apiKey.model");
const crypto = require("crypto");

const findById = async (key) => {
  // const a = await apiKeyModel.create({
  //   key: crypto.randomBytes(64).toString("hex"),
  //   permissions: ["0000"],
  // });
  const foundKey = await apiKeyModel.findOne({ key, status: true }).lean();
  return foundKey;
};

module.exports = {
  findById,
};
