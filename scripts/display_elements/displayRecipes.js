import { Recipe } from "../create_elements/classe_recipe.js";
import { displayItems } from "./displayItems.js";

/** -------------------------------------------------- CONSTANTES & VARIABLES -------------------------------------------------- */

let newOb;

/* --------------------------------------------------  AFFICHAGE DES RECETTES en programmation fonctionnelle --------------------------------------------------  */

export function displayRecipes(recipes) {
  const domSectionResult = document.getElementById("result-section");
  domSectionResult.innerHTML = "";
  recipes.forEach((recipe) => {
    newOb = new Recipe(recipe);
    domSectionResult.appendChild(newOb.createRecipeCard());
  });
  displayItems(recipes);
  return newOb;
}

/* export class RecipesDisplay {
  constructor(recipes) {
    this.recipes = recipes;
    this.addRecipes();
  }
  addRecipes() {
    const domSectionResult = document.getElementById("result-section");
    domSectionResult.innerHTML = "";
    this.recipes.forEach((recipe) => {
      let newOb = new Recipe(recipe);
      domSectionResult.appendChild(newOb.createRecipeCard());
    });
  }
} */
