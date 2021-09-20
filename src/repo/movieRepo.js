import mongo from '../service/mongo.js';
import { ObjectId } from 'mongodb';

const getCollection = () => {
    const db = mongo.getClient();
    const collection = db.db('test').collection('movie');

    return collection;
};

const createMovie = async (body) => {
    const { insertedId } = await getCollection().insertOne(body);
    return insertedId;
};

const getMovies = async () => {
    const movies = await getCollection().find().toArray();
    return movies;
};

const getMovie = async (id) => {
    const movie = await getCollection().findOne({ _id: new ObjectId(id) });
    return movie;
};

const removeMovie = async (id) => {
    await getCollection().deleteOne({ _id: new ObjectId(id) });
};

const updateMovie = async (id, body) => {
    await getCollection().updateOne({ _id: new ObjectId(id) }, { $set: body });
};

export default { createMovie, getMovies, getMovie, removeMovie, updateMovie };
