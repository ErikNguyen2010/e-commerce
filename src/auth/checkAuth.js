const { HEADER } = require("../constants");
const { AuthFailureError, NotFoundError } = require("../core/error.response");
const { findById } = require("../services/apiKey.service");
const KeyTokenService = require("../services/keyToken.service");
const JWT = require("jsonwebtoken");

const checkApiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();

    if (!key) {
      return res.status(403).json({
        message: "Forbidden, API key is missing",
      });
    }

    const objKey = await findById(key);
    if (!objKey) {
      return res.status(403).json({
        message: "Forbidden, API key is missing",
      });
    }

    req.objKey = objKey;
    return next();
  } catch (err) {}
};

const checkPermission = (permission) => {
  return (req, res, next) => {
    if (
      !req.objKey.permissions ||
      !req.objKey.permissions.includes(permission)
    ) {
      return res.status(403).json({
        message: "Permission denied",
      });
    }

    return next();
  };
};

const handleAuthen = async (req, res, next) => {
  const clientId = req.headers[HEADER.CLIENT_ID];
  if (!clientId) throw new AuthFailureError("Invalid Request");

  const keyStore = await KeyTokenService.findByUserId({ userId: clientId });
  if (!keyStore) throw new NotFoundError("Not found Key Store");

  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) throw new AuthFailureError("Invalid Request");

  try {
    const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
    if (decodeUser.userId !== clientId)
      throw new AuthFailureError("Invalid User");
    req.keyStore = keyStore;
    return next();
  } catch (err) {
    throw err;
  }
};

module.exports = {
  checkApiKey,
  checkPermission,
  handleAuthen,
};
