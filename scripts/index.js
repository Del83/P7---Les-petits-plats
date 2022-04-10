import { recipes } from "../data/recipes.js";
import { Recipe } from "../scripts/classe_recipe.js";

/* ---------- Variables ---------- */
let currentRecipes = recipes;
const domSectionResult = document.getElementById("result-section");
const inputSearch = document.getElementById("searchbar");

/* ---------- Fonction de recherche par type de data ---------- */
function searchInTitle(element, data) {
  return element.name.toLowerCase().includes(data);
}

function searchInDescription(element, data) {
  return element.description.toLowerCase().includes(data);
}

function searchInIngredients(element, data) {
  return element.ingredients.some((element) => {
    return element.ingredient.toLowerCase().includes(data) === true;
  });
}

/* ---------- Contrôle de le recherche ---------- */
function findIn(inputSearchContent, element) {
  const findInTitle = searchInTitle(element, inputSearchContent);
  const findInDescription = searchInDescription(element, inputSearchContent);
  const findInIngredients = searchInIngredients(element, inputSearchContent);
  if (findInTitle || findInDescription || findInIngredients == true) {
    return true;
  } else {
    return false;
  }
}

/* ---------- Affichage des recettes en programmation fonctionnelle ---------- */
function displayRecipes() {
  currentRecipes.forEach((recipe) => {
    let obRecipe = new Recipe(recipe);
    domSectionResult.appendChild(obRecipe.createRecipeCard());
  });

  inputSearch.addEventListener("input", (e) => {
    const inputSearchContent = e.target.value.toLowerCase();

    if (inputSearchContent.length >= 3) {
      domSectionResult.innerHTML = ""; // Vide le DOM de la galerie
      currentRecipes = recipes.filter((element) => {
        const match = findIn(inputSearchContent, element);
        if (match == true) {
          let obRecipes = new Recipe(element);
          domSectionResult.appendChild(obRecipes.createRecipeCard());
        }
      });
    }
  });
}

const init = () => {
  displayRecipes();
};
init();
