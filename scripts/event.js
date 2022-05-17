import { List } from "./create_elements/classe_List.js";
import { algoSearchBar } from "./algo.js";

/** -------------------------------------------------- LISTE DES ECOUTES -------------------------------------------------- */
export function addEventListeners() {
  /** ---------- ELEMENTS DU DOM ---------- */
  const inputSearch = document.getElementById("searchbar");
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

  /** ---------- ECOUTE DES ZONES DE RECHERCHE PAR CATEGORIE ---------- */
  inputs.forEach((input) => {
    input.addEventListener("click", (e) => {
      new List().openList(e); // ouvre la liste selon la zone de recherche cliqué
    });
    input.addEventListener("input", (e) => {
      new List().openList(e); // ouvre la liste selon la zone de recherche renseigné
    });
    input.addEventListener("focusout", () => {
      input.value = ""; // vide la zone de recherche
    });
  });

  /** ---------- ECOUTE DES BOUTONS PAR CATEGORIE ---------- */
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      new List().closeList(e); // ouvre la liste selon la catégorie du bouton cliqué
    });
  });

  inputSearch.addEventListener("input", algoSearchBar);
}
