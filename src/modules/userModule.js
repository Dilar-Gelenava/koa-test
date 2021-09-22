import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
import userRepo from '../repo/userRepo.js';
import userSchema from '../schema/userSchema.js';
import mongo from '../service/mongo.js';
const getCollection = mongo.getCollection;

const register = async (ctx) => {
    const { value, error } = userSchema.validate(ctx.request.body);
    if (error) {
        ctx.status = 400;
        return (ctx.body = { success: false, error: error.details[0].message });
    }

    const insertedId = await userRepo.createUser(value);

    return (ctx.body = {
        success: true,
        id: insertedId,
    });
};

const login = async (ctx) => {
    const { email, password } = ctx.request.body;
    const user = await getCollection('test', 'user').findOne({ email: email });

    if (!user || !bcrypt.compare(password, user.password)) {
        ctx.status = 401;
        return (ctx.body = {
            success: false,
        });
    } else {
        const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
        return (ctx.body = { accessToken });
    }
};

function verifyToken(ctx, next) {
    const bearerHeader = ctx.request.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        ctx.request.token = bearerToken;

        jwt.verify(
            bearerToken,
            process.env.ACCESS_TOKEN_SECRET,
            (err, authData) => {
                if (err) {
                    ctx.status = 403;
                    return (ctx.body = {
                        success: false,
                    });
                } else {
                    ctx.state.authData = authData;
                    return next();
                }
            }
        );
    } else {
        ctx.status = 401;
        return (ctx.body = {
            success: false,
        });
    }
}

export default { register, login, verifyToken };
