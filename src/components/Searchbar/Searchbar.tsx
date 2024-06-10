import { FormEvent, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { CocktailsContext } from "../../context/CocktailsContext";
import "./style.css";
const SearchBar = () => {
  const { setSearchTerm, searchTerm } = useContext(CocktailsContext);
  const handleOnChange = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length > 0) {
      setSearchTerm(e.currentTarget.value);
    } else {
      setSearchTerm("");
    }
  };
  return (
    <div className="border search-bar" data-testid="search-bar">
      <FaSearch size={20} />
      <input
        type="text"
        value={searchTerm}
        placeholder="Search cocktails"
        onChange={handleOnChange}
      />
    </div>
  );
};

export default SearchBar;
