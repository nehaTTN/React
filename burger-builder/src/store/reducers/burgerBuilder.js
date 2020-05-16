import * as actionTypes from '../actions/actionsTypes';
import {updatedObject} from '../../shared/utility';

const initialState = {
    ingredients: null,//Initially the ingredients will be 0 and whenever a
    //ingredient is incremented the value in the state eill increase by 1

    error: false,
    totalPrice: 40,
    building:false 
}

const INGREDIENTS_PRICES = {
    salad: 20,
    bacon: 40,
    cheese: 15,
    meat: 60
};
const addIngredient = (state, action) => {
    // return {
    //     ...state,//First we will copy the state.This will be a shallow copy
    //     ingredients: {//Now we will av ethe deep copy of ingredients as well
    //         ...state.ingredients,
    //         [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    //     },
    //     totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
    // }
    //Other and more precise way of doing this
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updatedObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
        building:true

    }
    return updatedObject(state, updatedState);

}
const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngs = updatedObject(state.ingredients, updatedIng)
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
        building:true


    }
    return updatedObject(state, updatedSt);

}
const setIngredient = (state, action) => {
    return updatedObject(state, {
        // ingredients:action.ingredients,
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        totalPrice: 40,//So that the total price reload evertime
        error: false,//In case if the user had initially an error but later on resolved that
        building:false//We will set it to false because in set Ingredients we are starting from scratch
        
    });


}
const fetchIngredient = (state, action) => {
    return updatedObject(state, { error: true });

}
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)


        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)

        case actionTypes.SET_INGREDIENT: return setIngredient(state, action)

        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredient(state, action)
        default: return state
    }
}
export default reducer;