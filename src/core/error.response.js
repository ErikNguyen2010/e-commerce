const { STATUS_MESSAGE, STATUS_CODE } = require("../constants");

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(
    message = STATUS_MESSAGE.CONFLICT,
    statusCode = STATUS_CODE.CONFLICT,
  ) {
    super(message, statusCode);
  }
}

class ForbiddenRequestError extends ErrorResponse {
  constructor(
    message = STATUS_MESSAGE.FORBIDDEN,
    statusCode = STATUS_CODE.FORBIDDEN,
  ) {
    super(message, statusCode);
  }
}

class AuthFailureError extends ErrorResponse {
  constructor(
    message = STATUS_MESSAGE.UNAUTHORIZED,
    statusCode = STATUS_CODE.UNAUTHORIZED,
  ) {
    super(message, statusCode);
  }
}
class NotFoundError extends ErrorResponse {
  constructor(
    message = STATUS_MESSAGE.NOT_FOUND,
    statusCode = STATUS_CODE.NOT_FOUND,
  ) {
    super(message, statusCode);
  }
}

module.exports = {
  ForbiddenRequestError,
  ConflictRequestError,
  AuthFailureError,
  NotFoundError,
};
