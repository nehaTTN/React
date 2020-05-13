import React from 'react';
import styles from './Input.module.css';

const input=(props)=>{
    let inputElement=null;
    let inputClasses=[styles.InputElement];
    //let validationError=null;
    
    if(props.invalid && props.shouldValidate&& props.touched)
    {
        inputClasses.push(styles.Invalid);
        // validationError = <p>Please enter a valid {props.valueType}</p>;  error messag can bbe added this way
    }
    switch(props.elementType)
    {
        case('input'):
        inputElement=<input 
        className={inputClasses.join(' ')}//Passing the values here from ContactData
        {...props.elementConfig}
        value={props.value} 
        onChange={props.clicked}/>
        break;
        case('textarea'):
        inputElement=<textarea 
        className={inputClasses.join(' ')} 
        {...props.elementConfig}
        value={props.value} 
        onChange={props.clicked}/>
        break;
        case('select'):
        inputElement=<select
        className={inputClasses.join(' ')}
        value={props.value}
        onChange={props.clicked}> 
        {props.elementConfig.options.map(option=>(
           <option 
           key={option.value}
           value={option.value}>
            {option.displayValue}
            </option>
        ))}
        </select>
        break;
        default:
        inputElement=<input 
        className={inputClasses.join(' ')} 
        {...props.elementConfig}
        value={props.value} 
        onChange={props.clicked}/>
    }
    return(
<div className={styles.Input}>
<label className={styles.Label}>{props.label}</label>
{inputElement}
{/* {validationError} */}

</div>
    );

}
export default input;