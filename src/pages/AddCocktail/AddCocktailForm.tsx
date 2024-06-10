import React, {
  useState,
  ChangeEvent,
  SyntheticEvent,
  useContext,
} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import { AddCocktailFormType, CocktailType } from "../../types/types";
import { CocktailsContext } from "../../context/CocktailsContext";
import { MAX_INGREDIANT_COUNTER, CATEGORIES } from "../../consts";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
} from "@mui/material";
const AddCocktailForm = ({ setAddedCocktail }: AddCocktailFormType) => {
  const { addNewCocktail } = useContext(CocktailsContext);
  const [formValues, setFormValues] = useState<CocktailType>(
    {} as CocktailType
  );
  const [ingrediantCounter, setIngrediantCounter] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const addIngrediant = () => {
    if (ingrediantCounter < 15) {
      setIngrediantCounter(ingrediantCounter + 1);
    }
  };
  const loadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files![0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener("load", () => {
      const imageSrc = reader.result;
      const values = { strDrinkThumb: imageSrc };
      //@ts-ignore
      setFormValues({ ...formValues, ...values });
    });
  };
  const handleOnChange = (
    e: ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | SelectChangeEvent<any>
    >
  ) => {
    e.preventDefault();
    const unique_id = uuidv4();
    const values = { idDrink: unique_id };
    //@ts-ignore
    values[e.target.name] = e.target.value;
    setFormValues({ ...formValues, ...values });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const unique_id = uuidv4();
    const values = { idDrink: unique_id };
    const newCocktail = { ...formValues, ...values };
    setSubmitted(true);
    if (
      formValues.strDrink &&
      formValues.strIngredient1 &&
      formValues.strMeasure1 &&
      formValues.strInstructions
    ) {
      setSubmitted(false);

      addNewCocktail(newCocktail);
      setFormValues({} as CocktailType);
      setIngrediantCounter(1);
      setAddedCocktail(true);
    }
  };
  return (
    <>
      <h1 className="page-title">Add new cocktail</h1>
      <div className="new-cocktail-form">
        <FormControl>
          <div className="form-row">
            <TextField
              fullWidth
              label="Cocktail Name"
              variant="outlined"
              name="strDrink"
              error={submitted && !formValues.strDrink}
              onChange={handleOnChange}
              helperText={
                submitted && !formValues.strDrink && "Please enter value"
              }
              required
            />
          </div>
          <div className="form-row">
            <RadioGroup
              defaultValue="Alcoholic"
              name="strAlcoholic"
              onChange={handleOnChange}
              row
            >
              <FormControlLabel
                value="Alcoholic"
                control={<Radio />}
                label="Alcoholic"
              />
              <FormControlLabel
                value="Non alcoholic"
                control={<Radio />}
                label="Non alcoholic"
              />
              <FormControlLabel
                value="Optional alcohol"
                control={<Radio />}
                label="Optional alcohol"
              />
            </RadioGroup>
          </div>

          <div className="form-row">
            <FormControl variant="outlined" style={{ width: "100%" }}>
              <InputLabel id="test-select-label">Category</InputLabel>
              <Select
                defaultValue={""}
                fullWidth
                labelId="test-select-label"
                label={"Category"}
                name="strCategory"
                //@ts-ignore
                onChange={handleOnChange}
              >
                {CATEGORIES.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="form-row">
            <TextField
              fullWidth
              label="Glass"
              variant="outlined"
              name="strGlass"
              onChange={handleOnChange}
            />
          </div>
          {Array.from(Array(ingrediantCounter)).map((count, index) => {
            return (
              <div key={`${count}${index}`} className="flex ing-row">
                <TextField
                  label={`Mearurement${index + 1}`}
                  variant="outlined"
                  name={`strMeasure${index + 1}`}
                  required={index === 0}
                  onChange={handleOnChange}
                  error={submitted && !formValues.strMeasure1 && index === 0}
                  helperText={
                    submitted && !formValues.strMeasure1 && "Please enter value"
                  }
                />
                <TextField
                  label={`Ingredient${index + 1}`}
                  variant="outlined"
                  name={`strIngredient${index + 1}`}
                  required={index === 0}
                  onChange={handleOnChange}
                  className="ingredient"
                  error={submitted && !formValues.strIngredient1 && index === 0}
                  helperText={
                    submitted &&
                    !formValues.strIngredient1 &&
                    "Please enter value"
                  }
                />
              </div>
            );
          })}
          {ingrediantCounter < MAX_INGREDIANT_COUNTER && (
            <Button
              variant="outlined"
              className="add-ing button"
              onClick={addIngrediant}
            >
              + Add ingrediant
            </Button>
          )}
          <div className="form-row">
            <TextField
              fullWidth
              label="Instructions"
              variant="outlined"
              name="strInstructions"
              required
              onChange={handleOnChange}
              multiline
              error={submitted && !formValues.strInstructions}
              helperText={
                submitted && !formValues.strInstructions && "Please enter value"
              }
            />
          </div>
          <div className="form-row">
            <input
              type="file"
              id="image"
              name="strDrinkThumb"
              onChange={loadImage}
              accept="image/png, image/jpeg"
            />
          </div>

          <Button variant="contained" size="medium" onClick={handleSubmit}>
            Submit
          </Button>
        </FormControl>
      </div>
    </>
  );
};

export default AddCocktailForm;
