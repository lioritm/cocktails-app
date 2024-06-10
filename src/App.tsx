import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CocktailsProvider from "./context/CocktailsContext";
import CocktailsPage from "./pages/Cocktails/CocktailsPage";
import SingleCocktailPage from "./pages/SingleCocktail/SingleCocktailPage";
import AddCocktailPage from "./pages/AddCocktail/AddCocktailPage";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <CocktailsProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<CocktailsPage />} />
            <Route
              path="cocktails/:cocktailId"
              element={<SingleCocktailPage />}
            />
            <Route path="/addNew" element={<AddCocktailPage />} />
          </Routes>
        </BrowserRouter>
      </CocktailsProvider>
    </>
  );
}

export default App;
