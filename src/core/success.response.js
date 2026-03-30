const { STATUS_CODE, STATUS_MESSAGE } = require("../constants");

class SuccessResponse {
  constructor({
    message,
    statusCode = STATUS_CODE.SUCCESS,
    statusMessage = STATUS_MESSAGE.SUCCESS,
    metadata = {},
  }) {
    this.message = message ? message : statusMessage;
    this.status = statusCode;
    this.metadata = metadata;
  }
  send(res, headers = {}) {
    return res.status(this.status).json(this);
  }
}

class Success extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata });
  }
}

class Created extends SuccessResponse {
  constructor({
    message,
    statusCode = STATUS_CODE.CREATED,
    statusMessage = STATUS_MESSAGE.CREATED,
    metadata,
    options = {},
  }) {
    super({ message, statusCode, statusMessage, metadata });
  }
}

module.exports = {
  Success,
  Created,
};
