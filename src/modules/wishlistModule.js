import movieRepo from '../repo/movieRepo.js';
import wishlistRepo from '../repo/wishlistRepo.js';

import { ObjectId } from 'mongodb';

const list = async (ctx) => {
    const wishlist = await wishlistRepo.getWishlist(
        ctx.state.authData.user._id
    );

    return (ctx.body = wishlist);
};

const create = async (ctx) => {
    if (ObjectId.isValid(ctx.params.id)) {
        const movie = await movieRepo.getMovie(ctx.params.id);

        if (movie) {
            await wishlistRepo.createWish(
                ctx.state.authData.user._id,
                ctx.params.id
            );

            return (ctx.body = {
                success: true,
            });
        }
    }

    return (ctx.status = 400);
};

const remove = async (ctx) => {
    if (ObjectId.isValid(ctx.params.id)) {
        await wishlistRepo.removeWish(
            ctx.state.authData.user._id,
            ctx.params.id
        );

        return (ctx.body = {
            success: true,
        });
    }

    return (ctx.status = 400);
};

const clear = async (ctx) => {
    await wishlistRepo.clearWish(ctx.state.authData.user._id);

    return (ctx.body = {
        success: true,
    });
};

export default { list, create, remove, clear };
