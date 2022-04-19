import { Recipe } from "./classe_recipe.js";
import { displayRecipes, DisplayTag } from "./classe_displayRecipes.js";
import { recipes } from "../../data/recipes.js";
import { searchParameters } from "../index.js";
import { makeList } from "./classe_makeList.js";

/** -------------------------------------------------- CONSTANTES & VARIABLES -------------------------------------------------- */
let newOb;
let currentOb = [];
const domSectionResult = document.getElementById("result-section");

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
  const inputSearchContent = e.target.value.toLowerCase();
  /** ---------- SCRIPT DE LA FONCTION ---------- */
  if (inputSearchContent.length >= 3) {
    searchParameters.textSearch = "";
    domSectionResult.innerHTML = ""; // Vide le DOM de la galerie
    recipes.filter((element) => {
      const match = findIn(inputSearchContent, element);
      if (match == true) {
        newOb = new Recipe(element);
        console.log(element);
        currentOb.push(element);
        console.log(currentOb);
        domSectionResult.appendChild(newOb.createRecipeCard());
        allTag();
      }
    });
  }
  if (inputSearchContent.length < 3) {
    displayRecipes();
  }

  return newOb, currentOb;
}

export function allTag() {
  const ingredientsListFilter = makeList.makeListIngredient(recipes);
  const appliancesListFilter = makeList.makeListAppliance();
  const ustensilsListFilter = makeList.makeListUstensils();
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
    const testnew = new DisplayTag(tagItem);
    testnew.display(tagItem);
  });
}
