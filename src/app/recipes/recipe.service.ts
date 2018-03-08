import {Recipe} from "./recipe.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService{

  recipeSelected = new EventEmitter<Recipe>();


  private recipes: Recipe[] = [
    new Recipe('Test Recipe','Simply Test','https://www.goredforwomen.org/wp-content/uploads/2014/03/Skillet-Ham-Hash.jpg', [
      new Ingredient('Meat', 1),
      new Ingredient('French Fries', 20),
    ]),
    new Recipe('Another Test Recipe','Simply Test','https://www.goredforwomen.org/wp-content/uploads/2014/03/Skillet-Ham-Hash.jpg',[
      new Ingredient('Meat', 1),
      new Ingredient('French Fries', 20),
    ])
  ];

  constructor(private slService: ShoppingListService){}

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(id: number){
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
 this.slService.addIngredients(ingredients);
  }
}
