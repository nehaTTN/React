// Here I will be installing everything with node
// so I wont be using import here
const redux =require('redux');
const createStore=redux.createStore;//Here we are creating a store with the inbuilt function
// We will have only one reducer even if we combine multiple but they will be 
// Merged into one
// It get the previous state and the action to be performed 
//  and returns the updatedState
const initialState={
    counter:0
}
const rootReducer=(state=initialState,action)=>{
    // Here we are initializing it so whenevr the state is defined(for the first time it is runned)
    // it will get the initial state and after first time the state will never be null
    if(action.type==='INC_COUNTER')
    {
        return{
        ...state,
        counter:state.counter+1
        };
    }
    if(action.type==='ADD_COUNTER')
    {
        return{
        ...state,
        counter:state.counter+action.value
        };
    }
     return state;
};
// Store
// We need to pass the reducer to the store because they are so closely related
// and we can update the store only with reducer
const store=createStore(rootReducer);
console.log(store.getState());//It will return undefined if the state is not initialized
                             //So we will initiialize  the state
                            //It will run by command 'node redux-basics.js'


//Subscription
store.subscribe(()=>{
    console.log('[Subscription]',store.getState());//It always runs whenever a value gets updated or dispatch runs.
})

//Dispatching 
store.dispatch({type:'INC_COUNTER'});//It will always have a javascript object with 'type' as an attribute
store.dispatch({type:'ADD_COUNTER',value:10});
console.log(store.getState());

