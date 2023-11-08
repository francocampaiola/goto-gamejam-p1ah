import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db(process.env.MONGO_DB);
const VotesCollection = db.collection("votes");

/**
 * Se conecta a la base de datos de referencia y retorna una lista con todos los juegos votados por un juez a partir de su ID.
 * @param {string} id 
 * @returns {Promise<Array>}
 */
async function gamesVoted(id) {
    await client.connect();
    const list = await VotesCollection.find({"id_judge" : id}).toArray();
    return list;
}

/**
 * Se conecta a la base de datos de referencia y mediante el voto que recibe por parámetros, lo almacena en la base de datos para luego retornar un nuevo objeto con su correspondiente ID.
 * @param {*} vote 
 * @returns {Promise<Object>}
 */
async function saveVote(vote) {
    await client.connect();
    const newVote = {"_id": new ObjectId(), ...vote}
    return await VotesCollection.insertOne(newVote);
}

export default {
    gamesVoted,
    saveVote
}