import util from 'util';

import { MongoClient } from 'mongodb';

let client;

const connect = util.promisify(MongoClient.connect);

const url =
    'mongodb://127.0.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';

async function init() {
    client = await connect(url, { useUnifiedTopology: true });
    console.log(client);

    return client;
}

function getClient() {
    if (!client) {
        throw new Error('mongo client not initialised');
    }

    return client;
}

function close() {
    client.close();
}

export default {
    init,
    getClient,
    close,
};
