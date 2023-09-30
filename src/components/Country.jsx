import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import { useCountry } from "../contexts/CountryProvider";

function Country() {
  const [country, setCountry] = useState({});
  const [loading, setLoading] = useState(true);
  const { numberFormatter } = useCountry();
  const { name } = useParams();

  useEffect(() => {
    async function getCountry() {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        const data = await res.json();

        if (data && data[0]) {
          setCountry(data[0]);
          setLoading(false);
        }
      } catch (err) {
        console.error(err.message);
        setLoading(false);
        // Handle the error here, e.g., set an error state
      }
    }
    getCountry();
  }, [name]);

  // Conditional rendering while loading
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <section className="bg-lightBg dark:bg-darkBg min-h-screen">
        <div className="w-[1440px] m-auto py-10 flex flex-col items-start gap-24">
          <Link to={`/`} className="bg-lightEl py-2 px-9 text-xl">
            &larr; Back
          </Link>
          <div className="grid grid-cols-2 gap-28 items-center">
            <img
              className="min-w-full"
              src={country?.flags?.svg || ""}
              alt={`Flags of ${country?.name?.common || ""}`}
            />
            <div className="flex flex-col gap-7">
              <h2 className="text-4xl font-bold text-darkEl dark:text-lightEl">
                {country?.name?.common || ""}
              </h2>
              <div className="grid grid-cols-2">
                <div className="flex flex-col gap-3">
                  <h3 className="font-bold text-xl text-darkEl dark:text-lightEl">
                    Native Name:{" "}
                    <span className="font-normal">
                      {country?.name?.common || ""}
                    </span>
                  </h3>
                  <h3 className="font-bold text-xl text-darkEl dark:text-lightEl">
                    Population:{" "}
                    <span className="font-normal">
                      {numberFormatter.format(country?.population) || ""}
                    </span>
                  </h3>
                  <h3 className="font-bold text-xl text-darkEl dark:text-lightEl">
                    Region:{" "}
                    <span className="font-normal">{country?.region || ""}</span>
                  </h3>
                  <h3 className="font-bold text-xl text-darkEl dark:text-lightEl">
                    Capital:{" "}
                    <span className="font-normal text-darkEl dark:text-lightEl">
                      {country?.capital || ""}
                    </span>
                  </h3>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-bold text-xl text-darkEl dark:text-lightEl">
                    Top Level Domain:{" "}
                    <span className="font-normal">{country?.tld || ""}</span>
                  </h3>
                  <h3 className="font-bold text-xl text-darkEl dark:text-lightEl">
                    Currenncies:{" "}
                    <span className="font-normal">
                      {Object.keys(country.currencies) || ""}
                    </span>
                  </h3>
                  <h3 className="font-bold text-xl text-darkEl dark:text-lightEl">
                    Languages:{" "}
                    <span className="font-normal">
                      {Object.values(country.languages) || ""}
                    </span>
                  </h3>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <h3 className="font-bold text-xl text-darkEl dark:text-lightEl">
                  Borders:{" "}
                </h3>
                <ul className="flex gap-1 text-lg">
                  {country.borders ? (
                    country.borders?.map((border) => {
                      return (
                        <li
                          className="px-6 py-1 shadow-md bg-lightEl dark:bg-darkEl dark:text-lightEl"
                          key={border}
                        >
                          {border}
                        </li>
                      );
                    })
                  ) : (
                    <p>No borders</p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Country;
