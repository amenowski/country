import { useCountry } from "../contexts/CountryProvider";
import { useTheme } from "../contexts/ThemeProvider";
import { AiOutlineSearch } from "react-icons/ai";

function SearchBar() {
  const { isDark } = useTheme();
  const { searchQuery, dispatch } = useCountry();

  function handleSetQuery(e) {
    dispatch({ type: "setQuery", payload: e.target.value });
  }

  return (
    <div className="flex items-center justify-between gap-5 px-12 py-3 bg-lightEl dark:bg-darkEl rounded-md">
      <span>
        <AiOutlineSearch
          size={25}
          style={
            !isDark
              ? { fill: "hsl(209, 23%, 22%)" }
              : { fill: "hsl(0, 0%, 100%)" }
          }
          className="fill-lightEl"
        />
      </span>
      <input
        placeholder="Search for a country..."
        className="min-w-[300px]  border-none outline-none text-xl  text-darkEl bg-lightEl dark:text-lightEl dark:bg-darkEl"
        value={searchQuery}
        onChange={handleSetQuery}
      />
    </div>
  );
}

export default SearchBar;
