import GamesServices from "../services/games.services.js";

/**
 * Función que retorna un juego en función de su ID
 * @param {*} req
 * @param {*} res
 */
function getGameById(req, res) {
  GamesServices.getGameById(req.params.id)
    .then((game) => {
      return res.status(200).json(game);
    })
    .catch((err) => {
      return res.status(500).json({
        msg: err.msg,
      });
    });
}

async function getGamesByGenre(req, res) {
  GamesServices.getGameByGenre(req.params.genre)
    .then((game) => {
      return res.status(200).json(game);
    })
    .catch((err) => {
      return res.status(500).json({
        msg: err.msg,
      });
    });
}

/**
 * Función que agrega un juego. Si lo consigue, lo retorna, de lo contrario, retorna un mensaje de error.
 * @param {*} req
 * @param {*} res
 */
async function createGame(req, res) {
  const newGame = {
    // Ver si corresponde sumar id también ❗️❗️❗️❗️❗️❗️❗️

    name: req.body.name,
    genre: req.body.genre,
    members: req.body.members,
    edition: req.body.edition,
    score: 0,
  };

  GamesServices.createGame(newGame)
    .then((game) => {
      res.status(201).json(game);
    })
    .catch((err) => {
      res.status(500).json({
        msg: err.msg,
      });
    });
}

/**
 * Función que edita un juego. Si lo consigue, lo retorna editado, de lo contrario, retorna un mensaje de error.
 * @param {*} req
 * @param {*} res
 */
async function editGame(req, res) {
  GamesServices.editGame(req.params.id, req.body)
    .then((game) => {
      return res.status(200).json(game);
    })
    .catch((err) => {
      return res.status(500).json({
        msg: err.msg,
      });
    });
}

/**
 * Función que edita el puntaje total de un juego en específico a partir de su ID. Si lo consigue, lo retorna editado, de lo contrario, retorna un mensaje de error.
 * @param {string} id
 * @param {number} score
 */
async function editGameScore(id, score) {
  const game = await GamesServices.getGameById(id);

  const newScore = {
    score: (game.score += score),
  };

  GamesServices.editGameScore(id, newScore);
}

/**
 * Función que elimina un juego. Si lo consigue, lo retorna, de lo contrario, retorna un mensaje de error.
 * @param {*} req
 * @param {*} res
 */
async function deleteGame(req, res) {
  GamesServices.deleteGame(req.params.id)
    .then((game) => {
      return res.status(200).json(game);
    })
    .catch((err) => {
      return res.status(500).json({
        msg: err.msg,
      });
    });
}

export default {
  getGameById,
  getGamesByGenre,
  createGame,
  editGame,
  editGameScore,
  deleteGame,
};

export {
  getGameById,
  getGamesByGenre,
  createGame,
  editGame,
  editGameScore,
  deleteGame,
};
