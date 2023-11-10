import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db(process.env.MONGO_DB);
const GamesCollection = db.collection("games");

/**
 * Se conecta a la base de datos de referencia y retorna un objeto en función del ID solicitado.
 * @param {string} id
 * @returns {Promise<Object>}
 */
async function getGameById(id) {
  await client.connect();
  return GamesCollection.findOne({ _id: new ObjectId(id) });
}

/**
 * Se conecta a la base de datos de referencia y retorna una lista en función del filtro enviado por parámetros.
 * @param {number} edition
 * @param {*} filter
 * @returns
 */
async function getGamesByEdition(edition, filter = {}) {
  const filterMongo = { edition: parseInt(edition) };

  if (filter?.genre) {
    filterMongo.genre = filter.genre;
  }

  await client.connect();
  const list = GamesCollection.find(filterMongo)
    .sort({ full_score: -1 })
    .toArray();
  return list;
}

/**
 * Se conecta a la base de datos de referencia y retorna el objeto creado.
 * @param {object} game
 * @returns {Promise<Object>}
 */
async function createGame(game) {
  await client.connect();
  const newGame = { ...game };
  await GamesCollection.insertOne(newGame);
  return newGame;
}

/**
 * Se conecta a la base de datos de referencia y retorna el objeto modificado.
 * @param {string} id
 * @param {object} gameData
 * @returns {Promise<Object>}
 */
async function editGame(id, gameData) {
  await client.connect();
  return GamesCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: gameData }
  );
}

/**
 * Se conecta a la base de datos de referencia y retorna el objeto eliminado.
 * @param {string} id
 * @returns {Promise<Object>}
 */
async function deleteGame(id) {
  await client.connect();
  return GamesCollection.deleteOne({ _id: new ObjectId(id) });
}

export default {
  getGameById,
  getGamesByEdition,
  createGame,
  editGame,
  deleteGame,
};

export { getGameById, getGamesByEdition, createGame, editGame, deleteGame };
