import initKnex from 'knex';
import Parser from 'rss-parser';

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
  await knex('articles')
    .insert({
      title: item.title,
      description: item.description,
      image: item.imageUrl,
      image_alt_text: item.imageAlt,
      link: item.link,
      pub_date: item.pubDate,
      source_id: 2,
    });
  console.log(item)
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
    let itemToInsert = {};
    itemToInsert.title = item['title'];
    itemToInsert.link = item['link'];
    itemToInsert.description = item['description'];
    itemToInsert.pubDate = item['pubDate'];
    itemToInsert.imageUrl = "" || item['media:group']['media:content'][0]['$']['url'];
    itemToInsert.imageAlt = item['title'] || item['media:group']['media:description'][0];
    itemsToInsert.push(itemToInsert);
  });
  for (const item of itemsToInsert) {
    await insertIntoArticles(item);
  }

  process.exit(0);
})();

