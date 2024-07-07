import { useEffect, useState } from 'react';
import { Api, ArticleResponse } from '../../utils/Api.ts';
import ArticleCard from '../Article/ArticleCard.tsx';

type FeedProps = {
  sourceId?: number
}

const Feed = ({ sourceId }: FeedProps) => {
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
    <main className="font-mono sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid m-auto w-fit">
      {
        articles.map((article: ArticleResponse) => {
          return (
            <ArticleCard
              key={article.id}
              title={article.title} image={article.image} imageAlt={article.image_alt_text}
              date={article.pub_date}
              categories={[article.category_primary, article.category_secondary]}
              link={article.link} />
          );
        })
      }
    </main>
  );
};

export default Feed;