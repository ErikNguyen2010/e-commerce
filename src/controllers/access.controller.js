const AccessService = require("../services/access.service");

class AccessController {
  constructor() {}
  signUp = async (req, res, next) => {
    try {
      console.log(`[P]::signUp::`, req.body);
      const result = await AccessService.signUp(req.body)
      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new AccessController();
