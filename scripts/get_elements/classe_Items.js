import { bubbleSort } from "../compoment/bubbleSort.js";

/* ------------------------------- CLASSE FABRICATION DES LISTES ----------------------- **/
export class Items {
  constructor(recipes) {
    this.recipes = recipes;
  }
  /* ------------------------------- INGREDIENTS ----------------------- **/
  getIngredient() {
    let ingredientsList = [];
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
  getAppliance() {
    let appliancesList = [];
    this.recipes.forEach((recipe) => {
      appliancesList.push(recipe.appliance);
      bubbleSort(appliancesList);
    });
    const appliancesFilter = [...new Set(appliancesList)];
    return appliancesFilter;
  }

  /* ------------------------------- USTENSILES ----------------------- **/

  getUstensils() {
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
