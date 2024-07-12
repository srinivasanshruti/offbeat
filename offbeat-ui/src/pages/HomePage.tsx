import { useEffect, useState } from 'react';

import Header from 'components/Header.tsx';
import Sources from 'components/Sources.tsx';
import Feed from 'components/Feed.tsx';

import { Api, ArticleResponse, SourceResponse } from 'utils/Api.ts';

const HomePage = () => {
  // TODO: Add a loading state
  const [sourceId, setSourceId] = useState<number | undefined>(undefined);
  const [sources, setSources] = useState<SourceResponse[]>([]);
  const [articles, setArticles] = useState<ArticleResponse[]>([]);

  useEffect(() => {
    const getSources = async () => {
      const apiObject = new Api('http://localhost:8080');
      const sources = await apiObject.getSources();
      setSources(sources);
    };
    getSources();
  }, []);

  useEffect(() => {
    const getArticles = async () => {
      const apiObject = new Api('http://localhost:8080');
      const articles = await apiObject.getArticles(sourceId);
      setArticles(articles);
    };
    getArticles();
  }, [sourceId]);

  return (
    <>
      <section className="sticky top-0 bg-white z-20">
        <Header />
        <Sources sources={ sources } selectedSourceId={ sourceId } setSelectedSourceId={ setSourceId } />
      </section>

      <main className="container m-auto px-2">
        <Feed articles={ articles } />
      </main>
    </>
  );
};

export default HomePage;