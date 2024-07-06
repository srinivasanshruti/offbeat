import initKnex from 'knex';

const KnexConfig = {
    client: 'pg', connection: {
        host: '127.0.0.1', user: 'offbeat', password: 'offbeat', database: 'offbeat', charset: 'utf8',
    },

};
const knex = initKnex(KnexConfig);

export async function getArticles() {
    return knex('articles');
}

export async function getSources() {
    return knex('sources');
}

export async function getTopics() {
    const query1 = knex
        .select('category_primary as category')
        .count('* as num_of_articles')
        .from('articles')
        .whereNotNull('category_primary')
        .groupBy('category_primary');
    const query2 = knex
        .select('category_secondary as category')
        .count('* as num_of_articles')
        .from('articles')
        .whereNotNull('category_secondary')
        .groupBy('category_secondary');

    const inner = knex.unionAll([query1, query2])

    const categories = await knex
        .select('category')
        .sum('num_of_articles as num_of_articles')
        .from(inner)
        .groupBy('category')
        .orderBy('num_of_articles', 'desc');

    return categories;
}
