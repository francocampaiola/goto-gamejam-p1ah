import express from "express";
import "dotenv/config";

import gamesRoutes from './routes/games.routes.js'
import judgesRoutes from './routes/judges.routes.js'

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(gamesRoutes);
app.use(judgesRoutes);

app.listen(port, () => {
  console.log("Server is running on port", port);
});
