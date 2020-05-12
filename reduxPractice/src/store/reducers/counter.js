import * as  actionTypes from '../actions'; 
const initialState={
    counter:0
    }
    //Here we will not use this.state because we are alreay passing state in this
    const reducer=(state=initialState,action)=>{
        switch(action.type)
        {
            case actionTypes.INCREMENT:
            return{
                ...state,
                counter:state.counter+1
            }
            case actionTypes.DECREMENT:
            return{
                ...state,
                counter:state.counter-1
            }
            case actionTypes.ADD:
            return{
                ...state,
                counter:state.counter+action.value
            };
            case actionTypes.SUBTRACT:
            return{
                ...state,
                counter:state.counter-action.value
            };
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