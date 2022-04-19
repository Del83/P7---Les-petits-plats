import { recipes } from "../data/recipes.js";
import { Recipe } from "./classe/classe_recipe.js";

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

export function makeArray() {
  for (let i = 0; i < recipes.length; i++) {
    const test = recipes[i].ingredients;
    for (let i = 0; i < test.length; i++) {
      ingredientstList.push(test[i].ingredient);
      bubbleSort(ingredientstList);
    }
  }
}

export function makeArrayy() {
  for (let i = 0; i < recipes.length; i++) {
    appliancesList.push(recipes[i].appliance);
    bubbleSort(appliancesList);
  }
}

export function makeArrayyy() {
  for (let i = 0; i < recipes.length; i++) {
    recipes[i].ustensils.some((recipes) => {
      ustensilsList.push(
        recipes.toLowerCase().charAt(0).toUpperCase() + recipes.slice(1)
      );
      bubbleSort(ustensilsList);
    });
  }
}

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

import { recipes } from "../data/recipes.js";
import { bubbleSort } from "./compoment/bubbleSort.js";

/* ---------- Creation d'un tableau pour les élements "elementList" ---------- */
let ingredientstList = [];
let appliancesList = [];
let ustensilsList = [];

/* ---------- Creation d'un tableau pour les élements filtrés "elementListFilter" ---------- */
let ingredientsFilter = [];
let appliancesFilter = [];
let ustensilsFilter = [];

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

/* ---------- Placeholder des inputs des listes ---------- */
const phIngredients = "Rechercher un ingrédient";
const phAppliances = "Rechercher un appareil";
const phUstensils = "Rechercher un ustensile";

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

class ListenListBtn {
  constructeur(elementListFilter, elementList, element) {
    this.elementListFilter = elementListFilter;
    this.elementList = elementList;
    this.element = element;
  }
}

const listenIngredients = new ListenListBtn(
  ingredientsFilter,
  ingredientstList
);
const listenAppliances = new ListenListBtn(appliancesFilter, appliancesList);
const listenUstensils = new ListenListBtn(ustensilsFilter, ustensilsList);

function displayListBtn() {
  /* ---------- Filtre les tableaux pour retirer les doublons ---------- */
  ingredientsFilter = [...new Set(ingredientstList)];
  appliancesFilter = [...new Set(appliancesList)];
  ustensilsFilter = [...new Set(ustensilsList)];

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

/* ---------- Filtre les tableaux pour retirer les doublons ---------- */
const ingredientsFilter = [...new Set(ingredientstList)];
const appliancesFilter = [...new Set(appliancesList)];
const ustensilsFilter = [...new Set(ustensilsList)];

ingredientstList = ingredientsFilter.join(" ");
appliancesList = appliancesFilter.join(" ");
ustensilsList = ustensilsFilter.join(" ");

class ListenListBtn {
  constructeur(
    elementListFilter,
    elementList,
    element,
    listElement,
    phElement,
    btnElement
  ) {
    this.elementListFilter = elementListFilter;
    this.elementList = elementList;
    this.element = element;
    this.listElement = listElement;
    this.phElement = phElement;
    this.btnElement = btnElement;
  }
}

const listenIngredients = new ListenListBtn(
  ingredientsFilter,
  ingredientstList
);
const listenAppliances = new ListenListBtn(appliancesFilter, appliancesList);
const listenUstensils = new ListenListBtn(ustensilsFilter, ustensilsList);

/* ---------- Filtre les tableaux pour retirer les doublons ---------- */

const displayListBtn = (ListenListBtn) => {
  const liElement = document.createElement("li");
  liElement.setAttribute("id", element);
  liElement.classList.add("item");
  liElement.innerText = element;
  ListenListBtn.listElement.appendChild(liElement);
};

/* const createList = (elementListFilter) => {
  for (let element of elementListFilter) {
    displayListBtn(listenIngredients);
    displayListBtn(listenAppliances);
    displayListBtn(listenUstensils);
  }
}; */

for (let element of ingredientsFilter) {
  displayListBtn(listenIngredients);
  //displayListBtn(listenAppliances);
  //displayListBtn(listenUstensils);
}

//createList(ingredientsFilter);
//createList(ingredientsFilter);
//createList(ingredientsFilter);

import { recipes } from "../data/recipes.js";
import { bubbleSort } from "./compoment/bubbleSort.js";

/* ---------- Creation d'un tableau pour les élements "elementList" ---------- */
let ingredientsList = [];
let appliancesList = [];
let ustensilsList = [];

/* ---------- Creation d'un tableau pour les élements filtrés "elementListFilter" ---------- */
/* const ingredientsFilter = [];
const appliancesFilter = [];
const ustensilsFilter = []; */

/* ---------- DOM - liste des élements des boutons "listElement" ---------- */
const btnListIngredients = document.getElementById("ingredients-list");
const btnListAppliances = document.getElementById("appliances-list");
const btnListUstensils = document.getElementById("ustensils-list");

/* ---------- DOM - Boutons des catégories d'éléments "btnElement" ---------- */
const btnIngredients = document.getElementById("ingredients-combobox");
const btnAppliances = document.getElementById("appliances-combobox");
const btnUstensils = document.getElementById("ustensils-combobox");

/* ---------- DOM - Input des boutons "listElement" ---------- */
const inputIngredients = document.getElementById("ingredients-input");
const inputAppliances = document.getElementById("appliances-input");
const inputUstensils = document.getElementById("ustensils-input");

/* ---------- Placeholder des inputs des listes "phElement" ---------- */
const phIngredients = "Rechercher un ingrédient";
const phAppliances = "Rechercher un appareil";
const phUstensils = "Rechercher un ustensile";

/* ---------- Création des listes ---------- */
function makeList() {
  for (let i = 0; i < recipes.length; i++) {
    /* ---------- Creation du tableau des ingrédients ---------- */
    const test = recipes[i].ingredients;
    for (let i = 0; i < test.length; i++) {
      ingredientsList.push(test[i].ingredient);
      bubbleSort(ingredientsList);
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
  const ingredientsFilter = [...new Set(ingredientsList)];
  const appliancesFilter = [...new Set(appliancesList)];
  const ustensilsFilter = [...new Set(ustensilsList)];

  //console.log(ingredientsFilter);
  //console.log(appliancesFilter);
  //console.log(ustensilsFilter);

  ingredientsList = ingredientsFilter.join(" ");
  appliancesList = appliancesFilter.join(" ");
  ustensilsList = ustensilsFilter.join(" ");

  //console.log(ingredientsList);

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
  //filterList()
};

//initList();

function makeList() {
  recipes.forEach((recipe) => {
    const rIng = recipe.ingredients;
    for (let i = 0; i < rIng.length; i++) {
      ingredientsList.push(rIng[i].ingredient);
      bubbleSort(ingredientsList);
    }

    appliancesList.push(recipe.appliance);
    bubbleSort(appliancesList);

    recipe.ustensils.some((recipes) => {
      ustensilsList.push(
        recipes.toLowerCase().charAt(0).toUpperCase() + recipes.slice(1)
      );
      bubbleSort(ustensilsList);
    });
  });
}

function displayListBtn() {
  /* ---------- Filtre les tableaux pour retirer les doublons ---------- */
  //const ingredientsFilter = [...new Set(ingredientsList)];
  //const appliancesFilter = [...new Set(appliancesList)];
  //const ustensilsFilter = [...new Set(ustensilsList)];
  //console.log(ingredientsFilter);
  //console.log(appliancesFilter);
  //console.log(ustensilsFilter);

  //ingredientsList = ingredientsFilter.join(" ");
  //appliancesList = appliancesFilter.join(" ");
  //ustensilsList = ustensilsFilter.join(" ");

  //console.log(ingredientsList);

  /* for (let element of ingredientsFilter) {
    const liIngredient = document.createElement("li");
    liIngredient.setAttribute("id", element);
    liIngredient.classList.add("item-ingredients");
    liIngredient.innerText = element;
    btnListIngredients.appendChild(liIngredient);
  } */

  for (let element of appliancesFilter) {
    const liAppliances = document.createElement("li");
    liAppliances.innerText = element;
    btnListAppliances.appendChild(liAppliances);
  }

  for (let element of ustensilsFilter) {
    const liUstensils = document.createElement("li");
    liUstensils.innerText = element;
    btnListUstensils.appendChild(liUstensils);
  }
}

const itemIngredients = document.querySelectorAll(".item-ingredients");
console.log(itemIngredients);
const btnIngredients = document.getElementById("ingredients-combobox");
const inputIngredients = document.getElementById("ingredients-input");
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

const btnAppliances = document.getElementById("appliances-combobox");
const inputAppliances = document.getElementById("appliances-input");
btnAppliances.addEventListener("click", () => {
  btnListAppliances.classList.toggle("hidden");
  btnAppliances.style.borderRadius = "5px 5px 0 0";
  inputAppliances.style.width = "40.32em";
  inputAppliances.setAttribute("placeholder", "Rechercher un appareil");
  inputAppliances.style.opacity = "0.5";
});

const btnUstensils = document.getElementById("ustensils-combobox");
const inputUstensils = document.getElementById("ustensils-input");
btnUstensils.addEventListener("click", () => {
  btnListUstensils.classList.toggle("hidden");
  btnUstensils.style.borderRadius = "5px 5px 0 0";
  inputUstensils.style.width = "40.32em";
  inputUstensils.setAttribute("placeholder", "Rechercher un ustensile");
  inputUstensils.style.opacity = "0.5";
});

/* ---------- Affichage des recettes en programmation fonctionnelle ---------- */
/* function displayRecipes() {
  const inputSearch = document.getElementById("searchbar");
  inputSearch.addEventListener("input", (e) => {
    const inputSearchContent = e.target.value.toLowerCase();

    if (inputSearchContent.length >= 3) {
      domSectionResult.innerHTML = ""; // Vide le DOM de la galerie
      recipes.filter((element) => {
        const match = findIn(inputSearchContent, element);
        if (match == true) {
          let obRecipes = new Recipe(element);
          domSectionResult.appendChild(obRecipes.createRecipeCard());
        }
      });
    }
  });
} */

class MakeListt {
  constructor(
    btnIngredient,
    btnListIngredient,
    inputIngredient,
    chevronIngredients,
    categorie
  ) {
    this.btnIngredient = btnIngredient;
    this.btnListIngredient = btnListIngredient;
    this.inputIngredient = inputIngredient;
    this.chevronIngredient = chevronIngredients;
    this.categorie = categorie;
  }
  make() {
    this.btnListIngredient.classList.toggle("hidden");
    this.btnIngredient.style.borderRadius = "5px 5px 0 0";
    this.inputIngredient.style.width = "40.32em";
    this.inputIngredient.setAttribute(
      "placeholder",
      "Rechercher un " + this.categorie
    );
    this.inputIngredient.style.opacity = "0.5";
    console.log("bobobobo");
    this.chevronIngredients.style = ("transform", "rotate(180deg)");
    this.chevronIngredients.classList.add("chevronUp");
  }
}
const makeListIng = new MakeListt(
  btnIngredients,
  btnListIngredients,
  inputIngredients,
  chevronIngredient,
  "ingredient"
);
btnIngredients.addEventListener("click", () => {
  makeListIng.make();
});

/* --------------------- SEPARATION DES CLASSES ---------------- **/

class MakeList {
  constructor(recipes) {
    this.recipes = recipes;
  }
  makeListIngredient() {
    let ingredientsList = [];
    const btnListIngredients = document.getElementById("ingredients-list");
    const btnIngredients = document.getElementById("ingredients-combobox");
    const inputIngredients = document.getElementById("ingredients-input");
    const chevronIngredient = document.getElementById("ingredients-btn");
    const comboBoxInput = document.querySelector("combobox-input");
    const tagContainer = document.getElementById("search-tags");

    this.recipes.forEach((recipe) => {
      const rIng = recipe.ingredients;
      for (let i = 0; i < rIng.length; i++) {
        ingredientsList.push(rIng[i].ingredient);
        bubbleSort(ingredientsList);
      }
    });

    const ingredientsFilter = [...new Set(ingredientsList)];

    for (let element of ingredientsFilter) {
      const liIngredient = document.createElement("li");
      liIngredient.setAttribute("id", element);
      liIngredient.classList.add("item-ingredients");
      liIngredient.innerText = element;
      btnListIngredients.appendChild(liIngredient);
    }

    //console.log(iconsListChevron);
    btnIngredients.addEventListener("click", () => {
      btnListIngredients.classList.toggle("hidden");
      btnIngredients.style.borderRadius = "5px 5px 0 0";
      inputIngredients.classList.add("open-list");
      //inputIngredients.style.width = "40.32em";
      inputIngredients.setAttribute("placeholder", "Rechercher un ingrédient");
      //inputIngredients.style.opacity = "0.5";
      console.log(chevronIngredient);
      chevronIngredient.classList.add("chevronUp");
      //chevronIngredient.style.transform = "rotate(180deg)";
    });

    const itemIngredients = document.querySelectorAll(".item-ingredients");
    for (let item of itemIngredients) {
      item.addEventListener("click", (e) => {
        e.preventDefault;
        btnListIngredients.classList.toggle("hidden");
        console.log(e.target.innerText);
        const tagIngredient = document.createElement("span");
        tagIngredient.classList.add("tag");
        tagIngredient.classList.add("tag-btn");
        tagIngredient.classList.add("ingredients-tag");
        tagIngredient.innerText = e.target.innerText;
        tagContainer.appendChild(tagIngredient);
      });
    }

    const iconsList = document.querySelectorAll(".combobox-btn");

    chevronIngredient.addEventListener("click", () => {
      if (chevronIngredient.classList.contains("chevronUp") == true) {
        console.log("bisou");
        chevronIngredient.classList.remove("chevronUp");
        chevronIngredient.classList.add("chevronDown");
        inputIngredients.classList.add("closeList");
        inputIngredients.removeAttribute(
          "placeholder",
          "Rechercher un ingrédient"
        );
        inputIngredients.setAttribute("placeholder", "Ingrédients");
        inputIngredients.style.width = "min-content";
        btnIngredients.classList.add("border-radius");
        btnIngredients.style.borderRadius = "5px";
        //btnIngredients.style.backgroundColor = "black";
      }

      console.log("balou");
      //console.log(btnIngredients);
    });

    return ingredientsList;
  }

  makeListAppliance() {
    const btnListAppliances = document.getElementById("appliances-list");
    let appliancesList = [];
    this.recipes.forEach((recipe) => {
      appliancesList.push(recipe.appliance);
      bubbleSort(appliancesList);
    });
    const appliancesFilter = [...new Set(appliancesList)];
    for (let element of appliancesFilter) {
      const liAppliances = document.createElement("li");
      liAppliances.setAttribute("id", element);
      liAppliances.classList.add("item-appliances");
      liAppliances.innerText = element;
      btnListAppliances.appendChild(liAppliances);
    }
    const btnAppliances = document.getElementById("appliances-combobox");
    const inputAppliances = document.getElementById("appliances-input");
    const itemAppliances = document.querySelectorAll(".item-appliances");
    const tagContainer = document.getElementById("search-tags");

    btnAppliances.addEventListener("click", () => {
      btnListAppliances.classList.toggle("hidden");
      btnAppliances.style.borderRadius = "5px 5px 0 0";
      inputAppliances.style.width = "40.32em";
      inputAppliances.setAttribute("placeholder", "Rechercher un appareil");
      inputAppliances.style.opacity = "0.5";
    });

    for (let item of itemAppliances) {
      item.addEventListener("click", (e) => {
        console.log(e.target.innerText);
        btnListAppliances.classList.toggle("hidden");
        const tagAppliances = document.createElement("span");
        tagAppliances.classList.add("tag");
        tagAppliances.classList.add("tag-btn");
        tagAppliances.classList.add("appliances-tag");
        tagAppliances.innerText = e.target.innerText;
        tagContainer.appendChild(tagAppliances);
      });
    }

    return appliancesList;
  }

  makeListUstensils() {
    const btnListUstensils = document.getElementById("ustensils-list");
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
    for (let element of ustensilsFilter) {
      const liUstensils = document.createElement("li");
      liUstensils.setAttribute("id", element);
      liUstensils.classList.add("item-ustensils");
      liUstensils.innerText = element;
      btnListUstensils.appendChild(liUstensils);
    }
    const btnUstensils = document.getElementById("ustensils-combobox");
    const inputUstensils = document.getElementById("ustensils-input");
    const itemUstensils = document.querySelectorAll(".item-ustensils");
    const tagContainer = document.getElementById("search-tags");

    btnUstensils.addEventListener("click", () => {
      btnListUstensils.classList.toggle("hidden");
      btnUstensils.style.borderRadius = "5px 5px 0 0";
      inputUstensils.style.width = "40.32em";
      inputUstensils.setAttribute("placeholder", "Rechercher un ustensile");
      inputUstensils.style.opacity = "0.5";
    });

    for (let item of itemUstensils) {
      item.addEventListener("click", (e) => {
        btnListUstensils.classList.toggle("hidden");
        console.log(e.target.innerText);
        const tagUstensils = document.createElement("span");
        tagUstensils.classList.add("tag");
        tagUstensils.classList.add("tag-btn");
        tagUstensils.classList.add("ustensils-tag");
        tagUstensils.innerText = e.target.innerText;
        tagContainer.appendChild(tagUstensils);
      });
    }

    return ustensilsList;
  }
}

export const initList = () => {
  const makeListElements = new MakeList(recipes);
  makeListElements.makeListIngredient();
  makeListElements.makeListAppliance();
  makeListElements.makeListUstensils();
};

//initList();

export class DisplayRecipes {
  constructor(recipes) {
    this.recipes = recipes;
    this.addRecipes();
    this.allTag();
  }
  addRecipes() {
    this.recipes.forEach((recipe) => {
      const newOb = new Recipe(recipe);
      domSectionResult.appendChild(newOb.createRecipeCard());
    });
    return newOb;
  }
  listenInput() {
    const inputSearch = document.getElementById("searchbar");
    inputSearch.addEventListener("input", (e) => {
      const inputSearchContent = e.target.value.toLowerCase();

      if (inputSearchContent.length >= 3) {
        domSectionResult.innerHTML = ""; // Vide le DOM de la galerie
        recipes.filter((element) => {
          const match = findIn(inputSearchContent, element);
          if (match == true) {
            newOb = new Recipe(element);
            currentOb.push(newOb);
            console.log(currentOb);
            domSectionResult.appendChild(newOb.createRecipeCard());
          }
        });
      }
      if (inputSearchContent.length < 3) {
        this.addRecipes();
      }
    });
    return newOb, currentOb;
  }

  allTag() {
    allTags.forEach((tagItem) => {
      displayTag(tagItem);
    });
  }
}

/* function displayTag(tagItem) {
  const tagList = document.getElementById(`${tagItem.category}-list`);
  tagList.innerText = "";
  tagItem.tags.forEach((tag) => {
    //if (!searchParameters[tagItem.category].includes(tag)) {
    const li = document.createElement("li");
    li.textContent = tag;
    li.classList.add(`${tagItem.category}-item`);
    li.setAttribute("data-category", tagItem.category);
    li.setAttribute("data-name", tag);
    //li.setAttribute("tabindex", "-1");
    tagList.appendChild(li);
    //}
  });
} */

/* function makeListIngredient() {
  const ingredientsList = [];
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((item) => ingredientsList.push(item.ingredient));
    bubbleSort(ingredientsList);
  });
  const ingredientsFilter = [...new Set(ingredientsList)];
  return ingredientsFilter;
}

/* ------------------------------- APPAREILS ----------------------- **/

/* function makeListAppliance() {
  const appliancesList = [];
  recipes.forEach((recipe) => {
    appliancesList.push(recipe.appliance);
    bubbleSort(appliancesList);
  });
  const appliancesFilter = [...new Set(appliancesList)];
  return appliancesFilter;
}
 */
/* ------------------------------- USTENSILES ----------------------- **/

/* function makeListUstensils() {
  let ustensilsList = [];
  recipes.forEach((recipe) => {
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
export { makeListIngredient, makeListAppliance, makeListUstensils };
 */

function displayRecipes() {
  const domSectionResult = document.getElementById("result-section");
  //const noResult = document.getElementById("no-result");
  //domSectionResult.innerHTML = "";
  //noResult.classList.add("hidden");
  //const result = [];

  recipes.forEach((recipe) => {
    newOb = new Recipe(recipe);
    domSectionResult.appendChild(newOb.createRecipeCard());
  });
  return newOb;
}
