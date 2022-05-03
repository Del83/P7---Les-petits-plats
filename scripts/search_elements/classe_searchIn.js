import { recipes } from "../../data/recipes.js";
import { step } from "../index.js";
import { List } from "../create_elements/classe_List.js";
import { Items } from "../get_elements/classe_Items.js";
import { displayRecipes } from "../display_elements/displayRecipes.js";

/* -------------------------------------------------- CLASSE de recherche par type de data -------------------------------------------------- */
export class SearchIn {
  constructor(element, inputSearchContent) {
    this.element = element;
    this.inputSearchContent = inputSearchContent;
  }
  searchInTitle() {
    return this.element.name.toLowerCase().includes(this.inputSearchContent);
  }
  searchInDescription() {
    return this.element.description
      .toLowerCase()
      .includes(this.inputSearchContent);
  }
  searchInIngredients() {
    return this.element.ingredients.some((element) => {
      return (
        element.ingredient.toLowerCase().includes(this.inputSearchContent) ===
        true
      );
    });
  }
  searchInAppliances() {
    return this.element.appliance
      .toLowerCase()
      .includes(this.inputSearchContent);
  }
  searchInUstensils() {
    return this.element.ustensils.some((element) => {
      return element.toLowerCase().includes(this.inputSearchContent);
    });
  }
}

/* -------------------------------------------------- Contrôle de la recherche -------------------------------------------------- */
export function findIn(inputSearchContent, element) {
  const find = new SearchIn(element, inputSearchContent);
  find.searchInTitle();
  find.searchInDescription();
  find.searchInIngredients();

  if (
    find.searchInTitle() ||
    find.searchInDescription() ||
    find.searchInIngredients() == true
  ) {
    return true;
  } else {
    return false;
  }
}

/** -------------------------------------------------- ECOUTE LA BARRE DE RECHERCHE -------------------------------------------------- */

export function listenInput(e) {
  const domSectionResult = document.getElementById("result-section");
  const noResult = document.getElementById("no-result");
  //const inputSearchContent2 = e.target.value.toLowerCase();
  const inputSearchContent = document
    .getElementById("searchbar")
    .value.toLowerCase();
  const arrayTag = Array.from(
    document.getElementById("search-tags").childNodes
  );

  /** ---------- SCRIPT DE LA FONCTION ---------- */
  if (inputSearchContent.length >= 3) {
    step.searchedRecipes = step.filteredRecipes.filter((recipe) => {
      const match = findIn(inputSearchContent, recipe);
      if (match) {
        return recipe;
      }
    });
    if (step.searchedRecipes.length != 0) {
      console.log(step.searchedRecipes);
      domSectionResult.innerHTML = ""; // Vide le DOM de la galerie
      displayRecipes(step.searchedRecipes);
    } else {
      displayRecipes(step.searchedRecipes);
      noResult.classList.remove("hidden");
    }
    step.currentTabRecipes = step.searchedRecipes;
  } else if (inputSearchContent.length < 3 && arrayTag.length === 0) {
    noResult.classList.add("hidden");
    step.currentTabRecipes = recipes;
    step.searchedRecipes = recipes;
    displayRecipes(recipes);
  } else {
    step.searchedRecipes = recipes;
    step.currentTabRecipes = recipes;
    listenTag();
  }
  //return newOb, step.searchedRecipes;
}

/** -------------------------------------------------- ECOUTE DES TAGS SELECTIONNES -------------------------------------------------- */
export function listenTag() {
  const arrayTag = Array.from(
    document.getElementById("search-tags").childNodes
  );

  /** ---------- SCRIPT DE LA FONCTION ---------- */
  if (arrayTag.length != 0) {
    arrayTag.forEach((tag) => {
      console.log("lolololo");
      filterMatch(tag);
    });
    displayRecipes(step.currentTabRecipes);
    //newFiltersList(step.currentTabRecipes);
    step.filteredRecipes = step.currentTabRecipes;
    step.currentTabRecipes = step.searchedRecipes;
  } else {
    step.filteredRecipes = recipes;
    listenInput();
  }
  //return newOb, arrayTag;
}

/** -------------------------------------------------- ECOUTE DES TAGS SELECTIONNES -------------------------------------------------- */
function listenInputList() {
  const inputSearchContent = document
    .getElementById("searchbar")
    .value.toLowerCase();
}

/* -------------------------------------------------- Contrôle de la recherche -------------------------------------------------- */
function filterMatch(tag) {
  const filterType = tag.dataset.category;
  const tagName = tag.dataset.name.toLowerCase();
  switch (filterType) {
    case "ingredients":
      step.currentTabRecipes = step.currentTabRecipes.filter((element) => {
        const match = new SearchIn(element, tagName);
        match.searchInIngredients();
        if (match.searchInIngredients() == true) {
          return true;
        }
      });
      break;
    case "appliances":
      step.currentTabRecipes = step.currentTabRecipes.filter((element) => {
        const match = new SearchIn(element, tagName);
        console.log("bababa");
        match.searchInAppliances();
        if (match.searchInAppliances() == true) {
          return true;
        }
      });
      break;
    case "ustensils":
      step.currentTabRecipes = step.currentTabRecipes.filter((element) => {
        const match = new SearchIn(element, tagName);
        match.searchInUstensils();
        if (match.searchInUstensils() == true) {
          return true;
        }
      });
      break;
  }
}

/* -------------------------------------------------- Contrôle de la recherche -------------------------------------------------- */
function newFiltersList(recipes) {
  const filtersList = new Items(recipes);
  const ingredients = filtersList.getIngredient();
  const appliances = filtersList.getAppliance();
  const ustensils = filtersList.getUstensils();

  const ingredientsDOM = document.getElementById("ingredients-list");
  const appliancesDOM = document.getElementById("appliances-list");
  const ustensilsDOM = document.getElementById("ustensils-list");

  new List(ingredientsDOM, ingredients, "secondary");
  new List(appliancesDOM, appliances, "tertiary");
  new List(ustensilsDOM, ustensils, "quaternary");
}
