import { createContext, useContext, useEffect, useState } from "react";

const CountryContext = createContext();

function CountryProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [region, setRegion] = useState("All");

  const [countries, setCountries] = useState([]);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const filteredCountires = countries.filter((country) => {
    if (region === "All") {
      return country.name.common
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    }
    if (region !== "All") {
      return (
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase()) &&
        country.region.toLowerCase() === region.toLowerCase()
      );
    }
  });

  const numberFormatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    maximumFractionDigits: 2,
  });

  useEffect(function () {
    async function getCountries() {
      try {
        setIsLoading(true);
        const res = await fetch(`https://restcountries.com/v3.1/all`);
        const data = await res.json();

        setCountries(data);

        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setError("");
      }
    }
    getCountries();
  }, []);

  return (
    <CountryContext.Provider
      value={{
        onSetSearchQuery: setSearchQuery,
        onSetRegion: setRegion,
        countries: filteredCountires,
        numberFormatter,
        isLoading,
        error,
        region,
        searchQuery,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

function useCountry() {
  const context = useContext(CountryContext);
  return context;
}

export { CountryProvider, useCountry };
