import koa from 'koa';
import bodyParser from 'koa-body';
import v1Router from './routes/v1.js';
import logger from 'koa-logger';

const run = async () => {
    const app = new koa();

    app.use(bodyParser());
    app.use(v1Router.routes());

    app.use(logger());

    app.listen(3000);
};

export default { run };
