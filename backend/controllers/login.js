const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadAuthorizedError = require('../errors/unauthorized');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(new BadAuthorizedError(err.message));
    });
};
