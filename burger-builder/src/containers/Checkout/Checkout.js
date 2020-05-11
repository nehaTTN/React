import React,{ Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';
class Checkout extends Component{
    //We will pass the ingredients in the query parameters
    state={
        ingredients:{
            salad:1,
            cheese:1,
            bacon:1,
            meat:1
        },
        totalPrice:0
        
    }
    //Even if we referesh the page the state will be the same because we are 
    //setting it in componentDidMount.
    //Here we are adding it in componentDidMount because it will not chnage again and again
    componentDidMount()
    {
        
        const query=new URLSearchParams(this.props.location.search);
        // URLSearchParams are used to parse strings after ?
        
        const ingredients={};
        let price=0;
        for(let param of query.entries())
        {
            if(param[0] === 'price')
            {
            price=param[1];
            }
            else{
            // We get this in this form ['salad','1']
            ingredients[param[0]]=+param[1];//Converting this string into integer with using'+'
            }
            console.log('ingredients in checkout',ingredients);
            
            
        }
        this.setState({ingredients:ingredients});
    }
    checkoutCancelHandler=()=>{
    this.props.history.goBack();//Here we are going to the previous paage.
    }
    checkoutContinueHandler=()=>{
        this.props.history.replace('/checkout/contact-data');//rediecting to the other page
    }
render()
{
    
    return(
        <div>
        <CheckoutSummary 
    ingredients={this.state.ingredients}
    checkoutCanceled={this.checkoutCancelHandler}
    checkoutContinued={this.checkoutContinueHandler}/>
    <Route path={this.props.match.path+'/contact-data'} 
    render={(props)=><ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>} />
        </div>
    
    );
}
}
export default Checkout;