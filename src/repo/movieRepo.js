import mongo from '../service/mongo.js';
const db = mongo.getClient();

const collection = db.db('test').collection('movie');

async function createMovie(body) {
    const { insertedId } = await collection.insertOne(body);

    return insertedId;
}

export default { createMovie };
