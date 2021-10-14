import mongo from '../service/mongo.js';
import { ObjectId } from 'mongodb';
const getCollection = mongo.getCollection;

const createMovie = async (body) => {
    const { insertedId } = await getCollection('test', 'movie').insertOne(body);
    return insertedId;
};

const getMovies = async (skip, limit) => {
    const movies = await getCollection('test', 'movie')
        .find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit)
        .toArray();

    return movies;
};

const getMoviesByIds = async (ids, skip, limit) => {
    const objIds = ids.map((id) => {
        return new ObjectId(id);
    });

    const movies = await getCollection('test', 'movie')
        .find({ _id: { $in: objIds } })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit)
        .toArray();

    return movies;
};

const getMovie = async (id) => {
    const movie = await getCollection('test', 'movie').findOne({
        _id: new ObjectId(id),
    });
    return movie;
};

const removeMovie = async (id) => {
    await getCollection('test', 'comment').deleteMany({
        movieId: id,
    });

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
        .sort({ _id: -1 })
        .limit(10)
        .toArray();
    return movies;
};

export default {
    createMovie,
    getMovies,
    getMoviesByIds,
    getMovie,
    removeMovie,
    updateMovie,
    searchMovie,
};
