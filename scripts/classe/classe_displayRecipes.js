import { recipes } from "../../data/recipes.js";
import { Recipe } from "./classe_recipe.js";

/** -------------------------------------------------- CONSTANTES & VARIABLES -------------------------------------------------- */

let newOb;

/* --------------------------------------------------  Affichage des recettes en programmation fonctionnelle --------------------------------------------------  */

function displayRecipes() {
  const domSectionResult = document.getElementById("result-section");
  recipes.forEach((recipe) => {
    newOb = new Recipe(recipe);
    domSectionResult.appendChild(newOb.createRecipeCard());
  });
  return newOb;
}

/* --------------------------------------------------  Affichage des tags --------------------------------------------------  */
class DisplayTag {
  constructor(tagItem) {
    this.tagItem = tagItem;
  }
  display() {
    let tagList = document.getElementById(`${this.tagItem.category}-list`);
    tagList.innerText = "";
    this.tagItem.tags.forEach((tag) => {
      //if (!searchParameters[tagItem.category].includes(tag)) {
      const li = document.createElement("li");
      li.textContent = tag;
      li.classList.add(`${this.tagItem.category}-item`);
      li.setAttribute("data-category", this.tagItem.category);
      li.setAttribute("data-name", tag);
      //li.setAttribute("tabindex", "-1");
      tagList.appendChild(li);
      //}
    });
    return tagList;
  }
}

export { displayRecipes, DisplayTag };
