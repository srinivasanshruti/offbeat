import initKnex from 'knex';
import Parser from 'rss-parser';

const imgSrcRegExp =/^.*?<img .* src="(?<imageUrl>.*?)" .* \/>.*/;
const descRegExp = /^.*?<p>(?<description>.*?)<\/p>.*$/m;

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

async function insertIntoArticles(item) {

  const existing = await knex('articles').where({ link: item.link }).first();
  if (existing) {
    await knex('articles')
      .where({ id: existing.id })
      .update({
        title: item.title,
        description: item.description,
        image: item.imageUrl,
        image_alt_text: item.imageAlt,
        link: item.link,
        pub_date: item.pubDate,
        category_primary: item.categoryPrimary,
        category_secondary: item.categorySecondary,
        source_id: 6,
        updated_at: new Date(),
      });
  } else {
    await knex('articles')
      .insert({
        title: item.title,
        description: item.description,
        image: item.imageUrl,
        image_alt_text: item.imageAlt,
        link: item.link,
        pub_date: item.pubDate,
        category_primary: item.categoryPrimary,
        category_secondary: item.categorySecondary,
        source_id: 6,
      });
  }
}

const parser = new Parser({
  customFields: {
    item: ['description', 'media:content'],
  },
});

(async () => {

  const feed = await parser.parseURL('https://fixthenews.com/rss/');

  let itemsToInsert = [];

  feed.items.forEach((item) => {
    let itemToInsert = {};

    itemToInsert.title = item['title'];
    itemToInsert.link = item['link'];

    const imgSrc = item['media:content']['$']['url'];

    itemToInsert.imageUrl = imgSrc || '';
    itemToInsert.description = item['description'];
    itemToInsert.categoryPrimary = null;
    itemToInsert.categorySecondary = null;

    itemToInsert.pubDate = item['pubDate'];
    itemToInsert.imageAlt = item.title;
    itemsToInsert.push(itemToInsert);
  });
  for (const item of itemsToInsert) {
    await insertIntoArticles(item);
  }

  process.exit(0);
})();

