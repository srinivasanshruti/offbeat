import { useEffect, useState } from 'react';

import moira from 'assets/no-articles.gif';
import arrowSrc from 'assets/back-arrow.svg'

import ArticleCard from 'components/ArticleCard.tsx';

import { ArticleResponse } from 'utils/Api.ts';
import { getRecentItemsFromLocal, getSavedItemsFromLocal, setRecentItemsToLocal, setSavedItemsToLocal } from 'utils/LocalStorage.ts';
import { NavLink } from 'react-router-dom';

type FeedProps = {
  articles: ArticleResponse[];
  setSavedArticles?: (articles: ArticleResponse[]) => void;
}

const EmptyState = () => {
  return (
    <div>
      <img src={ moira } className="w-[24rem] h-[20rem] object-cover giphy-embed" alt="Woman says Oh Dear!"></img>
      <div className="sm:text-[1rem] md:text-xl mt-10 text-gunmetal line-clamp-3">We seem to have no articles to show you!</div>
      <div className="text-xl text-caledon mt-2">
        <NavLink to="/" className="border-b-caledon border-b-[1px] flex align-baseline w-fit">
          <img src={ arrowSrc } alt="back arrow" /> Return to Homepage
        </NavLink>
      </div>
    </div>
  );
};

const Feed = ({ articles, setSavedArticles }: FeedProps) => {
  const [savedArticleList, setSavedArticleList] = useState<number[] | undefined>([]);

  useEffect(() => {
    setSavedArticleList(getSavedItemsFromLocal());
  }, []);

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
    const filteredArticles = articles.filter(function (el) {
      return el.id != id;
    });
    if (setSavedArticles) {
      setSavedArticles(filteredArticles);
    }
    if (savedList) {
      const index = savedList.indexOf(id);
      savedList.splice(index, 1);
      setSavedItemsToLocal(savedList);
    }
  };

  if (!articles || articles.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-8">
      {
        articles.map((article) => {
          return (
            <ArticleCard
              key={ article.id } sourceName={ article.source_name } id={ article.id } title={ article.title }
              image={ article.image } imageAlt={ article.image_alt_text }
              date={ article.pub_date } categories={ [article.category_primary, article.category_secondary] } link={ article.link }
              savedList={ savedArticleList } description={article.description}
              addToRecent={ saveToRecent } saveArticle={ saveArticle } unSaveArticle={ unSaveArticle } />
          );
        })
      }
    </div>
  );
};

export default Feed;