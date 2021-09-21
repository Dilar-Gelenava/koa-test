import bcrypt from 'bcrypt';
import mongo from '../service/mongo.js';
import { ObjectId } from 'mongodb';
const getCollection = mongo.getCollection;

const createUser = async (body) => {
    body.password = bcrypt.hashSync(body.password, 10);

    const { insertedId } = await getCollection('test', 'user').insertOne(body);
    return insertedId;
};

export default { createUser };
