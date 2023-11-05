import express from "express";
import gamesControllers from "../controllers/games.controllers.js"

const route = express.Router();

route.get('/games', gamesControllers.allGames)

export default route;