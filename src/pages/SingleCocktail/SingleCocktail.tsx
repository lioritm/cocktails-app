import React from "react";
import { CocktailType } from "../../types/types";
import general from "../../images/general.jpeg";
const SingleCocktail = (cocktail: CocktailType) => {
  return (
    <>
      {cocktail && (
        <div className="cocktail-wrapper">
          <h1 className="name">{cocktail.strDrink}</h1>
          <div className="info">
            <div className="image">
              <img
                src={cocktail.strDrinkThumb ? cocktail.strDrinkThumb : general}
                alt={cocktail.strDrink}
              />
            </div>

            {cocktail.strAlcoholic && (
              <div className="alcoholic">
                Is Alcohlic:{" "}
                {cocktail.strAlcoholic ? cocktail.strAlcoholic : "unknown"}
              </div>
            )}

            {cocktail.strGlass && (
              <div className="glass">Drink in {cocktail.strGlass} </div>
            )}
            {cocktail.strCategory && (
              <div className="catagories">
                Catagories: {cocktail.strCategory}
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <div className="ingrediat-table">
              <div className="table-col">
                {Object.entries(cocktail).map(([key, value]) => {
                  if (key.indexOf("strMeasure") >= 0 && value) {
                    return <div key={value + key}>{`${value}`}</div>;
                  }
                  return null;
                })}
              </div>

              <div className="table-col ing">
                {Object.entries(cocktail).map(([key, value]) => {
                  if (key.indexOf("strIngredient") >= 0 && value) {
                    return <div key={value + key}>{`${value}`}</div>;
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
          <div className="instructions">
            Instructions: {cocktail.strInstructions}
          </div>
        </div>
      )}
    </>
  );
};

export default SingleCocktail;
