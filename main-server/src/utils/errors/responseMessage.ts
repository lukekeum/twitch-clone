export enum ResponseMessage {
  // Created(201)
  LOGGED_IN = 'Logged in',
  LOGGED_OUT = 'Logged out',
  REGISTERED = 'registered',
  REFRESHED_TOKEN = 'Refreshed token',

  // BadRequest(400)
  INVALID_INPUT = 'Invalid input',
  ALREADY_EXISTS = 'Input value already exists',

  // Unauthorized(401)
  SHOULD_LOGIN = 'You must be logged in to use this api',
  TOKEN_NOT_FOUND = 'Refresh token or access token not found',
  INVALID_TOKEN = 'Invalid token found',
  INCORRECT_PASSWORD = 'Incorrect password',
  PERMISSION_DENIED = 'Permission Denied',

  // Forbidden(403)
  NOT_ALLOWED_CORS = 'Not allowed access by cors',

  // NotFound(404)
  USER_NOT_FOUND = 'User not found',

  // InternalServerError(500)
  INTERNAL_SERVER_ERROR = 'Internal server error triggered',
}
