import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
import userRepo from '../repo/userRepo.js';
import userSchema from '../schema/userSchema.js';
import mongo from '../service/mongo.js';
const getCollection = mongo.getCollection;
import util from 'util';

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

    if (user) {
        const passMatch = await bcrypt.compare(password, user.password);
        if (passMatch) {
            const accessToken = jwt.sign(
                { user },
                process.env.ACCESS_TOKEN_SECRET
            );
            return (ctx.body = { accessToken });
        } else {
            ctx.status = 401;
            return (ctx.body = {
                success: false,
                message: 'password is not correct',
            });
        }
    } else {
        ctx.status = 401;
        return (ctx.body = {
            success: false,
            message: 'email is not correct',
        });
    }
};

const verifyToken = async (ctx, next) => {
    const bearerHeader = ctx.request.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        ctx.request.token = bearerToken;

        const verify = util.promisify(jwt.verify);

        try {
            const resp = await verify(
                bearerToken,
                process.env.ACCESS_TOKEN_SECRET
            );
            ctx.state.authData = resp;
            await next();
        } catch (error) {
            ctx.status = 403;
            return (ctx.body = {
                success: false,
                message: 'please provide valid token',
            });
        }
    } else {
        ctx.status = 401;
        return (ctx.body = {
            success: false,
            message: 'you are not authorized!',
        });
    }
};

export default { register, login, verifyToken };
