import initKnex from 'knex';
import Parser from 'rss-parser';

const topicsIgnoreList = ['news', 'investigation', 'in-depth', 'explainer', 'inside the narwhal'];

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
        updated_at: new Date(),
        source_id: 1,
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
        source_id: 1,
      });
  }

}
const parser = new Parser({
  customFields: {
    item: ['media:group', 'description'],
  },
});

(async () => {

  const feed = await parser.parseURL('https://thenarwhal.ca/feed/');

  let itemsToInsert = [];

  feed.items.forEach((item) => {
    if (item.categories[0].trim().replace('\n', '').toLowerCase() === 'inside the narwhal') {
      return
    }
    let itemToInsert = {};

    itemToInsert.title = item['title'];
    itemToInsert.link = item['link'];
    itemToInsert.description = item['description'];

    let categories = item.categories.map((category) => {
      category = category.trim().replace('\n', '').toLowerCase();
      if (topicsIgnoreList.indexOf(category) === -1)
        return category;
    });
    categories = categories.filter((category) => category);
    itemToInsert.categoryPrimary = categories[0] || 'Climate Change';
    itemToInsert.categorySecondary = categories[1];

    itemToInsert.pubDate = item['pubDate'];
    itemToInsert.imageUrl = '' || item['media:group']['media:content'][0]['$']['url'];
    itemToInsert.imageAlt = item['title'] || item['media:group']['media:description'][0];
    itemsToInsert.push(itemToInsert);
  });
  for (const item of itemsToInsert) {
    await insertIntoArticles(item);
  }

  process.exit(0);
})();

