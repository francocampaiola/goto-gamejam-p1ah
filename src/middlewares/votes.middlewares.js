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
      res.status(500).json(err);
    });
}

async function uniqueVote(req, res, next) {
  try {
    const votedMade = VotesControllers.getVotesByJudge(req.body.id_judge);

    if (!votedMade) {
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

function judgeExist(req, res, next) {
  try {
    const judge = JudgesControllers.getJudgeById(req.body.id_judge);

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

function gameExist(req, res, next) {
  try {
    const game = GamesControllers.getGameById(req.body.game_id);

    if (game) {
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

export default {
  validateCreateVote,
  uniqueVote,
  judgeExist,
  gameExist,
};

export { validateCreateVote, uniqueVote, judgeExist, gameExist };
