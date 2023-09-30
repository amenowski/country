import { Link } from "react-router-dom";
import { useCountry } from "../contexts/CountryProvider";

function CountryList({ country }) {
  const { numberFormatter } = useCountry();

  return (
    <li>
      <Link to={`${country.name.common}`}>
        <img
          className="aspect-video min-w-full"
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
        />
        <div className="px-4 py-6 bg-lightEl dark:bg-darkEl">
          <h2 className="font-bold text-2xl mb-5 dark:text-lightEl ">
            {country.name.common}
          </h2>
          <ul className="flex flex-col gap-2">
            <li className="font-bold dark:text-lightEl">
              Population:{" "}
              <span className="font-normal">
                {numberFormatter.format(country?.population)}
              </span>
            </li>
            <li className="font-bold dark:text-lightEl">
              Region: <span className="font-normal">{country.region}</span>
            </li>
            <li className="font-bold dark:text-lightEl">
              Capital: <span className="font-normal">{country.capital}</span>
            </li>
          </ul>
        </div>
      </Link>
    </li>
  );
}

export default CountryList;
