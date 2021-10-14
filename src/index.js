import mongo from './service/mongo.js';
import server from './server.js';

const run = async () => {
    try {
        await mongo.init();

        await server.run();
    } catch (err) {
        console.log(`Can't start the service: ${err.message}`);

        throw new Error(`Can't start the service`);
    }
};

run();
