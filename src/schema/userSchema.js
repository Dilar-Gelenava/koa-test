import Joi from 'joi';
import mongo from '../service/mongo.js';
const getCollection = mongo.getCollection;

const checkUniqueEmail = async (value) => {
    const user = await getCollection('test', 'user').findOne({
        email: value,
    });
    if (user) {
        throw new Joi.ValidationError(
            '"email" must be unique',
            [{ message: '"email" must be unique' }],
            value
        );
    }
};

const checkUniqueName = async (value) => {
    const user = await getCollection('test', 'user').findOne({
        name: value,
    });
    if (user) {
        throw new Joi.ValidationError(
            '"name" must be unique',
            [{ message: '"name" must be unique' }],
            value
        );
    }
};

const schema = Joi.object({
    name: Joi.string().max(32).external(checkUniqueName),
    email: Joi.string().email().external(checkUniqueEmail),
    password: Joi.string().max(32),
});

export default schema;
