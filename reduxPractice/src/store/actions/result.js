import * as actionTypes from './actionsTypes';
// Redux Thunk is a middleware that lets you call action creators that return a function
//  instead of an action object. That function receives the store's dispatch method,
//   which is then used to dispatch regular synchronous actions inside the body of the 
//   function once the asynchronous operations have completed.

export const saveResult=(val)=>{
    return{
     type:actionTypes.STORE_RESULT,
     value:val
    };
}
//It will return a function that will take dispatch as a input
//We can send an http request instead of setTimeOut
// We can pass setState along with dispatch here and can get the 
// current state before the dispatch updates the state
// For example:If we want to have the current counter value
// before dispatching the action we can do it as follows
// NOTE:-It should not be done foor large operations.
// We should pass the values as parameters along with val here. 
export const storeResult=(val)=>{
    return (dispatch,getState)=>{
        setTimeout(()=>{
            // const oldCounter=getState().ctr.counter;
            // console.log(oldCounter);
        dispatch(saveResult(val))
        },2000);
       
}
}
export const deleteResult=(val)=>{
    return{
     type:actionTypes.DELETE_RESULT,
     resultId:val
    };
}
