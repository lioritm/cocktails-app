import SearchBar from "../../components/Searchbar/Searchbar";
import AlphabetComp from "../../components/AlphabetComp/AlphabetComp";
import "./style.css";

import { Link } from "react-router-dom";
import CocktailsList from "./CocktailsList";

const CocktailsPage = () => {
  return (
    <section className="page-container">
      <div className="homepage-header flex justify-center">
        <SearchBar />

        <Link className="add-new button" to="/addNew">
          Add new cocktail
        </Link>
      </div>

      <AlphabetComp />
      <CocktailsList />
    </section>
  );
};

export default CocktailsPage;
