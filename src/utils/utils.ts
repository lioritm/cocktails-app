import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);
  return debouncedValue;
};

export const getCocktailsFromLocalStorage = () => {
  let cocktails = localStorage.getItem("addedCocktails");
  if (cocktails) {
    return (cocktails = JSON.parse(
      localStorage.getItem("addedCocktails") || "{}"
    ));
  } else {
    return [];
  }
};
export const generateAlphabet = () => {
  return [...Array(26)].map((_, i) => String.fromCharCode(i + 65));
};
