import express from 'express';
import JudgesControllers from '../controllers/judges.controllers.js';
// import { gameExist, judgeExist, uniqueVote, validateVote } from '../middlewares/votes.middlewares.js';

const route = express.Router();

route.get("/judges", JudgesControllers.getJudges);
route.get("/judges/:id", JudgesControllers.getJudgeById);
// route.post("/vote", [validateVote], [judgeExist], [gameExist], [uniqueVote], JudgesControllers.)

export default route;