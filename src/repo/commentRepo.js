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

const getMovieComments = async (movieId) => {
    const comments = await getCollection('test', 'comment')
        .find({
            movieId,
        })
        .sort({ _id: -1 })
        .toArray();

    comments.forEach((comment) => {
        comment.ts = comment._id.getTimestamp();
    });

    return comments;
};

const getUserComments = async (userId) => {
    const comments = await getCollection('test', 'comment')
        .find({
            userId,
        })
        .sort({ _id: -1 })
        .toArray();

    comments.forEach((comment) => {
        comment.ts = comment._id.getTimestamp();
    });

    return comments;
};

export default {
    createComment,
    removeComment,
    getMovieComments,
    getUserComments,
};
