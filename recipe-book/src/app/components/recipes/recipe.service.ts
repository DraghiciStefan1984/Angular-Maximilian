import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Injectable()
export class RecipeService
{
    private recipes: Recipe[] = [
        new Recipe('test recipe', 
                    'this is a test dwedwdw', 
                    'https://www.dinneratthezoo.com/wp-content/uploads/2017/09/mongolian-beef-2.jpg',
                    [new Ingredient('meat', 1),
                    new Ingredient('spices', 100)]),
        new Recipe('another test recipe', 
                    'this is a new test', 
                    'https://www.dinneratthezoo.com/wp-content/uploads/2017/09/mongolian-beef-1.jpg',
                    [new Ingredient('potatoes', 5),
                    new Ingredient('salt', 12)])
                ];

    constructor(private shoppingListService: ShoppingListService){}

    getRecipes()
    {
        return this.recipes.slice();
    }

    getRecipe(id: number)
    {
        return this.recipes.slice()[id];
    }

    addIngredientsToShoppinglist(ingredients: Ingredient[])
    {
        this.shoppingListService.addIngredients(ingredients);
    }
}