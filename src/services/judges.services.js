import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db(process.env.MONGO_DB);
const JudgesCollection = db.collection("judges");

async function getJudges() {
  await client.connect();
  return JudgesCollection.find().toArray();
}

async function getJudgeById(id) {
  await client.connect();
  return JudgesCollection.findOne({ _id: new ObjectId(id) });
}

export default {
  getJudges,
  getJudgeById,
};

export {
    getJudges, getJudgeById
};
