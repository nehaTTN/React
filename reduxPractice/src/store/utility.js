//We are creating this class because we are spreading the state in almost
//every action we do so we are creating a util for that
//so that the code can become more clear
export const updatedObject=(oldObject,updatedValues)=>{
    return{
        ...oldObject,
        ...updatedValues
    };
}