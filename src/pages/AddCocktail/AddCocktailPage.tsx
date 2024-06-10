import { useState } from "react";
import AddCocktailForm from "./AddCocktailForm";
import "./style.css";
import { Link } from "react-router-dom";
const AddCocktailPage = () => {
  const [addedCocktail, setAddedCocktail] = useState(false);
  return (
    <section className="page-container">
      {addedCocktail ? (
        <div className="added-message">
          <div className=""> The cocktail was added succesfully</div>
          <Link to="/">Go back to home page</Link>
        </div>
      ) : (
        <AddCocktailForm setAddedCocktail={setAddedCocktail} />
      )}
    </section>
  );
};

export default AddCocktailPage;
