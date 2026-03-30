const ROLE = {
  SHOP: "shop",
  EDIT: "edit",
};

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
};

const STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
};

const STATUS_MESSAGE = {
  SUCCESS: "Success",
  CREATED: "Created",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Bad request error",
  CONFLICT: "Conflict error",
  NOT_FOUND: "Not found",
};

module.exports = {
  ROLE,
  HEADER,
  STATUS_CODE,
  STATUS_MESSAGE,
};
