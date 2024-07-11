import { useEffect, useState } from 'react';
import { Api, ArticleResponse } from '../utils/Api.ts';
import { getSavedItemsFromLocal } from '../utils/LocalStorage.ts';
import Header from 'components/Header/Header.tsx';
import Feed from 'components/Feed/Feed.tsx';
import Dateline from 'components/Dateline.tsx';

const RecentItemsPage = () => {
  const [savedArticles, setSavedArticles] = useState<ArticleResponse[]>([]);

  useEffect(() => {
    const getSavedArticles = async () => {
      const localSavedItems = getSavedItemsFromLocal();
      if (localSavedItems) {
        const apiObject = new Api('http://localhost:8080');
        const savedArticleRes = await apiObject.getArticlesByIds(localSavedItems);
        setSavedArticles(savedArticleRes);
      }
    };
    getSavedArticles();
  }, []);

  if (!savedArticles) {
    return (
      <>
        <Header />
        <Dateline/>
        <h1>No saved articles!</h1>
      </>);
  }

  return (
    <>
      <Header />
      <Dateline/>
      <main className="container m-auto">
        <h1 className="text-6xl text-saffron ">Saved Articles</h1>
        <Feed articles={savedArticles} />
      </main>
    </>
  );
};

export default RecentItemsPage;