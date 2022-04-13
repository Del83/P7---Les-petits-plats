import { recipes } from "../data/recipes.js";
import { Recipe } from "../scripts/classe_recipe.js";
import { initList } from "../scripts/array.js";

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

/* class SearchIn {
  constructor(element, inputSearchContent) {
    this.element = element;
    this.inputSearchContent = inputSearchContent;
  }
  searchInTitle() {
    this.element.name.toLowerCase().includes(this.inputSearchContent);
    return true;
  }

  searchInDescription() {
    this.element.description.toLowerCase().includes(this.inputSearchContent);
    return true;
  }

  searchInIngredients() {
    this.element.ingredients.some((element) => {
      return (
        element.ingredient.toLowerCase().includes(this.inputSearchContent) ===
        true
      );
    });
    return true;
  }
} */

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

/* function findIn(inputSearchContent, element) {
  const findInTitle = new SearchIn(element, inputSearchContent);
  const findInDescription = new SearchIn(element, inputSearchContent);
  const findInIngredients = new SearchIn(element, inputSearchContent);
  if (findInTitle || findInDescription || findInIngredients == true) {
    return true;
  } else {
    return false;
  }
} */

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

/* ---------- Affichage des recettes avec des boucles natives ---------- */
function displayRecipess() {
  for (let i = 0; i < currentRecipes.length; i++) {
    let obRecipe = new Recipe(currentRecipes[i]);
    domSectionResult.appendChild(obRecipe.createRecipeCard());
  }

  inputSearch.addEventListener("input", (e) => {
    const inputSearchContent = e.target.value.toLowerCase();

    if (inputSearchContent.length >= 3) {
      domSectionResult.innerHTML = ""; // Vide le DOM de la galerie

      for (const element of currentRecipes) {
        const match = findIn(inputSearchContent, element);
        if (match == true) {
          let obRecipes = new Recipe(element);
          domSectionResult.appendChild(obRecipes.createRecipeCard());
        }
      }
    }
  });
}

const init = () => {
  initList();
  displayRecipes();
};
init();

/* function displayRecipes() {
  for (let i = 0; i < currentRecipes.length; i++) {
    let obRecipe = new Recipe(currentRecipes[i]);
    domSectionResult.appendChild(obRecipe.createRecipeCard());
  } */
