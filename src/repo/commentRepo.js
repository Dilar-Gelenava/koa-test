import mongo from '../service/mongo.js';
import { ObjectId } from 'mongodb';
const getCollection = mongo.getCollection;

const createComment = async (body) => {
    const { insertedId } = await getCollection('test', 'comment').insertOne(
        body
    );
    return insertedId;
};

const removeComment = async (id) => {
    await getCollection('test', 'comment').deleteOne({ _id: new ObjectId(id) });
};

const removeMovieComments = async (movieId) => {
    await getCollection('test', 'comment').deleteMany({
        movieId: movieId,
    });
};

export default {
    createComment,
    removeComment,
    removeMovieComments,
};
