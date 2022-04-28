import { listenInput, listenTag } from "./classe/classe_searchIn.js";
import { Tag } from "./classe/classe_Tag.js";

/** -------------------------------------------------- CONSTANTES & VARIABLES -------------------------------------------------- */
const chevronIngredient = document.getElementById("ingredients-btn");

const controls = [
  document.getElementById("ingredients-controls"),
  document.getElementById("appliances-controls"),
  document.getElementById("ustensils-controls"),
];
const buttons = [
  document.getElementById("ingredients-btn"),
  document.getElementById("appliances-btn"),
  document.getElementById("ustensils-btn"),
];
const inputs = [
  document.getElementById("ingredients-input"),
  document.getElementById("appliances-input"),
  document.getElementById("ustensils-input"),
];
const inputSearch = document.getElementById("searchbar");

export let newOb;

/** -------------------------------------------------- LISTE DES ECOUTES -------------------------------------------------- */
function addEventListeners() {
  controls.forEach((button) => button.addEventListener("click", openList));
  //buttons.forEach((button) => button.addEventListener("click", openList));
  //inputs.forEach((input) => input.addEventListener("click", openList));
  inputs.forEach((input) =>
    input.addEventListener("focusout", () => {
      input.value = "";
    })
  );
  inputSearch.addEventListener("input", listenInput);
}

/** ---------------------------------------- OUVRE LA LISTE (ingrédients, appareils ou ustensiles) ---------------------------------------- */
function openList(element) {
  /** ---------- ELEMENTS DU DOM ---------- */
  const target = element.target;
  const category = target.dataset.type;
  const comboboxDOM = {
    combobox: document.getElementById(`${category}-combobox`),
    controls: document.getElementById(`${category}-controls`),
    button: document.getElementById(`${category}-btn`),
    input: document.getElementById(`${category}-input`),
    list: document.getElementById(`${category}-list`),
  };
  const categoryEquivalences = {
    ingredients: "ingrédient",
    appliances: "appareil",
    ustensils: "ustensile",
  };

  /** ---------- SCRIPT DE LA FONCTION ---------- */
  comboboxDOM.list.classList.remove("hidden");
  comboboxDOM.input.classList.add("expanded");
  comboboxDOM.combobox.style.borderRadius = "0";
  comboboxDOM.input.setAttribute(
    "placeholder",
    `Rechercher un ${categoryEquivalences[category]}`
  );
  const listArray = [].slice.call(comboboxDOM.list.children);

  if (
    element.target === comboboxDOM.button ||
    element.target === comboboxDOM.input
  ) {
    comboboxDOM.list.classList.remove("hidden");
  }

  //listArray.forEach((element) => element.addEventListener("click", selectTag));

  listArray.forEach((element) =>
    element.addEventListener("click", (e) => {
      const category = e.target.dataset.category;
      const newTag = new Tag();
      newTag.createTag(e);
      closeList(comboboxDOM, category);
      //console.log(listenTag().length);
      listenTag();
    })
  );

  //this.chevronIngredients.style = ("transform", "rotate(180deg)");
  //this.chevronIngredients.classList.add("chevronUp");
}

/** -------------------------------------------------- FERME LA LISTE -------------------------------------------------- */
function closeList(comboboxDOM, category) {
  /** ---------- SCRIPT DE LA FONCTION ---------- */
  comboboxDOM.combobox.style.borderRadius = "5px";
  comboboxDOM.list.classList.add("hidden");
  comboboxDOM.input.classList.remove("expanded");
  comboboxDOM.input.setAttribute("placeholder", category);
}

/* --------------------------------------------------- DISPLAY LISTES ------------------------------------------- **/

export const initTest = () => {
  addEventListeners();
};

/** ---------------------------------------- OUVRE LA LISTE (ingrédients, appareils ou ustensiles) ---------------------------------------- */
//function openList(element) {
/** ---------- ELEMENTS DU DOM ---------- 
  /* const target = element.target;
  const category = target.dataset.type;
  const comboboxDOM = {
    combobox: document.getElementById(`${category}-combobox`),
    controls: document.getElementById(`${category}-controls`),
    button: document.getElementById(`${category}-btn`),
    input: document.getElementById(`${category}-input`),
    list: document.getElementById(`${category}-list`),
  };
  const categoryEquivalences = {
    ingredients: "ingrédient",
    appliances: "appareil",
    ustensils: "ustensile",
  }; */

/** ---------- SCRIPT DE LA FONCTION ---------- 
 /*  comboboxDOM.list.classList.remove("hidden");
  comboboxDOM.input.classList.add("expanded");
  comboboxDOM.combobox.style.borderRadius = "0";
  comboboxDOM.input.setAttribute(
    "placeholder",
    `Rechercher un ${categoryEquivalences[category]}`
  );
  const listArray = [].slice.call(comboboxDOM.list.children);

  if (
    element.target === comboboxDOM.button ||
    element.target === comboboxDOM.input
  ) {
    comboboxDOM.list.classList.remove("hidden");
  }
  listArray.forEach((element) => element.addEventListener("click", selectTag)); 
  //this.chevronIngredients.style = ("transform", "rotate(180deg)");
  //this.chevronIngredients.classList.add("chevronUp");
}*/

/** -------------------------------------------------- FERME LA LISTE -------------------------------------------------- */
/* function closeList(comboboxDOM, category) {
  const listArray = [].slice.call(comboboxDOM.list.children);
  listArray.forEach((element) =>
    element.removeEventListener("click", selectTag)
  );
  const categoryEquivalences = {
    ingredients: "Ingrédients",
    appliances: "Appareils",
    ustensils: "Ustensiles",
  };
  /** ---------- SCRIPT DE LA FONCTION ---------- 
  comboboxDOM.combobox.style.borderRadius = "5px";
  comboboxDOM.list.classList.add("hidden");
  comboboxDOM.input.classList.remove("expanded");
  comboboxDOM.input.setAttribute(
    "placeholder",
    `${categoryEquivalences[category]}`
  );
} */

/* --------------------------------------------------- DISPLAY LISTES ------------------------------------------- **/

/* export const initTest = () => {
  
  console.log(currentOb);
}; */

/* ------------------------------- ?????????????????????????? ----------------------- **/

/* function handleKeyUp() {
  // Note : prevent other keys than [AZ-az, space] to trigger search
  if (searchbar.value.length < 3 && searchParameters.textSearch.length > 0) {
    searchParameters.textSearch = "";
    updateResults();
  }

  if (searchbar.value.length >= 3) {
    searchParameters.textSearch = searchbar.value;
    updateResults();
  }
} */
