import { Recipe } from "./classe_recipe.js";
import { displayRecipes } from "../display/displayRecipes.js";
import { recipes } from "../../data/recipes.js";
import { step } from "../index.js";
import { Items } from "./classe_Items.js";
import { List } from "./classe_List.js";
//import { listenTag } from "../event.js";

/** -------------------------------------------------- CONSTANTES & VARIABLES -------------------------------------------------- */
let newOb;

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
  /*   searchInAppliances() {
    return this.element.appliance.toLowerCase().includes(this.data);
  }
  searchInUstensils() {
    return this.element.ustensils.some((element) => {
      return element.toLowerCase().includes(this.data);
    });
  } */
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
  const inputSearchContent = e.target.value.toLowerCase();

  /** ---------- SCRIPT DE LA FONCTION ---------- */
  if (inputSearchContent.length >= 3) {
    domSectionResult.innerHTML = ""; // Vide le DOM de la galerie
    step.currentTabRecipes.filter((recipe) => {
      const match = findIn(inputSearchContent, recipe);
      if (match) {
        step.searchedRecipes.push(recipe);
        step.filteredRecipes = step.searchedRecipes;
        //step.searchedRecipes = [];
        console.log(step.filteredRecipes);
        displayRecipes(step.filteredRecipes);
        noResult.classList.add("hidden");
      } else if (match === false) {
        console.log("biboubibouy");
        noResult.classList.remove("hidden");
      }
    });
  } else {
    //noResult.classList.add("hidden");
    displayRecipes(step.currentTabRecipes);
  }
  return newOb, step.searchedRecipes;
}

// retrouver le filter des recipes pour ressortir une liste des recettes triées

/** -------------------------------------------------- ECOUTE DES TAGS SELECTIONNES -------------------------------------------------- */
export function listenTag() {
  const domSectionResult = document.getElementById("result-section");
  const tagBar = document.getElementById("search-tags").childNodes;
  let arrayNameTag = [];
  let arrayTag = [];

  /** ---------- Récupération d'un tableau regroupant les tags selectionnés (nom et élément HTML) ---------- */
  tagBar.forEach((tag) => {
    arrayNameTag.push(tag.dataset.name);
    arrayTag.push(tag);
  });
  /** ---------- SCRIPT DE LA FONCTION ---------- */
  if (arrayNameTag.length != 0) {
    domSectionResult.innerHTML = ""; // Vide le DOM de la galerie

    arrayTag.forEach((tag) => {
      console.log("lolololo");
      step.filteredRecipes = step.filteredRecipes.filter((recipe) => {
        filterMatch(tag);
        step.searchedRecipes.push(recipe);
        step.filteredRecipes = step.currentTabRecipes;
        step.currentTabRecipes = step.searchedRecipes;
        newFiltersList(step.filteredRecipes);
        displayRecipes(step.filteredRecipes);
      });
    });
  } else {
    step.filteredRecipes = recipes;
    //listenInput();
  }
  return newOb, arrayTag;
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
          //console.log("guguguhihihih");
          return true;
        }
      });
      break;
    case "appliances":
      step.currentTabRecipes = step.currentTabRecipes.filter((element) => {
        const match = new SearchIn(element, tagName);
        match.searchInAppliances();
        if (match == true) {
          return true;
        }
      });
      break;
    case "ustensils":
      step.currentTabRecipes = step.currentTabRecipes.filter((element) => {
        const match = new SearchIn(element, tagName);
        match.searchInUstensils();
        if (match == true) {
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

/* -------------------------------------------------- Contrôle de la recherche -------------------------------------------------- */
export function getTag(filter) {
  const newList = new Items(filter);
  const ingredientsListFilter = newList.getIngredient();
  const appliancesListFilter = newList.getAppliance();
  const ustensilsListFilter = newList.getUstensils();
  const allTags = [
    {
      category: "ingredients",
      tags: ingredientsListFilter,
    },
    {
      category: "appliances",
      tags: appliancesListFilter,
    },
    {
      category: "ustensils",
      tags: ustensilsListFilter,
    },
  ];

  allTags.forEach((tagItem) => {
    const newTags = new List(tagItem);
    newTags.createList(tagItem);
  });
}
