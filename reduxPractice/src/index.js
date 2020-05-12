import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import reducer from './store/reducer';
import counterReducer from './store/reducers/counter'; 
import resultReducer from './store/reducers/result'; 
import{createStore,combineReducers} from 'redux';
import {Provider} from 'react-redux';
//I will combine both the reducers here
//Because we have only one root reducer.
const rootReducer=combineReducers({
    counter:counterReducer,
    result:resultReducer
});

const store=createStore(rootReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
//We will provide the App inside the provider so that we can add the store with the App. 
registerServiceWorker();
