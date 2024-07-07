import { useEffect, useState } from 'react';
import { Api, SourceResponse } from '../../utils/Api.ts';

type SourcesProps = {
  setSourceId: (sourceId?: number) => void;
}

const Sources = ({ setSourceId }: SourcesProps) => {
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
    <div className="font-mono sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid m-auto w-fit">
      {
        sources.map((source: SourceResponse) => {
          return (
            <div onClick={() => setSourceId(source.id)} key={source.id}>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 uppercase">
                {source.source_name}
              </span>
            </div>
          );
        })
      }
    </div>
  );
};

export default Sources;