import mongo from '../service/mongo.js';
const getCollection = mongo.getCollection;

const getWishlist = async (userId) => {
    const wishlist = await getCollection('test', 'wishlist').findOne({
        userId: userId,
    });

    if (wishlist) {
        return wishlist.movies;
    }

    return [];
};

const createWish = async (userId, movieId) => {
    const wishlist = await getCollection('test', 'wishlist').findOne({
        userId: userId,
    });

    if (wishlist) {
        if (!wishlist.movies.includes(movieId)) {
            wishlist.movies.push(movieId);
        }

        await getCollection('test', 'wishlist').updateOne(
            { userId: userId },
            { $set: wishlist }
        );
    } else {
        await getCollection('test', 'wishlist').insertOne({
            userId: userId,
            movies: [movieId],
        });
    }
};

const removeWish = async (userId, movieId) => {
    const wishlist = await getCollection('test', 'wishlist').findOne({
        userId: userId,
    });

    if (wishlist) {
        if (wishlist.movies.includes(movieId)) {
            const index = wishlist.movies.indexOf(movieId);
            wishlist.movies.splice(index, 1);

            await getCollection('test', 'wishlist').updateOne(
                { userId: userId },
                { $set: wishlist }
            );
        }
    } else {
        return (ctx.status = 400);
    }
};

const clearWish = async (userId) => {
    const wishlist = await getCollection('test', 'wishlist').findOne({
        userId: userId,
    });

    if (wishlist) {
        wishlist.movies = [];

        await getCollection('test', 'wishlist').updateOne(
            { userId: userId },
            { $set: wishlist }
        );
    }
};

export default {
    getWishlist,
    createWish,
    removeWish,
    clearWish,
};
