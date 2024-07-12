import { NavLink } from 'react-router-dom';

import logo from 'assets/wordmark.png';

import Dateline from 'components/Dateline.tsx';

const Header = () => {
  return (
    <header>
      <div className="p-4 flex justify-center m-auto w-full bg-indian-red">
        <NavLink to="/home">
          <img alt="Offbeat" src={ logo } className="h-[5rem] md:h-[8rem]" />
        </NavLink>
      </div>
      <Dateline />
    </header>
  );
};

export default Header;
