import { recipes } from "../data/recipes.js";
import { Recipe } from "../scripts/classe_recipe.js";

/* ---------- Variables ---------- */
let currentRecipes = recipes;
const domSectionResult = document.getElementById("result-section");

/* ---------- Creation des tableaux ---------- */
let recipesList = [];
let ingredientstList = [];
let appliancesList = [];
let ustensilsList = [];

function displayRecipes() {
  currentRecipes.forEach((recipe) => {
    let obRecipe = new Recipe(recipe);
    domSectionResult.appendChild(obRecipe.createRecipeCard());
  });
}

currentRecipes.forEach((recipe) => {
  const inputSearchValue = document.getElementById("searchbar").value;
  const inputSearch = document.getElementById("searchbar");

  if (inputSearchValue != null) {
    console.log("coucou");
  }

  console.log(inputSearchValue);
  inputSearch.addEventListener("input", (e) => {
    const inputSearchContent = e.target.value.toLowerCase();

    if (inputSearchContent.length >= 3) {
      if (
        recipe.name.toLowerCase().includes(inputSearchContent) ||
        recipe.description.toLowerCase().includes(inputSearchContent) ||
        recipe.ingredients.forEach((ingredient) => {
          ingredient.ingredient.toLowerCase().includes(inputSearchContent);
        })
      ) {
        console.log(recipe);
        let obRecipe = new Recipe(recipe);
        console.log({ obRecipe });
        domSectionResult.innerHTML = ""; /** Vide le DOM de la galerie */
        domSectionResult.appendChild(obRecipe.createRecipeCard());
      }
    } else {
      let obRecipee = new Recipe(recipe);

      domSectionResult.appendChild(obRecipee.createRecipeCard());
    }
  });
});

const init = () => {
  displayRecipes();
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

/* console.log(inputSearchContent);
        if (
          recipe.name.toLowerCase().includes(inputSearchContent) ||
          recipe.description.toLowerCase().includes(inputSearchContent) ||
          recipe.ingredients.forEach((ingredient) => {
            ingredient.ingredient.toLowerCase().includes(inputSearchContent);
          })
        ) {
          const newObRecipe = new Recipe(recipe);
          //currentRecipes = newObRecipe;
          domSectionResult.innerHTML = ""; // Vide le DOM de la galerie
          console.log(newObRecipe);
          domSectionResult.appendChild(newObRecipe.createRecipeCard());
        } */
