const { UNAUTHORIZED } = require('../constants/error');

class BadAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = BadAuthorizedError;
