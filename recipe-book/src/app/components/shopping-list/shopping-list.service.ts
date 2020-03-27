import { Ingredient } from './../../shared/ingredient.model';
import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class ShoppingListService
{
    ingredientsChanged = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [new Ingredient('Apple', 4), new Ingredient('Tomato', 10), new Ingredient('Cheese', 1)];

    getIngredients()
    {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) 
    {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) 
    {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
}