const { Created } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
  constructor() {}
  signUp = async (req, res, next) => {
      const result = await AccessService.signUp(req.body)
      
      new Created({
        message: "Created shop successfully",
        metadata: result,

      }).send(res)
  };
}

module.exports = new AccessController();
