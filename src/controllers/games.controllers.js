import GamesService from "../services/games.services.js";

/**
 * Función que retorna todos los juegos
 * @param {*} req
 * @param {*} res
 */
function getGames(req, res) {
  GamesService.getGames()
    .then((games) => {
      return res.status(200).json(games);
    })
    .catch(() => {
      return res.status(500).json({
        msg: error.msg,
      });
    });
}

/**
 * Función que retorna un juego en función de su ID
 * @param {*} req
 * @param {*} res
 */
function getGameById(req, res) {
  GamesService.getGameById(req.params.id)
    .then((game) => {
      return res.status(200).json(game);
    })
    .catch((err) => {
      return res.status(500).json({
        msg: err.msg,
      });
    });
}

async function createGame(req, res) {
  return GamesService.createGame(req.body)
  .then ((game) => {
    res.status(201).json(game);
  })
  .catch((err) => {
    res.status(500).json({
      msg: err.msg
    })
  })
}

export default {
  getGames,
  getGameById,
  createGame
};
