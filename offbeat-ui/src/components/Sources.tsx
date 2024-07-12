import { SourceResponse } from 'utils/Api.ts';

type SourcesProps = {
  sources: SourceResponse[]
  selectedSourceId?: number
  setSelectedSourceId: (sourceId?: number) => void
}

type SourceProps = {
  sourceId: number
  sourceName: string
  setSelectedSourceId: (sourceId?: number) => void
}

const SelectedSource = ({ sourceName, setSelectedSourceId }: SourceProps) => {
  return (
    <div
      className="inline cursor-pointer w-max bg-timber rounded-full px-4 pt-1.5 pb-1 font-semibold text-gray-900 uppercase text-sm md:text-[1rem]"
      onClick={() => setSelectedSourceId(undefined)}>
        {sourceName}
    </div>
  );
};

const UnselectedSource = ({ sourceId, sourceName, setSelectedSourceId }: SourceProps) => {
  return (
    <div
      className="inline cursor-pointer w-max bg-timber shadow-md shadow-gray-400 rounded-full px-4 pt-1.5 pb-1 text-gray-900 uppercase text-sm md:text-[1rem]"
      onClick={() => setSelectedSourceId(sourceId)}>
        {sourceName}
    </div>
  );
};

const Sources = ({ selectedSourceId, setSelectedSourceId, sources }: SourcesProps) => {
  return (
    <div className="w-full m-auto pt-10 pb-10 px-2 overflow-x-auto text-center whitespace-nowrap space-x-2">
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
