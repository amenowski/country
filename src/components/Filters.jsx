import { useCountry } from "../contexts/CountryProvider";

function Filters() {
  const { region, onSetRegion } = useCountry();

  function handleSetRegion(e) {
    onSetRegion(e.target.value);
  }

  return (
    <select
      className="px-5 py-3 rounded-md border-none outline-none text-darkEl bg-lightEl dark:text-lightEl dark:bg-darkEl"
      value={region}
      onChange={handleSetRegion}
    >
      <option value="All"> Filters by region</option>
      <option value="Africa">Africa</option>
      <option value="Americas">America</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Ocenia</option>
    </select>
  );
}

export default Filters;
