export type CocktailsContextType = {
  cocktails: CocktailType[];
  getCocktailById: Function;
  addNewCocktail: Function;
  error: boolean;
  currentChar: string;
  searchTerm: string;
  showLoader: boolean;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setCurrentChar: React.Dispatch<React.SetStateAction<string>>;
};
export type ContextType = {
  children: React.ReactNode;
};
export type CocktailType = {
  idDrink: string;
  strAlcoholic?: string;
  strCategory?: string;
  strDrink: string;
  strDrinkThumb?: string;
  strGlass?: string;
  strIngredient1: string;
  strInstructions: string;
  strMeasure1: string;
};
export type AddCocktailFormType = {
  setAddedCocktail: React.Dispatch<React.SetStateAction<boolean>>;
};
