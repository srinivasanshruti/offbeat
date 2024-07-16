import initKnex from 'knex';
import Parser from 'rss-parser';
import {stripHtml} from 'string-strip-html';

const sources = [
  {
    id: 1,
    name: 'theBreach',
    url: 'https://breachmedia.ca/feed/',
    ignoreTopics: ['voices', 'features', 'investigations', 'in depth', 'analysis', 'news', 'video'],
    imgSrcRegExp: /^.*?<img .* src="(?<imageUrl>.*?)" .* \/>.*/,
    descRegExp: /^.*?<p>(?<description>.*?)<\/p>.*$/m,
    customFields: ['description'],
  },
  {
    id: 2,
    name: 'narwhal',
    url: 'https://thenarwhal.ca/feed/',
    ignoreTopics: ['news', 'investigation', 'in-depth', 'explainer', 'inside the narwhal'],
    customFields: ['media:group', 'description'],
  },
  {
    id: 4,
    name: 'socialistProject',
    url: 'https://socialistproject.ca/feed/rss/',
    ignoreTopics: ['news'],
    customFields: ['description', 'media:content'],
  },
  {
    id: 5,
    name: 'democracyNow',
    url: 'https://www.democracynow.org/democracynow.rss',
    imgSrcRegExp: /^.*?<img .* src="(?<imageUrl>.*?)" .* \/>.*/m,
    customFields: ['description', 'content:encoded'],
  },
  { id: 6, name: 'fixTheNews', url: 'https://fixthenews.com/rss/', customFields: ['description', 'media:content'] },
];

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
        source_id: item.sourceId,
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
        source_id: item.sourceId,
      });
  }
}

(async () => {
  for (let source of sources) {
    const parser = new Parser({
      customFields: { item: source.customFields }
    });

    let itemsToInsert = [];

    let feed;
    try {
      feed = await parser.parseURL(source.url);
    } catch (e) {
      console.log(e);
      continue;
    }
    if (feed) {
      feed.items.forEach((item) => {
        let itemToInsert = {};
        itemToInsert.sourceId = source.id;
        itemToInsert.title = item['title'];
        itemToInsert.link = item['link'];
        itemToInsert.pubDate = item['pubDate'];
        let categories = item['categories'];
        if (item['title'].toLowerCase().indexOf('headlines for ') > -1) {
          return
        }

        switch (source.name) {
          case 'theBreach':
            itemToInsert.imageUrl = item.description.match(source.imgSrcRegExp).groups.imageUrl;
            itemToInsert.description = item.description.match(source.descRegExp).groups.description || item.title;

            categories = categories.map((category) => {
              category = category.trim().replace('\n', '').toLowerCase();
              if (source.ignoreTopics.indexOf(category) === -1)
                return category;
            });
            categories = categories.filter((category) => category);

            itemToInsert.categoryPrimary = categories[0];
            itemToInsert.categorySecondary = categories[1];
            itemToInsert.imageAlt = item.title;
            break;

          case 'narwhal':
            if (item.categories[0].trim().replace('\n', '').toLowerCase() === 'inside the narwhal') {
              break;
            }
            itemToInsert.description = item['description'];
            categories = categories.map((category) => {
              category = category.trim().replace('\n', '').toLowerCase();
              if (source.ignoreTopics.indexOf(category) === -1)
                return category;
            });
            categories = categories.filter((category) => category);
            itemToInsert.categoryPrimary = categories[0] || 'Climate Change';
            itemToInsert.categorySecondary = categories[1];

            itemToInsert.imageUrl = '' || item['media:group']['media:content'][0]['$']['url'];
            itemToInsert.imageAlt = item['title'] || item['media:group']['media:description'][0];
            break;

          case 'socialistProject':
            itemToInsert.imageUrl = item['media:content']['$']['url'] || '';
            let desc = item['description'];
            desc = desc.indexOf('&#8230;') === -1 ? desc.substring(0, desc.indexOf('.') + 1) : desc.substring(0, desc.indexOf('&#8230;') - 7) + '...'
            itemToInsert.description = desc.indexOf('&#8230;') === -1 ? desc : desc.replace('&#8230;', '');
            if (categories) {
              categories = categories.map((category) => {
                category = category.trim().replace('\n', '').toLowerCase();
                if (source.ignoreTopics.indexOf(category) === -1)
                  return category;
              });
              categories = categories.filter((category) => category);
              itemToInsert.categoryPrimary = categories[0];
              itemToInsert.categorySecondary = categories[1];
            } else {
              itemToInsert.categoryPrimary = null;
              itemToInsert.categorySecondary = null;
            }
            itemToInsert.imageAlt = item.title;
            break;

          case 'democracyNow':

            itemToInsert.imageUrl = item['content:encoded'].match(source.imgSrcRegExp).groups.imageUrl || '';
            itemToInsert.description = stripHtml(item['description']).result.substring(0, 255);
            itemToInsert.categoryPrimary = 'international';
            itemToInsert.imageAlt = item.title;
            break;

          case 'fixTheNews':
            itemToInsert.imageUrl = item['media:content']['$']['url'] || '';
            itemToInsert.description = item['description'];
            itemToInsert.categoryPrimary = null;
            itemToInsert.categorySecondary = null;
            itemToInsert.imageAlt = item.title;
            break;
        }

        itemsToInsert.push(itemToInsert);
      });

      for (const itemToInsert of itemsToInsert) {
        await insertIntoArticles(itemToInsert);
      }
    }
  }
  process.exit(0);
})();