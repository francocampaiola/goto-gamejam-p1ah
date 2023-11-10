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
 * Función que retorna una lista de juegos a partir de la edición
 * @param {*} req 
 * @param {*} res 
 */
function getGamesByEdition(req, res) {
  GamesServices.getGamesByEdition(req.params.edition, {'genre': req.query.genre})
  .then( (list) => {
    res.status(200).json(list);
  })
  .catch( (err) => {
    res.status(500).json({
      msg: err.msg
    })
  })
}

function getGameAverage(req, res) {
  GamesServices.games
} 

/**
 * Función que agrega un juego. Si lo consegui, lo retorna, de lo contrario, retorna un mensaje de error.
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
 * Función que edita un juego.
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
 * Función que elimina un juego.
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

/**
 * Función que actualiza un juego incorporándole el score a partir de sus votaciones.
 * @param {string} id_game 
 * @param {number} score 
 */
async function updateGame(id_game, score) {
  let game = await GamesServices.getGameById(id_game);
  game.score += score;
  GamesServices.editGame(id_game, game);
}

export default {
  getGameById,
  getGamesByEdition,
  createGame,
  editGame,
  updateGame,
  deleteGame
};
