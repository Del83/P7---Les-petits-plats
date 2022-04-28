import { recipes } from "../data/recipes.js";
import { displayRecipes } from "./display/displayRecipes.js";
import { initTest } from "./event.js";

export const step = {
  currentTabRecipes: recipes,
  filteredRecipes: recipes,
  searchedRecipes: [],
};

/* ---------- Initialisation ---------- */
const init = () => {
  displayRecipes(recipes);
  initTest();
};
init();
