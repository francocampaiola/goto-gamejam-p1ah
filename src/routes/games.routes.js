import express from "express";
import GamesController from "../controllers/games.controllers.js";
import { validateCreateGame } from '../middlewares/games.middlewares.js'

const route = express.Router();

route.get("/games", GamesController.getGames);
route.get("/games/:id", GamesController.getGameById);
route.post("/games", [validateCreateGame], GamesController.createGame);
route.put("/games/:id", GamesController.editGame);
route.delete("/games/:id", GamesController.deleteGame);

export default route;
