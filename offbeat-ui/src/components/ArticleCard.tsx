import { useEffect, useState } from 'react';

import filledStar from 'assets/filled-star.svg';
import star from 'assets/star.svg';

type ArticleCardProps = {
  id: number
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  link: string;
  date: string;
  sourceName?: string;
  categories: string[];
  addToRecent: (articleId: number) => void;
  saveArticle: (articleId: number) => void;
  unSaveArticle: (articleId: number) => void;
  savedList?: number[];
}

const ArticleCard = (
  {
    id,
    title,
    image,
    imageAlt,
    link,
    date,
    categories,
    sourceName,
    addToRecent,
    saveArticle,
    savedList,
    unSaveArticle,
  }: ArticleCardProps) => {
  const [imgSrc, setImgSrc] = useState(star);
  const [saved, setSaved] = useState<boolean>(false);
  const pubDate = new Date(date);
  const dateParts = new Intl.DateTimeFormat('en-CA', { dateStyle: 'full' }).formatToParts(pubDate);
  const dateDict: { [key in Intl.DateTimeFormatPartTypes]?: string } = {};
  dateParts.forEach(part => dateDict[part.type] = part.value);

  const topicPills = [];

  if (categories[0] !== null) {
    topicPills.push(
      <span key={0}
            className="inline-block bg-caledon rounded-full px-2 py-0.5 text-sm text-white mr-2 mb-2 uppercase">
        {categories[0]}
      </span>,
    );
  }
  if (categories[1] !== null) {
    topicPills.push(
      <span key={1}
            className="inline-block bg-caledon rounded-full px-2 py-0.5 text-sm text-white mr-2 mb-2 uppercase">
        {categories[1]}
      </span>,
    );
  }

  useEffect(() => {
    if (savedList && savedList.indexOf(id) > -1) {
      setImgSrc(filledStar);
      setSaved(true);
    }
  }, [savedList, id]);

  return (
    <>
      <div className="max-w-sm h-[28rem] md:h-[29rem] rounded-lg overflow-hidden shadow-lg relative article-card hover:text-indian-red">
        <a href={link} target="_blank" onClick={() => addToRecent(id)}>
          <img className="w-[24rem] h-[13.5rem] object-cover" src={image} alt={imageAlt} />
          <div className="px-6 py-4 left-0 bottom-0">
            <div className="sm:text-[1rem] md:text-xl mb-2 line-clamp-3">{title}
            </div>
            <p className="text-gunmetal text-xs md:text-sm lg:text-sm">
              {dateDict['weekday']}, {dateDict['month']} {dateDict['day']} {dateDict['year']}
            </p>
          </div>
          <div className="px-6 pt-0.5 pb-1">
            {topicPills}
          </div>
        </a>
        <div className="text-gray-700 w- absolute left-4 bottom-3">
          <img src={imgSrc} alt="save icon" onClick={() => {
            if (saved) {
              unSaveArticle(id);
              setSaved(false);
              setImgSrc(star);
            } else {
              saveArticle(id);
              setSaved(true);
              setImgSrc(filledStar);
            }
          }} />

        </div>
        <p className="text-gray-700 text-xs absolute right-4 bottom-3">
          <a href={link} target="_blank">{sourceName}</a>
        </p>
      </div>
    </>
  );
};

export default ArticleCard;