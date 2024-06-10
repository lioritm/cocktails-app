import React, { useContext } from "react";
import { CocktailsContext } from "../../context/CocktailsContext";
import { Link } from "react-router-dom";
import general from "../../images/general.jpeg";
import Loader from "../../components/Loader/Loader";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import { RESPONSIVE } from "../../consts";

const CocktailsList = () => {
  const { cocktails, error, showLoader } = useContext(CocktailsContext);

  return (
    <>
      {cocktails && cocktails.length > 0 && (
        <div className="general-text">Click on image to see cocktail info:</div>
      )}
      {error && (
        <div className="error-section">
          <div className="error">An error has occured, refresh the page</div>
        </div>
      )}

      {cocktails && cocktails.length > 0 ? (
        <AliceCarousel mouseTracking responsive={RESPONSIVE}>
          {cocktails.map((cocktail) => (
            <Link
              to={`cocktails/${cocktail.idDrink}`}
              className="cocktail-cell"
              key={cocktail.idDrink}
            >
              <img
                className="cocktail-img"
                src={cocktail.strDrinkThumb ? cocktail.strDrinkThumb : general}
                alt={cocktail.strDrink}
                title={cocktail.strDrink}
              />
              <span className="cocktail-name">{cocktail.strDrink}</span>
            </Link>
          ))}
        </AliceCarousel>
      ) : showLoader ? (
        <Loader />
      ) : (
        <div className="not-found">No cocktails were found</div>
      )}
    </>
  );
};

export default CocktailsList;
