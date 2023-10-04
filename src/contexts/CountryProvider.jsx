import { createContext, useContext, useEffect, useReducer } from "react";

const CountryContext = createContext();

const initialState = {
  countries: [],
  country: {},
  searchQuery: "",
  region: "All",
  error: "",
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "setQuery": {
      return {
        ...state,
        searchQuery: action.payload,
      };
    }
    case "setRegion": {
      return {
        ...state,
        region: action.payload,
      };
    }
    case "loading": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "countries/loaded": {
      return {
        ...state,
        isLoading: false,
        countries: action.payload,
      };
    }
    case "country/loaded": {
      return {
        ...state,
        isLoading: false,
        country: action.payload,
      };
    }
    case "rejected": {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    default:
      throw new Error("Unknown action type");
  }
}

function CountryProvider({ children }) {
  const [
    { countries, country, searchQuery, region, error, isLoading },
    dispatch,
  ] = useReducer(reducer, initialState);

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
    dispatch({ type: "loading" });
    async function getCountries() {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/all`);
        const data = await res.json();

        dispatch({ type: "countries/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "rejected", payload: err.message });
      }
    }
    getCountries();
  }, []);

  async function getCountry(name) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
      const data = await res.json();

      dispatch({ type: "country/loaded", payload: data[0] });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  return (
    <CountryContext.Provider
      value={{
        countries: filteredCountires,
        dispatch,
        getCountry,
        country,
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
