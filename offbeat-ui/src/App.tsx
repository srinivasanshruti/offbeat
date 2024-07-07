import Feed from './components/Feed/Feed.tsx';
import Header from './components/Header/Header.tsx';
import Sources from './components/Sources/Sources.tsx';
import { useState } from 'react';

function App() {
  const [sourceId, setSourceId] = useState<number | undefined>(undefined);

  return (
    <>
      <Header />
      <Sources setSourceId={setSourceId} />
      <Feed sourceId={sourceId} />
    </>
  );
}

export default App;
