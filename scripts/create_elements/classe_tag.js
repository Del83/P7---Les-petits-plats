import { displayRecipes } from "../display_elements/displayRecipes.js";
import { listenTag } from "../search_elements/classe_searchIn.js";
import { closeList } from "./classe_List.js";
import { step } from "../index.js";

/* --------------------------------------------------  Création des listes de TAGS --------------------------------------------------  */
class Tag {
  constructor(category) {
    this.category = category;
  }
  /** ---------------------------------------- creation d'un TAG ---------------------------------------- */
  createTag(e) {
    /** ---------- ELEMENTS DU DOM ---------- */
    const tagContainer = document.getElementById("search-tags");
    this.category = e.target.dataset.category;

    /** ---------- SCRIPT DE LA FONCTION ---------- */
    const tag = document.createElement("span");
    tag.classList.add("tag");
    tag.classList.add("tag-btn");
    tag.setAttribute("data-category", `${this.category}`);
    tag.setAttribute("data-name", e.target.innerText);
    tag.classList.add(`${this.category}-tag`);
    tag.innerText = e.target.innerText;
    tagContainer.appendChild(tag);
    return tag;
  }
}

class TagAction {
  constructor(comboboxDOM, listArray) {
    this.comboboxDOM = comboboxDOM;
    this.listArray = listArray;
    this.tags = [];
  }
  addTag() {
    this.listArray.forEach((element) =>
      element.addEventListener("click", (e) => {
        const category = e.target.dataset.category;
        const newTag = new Tag();
        newTag.createTag(e);
        closeList(this.comboboxDOM, category);
        this.tags = Array.from(document.querySelectorAll(".tag"));
        listenTag();
        console.log(this.tags);
        this.removeTag();
        console.log(step.currentTabRecipes);
      })
    );
  }
  removeTag() {
    this.tags.forEach((tag) => {
      tag.addEventListener("click", (e) => {
        tag.remove();
        listenTag();
      });
    });
  }
}

export { Tag, TagAction };
