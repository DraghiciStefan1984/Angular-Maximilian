import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService
{
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [new Recipe('test recipe', 'this is a test dwedwdw', 
    'https://www.dinneratthezoo.com/wp-content/uploads/2017/09/mongolian-beef-2.jpg'),
    new Recipe('another test recipe', 'this is a new test', 
    'https://www.dinneratthezoo.com/wp-content/uploads/2017/09/mongolian-beef-1.jpg')];

    getRecipes()
    {
        return this.recipes.slice();
    }
}