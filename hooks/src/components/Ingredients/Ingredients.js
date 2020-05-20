import React, {useCallback, useReducer } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

//We use useReducer instead of useStste  if  we have to manupilate the actions and 
//also if the output strongly depends on the previous state
//Or if they are co related like our error and loading state.
const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients
    case 'ADD':
      return [...currentIngredients, action.ingredient]
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id)
    default:
      throw new Error('Something went wrong')
  }
}//We wont send request here in this reducer rather we will just manage the state on which ur UI depends
const httpReducer = (currHttpState,action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null };
    case 'RESPONSE':
      return{...currHttpState,loading:false}
    case 'ERROR':
      return{loading:false,error:action.errorMessag}
    case 'CLEAR':
      return{...currHttpState,error:null}
      default:
      throw new Error('Should not be reached!');

  }
}


const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, [])
  // const [userIngredients, setUserIngredients] = useState([]);//We will use an array here because ingredients will be a list of array.
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();//Initially we will set it to false because we dont have any error
  //this is one way
  //The other way is using reducer
  const [httpState,dispatchHttp]=useReducer(httpReducer,{
    loading:false,
    error:null
  })

  // const addIngredientHandler = ingredient => {
  //   //This methid is not related to react.It  is a method whuich is understodd by the browser  
  //   fetch('https://react-hooks-update-14c0a.firebaseio.com/ingredients', {
  //     method: 'POST',
  //     body: JSON.stringify(ingredient),
  //     headers:{'Content-Type':'application/json'}
  //   }).then(response=>{
  //     return response.json()//It will return in javascript object form
  //   })
  //   .then(responseData=>{
  //     setUserIngredients(prevIngredients => [
  //       ...prevIngredients,
  //       { id: responseData.name, ...ingredient }//.name is the id generated automatically bythe firebase
  //     ])
  //   });
  // }

  //useEffect runs after and for every render cycle 
  //It works like componentDidMount with an empty array as second array
  //It runs after every re-render .We can have multiple useEffect in a function

  const addIngredientHandler = ingredient => {
    dispatchHttp({type:'SEND'})
    fetch('https://react-hooks-update-14c0a.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
       dispatchHttp({type:'RESPONSE'});
        return response.json();
      })
      .then(responseData => {
        // setUserIngredients(prevIngredients => [
        //   ...prevIngredients,
        //   { id: responseData.name, ...ingredient }
        // ]);
        dispatch({
          type: 'ADD',
          ingredient: { id: responseData.name, ...ingredient }
        })
      });
  };

  const filteredIngredientsHandler = useCallback(filteredIngredients => {//We have used callback so that infinite loop nah chale
    // setUserIngredients(filteredIngredients)
    dispatch({ type: 'SET', ingredients: filteredIngredients })
  }, []);

  const removeIngredientHandler = ingredientId => {
    dispatchHttp({type:'SEND'})
    console.log('userIngredients to be passed', userIngredients)
    fetch(`https://react-hooks-update-14c0a.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE'

    })
      // .then(response => {
      //     setUserIngredients(prevIngredients => {
      //     prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
      //   })
      // })
      .then(response => {
        // setIsLoading(false);
        dispatchHttp({type:'RESPONSE'});
        // setUserIngredients(prevIngredients =>
        //   prevIngredients.filter(ingredient => ingredient.id !== ingredientId))
        dispatch({
          type: 'DELETE',
          id: ingredientId
        });
      })
      .catch(error => {
        dispatchHttp({type:'ERROR'})
      })

  }


  const clearError = () => {
    dispatchHttp({type:'CLEAR'});
  }
  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler}
        loading={httpState.loading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
