import express from "express";
import GamesControllers from "../controllers/games.controllers.js";
import VotesRoutes from '../routes/votes.routes.js';
import { validateCreateGame } from '../middlewares/games.middlewares.js'

const route = express.Router();

route.get("/games/:id", GamesControllers.getGameById);
route.get("/games/bygenre/:genre", GamesControllers.getGamesByGenre);
route.get("/games/byedition/:edition", GamesControllers.getGamesByEdition);
route.post("/games", [validateCreateGame], GamesControllers.createGame);
route.put("/games/:id", GamesControllers.editGame);
route.delete("/games/:id", GamesControllers.deleteGame);

route.use("/games", VotesRoutes);

export default route;
