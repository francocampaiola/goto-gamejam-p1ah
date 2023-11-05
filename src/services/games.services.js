import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db(process.env.MONGO_DB);
const GamesCollection = db.collection("games");

/**
 * Se conecta a la base de datos de referencia y retorna un array con todos los juegos cargados.
 * @returns {Promise<Array>}
 */
async function getGames() {
  await client.connect();
  return GamesCollection.find().toArray();
}

/**
 * Se conecta a la base de datos de referencia y retorna un objeto en función del ID solicitado.
 * @param {string} id
 * @returns {Promise<Object>}
 */
async function getGameById(id) {
  await client.connect();
  return GamesCollection.findOne({ _id: new ObjectId(id)});
}

async function createGame(game) {
    await client.connect();
    const newGame = { ...game }
    await GamesCollection.insertOne(newGame);
    return newGame;
}

export default {
  getGames,
  getGameById,
  createGame,
};
