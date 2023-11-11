import express from "express";
import VotesControllers from "../controllers/votes.controllers.js";
import {
  validateCreateVote,
  validateUniqueVote,
  validateGameExist,
  validateJudgeExist,
} from "../middlewares/votes.middlewares.js";

const route = express.Router();

route.get("/:id/votes", VotesControllers.getVotesByGame);
route.get("/:id/average", VotesControllers.getAverageByGame);
route.post(
  "/:id/votes",
  [
    validateCreateVote,
    validateJudgeExist,
    validateGameExist,
    validateUniqueVote,
  ],
  VotesControllers.createVote
);

export default route;
