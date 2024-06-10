import React, { useContext } from "react";
import { CocktailsContext } from "../../context/CocktailsContext";
import { generateAlphabet } from "../../utils/utils";
import "./style.css";
const AlphabetComp = () => {
  const { setCurrentChar, currentChar, setSearchTerm } =
    useContext(CocktailsContext);
  return (
    <>
      <div className="general-text">Click to filter cocktails by letter:</div>
      <div className="alphabet">
        {generateAlphabet().map((letter) => (
          <button
            className={`${
              currentChar.toLowerCase() === letter.toLowerCase()
                ? "selected"
                : ""
            }`}
            key={letter}
            onClick={() => {
              setCurrentChar(letter);
              setSearchTerm("");
            }}
          >
            {letter}
          </button>
        ))}
      </div>
    </>
  );
};

export default AlphabetComp;
