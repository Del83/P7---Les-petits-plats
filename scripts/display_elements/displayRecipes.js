import { Recipe } from "../create_elements/classe_recipe.js";
import { List } from "../create_elements/classe_List.js";

/* --------------------------------------------------  AFFICHAGE DES RECETTES en programmation fonctionnelle --------------------------------------------------  */

export function displayRecipes(recipes) {
  /** ---------- ELEMENTS DU DOM ---------- */
  const domSectionResult = document.getElementById("result-section"); // section d'affichage des recettes
  let newOb;

  /** ---------- SCRIPT DE LA FONCTION ---------- */
  domSectionResult.innerHTML = ""; // efface les recettes affichées
  recipes.forEach((recipe) => {
    newOb = new Recipe(recipe); // création des recettes
    domSectionResult.appendChild(newOb.createRecipeCard()); // affiche dans le DOM les recettes
  });
  new List().displayList(recipes); // création des listes grâce aux informations des recettes
  return newOb;
}
