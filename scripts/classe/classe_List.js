/* --------------------------------------------------  Affichage des listes des ITEMS --------------------------------------------------  */
export class List {
  constructor(tagItem) {
    this.tagItem = tagItem;
  }
  createList() {
    let tagList = document.getElementById(`${this.tagItem.category}-list`);
    tagList.innerText = "";
    this.tagItem.tags.forEach((tag) => {
      //if (!searchParameters[tagItem.category].includes(tag)) {
      const li = document.createElement("li");
      li.textContent = tag;
      li.classList.add(`${this.tagItem.category}-item`);
      li.setAttribute("data-category", this.tagItem.category);
      li.setAttribute("data-name", tag);
      //li.setAttribute("tabindex", "-1");
      tagList.appendChild(li);
      //}
    });
    return tagList;
  }
}
