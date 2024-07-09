import logo from 'assets/wordmark3.png'
const Header = () => {
  return (
    <header className="place-content-center sticky flex flex-col m-auto bg-indian-red">
      <div className="grid place-content-center p-4"><img alt="Offbeat" src={logo}/></div>

    </header>
  );
};

export default Header;