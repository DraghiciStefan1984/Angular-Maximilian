import { Ingredient } from './../../shared/ingredient.model';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingListService
{
    ingredientsChanged = new Subject<Ingredient[]>();
    private ingredients: Ingredient[] = [new Ingredient('Apple', 4), new Ingredient('Tomato', 10), new Ingredient('Cheese', 1)];

    getIngredients()
    {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) 
    {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) 
    {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}