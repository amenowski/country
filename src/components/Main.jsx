function Main({ children }) {
  return (
    <main className="w-full min-h-screen m-auto bg-lightBg dark:bg-darkBg">
      <div className="w-[1440px] m-auto">{children}</div>
    </main>
  );
}

export default Main;
