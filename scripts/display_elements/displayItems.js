import { Items } from "../get_elements/classe_Items.js";
import { List } from "../create_elements/classe_List.js";
/* -------------------------------------------------- Contrôle de la recherche -------------------------------------------------- */
export function displayItems(filter) {
  const newList = new Items(filter);
  const ingredientsListFilter = newList.getIngredient();
  const appliancesListFilter = newList.getAppliance();
  const ustensilsListFilter = newList.getUstensils();
  const allTags = [
    {
      category: "ingredients",
      tags: ingredientsListFilter,
    },
    {
      category: "appliances",
      tags: appliancesListFilter,
    },
    {
      category: "ustensils",
      tags: ustensilsListFilter,
    },
  ];

  allTags.forEach((tagItem) => {
    const newTags = new List(tagItem);
    newTags.createList(tagItem);
  });
}
