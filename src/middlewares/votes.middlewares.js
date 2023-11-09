import VoteSchema from "../schemas/votes.schema.js";
import JudgesControllers from "../controllers/judges.controllers.js";
import GamesControllers from "../controllers/games.controllers.js";

function validateVote(req, res, next) {
  VoteSchema.createVoteSchema
    .validate(req.body, {
      stripUnknown: true,
      abortEarly: false,
    })
    .then(async (game) => {
      req.body = game;
      next();
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

async function uniqueVote(req, res, next) {
    try {
        const votedGames = JudgesControllers.gamesVoted(req.body.id_judge);

        const gameExist = votedGames.some (g => g.id_game === req.body.id_game);

        if (gameExist) {
            res.status(400).json("Este juego ya ha sido calificado por este juez.")
        } else {
            next();
        }
    }
    catch (err) {
        res.status(500).json("Error buscando al juego solicitado.");
    }
}

async function judgeExist(req, res, next) {
  try {
    const judge = JudgesControllers.getJudgeById(req.body.id_judge);

    if (!judge) {
      res.status(404).json("El juez no existe");
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json("Error buscando al juez solicitado.");
  }
}

async function gameExist(req, res, next) {
  try {
    const game = GamesControllers.getGameById(req.body.id_game);

    if (!game) {
      res.status(404).json("El juego no existe");
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json("Error buscando al juego solicitado.");
  }
}

export default {
  validateVote,
  judgeExist,
  gameExist,
};

export { validateVote, judgeExist, gameExist };
