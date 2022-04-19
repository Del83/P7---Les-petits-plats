import { bubbleSort } from "../compoment/bubbleSort.js";
import { recipes } from "../../data/recipes.js";

/* ------------------------------- CLASSE FABRICATION DES LISTES ----------------------- **/
class MakeList {
  constructor(recipes) {
    this.recipes = recipes;
  }
  /* ------------------------------- INGREDIENTS ----------------------- **/
  makeListIngredient(recipes) {
    const ingredientsList = [];
    this.recipes.forEach((recipe) => {
      recipe.ingredients.forEach((item) =>
        ingredientsList.push(item.ingredient)
      );
      bubbleSort(ingredientsList);
    });
    const ingredientsFilter = [...new Set(ingredientsList)];
    return ingredientsFilter;
  }

  /* ------------------------------- APPAREILS ----------------------- **/
  makeListAppliance(recipes) {
    const appliancesList = [];
    this.recipes.forEach((recipe) => {
      appliancesList.push(recipe.appliance);
      bubbleSort(appliancesList);
    });
    const appliancesFilter = [...new Set(appliancesList)];
    return appliancesFilter;
  }

  /* ------------------------------- USTENSILES ----------------------- **/

  makeListUstensils(recipes) {
    let ustensilsList = [];
    this.recipes.forEach((recipe) => {
      recipe.ustensils.some((recipes) => {
        ustensilsList.push(
          recipes.toLowerCase().charAt(0).toUpperCase() + recipes.slice(1)
        );
        bubbleSort(ustensilsList);
      });
    });
    const ustensilsFilter = [...new Set(ustensilsList)];
    return ustensilsFilter;
  }
}

export const makeList = new MakeList(recipes);
