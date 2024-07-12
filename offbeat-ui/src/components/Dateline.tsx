import { NavLink } from 'react-router-dom';

import savedImg from 'assets/filled-star.png';
import recentImg from 'assets/tab-recent.svg';

const Dateline = () => {
  const now = new Date();
  const dateParts = new Intl.DateTimeFormat('en-CA', { dateStyle: 'full' }).formatToParts(now);
  const dateDict: { [key in Intl.DateTimeFormatPartTypes]?: string } = {};
  dateParts.forEach(part => dateDict[part.type] = part.value);

  return (
    <div className="container flex justify-between m-auto pt-3.5 pb-3 px-2 items-center bg-white z-50 border-b-[1px] border-b-timber">
      { dateDict['weekday'] }, { dateDict['month'] } { dateDict['day'] } { dateDict['year'] }
      <nav className="flex items-center w-1/2 justify-end gap-3 md:gap-10">
        <NavLink to="/saved"
                 className="flex-row flex justify-between text-caledon font-semibold text-lg items-center hover:border-b-caledon hover:border-b-2">
          <img src={ savedImg } alt="star icon" className="h-[22px]" />Saved
        </NavLink>
        <NavLink to="/recent"
                 className="flex-row flex justify-between text-caledon text-lg font-semibold items-center gap-1 hover:border-b-caledon hover:border-b-2">
          <img src={ recentImg } alt="Recent items" />Recent
        </NavLink>
      </nav>
    </div>
  );
};

export default Dateline;