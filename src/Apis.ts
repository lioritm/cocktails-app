const getCocktailsByFirstLetter =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=";
const searchCocktails =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

export const getCocktailsByFirstLetterFunc = async (str: string) => {
  const response = await fetch(`${getCocktailsByFirstLetter}${str}`);
  return response.json();
};
export const searchCocktailsFunc = async (str: string) => {
  const response = await fetch(`${searchCocktails}${str}`);
  return response.json();
};
