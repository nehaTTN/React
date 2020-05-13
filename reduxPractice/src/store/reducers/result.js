import * as  actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility';
const initialState = {
    results: []
}
// const id=2;
// newArray=[...state.result]
// newArray.splice(id,1);
//We can do either way but if we are creating a copy  it should be a deep copy 
//for objects of objects.Here we are deleting it so it wont create  a much diifference 
//But for adding it will definetely create a diff.
//We have creating here another function so that our switch case is leaner,not necessary though
//But a good coding practice
const deleteResult = (state, action) => {
    const updatedArray = state.results.filter(result => result.id !== action.resultId)
    return updatedObject(state, { results: updatedArray })
}
//Here we will not use this.state because we are alreay passing state in this
const reducer = (state = initialState, action) => {

    switch (action.type) {
        //New date is assigned o give it a key
        //We will not use push here becuase that will push
        //into the original array ,concat will  return a new arry 
        case actionTypes.STORE_RESULT:
            return updatedObject(state, {
                results: state.results.concat({ id: new Date(), value: action.value })
            })

        case actionTypes.DELETE_RESULT:
        return deleteResult(state,action);

        default:
            return state;
    }



}
export default reducer;

//Read the article after it
//Unfortunately, the process of correctly applying immutable updates to deeply nested state can
// easily become verbose and hard to read. 
//Here's what an example of updating state.
//first.second[someId].fourth might look like:

// function updateVeryNestedField(state, action) {
//     return {
//         ...state,
//         first : {
//             ...state.first,
//             second : {
//                 ...state.first.second,
//                 [action.someId] : {
//                     ...state.first.second[action.someId],
//                     fourth : action.someValue
//                 }
//             }
//         }
//     }

// Updating an Item in an Array
// Updating one item in an array can be accomplished by using Array.map, 
//returning a new value for the item we want to update,
// and returning the existing values for all other items:

// function updateObjectInArray(array, action) {
//     return array.map( (item, index) => {
//         if(index !== action.index) {
//             // This isn't the item we care about - keep it as-is
//             return item;
//         }

//         // Otherwise, this is the one we want - return an updated value
//         return {
//             ...item,
//             ...action.item
//         };    
//     });