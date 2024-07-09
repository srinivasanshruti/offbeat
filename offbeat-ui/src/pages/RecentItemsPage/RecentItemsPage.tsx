import Header from '../../components/Header/Header.tsx';
import { useEffect, useState } from 'react';
import { getRecentItemsFromLocal } from '../../utils/LocalStorage.ts';
import { Api, ArticleResponse } from '../../utils/Api.ts';
import Feed from '../../components/Feed/Feed.tsx';

const RecentItemsPage = () => {
  const [recentItems, setRecentItems] = useState<number[] | null>(null);
  const [recentArticles, setRecentArticles] = useState<ArticleResponse[]>([]);

  useEffect(() => {
    const getRecentArticles = async () => {
      const apiObject = new Api('http://localhost:8080');
      const localRecentItems = getRecentItemsFromLocal();
      console.log(localRecentItems);
      setRecentItems(localRecentItems);
      if (localRecentItems) {
        console.log(recentItems);

        const recentArticleRes = await apiObject.getArticlesByIds(localRecentItems);
        setRecentArticles(recentArticleRes);
        console.log(recentArticles);
      }
    };
    getRecentArticles();
  }, []);

  if (!recentItems) {
    return (<>
      <Header />

      <h1>No recent articles!</h1>

    </>);
  }

  return (
    <>
      <Header />
      <main className="container m-auto">
        <h1 className="text-6xl text-saffron ">Recently Viewed</h1>
        <Feed articles={recentArticles} />
      </main>
    </>
  );
};

export default RecentItemsPage;