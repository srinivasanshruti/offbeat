import initKnex from 'knex';

const KnexConfig = {
    client: 'pg', connection: {
        host: '127.0.0.1', user: 'offbeat', password: 'offbeat', database: 'offbeat', charset: 'utf8',
    },

};
const knex = initKnex(KnexConfig);

export async function getArticles(sourceId) {
    if (sourceId) {
        return knex('articles as a')
            .join("sources as s", "a.source_id", "s.id")
            .select("a.id", "a.title", "a.description", "a.category_primary", "s.source_name", "a.category_secondary", "a.pub_date", "a.image", "a.image_alt_text", "a.link", "a.source_id")
            .where({'source_id': sourceId}).orderBy('a.pub_date', 'desc');
    }
    return         knex('articles as a')
        .join("sources as s", "a.source_id", "s.id")
        .select("a.id", "a.title", "a.description", "a.category_primary", "s.source_name", "a.category_secondary", "a.pub_date", "a.image", "a.image_alt_text", "a.link", "a.source_id")
        .orderBy('a.pub_date', 'desc');

}

export async function getArticlesByIds(articleIds) {
    return knex('articles as a')
        .join("sources as s", "a.source_id", "s.id")
        .select("a.id", "a.title", "a.description", "a.category_primary", "s.source_name", "a.category_secondary", "a.pub_date", "a.image", "a.image_alt_text", "a.link", "a.source_id")
        .whereIn('a.id', articleIds).orderBy('a.pub_date', 'desc')
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
        .limit(10)
        .groupBy('category')
        .orderBy('num_of_articles', 'desc');

    return categories;
}
