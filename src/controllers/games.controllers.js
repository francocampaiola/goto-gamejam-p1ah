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
 * Función que retorna una lista de juegos a partir de la edición.
 * @param {*} req
 * @param {*} res
 */
function getGamesByEdition(req, res) {
  GamesServices.getGamesByEdition(req.params.edition, {
    genre: req.query.genre,
  })
    .then((list) => {
      res.status(200).json(list);
    })
    .catch((err) => {
      res.status(500).json({
        msg: err.msg,
      });
    });
}

/**
 * Función que retorna una lista de votos recibidos por un juego, en función del ID del juego.
 * @param {*} req
 * @param {*} res
 */
function getVotesByGame(req, res) {
  GamesServices.getVotesByGame(req.params.id)
    .then((vote) => {
      const result = vote.map((r) => {
        return {
          name_judge: r.name_judge,
          gameplay: r.gameplay,
          art: r.art,
          sound: r.sound,
          affinity: r.affinity,
        };
      });
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        msg: err.msg,
      });
    });
}

/**
 * Función que retorna el promedio de votos en un juego en específico a partir de su ID.
 * @param {*} req
 * @param {*} res
 */
function getGameAverage(req, res) {
  GamesServices.getVotesByGame(req.params.id)
    .then((result) => {
      const average = {
        name_game: "",
        gameplay: 0,
        art: 0,
        sound: 0,
        affinity: 0,
      };

      const lengthList = result.length;

      result.foreach((g) => {
        average.name_game = g.name_game;
        average.gameplay += g.gameplay;
        average.art += g.art;
        average.sound += g.sound;
        average.affinity += g.affinity;
      });

      const totalAverage = {
        name_game: average.name_game,
        gameplay: average.gameplay / lengthList,
        art: average.art / lengthList,
        sound: average.sound / lengthList,
        affinity: average.affinity / lengthList,
      };

      res.status(200).json(totalAverage);
    })
    .catch((err) => {
      res.status(500).json({
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
  getVotesByGame,
  getGameAverage,
  createGame,
  editGame,
  updateGame,
  deleteGame,
};

export {
  getGameById,
  getGamesByEdition,
  getVotesByGame,
  getGameAverage,
  createGame,
  editGame,
  updateGame,
  deleteGame,
};
