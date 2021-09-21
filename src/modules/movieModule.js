import movieRepo from '../repo/movieRepo.js';
import movieSchema from '../schema/movieSchema.js';

const create = async (ctx) => {
    const { value, error } = movieSchema.validate(ctx.request.body);
    if (error) {
        ctx.status = 400;
        return (ctx.body = error.details);
    }

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
    movieRepo.removeMovie(ctx.params.id);
    return (ctx.body = {
        success: true,
    });
};

const update = async (ctx) => {
    const { value, error } = movieSchema.validate(ctx.request.body);

    if (error) {
        ctx.status = 400;
        return (ctx.body = error.details);
    }

    movieRepo.updateMovie(ctx.params.id, value);
    return (ctx.body = {
        success: true,
    });
};

export default { create, list, show, remove, update };
