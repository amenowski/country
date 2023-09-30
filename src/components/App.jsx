import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Countries from "../pages/Countries";
import { CountryProvider } from "../contexts/CountryProvider";

import Country from "./Country";
import { ThemeProvider } from "../contexts/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <CountryProvider>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Countries />} />
            <Route path="/:name" element={<Country />} />
          </Routes>
        </BrowserRouter>
      </CountryProvider>
    </ThemeProvider>
  );
}

export default App;
