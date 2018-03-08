import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  // @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[];

  // recipes: Recipe[] = [
  //   new Recipe('Test Recipe','Simply Test','https://www.goredforwomen.org/wp-content/uploads/2014/03/Skillet-Ham-Hash.jpg'),
  //   new Recipe('Another Test Recipe','Simply Test','https://www.goredforwomen.org/wp-content/uploads/2014/03/Skillet-Ham-Hash.jpg')
  // ];

  constructor( private recipeService: RecipeService,
               private router: Router,
               private route: ActivatedRoute) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  // onRecipeSelected(recipe: Recipe){
  // this.recipeWasSelected.emit(recipe)
  // }

  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo: this.route})
  }

}
