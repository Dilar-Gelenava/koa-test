import dotenv from 'dotenv';
dotenv.config();
import Router from 'koa-router';
const router = new Router();
import authModule from '../modules/userModule.js';
const verifyToken = authModule.verifyToken;

router.post('/api/register', authModule.register);

router.post('/api/login', authModule.login);

router.post('/api/test', verifyToken, (ctx) => {
    return (ctx.body = {
        success: true,
        data: ctx.state.authData,
    });
});

export default router.routes();
