import { Tag } from "./classe_Tag.js";
import { Items } from "../get_elements/classe_Items.js";
import { algoSearchTag } from "../algo.js";

export class List {
  constructor(item) {
    this.item = item;
  }

  /* --------------------------------------------------  CREATION DE LISTE D'ITEMS --------------------------------------------------  */

  createList() {
    let itemList = document.getElementById(`${this.item.category}-list`);

    itemList.innerText = ""; //vide la liste
    this.item.items.forEach((it) => {
      const li = document.createElement("li"); // création d'un item
      li.textContent = it;
      li.classList.add(`${this.item.category}-item`);
      li.classList.add("item");
      li.setAttribute("data-category", this.item.category);
      li.setAttribute("data-name", it);
      itemList.appendChild(li);
      // écoute de l'item
      li.addEventListener("click", (e) => {
        new Tag().createTag(e); // création d'un tag si je clic sur un item
        new List().closeList(e); // ferme la liste après la création du tag
      });
    });
    return itemList;
  }

  /** ---------------------------------------- OUVRE LA LISTE (ingrédients, appareils ou ustensiles) ---------------------------------------- */

  openList(element) {
    /** ---------- ELEMENTS DU DOM ---------- */
    const category = element.target.dataset.type; // récupère le type de catégorie de la liste selectionnée
    const comboboxDOM = {
      combobox: document.getElementById(`${category}-combobox`),
      button: document.getElementById(`${category}-btn`),
      input: document.getElementById(`${category}-input`),
      list: document.getElementById(`${category}-list`),
    };
    const categoryEquivalences = {
      ingredients: "ingrédient",
      appliances: "appareil",
      ustensils: "ustensile",
    };

    /** ---------- SCRIPT DE LA METHODE ---------- */
    comboboxDOM.list.classList.remove("hidden"); // supprime la classe hidden pour afficher la liste
    comboboxDOM.input.classList.add("expanded"); // ajoute la classe expanded pour modifier le style de la liste
    comboboxDOM.combobox.style.borderRadius = "0";
    comboboxDOM.input.setAttribute(
      "placeholder",
      `Rechercher un ${categoryEquivalences[category]}`
    );

    if (
      element.target === comboboxDOM.button ||
      element.target === comboboxDOM.input
    ) {
      comboboxDOM.list.classList.remove("hidden"); // supprime la classe hidden pour afficher la liste
    }
    algoSearchTag(element, comboboxDOM);
  }

  /** -------------------------------------------------- FERME LA LISTE -------------------------------------------------- */

  closeList(element) {
    const category = element.target.dataset.category;
    const comboboxDOM = {
      combobox: document.getElementById(`${category}-combobox`),
      button: document.getElementById(`${category}-btn`),
      input: document.getElementById(`${category}-input`),
      list: document.getElementById(`${category}-list`),
    };
    /** ---------- SCRIPT DE LA METHODE ---------- */
    comboboxDOM.combobox.style.borderRadius = "5px";
    comboboxDOM.list.classList.add("hidden");
    comboboxDOM.input.classList.remove("expanded");
    comboboxDOM.input.setAttribute("placeholder", category);
  }

  /** --------------------------------------------------  AFFICHER LA LISTE -------------------------------------------------- */

  displayList(recipes) {
    const newList = new Items(recipes);
    const ingredientsListFilter = newList.getIngredient(); // récupération des items ingrédients dans les recettes
    const appliancesListFilter = newList.getAppliance(); // récupération des items appareils dans les recettes
    const ustensilsListFilter = newList.getUstensils(); // récupération des items ustensiles dans les recettes
    const allItems = [
      {
        category: "ingredients",
        items: ingredientsListFilter,
      },
      {
        category: "appliances",
        items: appliancesListFilter,
      },
      {
        category: "ustensils",
        items: ustensilsListFilter,
      },
    ];

    allItems.forEach((item) => {
      new List(item).createList(); // création de la liste avec les items provenant des recettes
    });
  }
}
