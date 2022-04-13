import { recipes } from "../data/recipes.js";
import { bubbleSort } from "./bubbleSort.js";

/* ---------- Creation des listes ---------- */
let ingredientstList = [];
let appliancesList = [];
let ustensilsList = [];

/* ---------- Elements du DOM ---------- */
const btnListIngredients = document.getElementById("ingredients-list");
const btnListAppliances = document.getElementById("appliances-list");
const btnListUstensils = document.getElementById("ustensils-list");
const btnIngredients = document.getElementById("ingredients-combobox");
const btnAppliances = document.getElementById("appliances-combobox");
const btnUstensils = document.getElementById("ustensils-combobox");
const inputIngredients = document.getElementById("ingredients-input");
const inputAppliances = document.getElementById("appliances-input");
const inputUstensils = document.getElementById("ustensils-input");

/* ---------- Creation zone de recherche dans chaque liste ---------- */

/* const searchBarIngredients = document.createElement("input");
searchBarIngredients.classList.add("combobox-input");
searchBarIngredients.setAttribute("id", "search-bar-ingredients");
searchBarIngredients.setAttribute("placeholder", "Rechercher un ingrédient");
btnListIngredients.appendChild(searchBarIngredients); */

/* ---------- Création des listes ---------- */
function makeList() {
  for (let i = 0; i < recipes.length; i++) {
    /* ---------- Creation du tableau des ingrédients ---------- */
    const test = recipes[i].ingredients;
    for (let i = 0; i < test.length; i++) {
      ingredientstList.push(test[i].ingredient);
      bubbleSort(ingredientstList);
    }

    /* ---------- Creation du tableau des appareils ---------- */
    appliancesList.push(recipes[i].appliance);
    bubbleSort(appliancesList);

    /* ---------- Creation du tableau des ustensiles ---------- */
    recipes[i].ustensils.some((recipes) => {
      ustensilsList.push(
        recipes.toLowerCase().charAt(0).toUpperCase() + recipes.slice(1)
      );
      bubbleSort(ustensilsList);
    });
  }
}

function displayListBtn() {
  /* ---------- Filtre les tableaux pour retirer les doublons ---------- */
  const ingredientsFilter = [...new Set(ingredientstList)];
  const appliancesFilter = [...new Set(appliancesList)];
  const ustensilsFilter = [...new Set(ustensilsList)];

  //console.log(ingredientsFilter);
  //console.log(appliancesFilter);
  //console.log(ustensilsFilter);

  ingredientstList = ingredientsFilter.join(" ");
  appliancesList = appliancesFilter.join(" ");
  ustensilsList = ustensilsFilter.join(" ");

  //console.log(ingredientstList);

  for (let ingredt of ingredientsFilter) {
    const liIngredient = document.createElement("li");
    liIngredient.setAttribute("id", ingredt);
    liIngredient.classList.add("item-ingredients");
    liIngredient.innerText = ingredt;
    btnListIngredients.appendChild(liIngredient);
  }

  for (let applian of appliancesFilter) {
    const liAppliances = document.createElement("li");
    liAppliances.innerText = applian;
    btnListAppliances.appendChild(liAppliances);
  }

  for (let usten of ustensilsFilter) {
    const liUstensils = document.createElement("li");
    liUstensils.innerText = usten;
    btnListUstensils.appendChild(liUstensils);
  }
}

const itemIngredients = document.querySelectorAll(".item-ingredients");
console.log(itemIngredients);
btnIngredients.addEventListener("click", () => {
  btnListIngredients.classList.toggle("hidden");
  btnIngredients.style.borderRadius = "5px 5px 0 0";
  inputIngredients.style.width = "40.32em";
  inputIngredients.setAttribute("placeholder", "Rechercher un ingrédient");
  inputIngredients.style.opacity = "0.5";
  console.log(itemIngredients);
  for (let item of itemIngredients) {
    item.addEventListener("click", (e) => {});
    console.log(item);
  }
});

btnAppliances.addEventListener("click", () => {
  btnListAppliances.classList.toggle("hidden");
  btnAppliances.style.borderRadius = "5px 5px 0 0";
  inputAppliances.style.width = "40.32em";
  inputAppliances.setAttribute("placeholder", "Rechercher un appareil");
  inputAppliances.style.opacity = "0.5";
});

btnUstensils.addEventListener("click", () => {
  btnListUstensils.classList.toggle("hidden");
  btnUstensils.style.borderRadius = "5px 5px 0 0";
  inputUstensils.style.width = "40.32em";
  inputUstensils.setAttribute("placeholder", "Rechercher un ustensile");
  inputUstensils.style.opacity = "0.5";
});

export const initList = () => {
  makeList();

  displayListBtn();
};
//initList();
