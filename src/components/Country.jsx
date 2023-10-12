import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import { useCountry } from "../contexts/CountryProvider";

function Country() {
  const { numberFormatter, country, dispatch } = useCountry();
  const { name } = useParams();

  useEffect(
    function () {
      const getCountry = async (name) => {
        dispatch({ type: "loading" });
        try {
          const res = await fetch(
            `https://restcountries.com/v3.1/name/${name}`
          );
          const data = await res.json();

          dispatch({ type: "country/loaded", payload: data[0] });
        } catch (err) {
          dispatch({ type: "rejected", payload: err.message });
        }
      };
      getCountry(name);
    },
    [name, dispatch]
  );

  const {
    flags: { svg: flagsSvg } = {},
    name: { common: commonName } = {},
    population,
    region,
    capital,
    tld,
    currencies = {},
    languages = {},
    borders = [],
  } = country || {};

  const formattedPopulation = numberFormatter.format(population) || "";
  const currenciesKeys = Object.keys(currencies);
  const languagesValues = Object.values(languages);

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
              src={flagsSvg}
              alt={`Flags of ${commonName}`}
            />
            <div className="flex flex-col gap-7">
              <h2 className="text-4xl font-bold text-darkEl dark:text-lightEl">
                {commonName}
              </h2>
              <div className="grid grid-cols-2">
                <div className="flex flex-col gap-3">
                  <h3 className="font-bold text-xl text-darkEl dark:text-lightEl">
                    Native Name:{" "}
                    <span className="font-normal">{commonName}</span>
                  </h3>
                  <h3 className="font-bold text-xl text-darkEl dark:text-lightEl">
                    Population:{" "}
                    <span className="font-normal">{formattedPopulation}</span>
                  </h3>
                  <h3 className="font-bold text-xl text-darkEl dark:text-lightEl">
                    Region: <span className="font-normal">{region}</span>
                  </h3>
                  <h3 className="font-bold text-xl text-darkEl dark:text-lightEl">
                    Capital:{" "}
                    <span className="font-normal text-darkEl dark:text-lightEl">
                      {capital}
                    </span>
                  </h3>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-bold text-xl text-darkEl dark:text-lightEl">
                    Top Level Domain: <span className="font-normal">{tld}</span>
                  </h3>
                  <h3 className="font-bold text-xl text-darkEl dark:text-lightEl">
                    Currenncies:{" "}
                    <span className="font-normal">{currenciesKeys}</span>
                  </h3>
                  <h3 className="font-bold text-xl text-darkEl dark:text-lightEl">
                    Languages:{" "}
                    <span className="font-normal">{languagesValues}</span>
                  </h3>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <h3 className="font-bold text-xl text-darkEl dark:text-lightEl">
                  Borders:{" "}
                </h3>
                <ul className="flex gap-1 text-lg">
                  {borders ? (
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
