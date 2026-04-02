const { Created, Success } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
  constructor() {}

  handleRefreshToken = async (req, res, next) => {
    const result = await AccessService.handleRefreshToken(req.body);
    new Success({
      message: "Refresh token successfully",
      metadata: result,
    }).send(res);
  };

  logout = async (req, res, next) => {
    const result = await AccessService.logout(req.keyStore);
    new Success({
      message: "Logout successfully",
      metadata: result,
    }).send(res);
  };

  login = async (req, res, next) => {
    const result = await AccessService.login(req.body);

    new Success({
      message: "Login successfully",
      metadata: result,
    }).send(res);
  };

  signUp = async (req, res, next) => {
    const result = await AccessService.signUp(req.body);

    new Created({
      message: "Created shop successfully",
      metadata: result,
    }).send(res);
  };
}

module.exports = new AccessController();
