import { useEffect, useState } from 'react';

import Feed from 'components/Feed.tsx';
import Header from 'components/Header.tsx';

import { Api, ArticleResponse } from 'utils/Api.ts';
import { getSavedItemsFromLocal } from 'utils/LocalStorage.ts';

const SavedItemsPage = () => {
  const [savedArticles, setSavedArticles] = useState<ArticleResponse[]>([]);

  useEffect(() => {
    const getSavedArticles = async () => {
      const savedItems = getSavedItemsFromLocal();

      if (savedItems) {
        const apiObject = new Api('http://localhost:8080');
        const savedArticles = await apiObject.getArticlesByIds(savedItems);
        setSavedArticles(savedArticles);
      } else {
        setSavedArticles([]);
      }
    };
    getSavedArticles();
  }, []);

  return (
    <>
      <section className="sticky top-0 bg-white z-20">
        <Header />

        <section className="container m-auto px-2 text-center md:text-start">
          <h1 className="text-5xl text-saffron py-4">Saved Articles</h1>
        </section>
      </section>

      <main className="container m-auto px-2">
        <Feed articles={ savedArticles } setSavedArticles={ setSavedArticles } />
      </main>
    </>
  );
};

export default SavedItemsPage;
