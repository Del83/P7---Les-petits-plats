import { TagAction } from "./classe_tag.js";

/* --------------------------------------------------  CREATION DES LISTES DES ITEMS PAR CATEGORIE --------------------------------------------------  */
class List {
  constructor(tagItem) {
    this.tagItem = tagItem;
  }
  createList() {
    let tagList = document.getElementById(`${this.tagItem.category}-list`);

    /** ---------- SCRIPT DE LA FONCTION ---------- */
    tagList.innerText = "";
    this.tagItem.tags.forEach((tag) => {
      const li = document.createElement("li");
      li.textContent = tag;
      li.classList.add(`${this.tagItem.category}-item`);
      li.setAttribute("data-category", this.tagItem.category);
      li.setAttribute("data-name", tag);
      //li.setAttribute("tabindex", "-1");
      tagList.appendChild(li);
    });
    return tagList;
  }
}

/** ---------------------------------------- OUVRE LA LISTE (ingrédients, appareils ou ustensiles) ---------------------------------------- */
function openList(element) {
  /** ---------- ELEMENTS DU DOM ---------- */
  const target = element.target;
  const category = target.dataset.type;
  const comboboxDOM = {
    combobox: document.getElementById(`${category}-combobox`),
    //controls: document.getElementById(`${category}-controls`),
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
  const listArray = [].slice.call(comboboxDOM.list.children); // Création d'un tableau avec les items des listes
  const newTag = new TagAction(comboboxDOM, listArray); // Appel de la classe TagAction (ajoute ou supprime un tag)
  newTag.addTag(element); // Ajoute un tag

  if (
    element.target === comboboxDOM.button || // Détermine le bouton selectionné
    element.target === comboboxDOM.input
  ) {
    comboboxDOM.list.classList.remove("hidden"); // Retire la classe hidden pour la rendre visible
  }
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

export { List, openList, closeList };
