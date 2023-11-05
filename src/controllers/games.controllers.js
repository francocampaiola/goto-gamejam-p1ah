import gamesServices from "../services/games.services.js";

/**
 * Función que retorna todos los juegos
 * @param {*} req
 * @param {*} res
 */
function allGames(req, res) {
  gamesServices.allGames()
    .then((games) => {
      return res.status(200).json(games);
    })
    .catch(() => {
      return res.status(500).json({
        msg: error.msg,
      });
    });
}

export default {
    allGames
}
