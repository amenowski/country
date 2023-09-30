import { useCountry } from "../contexts/CountryProvider";
import CountryList from "./CountryList";

function CountriesList() {
  const { countries } = useCountry();

  return (
    <ul className="grid grid-cols-4 gap-16 list-none">
      {countries.map((country) => {
        return <CountryList key={country.name.common} country={country} />;
      })}
    </ul>
  );
}

export default CountriesList;
