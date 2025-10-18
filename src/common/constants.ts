export const HTTP_STATUS = {
  OK: 200,
  FORBIDDEN: 403,
  SERVER_ERROR: 500
} as const;

export const CONTENT_TYPE = {
  JSON_WITH_CHARSET: /application\/json/,
  TEXT_WITH_CHARSET: /text\/plain/,
} as const;

export const RESPONSE_MESSAGE = {
  SUCCESS: "",
  SERVER_ERROR: "Internal server error.",
  FORBIDDEN_CORS: "Forbidden: CORS policy does not allow access from this origin.",
} as const;