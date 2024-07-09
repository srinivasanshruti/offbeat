import Feed from './components/Feed/Feed.tsx';
import Header from './components/Header/Header.tsx';
import Sources from './components/Sources/Sources.tsx';
import { useEffect, useState } from 'react';
import { Api, SourceResponse } from './utils/Api.ts';
import './App.css';

function App() {
  const [sourceId, setSourceId] = useState<number | undefined>(undefined);
  const [sources, setSources] = useState<SourceResponse[]>([]);

  useEffect(() => {
    const getSources = async () => {
      const apiObject = new Api('http://localhost:8080');
      const sources = await apiObject.getSources();
      setSources(sources);
    };
    getSources();
  }, []);

  return (
    <>
      <Header />
      <Sources selectedSourceId={sourceId} setSelectedSourceId={setSourceId} sources={sources} />
      <Feed sourceId={sourceId} sources={sources} />
    </>
  );
}

export default App;
