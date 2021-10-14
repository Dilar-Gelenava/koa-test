import commentRepo from '../repo/commentRepo.js';
import commentSchema from '../schema/commentSchema.js';
import mongo from '../service/mongo.js';
import { ObjectId } from 'mongodb';
const getCollection = mongo.getCollection;

const create = async (ctx) => {
    const { value, error } = commentSchema.validate(ctx.request.body);
    if (error) {
        ctx.status = 400;
        return (ctx.body = error.details[0].message);
    }

    value.userId = ctx.state.authData.user._id;

    const insertedId = await commentRepo.createComment(value);
    return (ctx.body = {
        success: true,
        id: insertedId,
    });
};

const remove = async (ctx) => {
    const comment = await getCollection('test', 'comment').findOne({
        userId: ctx.state.authData.user._id,
        _id: new ObjectId(ctx.params.id),
    });

    if (comment) {
        commentRepo.removeComment(ctx.params.id);
        return (ctx.body = {
            success: true,
            message: 'comment deleted successfully',
        });
    } else {
        ctx.status = 403;
        return (ctx.body = {
            success: false,
            message: 'you dont have prermission to delete this comment',
        });
    }
};

const getMovieComments = async (ctx) => {
    const comments = await commentRepo.getMovieComments(ctx.params.id);

    return (ctx.body = comments);
};

export default { create, remove, getMovieComments };
