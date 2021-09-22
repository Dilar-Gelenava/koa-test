import commentRepo from '../repo/commentRepo.js';
import commentSchema from '../schema/commentSchema.js';

const create = async (ctx) => {
    const { value, error } = commentSchema.validate(ctx.request.body);
    if (error) {
        ctx.status = 400;
        return (ctx.body = error.details[0].message);
    }

    value.userId = 1;

    const insertedId = await commentRepo.createComment(value);
    return (ctx.body = {
        success: true,
        id: insertedId,
    });
};

const remove = async (ctx) => {
    commentRepo.removeComment(ctx.params.id);
    return (ctx.body = {
        success: true,
    });
};

export default { create, remove };
