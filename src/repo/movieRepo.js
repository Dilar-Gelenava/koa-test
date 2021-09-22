import mongo from '../service/mongo.js';
import { ObjectId } from 'mongodb';
const getCollection = mongo.getCollection;

const createMovie = async (body) => {
    const { insertedId } = await getCollection('test', 'movie').insertOne(body);
    return insertedId;
};

const getMovies = async () => {
    const movies = await getCollection('test', 'movie').find().toArray();
    return movies;
};

const getMovie = async (id) => {
    const movie = await getCollection('test', 'movie').findOne({
        _id: new ObjectId(id),
    });
    return movie;
};

const removeMovie = async (id) => {
    await getCollection('test', 'movie').deleteOne({ _id: new ObjectId(id) });
};

const updateMovie = async (id, body) => {
    await getCollection('test', 'movie').updateOne(
        { _id: new ObjectId(id) },
        { $set: body }
    );
};

const searchMovie = async (title) => {
    const movies = await getCollection('test', 'movie')
        .find({ title: { $regex: `.*${title}.*`, $options: 'i' } })
        .toArray();
    return movies;
};

export default {
    createMovie,
    getMovies,
    getMovie,
    removeMovie,
    updateMovie,
    searchMovie,
};
