import * as actionTypes from './actionsTypes';
export const increment=()=>{//This is an actionCreator here
                            //They are extremely useful for asynchronous code.
return{
type: actionTypes.INCREMENT
};
}

export const decrement=()=>{
return{
type:actionTypes.DECREMENT
};
}
export const add=(val)=>{
return{
type:actionTypes.ADD,
value:val
};
}
export const subtract=(val)=>{
return{
type:actionTypes.SUBTRACT,
value:val
};
}