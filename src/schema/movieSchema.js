import Joi from 'joi';

const schema = Joi.object({
    title: Joi.string(),
    year: Joi.number().integer(),
    description: Joi.string(),
});

export default schema;
