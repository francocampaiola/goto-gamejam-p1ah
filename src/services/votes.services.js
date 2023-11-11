import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db(process.env.MONGO_DB);
const VotesCollection = db.collection("votes");

async function getVotesByGame(id_game) {
  await client.connect();
  return VotesCollection.find({ id_game: id_game }).toArray();
}

async function getVotesByJudge(id_judge) {
  await client.connect();
  return VotesCollection.find({ id_judge: id_judge }).toArray();
}

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
