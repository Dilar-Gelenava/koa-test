import dotenv from 'dotenv';
dotenv.config();
import Router from 'koa-router';
import authModule from '../modules/userModule.js';
const verifyToken = authModule.verifyToken;
const router = new Router({
    prefix: '/api',
});

router.post('/register', authModule.register);

router.post('/login', authModule.login);

router.post('/test', verifyToken, (ctx) => {
    return (ctx.body = {
        success: true,
        data: ctx.state.authData,
    });
});

export default router.routes();
