import express from "express";
import GamesControllers from "../controllers/games.controllers.js";
import { validateCreateGame } from '../middlewares/games.middlewares.js'

const route = express.Router();

route.get("/games/:id", GamesControllers.getGameById);
route.get("/games/:id/average", GamesControllers.getGameAverage);
route.get("/games/:edition", GamesControllers.getGamesByEdition);
route.post("/games", [validateCreateGame], GamesControllers.createGame);
route.put("/games/:id", GamesControllers.editGame);
route.delete("/games/:id", GamesControllers.deleteGame);

export default route;
