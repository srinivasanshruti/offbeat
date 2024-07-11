import { SourceResponse } from '../../utils/Api.ts';

type SourcesProps = {
  selectedSourceId?: number
  setSelectedSourceId: (sourceId?: number) => void;
  sources: SourceResponse[];
}

type SourceProps = {
  sourceId: number,
  sourceName: string,
  setSelectedSourceId: (sourceId?: number) => void
}

const SelectedSource = ({ sourceName, setSelectedSourceId }: SourceProps) => {
  return (
    <div onClick={() => setSelectedSourceId(undefined)} className="cursor-pointer">
      <span className="inline-block bg-timber rounded-full px-3 py-1 font-semibold text-gray-900 mr-2 mb-2 uppercase">
        {sourceName}
      </span>
    </div>
  );
};

const UnselectedSource = ({ sourceId, sourceName, setSelectedSourceId }: SourceProps) => {
  return (
    <div onClick={() => setSelectedSourceId(sourceId)} className="cursor-pointer">
      <span className="inline-block bg-timber shadow-md shadow-gray-400 rounded-full px-3 py-1 text-gray-900 mr-2 mb-2 uppercase">
        {sourceName}
      </span>
    </div>
  );
};

const Sources = ({ selectedSourceId, setSelectedSourceId, sources }: SourcesProps) => {
  return (
    <div className="w-full mt-4 flex items-center flex-col md:flex-row md:justify-center md:flex-wrap gap-2 ">
      {
        sources.map((source: SourceResponse) => {
          if (source.id === selectedSourceId) {
            return (
              <SelectedSource key={source.id} sourceId={source.id} sourceName={source.source_name} setSelectedSourceId={setSelectedSourceId} />
            );
          } else {
            return (
              <UnselectedSource key={source.id} sourceId={source.id} sourceName={source.source_name} setSelectedSourceId={setSelectedSourceId} />
            );
          }
        })
      }
    </div>
  );
};

export default Sources;
