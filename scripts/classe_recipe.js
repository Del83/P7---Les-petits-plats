import { recipeTemplate } from "./recipe_template.js";

/* ---------- Classe RECIPE ---------- */
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
    this.visible = true; /// pour la fonction de maj des listes d'items
  }

  createRecipeCard() {
    this.recipeCard = document.createElement("article");
    this.recipeCard.classList.add("recipe-item");
    this.recipeCard.classList.add(this.id);
    this.recipeCard.setAttribute("id", this.id);
    this.recipeCard.innerHTML = recipeTemplate;
    // HTML
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
      // Adapter l'affichage aux différences de data (quantity/quantite, unit ou non, ponctuation inadéquate)
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

    //   const createIngredientsList = () => {
    //     const ingredients = this.ingredients;
    //     console.log(toLowerCase(ingredients));
    //     //const ingredientsmini = ingredients.toLowerCase();
    //     ingredients.forEach((ingredient) => {
    //       ingredientstList.push(ingredient.ingredient);
    //       console.log(ingredientstList);
    //       /*if (ingredient.ingredient === ingredient.ingredient) {
    //         return ingredientstList.toggle(ingredient.ingredient);
    //       }*/
    //     });
    //   };
    //   createIngredientsList();
    //
    // }
  }

  ellipsis() {
    ///Récupération du texte
    let text = this.description;
    ///On remplace les suites d'espaces par un seul espace
    text = text.replace(/  +/g, " ");
    /// si le texte est plus long que 210 caractères...
    if (text.length > 210) {
      // On coupe les X premiers caractères...
      text = text.substr(0, 210);
      //On coupe à nouveau pour enlever le dernier mot si il a été coupé en 2...
      text = text.substr(0, Math.min(text.length, text.lastIndexOf(" ")));
      //On retourne le texte coupé avec les 3 points à la fin
      return text + " ...";
    } else {
      // ou le texte si inférieur à 210 caractères
      return text;
    }
  }
}
