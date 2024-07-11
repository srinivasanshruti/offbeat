import { ArticleResponse } from '../../utils/Api.ts';
import ArticleCard from '../Article/ArticleCard.tsx';
import { getRecentItemsFromLocal, getSavedItemsFromLocal, setRecentItemsToLocal, setSavedItemsToLocal } from '../../utils/LocalStorage.ts';
import { useEffect, useState } from 'react';

type FeedProps = {
  articles: ArticleResponse[];
}

const saveToRecent = (id: number) => {
  const recentList = getRecentItemsFromLocal();
  const viewedArticle = id;
  if (recentList) {
    recentList.push(viewedArticle);
    setRecentItemsToLocal(recentList);
  } else {
    setRecentItemsToLocal([viewedArticle]);
  }
};

const saveArticle = (id: number) => {
  let savedList = getSavedItemsFromLocal();
  const savedArticle = id;
  if (savedList) {
    savedList.push(savedArticle);

  } else {
    savedList = [savedArticle];
  }
  setSavedItemsToLocal(savedList);

};

const unSaveArticle = (id: number) => {
  const savedList = getSavedItemsFromLocal();
  if (savedList) {
    const index = savedList.indexOf(id);
    savedList.splice(index, 1);
    setSavedItemsToLocal(savedList);
  }
};

const Feed = ({ articles }: FeedProps) => {
  const [savedArticleList, setSavedArticleList] = useState<number[] | null>([]);
  useEffect(() => {
    setSavedArticleList(getSavedItemsFromLocal());
  }, []);

  return (
    <div className="sm:grid-cols-2 lg:grid-cols-4 grid m-auto gap-8 mt-4">
      {
        articles.map((article: ArticleResponse) => {
          return (
            <ArticleCard
              key={article.id} sourceName={article.source_name} id={article.id}
              title={article.title} image={article.image} imageAlt={article.image_alt_text}
              date={article.pub_date} setSavedArticleList={setSavedArticleList}
              categories={[article.category_primary, article.category_secondary]} unSaveArticle={unSaveArticle}
              link={article.link} addToRecent={saveToRecent} savedList={savedArticleList} saveArticle={saveArticle} />
          );
        })
      }
    </div>
  );
};

export default Feed;