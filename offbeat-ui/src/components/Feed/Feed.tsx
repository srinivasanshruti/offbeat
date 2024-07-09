import { ArticleResponse } from '../../utils/Api.ts';
import ArticleCard from '../Article/ArticleCard.tsx';
import { getRecentItemsFromLocal, setRecentItemsToLocal } from '../../utils/LocalStorage.ts';

type FeedProps = {
  articles: ArticleResponse[];
}

const saveToRecent = (id: number) => {
  const recentList = getRecentItemsFromLocal();
  const viewedArticle = id;
  if (recentList) {
    recentList.push(viewedArticle);
    setRecentItemsToLocal(recentList);
  } else {
    setRecentItemsToLocal([viewedArticle]);
  }
};

const Feed = ({ articles }: FeedProps) => {

  return (
    <div className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid m-auto w-fit">
      {
        articles.map((article: ArticleResponse) => {
          return (
            <ArticleCard
              key={article.id} sourceName={article.source_name} id={article.id}
              title={article.title} image={article.image} imageAlt={article.image_alt_text}
              date={article.pub_date}
              categories={[article.category_primary, article.category_secondary]}
              link={article.link} saveToRecent={saveToRecent} />
          );
        })
      }
    </div>
  );
};

export default Feed;