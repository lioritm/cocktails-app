import React, { useState, useEffect } from "react";
import {
  CocktailsContextType,
  ContextType,
  CocktailType,
} from "../types/types";
import { getCocktailsFromLocalStorage, useDebounce } from "../utils/utils";
import { getCocktailsByFirstLetterFunc, searchCocktailsFunc } from "../Apis";
import { DEFAULT_CHAR } from "../consts";
export const CocktailsContext = React.createContext<CocktailsContextType>(
  {} as CocktailsContextType
);
const CocktailsProvider = ({ children }: ContextType) => {
  const [cocktails, setCocktails] = useState<CocktailType[]>([]);
  const [addedCocktails, setAddedCocktails] = useState<CocktailType[]>(
    getCocktailsFromLocalStorage()
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);
  const [currentChar, setCurrentChar] = useState(DEFAULT_CHAR);
  const [showLoader, setShowLoader] = useState(false);
  const debouncedValue = useDebounce(searchTerm, 500);

  const getSearchCocktails = React.useCallback(
    async (str: string, action: "search" | "get") => {
      setError(false);
      setShowLoader(true);
      if (action === "get") {
        setCurrentChar(str);
      }
      try {
        const addedWithCharOrSearch = addedCocktails
          ? addedCocktails.filter((added) => {
              return action === "get"
                ? added.strDrink.charAt(0).toLowerCase() === str.toLowerCase()
                : added.strDrink.toLowerCase().includes(str.toLowerCase());
            })
          : [];
        const apiFunc =
          action === "get"
            ? getCocktailsByFirstLetterFunc
            : searchCocktailsFunc;
        const data = await apiFunc(str);
        if (!data.drinks && addedWithCharOrSearch.length === 0) {
          setCocktails(data.drinks);
        } else if (data.drinks && addedWithCharOrSearch) {
          setCocktails([...data.drinks, ...addedWithCharOrSearch]);
        } else if (data.drinks) {
          setCocktails(data.drinks);
        } else {
          setCocktails(addedWithCharOrSearch);
        }
      } catch (error) {
        setError(true);
        console.error(error);
      }
      setShowLoader(false);
    },
    [addedCocktails]
  );

  const getCocktailById = (id: string) => {
    return cocktails.find((cocktail) => cocktail.idDrink === id);
  };
  const addNewCocktail = (cocktail: CocktailType) => {
    const newAddedCocktails = [cocktail, ...addedCocktails];
    setAddedCocktails(newAddedCocktails);
    localStorage.setItem("addedCocktails", JSON.stringify(newAddedCocktails));
    if (
      currentChar.toLowerCase() === cocktail.strDrink.charAt(0).toLowerCase()
    ) {
      const newCocktails = cocktails ? [cocktail, ...cocktails] : [cocktail];
      setCocktails(newCocktails);
    }
  };

  useEffect(() => {
    if (debouncedValue && debouncedValue !== "") {
      getSearchCocktails(debouncedValue, "search");
    } else {
      getSearchCocktails(currentChar, "get");
    }
  }, [debouncedValue, currentChar, getSearchCocktails]);

  return (
    <CocktailsContext.Provider
      value={{
        cocktails,
        showLoader,
        error,
        currentChar,
        searchTerm,
        setCurrentChar,
        setSearchTerm,
        getCocktailById,
        addNewCocktail,
      }}
    >
      {children}
    </CocktailsContext.Provider>
  );
};

export default CocktailsProvider;
