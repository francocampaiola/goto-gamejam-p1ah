import JudgesServices from "../services/judges.services.js";
import GamesControllers from "./games.controllers.js";

/**
 * Función que retorna todos los jueces
 * @param {*} req
 * @param {*} res
 */
function getJudges(req, res) {
  JudgesServices.getJudges()
    .then((judges) => {
      return res.status(200).json(judges);
    })
    .catch((err) => {
      return res.status(500).json({
        msg: err.msg,
      });
    });
}

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
      res.status(200).json(vote);
    })
    .catch((err) => {
      res.status(500).json({
        msg: err.msg,
      });
    });
}

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

async function updateGame(id_game, score) {
  GamesControllers.updateGame(id_game, score);
}

async function judgeVote(id) {
  return await JudgesServices.gamesVoted(id);
}

export default {
  getJudges,
  getJudgeById,
  generateVote,
  gamesVoted,
  judgeVote
};
