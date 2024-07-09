type ArticleCardProps = {
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  link: string;
  date: string;
  sourceName?: string;
  categories: string[];
  saveToRecent: (link: string, title: string) => void;
}

const ArticleCard = ({ title, image, imageAlt, link, date, categories, sourceName, saveToRecent }: ArticleCardProps) => {

  const pubDate = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',

  }).format(new Date(date));
  const topicPills = [];
  if (categories[0] !== null) {
    topicPills.push(<span key={0}
                          className="inline-block bg-orange rounded-full px-3 py-1 text-sm font-semibold text-gray-900 mr-2 mb-2 uppercase">{categories[0]}</span>);
  }
  if (categories[1] !== null) {
    topicPills.push(<span key={1}
                          className="inline-block bg-caledon rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 uppercase">{categories[1]}</span>);
  }

  return (
    <>
      <a href={link} target="_blank" onClick={()=> saveToRecent(link, title)}>
        <div className="max-w-sm h-[29rem] m-3 rounded-lg overflow-hidden shadow-lg relative article-card hover:text-indian-red">
          <img className="w-[24rem] h-[13.5rem] object-cover" src={image} alt={imageAlt} />
          <div className="px-6 py-4 left-0 bottom-0">
            <div className="font-bold  text-xl mb-2 line-clamp-3">{title}
            </div>
            <p className="text-gray-700 text-s">
              {pubDate}
            </p>
          </div>
          <div className="px-6 pt-3 pb-1">
            {topicPills}
          </div>
          <p className="text-gray-700 text-xs absolute right-4 bottom-4">
            {sourceName}
          </p>

        </div>
      </a>
    </>
  );

};

export default ArticleCard;