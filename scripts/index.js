import { recipes } from "../data/recipes.js";
import { displayRecipes } from "./display_elements/displayRecipes.js";
import { addEventListeners } from "./event.js";

export const step = {
  currentTabRecipes: recipes,
  filteredRecipes: recipes,
  searchedRecipes: recipes,
};

/* ---------- Initialisation ---------- */
const init = () => {
  displayRecipes(recipes);
  addEventListeners();
};
init();
