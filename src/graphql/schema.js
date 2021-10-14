import { gql } from 'apollo-server-koa';
import movieRepo from '../repo/movieRepo.js';
import commentRepo from '../repo/commentRepo.js';
import userRepo from '../repo/userRepo.js';
import wishlistRepo from '../repo/wishlistRepo.js';

const typeDefs = gql`
    type Movie {
        _id: String
        title: String
        year: Int
        description: String
        userId: String
        comments: [Comment!]
    }

    type Comment {
        _id: String
        movieId: String
        text: String
        userId: String
        ts: String
    }

    type User {
        _id: String
        name: String
        email: String
        wishlist: [Movie]
        comments: [Comment]
    }

    type Query {
        movies(skip: Int = 0, limit: Int = 10): [Movie]

        movie(_id: String): Movie

        user(_id: String): User
    }
`;

const resolvers = {
    Query: {
        async movie(parent, args, context, info) {
            return await movieRepo.getMovie(args._id);
        },

        async movies(parent, args, context, info) {
            return await movieRepo.getMovies(args.skip, args.limit);
        },

        async user(parent, args, context, info) {
            return await userRepo.getUser(args._id);
        },
    },

    Movie: {
        async comments(parent, args, context, info) {
            return await commentRepo.getMovieComments(parent._id.toString());
        },
    },

    User: {
        async wishlist(parent, args, context, info) {
            const wishes = await wishlistRepo.getWishlist(
                parent._id.toString()
            );

            return await movieRepo.getMoviesByIds(wishes, 0, 10);
        },

        async comments(parent, args, context, info) {
            return await commentRepo.getUserComments(parent._id.toString());
        },
    },
};

export { typeDefs, resolvers };
