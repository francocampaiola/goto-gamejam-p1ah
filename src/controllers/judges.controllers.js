import JudgesServices from "../services/judges.services.js";
import GamesControllers from "./games.controllers.js";

/**
 * Función que retorna un juez en función de su ID
 * @param {*} req
 * @param {*} res
 */
function getJudgeById(req, res) {
  JudgesServices.getJudgeById(req.params.id)
    .then((judge) => {
      return res.status(200).json(judge);
    })
    .catch((err) => {
      return res.status(500).json({
        msg: err.msg,
      });
    });
}

/**
 * Función que genera un voto de un juego siempre y cuando todo sea válido.
 * @param {*} req 
 * @param {*} res 
 */
function generateVote(req, res) {
  const vote = {
    id_judge: req.body.id_judge,
    name_judge: req.body.name_judge,
    id_game: req.body.id_game,
    name_game: req.body.name_game,
    gameplay: req.body.gameplay,
    art: req.body.art,
    sound: req.body.sound,
    affinity: req.body.affinity,
  };

  JudgesServices.generateVote(vote)
    .then((generatedVote) => {
      const score =
        req.body.gameplay + req.body.art + req.body.sound + req.body.affinity;

      const id_game = req.body.id_game;

      updateGame(id_game, score);
      res.status(200).json(generatedVote);
    })
    .catch((err) => {
      res.status(500).json({
        msg: err.msg,
      });
    });
}

/**
 * Función que retorna un archivo JSON con los juegos votados por cada juez.
 * @param {*} req 
 * @param {*} res 
 */
function gamesVoted(req, res) {
  JudgesServices.gamesVoted(req.params.id)
    .then((vote) => {
      const result = vote.map((r) => {
        return {
          name_game: r.name_game,
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
 * Función que actualiza un juego con la puntuación total a medida que va siendo votado.
 * @param {string} id_game 
 * @param {number} score 
 */
async function updateGame(id_game, score) {
  GamesControllers.updateGame(id_game, score);
}

/**
 * Función que retorna, mediante el ID del juez, los votos que realizó este juez.
 * @param {string} id 
 * @returns 
 */
async function judgeVote(id) {
  return await JudgesServices.gamesVoted(id);
}

export default {
  getJudgeById,
  generateVote,
  gamesVoted,
  judgeVote
};

export {
  getJudgeById,
  generateVote,
  gamesVoted,
  judgeVote
}
