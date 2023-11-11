import { createVoteSchema } from "../schemas/votes.schema.js";
import JudgesControllers from "../controllers/judges.controllers.js";
import GamesControllers from "../controllers/games.controllers.js";
import VotesControllers from "../controllers/votes.controllers.js";

/**
 * Función que verifica que un voto sea íntegro y cuente con toda la información solicitada previo a crearlo.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function validateCreateVote(req, res, next) {
  createVoteSchema
    .validate(req.body, { abortEarly: false, stripUnknown: true })
    .then(async (vote) => {
      req.body = vote;
      next();
    })
    .catch((err) => {
      res.status(500).json({
        msg: err.msg,
      });
    });
}

/**
 * Función que verifica que un voto no haya sido realizado previamente por el mismo juez para el mismo juego.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function uniqueVote(req, res, next) {
  try {
    const votesMade = await VotesControllers.getVotesMadeByJudge(req.body.id_judge);

    const hasVotedInCompetition = votesMade.find(vote => vote.game_id == req.body.game_id)

    if (!hasVotedInCompetition) {
      next();
    } else {
      res.status(400).json({
        msg: "El juez indicado ya ha votado.",
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }
}

/**
 * Función que verifica que un juez exista.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function judgeExist(req, res, next) {
  try {
    const judge = JudgesControllers.judgeExist(req.body.id_judge);

    if (judge) {
      next();
    } else {
      res.status(400).json({
        msg: "El juez indicado no existe.",
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }
}

/**
 * Función que verifica si un juego existe.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function gameExist(req, res, next) {
  try {
    const game = GamesControllers.gameExist(req.body.game_id);

    if (game) {
      next();
    } else {
      res.status(400).json({
        msg: "El juego indicado no existe.",
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }
}

export default {
  validateCreateVote,
  uniqueVote,
  judgeExist,
  gameExist,
};

export { validateCreateVote, uniqueVote, judgeExist, gameExist };
