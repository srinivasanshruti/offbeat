const Dateline = () => {
  const pubDate = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
  }).format(new Date());
  return (
    <div className="container m-auto mt-4 mb-4 border-b-2 border-b-peach">{pubDate}
    </div>
  );
};

export default Dateline;