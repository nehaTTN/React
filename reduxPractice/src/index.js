import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import reducer from './store/reducer';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';
import { createStore, combineReducers,applyMiddleware,compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
//I will combine both the reducers here
//Because we have only one root reducer.
const rootReducer = combineReducers({
    counter: counterReducer,
    result: resultReducer
});
//Adding middleware which is mainly used for API calls and also to check some operations between dispatch and reducer
const logger = store => {//It will take store as an input  because redux will provide its method to connect our middleware with store.
    //Tht method will execute our middleware function and give us the store
    return next => {//it will return another function that will take next as an argument
        return action => {//It will recieve the action dispatched as an argument
         //Here we can perform the actions that we want should happend after the dispatcher and before action.
         console.log('[Middleware]dispatching',action);
         //We can change the type of action here in the middleware because we get that as an argument.
         const result=next(action);//This will let the action continue to the reducer.
         console.log('[midddleware]next state',store.getState());
         return result;
        }
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;//Or it applied so that if it does not get  the devtools it will return compose by default which is used when you want to pass multiple store enhancers to the store.
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(logger,thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
//We will provide the App inside the provider so that we can add the store with the App. 
registerServiceWorker();
