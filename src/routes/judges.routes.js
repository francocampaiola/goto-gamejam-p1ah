import express from 'express';
import JudgesControllers from '../controllers/judges.controllers.js';
import VotesControllers from '../controllers/votes.controllers.js';

const route = express.Router();

route.get("/judges/:id", JudgesControllers.getJudgeById);
route.get("/judges/:id/votes", VotesControllers.getVotesByJudge);    

export default route;