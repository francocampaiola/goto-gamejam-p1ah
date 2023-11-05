import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db(process.env.MONGO_DB);
const GamesCollection = db.collection('games');

/**
 * Se conecta a la base de datos de referencia y retorna un array con todos los juegos cargados.
 * @returns {Promise<Array>}
 */
async function allGames() {
    await client.connect();
    return GamesCollection.find().toArray();   
}

export default {
    allGames
}