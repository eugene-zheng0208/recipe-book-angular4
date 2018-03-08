import {Component, OnInit, OnDestroy} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private subscription: Subscription;

//   ingridients: Ingredient[] = [
//   new Ingredient('Apples', 3),
//   new Ingredient('Tomatoes', 2)
// ];

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.subscription =  this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
        }
      );
  }

  // onIngredientAdded(ingredient: Ingredient){
  //   this.ingridients.push(ingredient);
  // }


  onEditItem(index: number){
    this.slService.startedEditing.next(index);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
