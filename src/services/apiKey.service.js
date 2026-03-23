const apiKeyModel = require("../models/apiKey.model");
const crypto = require("crypto");

const findById = async (key) => {

  const foundKey = await apiKeyModel.findOne({ key, status: true }).lean();
  return foundKey;
};

module.exports = { 
  findById,
};
