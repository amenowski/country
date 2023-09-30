function Nav({ children }) {
  return (
    <nav className="w-full bg-lightBg dark:bg-darkBg">
      <div className="w-[1440px] min-h-[150px] m-auto flex items-center justify-between">
        {children}
      </div>
    </nav>
  );
}

export default Nav;
