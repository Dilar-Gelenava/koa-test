import movieRepo from '../repo/movieRepo.js';

const create = (ctx) => {
    const { title, year, description } = ctx.request.body;

    const movie = {
        title,
        year,
        description,
    };

    const insertedId = movieRepo.createMovie(movie);

    return insertedId;
};

export default { create };
