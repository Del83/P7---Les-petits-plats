import { recipes } from "../data/recipes.js";
import { Recipe } from "../scripts/classe_recipe.js";

/* ---------- Eléments du DOM ---------- */

const inputSearch = document.getElementById("searchbar");

/* ---------- Creation des tableaux ---------- */
let recipesList = [];
let ingredientstList = [];
let appliancesList = [];
let ustensilsList = [];

const displayRecipes = () => {
  recipes.forEach((recipe) => {
    let obRecipe = new Recipe(recipe);
    const domSectionResult = document.getElementById("result-section");
    domSectionResult.appendChild(obRecipe.createRecipeCard());
  });
};

const searchRecipe = async () => {
  inputSearch.addEventListener("input", (e) => {
    const inputSearchContent = e.target.value.toLowerCase();
    recipes.forEach((recipe) => {
      if (inputSearchContent.length >= 3) {
        if (
          recipe.name.toLowerCase().includes(inputSearchContent) ||
          recipe.description.toLowerCase().includes(inputSearchContent) ||
          recipe.ingredients.forEach((ingredient) => {
            ingredient.ingredient.toLowerCase().includes(inputSearchContent);
          })
        ) {
          console.log(recipe);
        }

        /* {
    this.displayRecipe(recipe);
    searchedArray.push(recipe);
    return searchedArray;
  } */
      }
    });
  });
};

const init = async () => {
  await displayRecipes();
  searchRecipe();
};
init();

/* if(recipe.name.toLowerCase().includes(this.searchInput) || 
recipe.description.toLowerCase().includes(this.searchInput) ||
recipe.ingredients.forEach((ingredient) => {
    ingredient.ingredient.toLowerCase().includes(this.searchInput)
}) || (this.recipeHasIngredients(recipe, true)) && this.recipeHasAppliances(recipe) && this.recipeHasUstensils(recipe)) 
{
    this.displayRecipe(recipe)
    searchedArray.push(recipe)
    return searchedArray
}
}) */
