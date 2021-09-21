import jwt from 'jsonwebtoken';
import Router from 'koa-router';
const router = new Router();

router.post('/api/posts', verifyToken, (ctx) => {
    jwt.verify(ctx.request.token, 'secretkey', (err, authData) => {
        if (err) {
            ctx.status = 403;
            return (ctx.body = {
                success: false,
            });
        } else {
            return (ctx.body = { message: 'Post created...', authData });
        }
    });
});

router.post('/api/login', (ctx) => {
    const user = {
        id: 1,
        username: 'dilar',
        email: 'dilargelenava@gmail.com',
    };

    const token = jwt.sign({ user }, 'secretkey');

    return (ctx.body = { token });
});

function verifyToken(ctx, next) {
    const bearerHeader = ctx.request.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');

        const bearerToken = bearer[1];

        ctx.request.token = bearerToken;

        return next();
    } else {
        ctx.status = 403;
        return (ctx.body = {
            success: false,
        });
    }
}

export default router.routes();
