import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header.tsx';
import Sources from '../../components/Sources/Sources.tsx';
import Feed from '../../components/Feed/Feed.tsx';
import { Api, ArticleResponse, SourceResponse } from '../../utils/Api.ts';
import Dateline from '../../components/Dateline.tsx';

const HomePage = () => {
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
      <Header />
      <Dateline />
      <main className="container m-auto">
        <Sources selectedSourceId={sourceId} setSelectedSourceId={setSourceId} sources={sources} />
        <Feed articles={articles} />
      </main>
    </>
  );
};

export default HomePage;