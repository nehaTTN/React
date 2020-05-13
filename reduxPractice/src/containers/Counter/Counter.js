import React, { Component } from 'react';
import {connect} from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
// import * as  actionTypes from '../../store/actions/index'; 
import * as actionCreators from '../../store/actions/index';
class Counter extends Component {
    state = {
        counter: 0
    }

    render () {
        //We are adding this.props here because it is not a class counter
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.addCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.subtractCounter}  />
                <hr />
                <button onClick={()=>this.props.storeResult(this.props.ctr)}>STORE</button>
                <ul>
                    
                     {this.props.storeResultValue.map(result => (
                     <li 
                     key={result.id}
                     onClick={()=>this.props.deleteResult(result.id)}>{result.value}</li>
                   ))}
                    
                </ul>
            </div>
        );
    }
}
// This method will take only one argument i.e. the state of the reduce
// and return a javascript object which will then hav ethe access to that global state
//Here we can also define the particular slice of state we want 
//In Redux, subscriptions are called after the root reducer has returned the new state, 
const mapStateToProps=(state)=>{//Here we are connecting to the global state of reducers
    console.log('Subscription');
    return{
        ctr:state.counter.counter,//Connecting them to the global reducers
        storeResultValue:state.result.results
    };
};
//Here we define the dispatch actions
const mapDispatchtoProps=dispatch=>{
    console.log('Dispatch');
return{
    //Here we can define some props name which will have refrence to some functions
    //Which should evventually get executed to dispatch and function
    // onIncrementCounter:()=>dispatch({type: actionTypes.INCREMENT}),
    onIncrementCounter:()=>dispatch(actionCreators.increment()),
    onDecrementCounter:()=>dispatch(actionCreators.decrement()),
    addCounter:()=>dispatch(actionCreators.add(5)),
    subtractCounter:()=>dispatch(actionCreators.subtract(5)),
    storeResult:(counter)=>dispatch(actionCreators.storeResult(counter)),
    deleteResult:(id)=>dispatch(actionCreators.deleteResult(id))
};
}

//Connect is a function which returns a hoc
export default connect(mapStateToProps,mapDispatchtoProps)(Counter);
//It can also be connect(null,mapDispatchtoProps)