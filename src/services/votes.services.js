import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db(process.env.MONGO_DB);
const VotesCollection = db.collection("votes");

/**
 * Se conecta a la base de datos de referencia y retorna una lista con los votos realizados por un juez a partir del ID de un juego.
 * @param {string} id_game 
 * @returns {Promise<Array>}
 */
async function getVotesByGame(id_game) {
  await client.connect();
  return await VotesCollection.find({ id_game: id_game }).toArray();
}

/**
 * Se conecta a la base de datos de referencia y retorna una lista con los votos realizados por un juez a partir de su ID.
 * @param {string} id_judge 
 * @returns {Promise<Array>}
 */
async function getVotesByJudge(id_judge) {
  await client.connect();
  return await VotesCollection.find({ id_judge: id_judge }).toArray();
}

/**
 * Se conecta a la base de datos de referencia y retorna el objeto creado.
 * @param {*} vote 
 * @returns {Promise<Object>}
 */
async function createVote(vote) {
  await client.connect();
  return VotesCollection.insertOne(vote);
}

export default {
  getVotesByGame,
  getVotesByJudge,
  createVote
};

export { getVotesByGame, getVotesByJudge, createVote };
