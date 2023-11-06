import express from "express";
import GamesController from "../controllers/games.controllers.js";

const route = express.Router();

route.get("/games", GamesController.getGames);
route.get("/games/:id", GamesController.getGameById);
route.post("/games", GamesController.createGame);
route.put("/games/:id", GamesController.editGame);

export default route;
