import Joi from 'joi';

const schema = Joi.object({
    name: Joi.string().max(32),
    email: Joi.string().email(),
    password: Joi.string().max(32),
});

export default schema;
