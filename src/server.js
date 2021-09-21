import koa from 'koa';
import bodyParser from 'koa-body';
import logger from 'koa-logger';
import movieRoutes from './routes/movieRoutes.js';
import authRoutes from './routes/authRoutes.js';

const run = async () => {
    const app = new koa();

    app.use(bodyParser());
    app.use(movieRoutes);
    app.use(authRoutes);

    app.use(logger());

    app.listen(3000);
};

export default { run };
