import { useEffect } from "react";
import { useTheme } from "../contexts/ThemeProvider";

function SwitchTheme() {
  const { isDark, onSetIsDark } = useTheme();

  function handleChangeTheme() {
    onSetIsDark(!isDark);
  }

  useEffect(
    function () {
      document.documentElement.classList.toggle("dark");
    },
    [isDark]
  );

  return (
    <button
      className="border-none text-xl text-darkEl dark:text-lightEl"
      onClick={handleChangeTheme}
    >
      {!isDark ? "☀️" : "🌙"} DarkMode
    </button>
  );
}

export default SwitchTheme;
