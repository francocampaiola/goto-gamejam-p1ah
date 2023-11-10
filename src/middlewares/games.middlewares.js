import { createGameSchema } from "../schemas/games.schema.js";

/**
 * Función que corrobora, a partir de su schema, que un juego sea válido revisando que todos los campos estén completos y acordes al tipo de dato esperado.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
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
