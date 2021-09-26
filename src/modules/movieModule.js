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
    let skip = 0;
    let limit = 5;

    if (ctx.params.limit && ctx.params.limit >= 1) {
        limit = +ctx.params.limit;
    }
    if (ctx.params.page && ctx.params.page >= 1) {
        skip = (+ctx.params.page - 1) * limit;
    }

    const movies = await movieRepo.getMovies(skip, limit);

    return (ctx.body = movies);
};

const show = async (ctx) => {
    if (ObjectId.isValid(ctx.params.id)) {
        const movie = await movieRepo.getMovie(ctx.params.id);

        if (movie) {
            movie.ts = movie._id.getTimestamp();
            return (ctx.body = movie);
        }
    }

    return (ctx.status = 400);
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
    if (ctx.params.title) {
        return (ctx.body = await movieRepo.searchMovie(ctx.params.title));
    }
    return (ctx.body = []);
};

export default { create, list, show, remove, update, search };
