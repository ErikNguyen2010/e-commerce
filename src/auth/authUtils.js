const JWT = require("jsonwebtoken");

const createKeyPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "2 days",
    });
    const refreshToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7 days",
    });

    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.error("Verify token failed");
      }
      if (decode) {
        console.log("Verify token successful", decode);
      }
    });

    return { accessToken, refreshToken };
  } catch (err) {
    return err;
  }
};

module.exports = {
  createKeyPair,
};
