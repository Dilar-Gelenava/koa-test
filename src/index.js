import server from './server.js';
import mongo from './service/mongo.js';

const run = async () => {
    try {
        await mongo.init();
        await server.run();
    } catch (err) {
        logger.error(`Can't start the service: ${err.message}`);

        throw new Error(`Can't start the service`);
    }
};

run();
