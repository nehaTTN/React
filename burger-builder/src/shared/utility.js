 export const updatedObject=(oldObject,updatedProperties)=>{
return{
    ...oldObject,
    ...updatedProperties
};
}
//we are here putting the validi function because it is used at multiple places
export const checkValid=(value, rules)=> {
    let isValid = true;//Setting it initially to true so that when condition is 
    //Checked in if statement then it should not be overridded by the other ifs.
    // if (!rules) {
    //     return true;  //If there is no validation like in drop down
    // }
    if (rules.required) {
        isValid = value.trim() !== '' && isValid//Checking if the string enterd is not blank spaces
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.minLength && isValid
    }

    return isValid;
}
