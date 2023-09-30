import CountriesList from "../components/CountriesList";
import Filters from "../components/Filters";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Main from "../components/Main";
import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import { useCountry } from "../contexts/CountryProvider";

function Countries() {
  const { isLoading } = useCountry();

  return (
    <>
      <Header />
      <Main>
        <Nav>
          <SearchBar />
          <Filters />
        </Nav>
        {isLoading && <Loader />}
        {!isLoading && <CountriesList />}
      </Main>
    </>
  );
}

export default Countries;
