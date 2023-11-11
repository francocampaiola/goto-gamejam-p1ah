import express from "express";
import VotesControllers from "../controllers/votes.controllers.js";
import {
  validateCreateVote,
  uniqueVote,
  judgeExist,
  gameExist,
} from "../middlewares/votes.middlewares.js";

const route = express.Router();

route.get("/:id/votes", VotesControllers.getVotesByGame);
route.get("/:id/average", VotesControllers.getAverageByGame);
route.post("/:id/votes", [validateCreateVote, judgeExist, gameExist, uniqueVote], VotesControllers.createVote);

export default route;
