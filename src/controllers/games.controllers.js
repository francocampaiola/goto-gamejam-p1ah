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

/**
 * Función que agrega un juego. Si lo consigue, lo retorna, de lo contrario, retorna un mensaje de error.
 * @param {*} req
 * @param {*} res
 */
async function createGame(req, res) {
  const newGame = {
    name: req.body.name,
    genre: req.body.genre,
    members: req.body.members,
    edition: req.body.edition,
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
  createGame,
  editGame,
  deleteGame,
};

export {
  getGameById,
  createGame,
  editGame,
  deleteGame,
};
