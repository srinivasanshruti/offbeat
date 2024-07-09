import { useEffect, useState } from 'react';
import { Api, ArticleResponse, SourceResponse } from '../../utils/Api.ts';
import ArticleCard from '../Article/ArticleCard.tsx';
import { getLocalStorage, setLocalStorage } from '../../utils/LocalStorage.ts';

type FeedProps = {
  sourceId?: number
  sources: SourceResponse[];
}

const saveToRecent = (link: string, title: string) => {
  const recentList = getLocalStorage('recently_viewed');
  const viewedLink = {link: link, title: title};
  if(recentList) {
    recentList.push(viewedLink);
    setLocalStorage('recently_viewed', recentList);
  } else {
    setLocalStorage('recently_viewed', [viewedLink]);
  }
}

const Feed = ({ sourceId, sources }: FeedProps) => {
  const [articles, setArticles] = useState<ArticleResponse[]>([]);
  useEffect(() => {
    const getArticles = async () => {
      const apiObject = new Api('http://localhost:8080');
      const articles = await apiObject.getArticles(sourceId);
      setArticles(articles);
    };
    getArticles();
  }, [sourceId]);

  return (
    <main className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid m-auto w-fit">
      {
        articles.map((article: ArticleResponse) => {
          const sourceName = sources.find(s => s.id === article.source_id)?.source_name;
          return (
            <ArticleCard
              key={article.id} sourceName={sourceName}
              title={article.title} image={article.image} imageAlt={article.image_alt_text}
              date={article.pub_date}
              categories={[article.category_primary, article.category_secondary]}
              link={article.link}  saveToRecent={saveToRecent}/>
          );
        })
      }
    </main>
  );
};

export default Feed;