const ROLE = {
  SHOP: "shop",
  EDIT: "edit",
};

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const STATUS_CODE = {
  FORBIDDEN: 403,
  CONFLICT: 409,
};

const STATUS_MESSAGE = {
  FORBIDDEN: "Bad request error",
  CONFLICT: "Conflict error",
};

module.exports = {
  ROLE,
  HEADER,
  STATUS_CODE,
  STATUS_MESSAGE,
};
