import { useEffect, useState } from 'react';

import Header from 'components/Header.tsx';
import Feed from 'components/Feed.tsx';

import { getRecentItemsFromLocal } from 'utils/LocalStorage.ts';
import { Api, ArticleResponse } from 'utils/Api.ts';

const RecentItemsPage = () => {
  const [recentItems, setRecentItems] = useState<number[] | undefined>([]);
  const [recentArticles, setRecentArticles] = useState<ArticleResponse[]>([]);

  useEffect(() => {
    const getRecentArticles = async () => {
      const recentItems = getRecentItemsFromLocal();
      setRecentItems(recentItems);
    };
    getRecentArticles();
  }, []);

  useEffect(() => {
    const fetchRecentArticles = async () => {
      if (recentItems && recentItems.length > 0) {
        const apiObject = new Api('http://localhost:8080');
        const recentArticles = await apiObject.getArticlesByIds(recentItems);
        setRecentArticles(recentArticles);
      } else {
        setRecentArticles([]);
      }
    };
    fetchRecentArticles();
  }, [recentItems]);

  return (
    <>
      <section className="sticky top-0 bg-white z-20">
        <Header />

        <section className="container m-auto px-2 text-center md:text-start">
          <h1 className="text-5xl text-saffron py-4">Recently Viewed</h1>
        </section>
      </section>

      <main className="container m-auto px-2">
        <Feed articles={ recentArticles } />
      </main>
    </>
  );
};

export default RecentItemsPage;