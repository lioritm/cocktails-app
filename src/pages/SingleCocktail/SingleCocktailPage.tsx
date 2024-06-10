import React, { useContext } from "react";
import { CocktailsContext } from "../../context/CocktailsContext";
import { useParams, useNavigate } from "react-router-dom";
import SingleCocktail from "./SingleCocktail";
import "./style.css";

const SingleCocktailPage = () => {
  const { getCocktailById } = useContext(CocktailsContext);
  const navigate = useNavigate();
  const { cocktailId } = useParams();
  const cocktail = getCocktailById(cocktailId);
  const goBack = () => {
    navigate(-1);
  };
  return (
    <section className="page-container">
      {cocktail !== -1 ? (
        <SingleCocktail {...cocktail} />
      ) : (
        <div className="error-section">
          <div className="error">
            An error has occured, please return to homepage and try again
            <button className="back-to-homepage" onClick={goBack}>
              Go back to home page
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SingleCocktailPage;
