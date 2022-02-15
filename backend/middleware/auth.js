const jwt = require('jsonwebtoken');
const BadAuthorizedError = require('../errors/unauthorized');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new BadAuthorizedError('Ошибка авторизации'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new BadAuthorizedError('Ошибка авторизации'));
  }

  req.user = payload;

  next();
};
