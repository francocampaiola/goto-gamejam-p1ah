import express from 'express';
import JudgesControllers from '../controllers/judges.controllers.js';

const route = express.Router();

route.get("/judges", JudgesControllers.getJudges);
route.get("/judges/:id", JudgesControllers.getJudgeById);

export default route;