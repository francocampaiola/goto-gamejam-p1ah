import { MongoClient, ObjectId } from "mongodb";
import VotesServices from "./votes.services.js";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db(process.env.MONGO_DB);
const JudgesCollection = db.collection("judges");

/**
 * Se conecta a la base de datos de referencia y retorna un juez según el ID, siempre y cuando lo encuentre.
 * @param {string} id 
 * @returns {Promise<Object>}
 */
async function getJudgeById(id) {
  await client.connect();
  return JudgesCollection.findOne({ _id: new ObjectId(id) });
}

/**
 * Retorna una lista con los juegos votados por un juez a partir de su ID.
 * @param {string} id
 * @returns {Promise<Array>}
 */
async function gamesVoted(id) {
  return VotesServices.getVotesByJudge(id);
}

/**
 * Retorna un objeto con el voto almacenado
 * @param {*} vote 
 * @returns {Promise<Object>}
 */
async function generateVote(vote) {
  return VotesServices.saveVote(vote);
}

export default {
  getJudgeById,
  gamesVoted,
  generateVote
};

export {
  getJudgeById,
  gamesVoted,
  generateVote
};
