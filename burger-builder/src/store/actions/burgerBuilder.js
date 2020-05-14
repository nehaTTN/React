import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';
console.log('action entering');

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
}
export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
}
export const setIngredients = (ingredients) => {
  console.log('set Ingredients')
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients: ingredients
  };
}
export const  fetchIngredientsFailed= () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
    
  };
}

export const initIngredients = () => {
  console.log('before fetched');
    return dispatch => {
    axios.get('https://react-my-burger-88f22.firebaseio.com/ingredients.json')
      .then(response => {
        console.log('fetched',response.data)
        dispatch(setIngredients(response.data))
         })
      .catch(error => {
        dispatch(fetchIngredientsFailed())
      });
  };
}