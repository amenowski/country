import SwitchTheme from "./SwitchTheme";

function Header() {
  return (
    <header className="w-full bg-lightEl dark:bg-darkEl">
      <div className="w-[1440px] min-h-[70px] m-auto flex items-center justify-between">
        <h1 className="text-3xl font-bold text-darkEl dark:text-lightEl">
          Where in the world?
        </h1>
        <SwitchTheme />
      </div>
    </header>
  );
}

export default Header;
