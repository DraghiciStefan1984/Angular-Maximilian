import { Recipe } from './../recipe.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [new Recipe('test recipe', 'this is a test dwedwdw', 
  'https://www.dinneratthezoo.com/wp-content/uploads/2017/09/mongolian-beef-2.jpg'),
  new Recipe('another test recipe', 'this is a new test', 
  'https://www.dinneratthezoo.com/wp-content/uploads/2017/09/mongolian-beef-1.jpg')];
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
