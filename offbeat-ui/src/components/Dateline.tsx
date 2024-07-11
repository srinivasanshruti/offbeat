import { NavLink } from 'react-router-dom';
import savedImg from 'assets/star.svg';
import recentImg from 'assets/tab-recent.svg';
//import homeImg from 'assets/home.svg';
//import menuImg from 'assets/hamMenu.png'

const Dateline = () => {
  const pubDate = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
  }).format(new Date());
  return (
    <div className="container flex justify-between m-auto mt-3 pb-3 mb-4 border-b-[1px] border-b-timber">{pubDate}
      <nav className="flex items-center w-1/2 justify-end gap-10">
        {/*  <NavLink to="/" className="flex-row flex justify-between gap-1">
          <img src={homeImg} alt="Home"/>Home
        </NavLink>*/}
        <NavLink to="/saved" className="flex-row flex justify-between text-caledon  ">
          <img src={savedImg} alt="Saved"/>Saved
        </NavLink>
        <NavLink to="/recent" className="flex-row flex justify-between gap-1">
          <img src={recentImg} alt="Recent items"/>Recent
        </NavLink>
      </nav>
    </div>
  );
};

export default Dateline;