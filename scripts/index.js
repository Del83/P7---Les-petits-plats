//import { recipes } from "../data/recipes.js";
//import { Recipe } from "./classe/classe_recipe.js";

import { displayRecipes } from "./classe/classe_displayRecipes.js";
import { allTag } from "./classe/classe_searchIn.js";
import { initTest } from "./event.js";

export const searchParameters = {
  ingredients: [],
  appliances: [],
  ustensils: [],
  textSearch: "",
};

/* ---------- Initialisation ---------- */
const init = () => {
  displayRecipes();
  allTag();
  initTest();
};
init();
