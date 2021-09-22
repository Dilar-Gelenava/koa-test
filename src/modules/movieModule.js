import movieRepo from '../repo/movieRepo.js';
import commentRepo from '../repo/commentRepo.js';
import movieSchema from '../schema/movieSchema.js';

const create = async (ctx) => {
    const { value, error } = movieSchema.validate(ctx.request.body);
    if (error) {
        ctx.status = 400;
        return (ctx.body = error.details[0].message);
    }

    value.userId = 1;

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
    await commentRepo.removeMovieComments(ctx.params.id);
    await movieRepo.removeMovie(ctx.params.id);
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

const search = async (ctx) => {
    return (ctx.body = await movieRepo.searchMovie(ctx.params.title));
};

export default { create, list, show, remove, update, search };
