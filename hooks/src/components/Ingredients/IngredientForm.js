import React, { useState } from 'react';
import Card from '../UI/Card';
import './IngredientForm.css';
import LoadingIndicator from '../UI/LoadingIndicator';
const IngredientForm = React.memo(props => {
  //We have to give a initial state to use state but it can be anything like an object an array or a number
  //Unlike the class components which can have only object. 
  //We are making the amount type as because in the form the inpult elements
  //always takes the input as a string even if its type is number.
  //useState consists of two things the snapshot of the present state(which can be the initial state or the updated state)
  //and the dispatch function. video-427 is more detailed
  //it will not re render again and again
  //In setState we merge the entire object with all the fields 
  //but in useEffect we update the object
  //inputState[0] it will give the updated values
  //inputState[1] the function to update values
  //We have to always use hooks on the root level ,We can never use them inside a if or for 
  const [enteredTitle,setEnteredTitle] = useState('')//It is a good practice to divide our states into multiple hooks
  const [enteredAmount,setEnteredAmount] = useState('')
  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({title:enteredTitle, amount:enteredAmount})
  };
  console.log('loading',props.isLoading);
  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            {/* inputstate[0] will contain the snapshot of the current state. */}
            <input type="text" id="title"
              value={enteredTitle}
              // onChange={event => {//We will use it this way warna react will replace the unchanged state and also 
              // //If we will use the event again inside the event then it will also show error thats why we took event inside a dif variable
              // //One way of doing this the oyher and more easier in the next onchange
              //   const newTitle = event.target.value;
              //   setInputState(prevState => ({
              //     title: newTitle,
              //     amount: prevState.amount
              //   }))
              // }
              // }
              onChange={event=>{
                setEnteredTitle(event.target.value);
              }}
               />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount"
              value={enteredAmount}
              onChange={event=>{
                setEnteredAmount(event.target.value);
              }}
            
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator/>}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
