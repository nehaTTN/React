import * as actionTypes from '../actions/actionsTypes';
const initialState = {
    ingredients: {//Initially the ingredients will be 0 and whenever a
        cheese: 0,    //ingredient is incremented the value in the state eill increase by 1
        meat: 0,
        bacon: 0,
        salad: 0
    },
    totalPrice: 40
}

const INGREDIENTS_PRICES={
    salad:20,
    bacon:40,
    cheese:15,
    meat:60
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,//First we will copy the state.This will be a shallow copy
                ingredients: {//Now we will av ethe deep copy of ingredients as well
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice:state.totalPrice+INGREDIENTS_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice:state.totalPrice-INGREDIENTS_PRICES[action.ingredientName]
            }
            default:
                return state
    }
}
export default reducer;