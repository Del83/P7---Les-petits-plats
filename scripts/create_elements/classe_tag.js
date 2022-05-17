import { algoTag } from "../algo.js";

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

    /** ---------- SCRIPT DE LA METHODE ---------- */
    const tag = document.createElement("span"); // création d'un tag
    tag.classList.add("tag");
    tag.classList.add("tag-btn");
    tag.setAttribute("data-category", `${this.category}`);
    tag.setAttribute("data-name", e.target.innerText);
    tag.classList.add(`${this.category}-tag`);
    tag.innerText = e.target.innerText;
    tag.addEventListener("click", (e) => {
      this.removeTag(e); // supprime le tag si on clic dessus
    });
    tagContainer.appendChild(tag);
    algoTag(); // filtre les recettes selon le ou les tags selectionnés
    return tag;
  }

  /** ---------------------------------------- Supprimer le TAG selectionné ---------------------------------------- */
  removeTag(e) {
    e.target.remove(); // supprime le tag
    algoTag(); // filtre les recettes selon le ou les tags supprimés
  }
}
