type ArticleCardProps = {
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  link: string;
  date: string;
  categories: string[];
}

const ArticleCard = ({ title, image, imageAlt, link, date, categories }: ArticleCardProps) => {

  const pubDate = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',

  }).format(new Date(date));

  return (
    <>
      <a href={link} target="_blank">
        <div className="max-w-sm m-3 rounded-lg overflow-hidden shadow-lg relative article-card hover:bg-indian-red">
          <img className="w-full" src={image} alt={imageAlt} />
          <div className="px-6 py-4 left-0 bottom-0">
            <div className="font-bold text-xl mb-2">{title}
            </div>
            <p className="text-gray-700 text-s">
              {pubDate}
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
          <span
            className="inline-block bg-jade rounded-full px-3 py-1 text-sm font-semibold text-gray-900 mr-2 mb-2 uppercase">{categories[0]}</span>
            <span
              className="inline-block bg-royal-purple rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 uppercase">{categories[1]}</span>
          </div>
        </div>
      </a>
    </>
  );

};

export default ArticleCard;