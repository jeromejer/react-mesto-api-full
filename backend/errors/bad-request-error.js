const { VALIDATION_ERROR } = require('../constants/error');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = VALIDATION_ERROR;
  }
}

module.exports = ValidationError;
