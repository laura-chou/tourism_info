export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
} as const;

export const CONTENT_TYPE = {
  JSON: "application/json",
  JSON_WITH_CHARSET: /application\/json/,
  TEXT: "text/plain",
  TEXT_WITH_CHARSET: /text\/plain/,
  FORM_URLENCODED: "application/x-www-form-urlencoded"
} as const;

export const RESPONSE_MESSAGE = {
  SUCCESS: "",
  NOT_FOUND: "No data found.",
  SERVER_ERROR: "Internal server error.",
  ENV_ERROR: "Environment variable is not setting.",
  FORBIDDEN_CORS: "Forbidden: CORS policy does not allow access from this origin.",
} as const;