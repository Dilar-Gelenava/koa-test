import movieRepo from '../repo/movieRepo.js';
import movieSchema from '../schema/movieSchema.js';

import mongo from '../service/mongo.js';
import { ObjectId } from 'mongodb';
const getCollection = mongo.getCollection;

const create = async (ctx) => {
    const { value, error } = movieSchema.validate(ctx.request.body);
    if (error) {
        ctx.status = 400;
        return (ctx.body = error.details[0].message);
    }

    value.userId = ctx.state.authData.user._id;

    const insertedId = await movieRepo.createMovie(value);
    return (ctx.body = {
        success: true,
        id: insertedId,
    });
};

const list = async (ctx) => {
    return (ctx.body = await movieRepo.getMovies());
};

const show = async (ctx) => {
    return (ctx.body = await movieRepo.getMovie(ctx.params.id));
};

const remove = async (ctx) => {
    const movie = await getCollection('test', 'movie').findOne({
        _id: new ObjectId(ctx.params.id),
        userId: ctx.state.authData.user._id,
    });

    if (movie) {
        await movieRepo.removeMovie(ctx.params.id);

        return (ctx.body = {
            success: true,
            message: 'movie deleted successfully',
        });
    } else {
        ctx.status = 403;
        return (ctx.body = {
            success: false,
            message: 'you dont have prermission to delete this movie',
        });
    }
};

const update = async (ctx) => {
    const movie = await getCollection('test', 'movie').findOne({
        _id: new ObjectId(ctx.params.id),
        userId: ctx.state.authData.user._id,
    });

    if (movie) {
        const { value, error } = movieSchema.validate(ctx.request.body);

        if (error) {
            ctx.status = 400;
            return (ctx.body = error.details);
        }

        movieRepo.updateMovie(ctx.params.id, value);
        return (ctx.body = {
            success: true,
            message: 'movie updated successfully',
        });
    } else {
        ctx.status = 403;
        return (ctx.body = {
            success: false,
            message: 'you dont have prermission to update this movie',
        });
    }
};

const search = async (ctx) => {
    return (ctx.body = await movieRepo.searchMovie(ctx.params.title));
};

export default { create, list, show, remove, update, search };
