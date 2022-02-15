const Cards = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden');

module.exports.getCards = (req, res, next) => {
  Cards.find({})
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Cards.create({ name, link, owner })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCards = (req, res, next) => {
  const { cardId } = req.params;

  Cards.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Карточка принадлежит другому пользователю');
      } else {
        Cards.findByIdAndRemove(cardId)
          .then((data) => {
            res.status(200).send({ data });
          })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Пользователя с таким ID не существует'));
      } else {
        next(err);
      }
    });
};

module.exports.likesCards = (req, res, next) => {
  Cards.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Пользователя с таким ID не существует'));
      } else {
        next(err);
      }
    });
};

module.exports.diselikesCards = (req, res, next) => {
  Cards.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Пользователя с таким ID не существует'));
      } else {
        next(err);
      }
    });
};
