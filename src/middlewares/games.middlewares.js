import { createGameSchema } from "../schemas/games.schema.js";

function validateCreateGame(req, res, next) {
  createGameSchema
    .validate(req.body, {
      stripUnknown: true,
      abortEarly: false,
    })
    .then(async (game) => {
      req.body = game;
      next();
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

export default {
  validateCreateGame,
};

export { validateCreateGame };
