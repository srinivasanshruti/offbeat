import { useEffect, useState } from 'react';

import { Api, TopicResponse } from 'utils/Api.ts';

const Topics = () => {
  const [topics, setTopics] = useState<TopicResponse[]>([]);

  useEffect(() => {
    const getTopics = async () => {
      const apiObject = new Api('http://localhost:8080');
      const topics = await apiObject.getTopics();
      setTopics(topics);
    };
    getTopics();
  }, []);

  return (
    <div className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid m-auto w-fit">
      {
        topics.map((topic: TopicResponse) => {
          return (
            <div>

          <span
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 uppercase">{topic.category}</span>
          </div>
          );
        })
      }
    </div>
  );
};

export default Topics;
