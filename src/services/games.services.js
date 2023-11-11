import { MongoClient, ObjectId } from "mongodb";
import VotesServices from "../services/votes.services.js";

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
 * Se conecta a la base de datos de referencia y retorna una lista con los juegos obtenidos en función del género solicitado.
 * @param {string} genre
 * @returns {Promise<Array>}
 */
async function getGameByGenre(genre) {
  await client.connect();
  return GamesCollection.find({ genre: genre }).toArray();
}

/**
 * Se conecta a la base de datos de referencia y retorna una lista con los juegos obtenidos en función de la edición solicitada.
 * @param {number} edition 
 * @param {*} filter 
 * @returns {Promise<Array>}
 */
async function getGameByEdition(edition, filter = {}) {
  const filterParam = {"edition" : edition};
  filterParam.edition = parseInt(edition);
  
  if (filter?.genre) {
    filterParam.genre = filter.genre;
  }

  await client.connect();
  return GamesCollection.find(filterParam).toArray();
}

/**
 * Se conecta a la base de datos de referencia y retorna el objeto creado.
 * @param {object} game
 * @returns {Promise<Object>}
 */
async function createGame(game) {
  await client.connect();
  return GamesCollection.insertOne(game);
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
 * Se conecta a la base de datos de referencia y retorna el objeto modificado con el nuevo puntaje actualizado.
 * @param {string} id
 * @param {object} gameData
 * @returns {Promise<Object>}
 */
async function editGameScore(id, gameData) {
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
  getGameByGenre,
  getGameByEdition,
  createGame,
  editGame,
  editGameScore,
  deleteGame,
};

export {
  getGameById,
  getGameByGenre,
  getGameByEdition,
  createGame,
  editGame,
  editGameScore,
  deleteGame,
};
