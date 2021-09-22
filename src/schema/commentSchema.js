import Joi from 'joi';

const schema = Joi.object({
    movieId: Joi.string().required(),
    text: Joi.string().required(),
});

export default schema;
