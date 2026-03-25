const { HEADER } = require("../constants");
const { findById } = require("../services/apiKey.service");

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

const aynscHandler =  (fn) =>{
  return async (req,res,next) =>{
    try{
      await fn(req,res,next)
    }catch(err){
      next(err)
    }
 }}

module.exports = {
  checkApiKey,
  checkPermission,
  aynscHandler
};
