import initKnex from 'knex';

const KnexConfig = {
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'offbeat',
        password: 'offbeat',
        database: 'offbeat',
        charset: 'utf8',
    },

};
const knex = initKnex(KnexConfig);

export async function getArticles() {
    return knex('articles');
}

export async function getSources() {
    return knex('sources');
}

