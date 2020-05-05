import { Ingredient } from '../../shared/ingredient.model';
import { Action } from '@ngrx/store';
import * as ShoppingListActions from './shopping-list.actions';


const initialState={ingredients:[new Ingredient('apple', 5), new Ingredient('tomato', 10)]};

export function shoppingListReducer(state=initialState, action: ShoppingListActions.AddIngredient)
{
    switch(action.type)
    {
        case ShoppingListActions.ADD_INGREDIENT:
            return {...state, ingredients: [...state.ingredients, action.payload]};
        default:
            return state;
    }
}