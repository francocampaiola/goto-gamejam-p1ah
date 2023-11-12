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
    .validate(req.body, { stripUnknown: true, abortEarly: false })
    .then(async (vote) => {
      req.body = vote;
      next();
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

/**
 * Función que verifica que un voto no haya sido realizado previamente por el mismo juez para el mismo juego.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function validateUniqueVote(req, res, next) {
  try {
    const votesMade = await VotesControllers.getVotesMadeByJudge(
      req.body.id_judge
    );

    const hasVotedInCompetition = votesMade.find(
      (vote) => vote.game_id == req.body.game_id
    );

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
// async function validateJudgeExist(req, res, next) {
//   try {
//     const id = req.body.id_judge;
//     const judge = await JudgesControllers.judgeExist(id);

//     if (judge) {
//       next();
//     } else {
//       res.status(400).json({
//         msg: "El juez indicado no existe.",
//       });
//     }
//   } catch (err) {
//     res.status(500).json({
//       msg: err.msg,
//     });
//   }
// }
async function validateJudgeExist(req, res, next) {
  try {
    const id = req.body.id_judge;
    const judge = await JudgesControllers.judgeExist(req, res, id);

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

async function validateGameExist(req, res, next) {
  try {
    const id = req.body.id_game;
    const game = await GamesControllers.gameExist(req, res, id);

    if (game) {
      next();
    } else {
      res.status(400).json({
        msg: "El juego indicado no existe.",
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
}
// async function validateGameExist(req, res, next) {
//   try {
//     const game = await GamesControllers.gameExist(req.body.game_id);

//     if (game) {
//       next();
//     } else {
//       res.status(400).json({
//         msg: "El juego indicado no existe.",
//       });
//     }
//   } catch (err) {
//     res.status(500).json({
//       msg: err.msg,
//     });
//   }
// }

export default {
  validateCreateVote,
  validateUniqueVote,
  validateJudgeExist,
  validateGameExist,
};

export { validateCreateVote, validateUniqueVote, validateJudgeExist, validateGameExist };
