import bcrypt from 'bcrypt';
import { ObjectId } from 'bson';
import mongo from '../service/mongo.js';
const getCollection = mongo.getCollection;

const createUser = async (body) => {
    body.password = bcrypt.hashSync(body.password, 10);

    const { insertedId } = await getCollection('test', 'user').insertOne(body);
    return insertedId;
};

const getUser = async (_id) => {
    const user = await getCollection('test', 'user').findOne({
        _id: new ObjectId(_id),
    });

    if (user) {
        delete user.password;
    }

    return user;
};

export default { createUser, getUser };
