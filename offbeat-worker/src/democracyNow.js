import initKnex from 'knex';
import Parser from 'rss-parser';
import { stripHtml } from "string-strip-html";

const imgSrcRegExp =/^.*?<img .* src="(?<imageUrl>.*?)" .* \/>.*/m;

const topicsIgnoreList = ['news'];

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
    const upQ = knex('articles')
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
        source_id: 5,
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
        source_id: 5,
      });
  }
}

const parser = new Parser({
  customFields: {
    item: ['description' ,'content:encoded'],
  },
});

(async () => {

  const feed = await parser.parseURL('https://www.democracynow.org/democracynow.rss');

  let itemsToInsert = [];

  feed.items.forEach((item) => {
    if(item['title'].toLowerCase().indexOf('headlines for ') > -1) { return }
    let itemToInsert = {};

    itemToInsert.title = item['title'];
    itemToInsert.link = item['link'];
    const imgSrc = item['content:encoded'].match(imgSrcRegExp).groups.imageUrl;

    itemToInsert.imageUrl = imgSrc || '';
    itemToInsert.description = stripHtml(item['description']).result.substring(0,255);
    console.log(itemToInsert.description)
    itemToInsert.categoryPrimary = 'international';

    itemToInsert.pubDate = item['pubDate'];
    itemToInsert.imageAlt = item.title;
    itemsToInsert.push(itemToInsert);
  });
  for (const item of itemsToInsert) {
    await insertIntoArticles(item);
  }

  process.exit(0);
})();

