import movieRepo from '../repo/movieRepo.js';

const create = async (ctx) => {
    const { title, year, description } = ctx.request.body;
    const movie = {
        title,
        year,
        description,
    };
    movieRepo.createMovie(movie);
    return (ctx.body = {
        success: true,
    });
};

const list = async (ctx) => {
    ctx.body = await movieRepo.getMovies();
};

const show = async (ctx) => {
    ctx.body = await movieRepo.getMovie(ctx.params.id);
};

const remove = async (ctx) => {
    movieRepo.removeMovie(ctx.params.id);
    return (ctx.body = {
        success: true,
    });
};

const update = async (ctx) => {
    movieRepo.updateMovie(ctx.params.id, ctx.request.body);
    return (ctx.body = {
        success: true,
    });
};

export default { create, list, show, remove, update };
