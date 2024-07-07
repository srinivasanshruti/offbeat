import initKnex from 'knex';
import Parser from 'rss-parser';

const imgSrcRegExp =/^.*?<img .* src="(?<imageUrl>.*?)" .* \/>.*/;
const descRegExp = /^.*?<p>(?<description>.*?)<\/p>.*$/m;

const topicsIgnoreList = ['voices', 'features', 'investigations', 'in depth', 'analysis', 'news', 'video'];

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
    item: ['description'],
  },
});

(async () => {

  const feed = await parser.parseURL('https://breachmedia.ca/feed/');

  let itemsToInsert = [];

  feed.items.forEach((item) => {
    let itemToInsert = {};

    itemToInsert.title = item['title'];
    itemToInsert.link = item['link'];

    const imgSrc = item.description.match(imgSrcRegExp).groups.imageUrl;
    const desc = item.description.match(descRegExp).groups.description;

    itemToInsert.imageUrl = imgSrc || '';
    itemToInsert.description = desc || item.title;

    let categories = item.categories.map((category) => {
      category = category.trim().replace('\n', '').toLowerCase();
      if (topicsIgnoreList.indexOf(category) === -1)
        return category;
    });
    categories = categories.filter((category) => category);

    itemToInsert.categoryPrimary = categories[0];
    itemToInsert.categorySecondary = categories[1];

    itemToInsert.pubDate = item['pubDate'];
    itemToInsert.imageAlt = item.title;
    itemsToInsert.push(itemToInsert);
  });
  for (const item of itemsToInsert) {
    await insertIntoArticles(item);
  }

  process.exit(0);
})();

