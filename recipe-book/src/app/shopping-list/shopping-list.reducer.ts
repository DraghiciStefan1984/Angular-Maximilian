import { Ingredient } from './../shared/ingredient.model';
import { Action } from '@ngrx/store';

const initialState={
    ingredients: [new Ingredient('apple', 5), new Ingredient('tomatoe', 7)]
};

export function shoppingListReducer(state=initialState, action: Action)
{
    switch(action.type)
    {
        case 'ADD_INGREDIENT':
            return {...state,}
    }
}