import { recipeTemplate } from "../compoment/recipe_template.js";

export class Recipe {
  constructor({
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
  }) {
    this.id = id;
    this.name = name;
    this.parts = servings;
    this.ingredients = ingredients;
    this.time = time;
    this.description = description;
    this.appliance = appliance;
    this.ustensils = ustensils;
  }

  /** --------------------------------------------------  CREATION DES RECETTES -------------------------------------------------- */
  createRecipeCard() {
    this.recipeCard = document.createElement("article");
    this.recipeCard.classList.add("recipe-item");
    this.recipeCard.classList.add(this.id);
    this.recipeCard.setAttribute("id", this.id);
    this.recipeCard.innerHTML = recipeTemplate;
    this.recipeCard.querySelector(".recipe-title").innerText = this.name;
    this.recipeCard.querySelector(".recipe-time").innerText =
      this.time + " min";
    const recipeIngredients = this.recipeCard.querySelector(
      ".recipe-ingredients"
    );
    const ingredients = this.ingredients;
    ingredients.forEach((ingredient) => {
      const ingredientDetail = document.createElement("li");
      ingredientDetail.classList.add("recipe-ingredients-detail");
      const ingredientName = document.createElement("span");
      ingredientName.classList.add("recipe-ingredients-detail-name");
      ingredientName.setAttribute("data-ingredient", ingredient.ingredient);
      ingredientName.innerText = ingredient.ingredient;
      ingredientDetail.appendChild(ingredientName);
      if (ingredient.quantite || ingredient.quantity) {
        const quantiteIngredient = document.createElement("span");
        quantiteIngredient.classList.add("recipe-ingredients-detail-quantity");
        let quantite = "";
        if (ingredient.quantite) {
          quantite = ingredient.quantite;
        } else {
          quantite = ingredient.quantity;
        }
        if (ingredient.unit) {
          quantiteIngredient.innerText =
            ": " + quantite + " " + ingredient.unit;
        } else {
          quantiteIngredient.innerText = ": " + quantite;
        }
        let quantiteIngredientCorrection =
          quantiteIngredient.textContent.replace(".", ",");
        quantiteIngredient.innerText = quantiteIngredientCorrection;
        ingredientDetail.appendChild(quantiteIngredient);
      }
      recipeIngredients.appendChild(ingredientDetail);
    });
    this.recipeCard.querySelector(".recipe-description").innerText =
      this.ellipsis();
    return this.recipeCard;
  }

  /** --------------------------------------------------  METHODE ELLIPSIS POUR LE TEXTE DE LA DESCRIPTION DE LA RECETTE -------------------------------------------------- */
  ellipsis() {
    let text = this.description;
    text = text.replace(/  +/g, " ");
    if (text.length > 210) {
      text = text.substr(0, 210);
      text = text.substr(0, Math.min(text.length, text.lastIndexOf(" ")));
      return text + " ...";
    } else {
      return text;
    }
  }
}
