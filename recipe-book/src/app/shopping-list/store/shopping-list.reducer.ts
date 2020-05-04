import { Ingredient } from '../../shared/ingredient.model';
import { Action } from '@ngrx/store';
import * as ShoppingListActions from './shopping-list.actions';


const initialState={
    ingredients: [new Ingredient('apple', 5), new Ingredient('tomatoe', 7)]
};

export function shoppingListReducer(state=initialState, action: ShoppingListActions.ShoppingListActions)
{
    switch(action.type)
    {
        case ShoppingListActions.ADD_INGREDIENT:
            return {...state, ingredients: [...state.ingredients, action.payload]};
        case ShoppingListActions.ADD_INGREDIENTS:
            return {...state, ingredients: [...state.ingredients, ...action.payload]};
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient=state.ingredients[action.payload.index];
            const updatedIngredient={...ingredient, ...action.payload.ingredient};
            const updatedIngredients=[...state.ingredients];
            updatedIngredients[action.payload.index]=updatedIngredient;
            return {...state, ingredients: [...state.ingredients, ...updatedIngredients]};
        case ShoppingListActions.DELETE_INGREDIENT:
            return {...state, ingredients: [...state.ingredients, state.ingredients.filter((ingredient, ingredientIndex)=>
                {
                    return ingredientIndex!==action.payload;
                })]};
        default:
            return state;
    }
}