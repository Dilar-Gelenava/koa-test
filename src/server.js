import koa from 'koa';
import bodyParser from 'koa-body';
import v1Router from './routes/v1.js';
import logger from 'koa-logger';

import { ApolloServer } from 'apollo-server-koa';
import { typeDefs, resolvers } from './graphql/schema.js';

const run = async () => {
    const app = new koa();

    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    app.use(bodyParser());

    app.use(v1Router.routes());
    app.use(logger());

    const port = 3000;
    app.listen(port, () =>
        console.log(`Hey Dilar, browse to localhost:${port}`)
    );
};

export default { run };
