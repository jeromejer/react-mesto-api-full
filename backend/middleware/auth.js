const jwt = require('jsonwebtoken');
const BadAuthorizedError = require('../errors/unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  (console.log(req.headers))
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new BadAuthorizedError('Ошибка авторизации'));
  }

  console.log(1);
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new BadAuthorizedError('Ошибка авторизации'));
  }

  console.log(2)

  req.user = payload;

  next();
};
