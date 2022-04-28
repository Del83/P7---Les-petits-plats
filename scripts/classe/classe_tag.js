/* --------------------------------------------------  Création des listes de TAGS --------------------------------------------------  */
export class Tag {
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
    //this.closeList;
  }
}
