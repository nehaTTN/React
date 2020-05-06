import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
 import Burger from '../../components/Burger/Burger';
 import BuildControls from '../../components/Burger/BuildControls/BuildControls';
 import Modal from '../../components/UI/Modal/Modal';
 import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
const INGREDIENTS_PRICES={
    salad:20,
    bacon:40,
    cheese:15,
    meat:60
};

    class BurgerBuilder extends Component{
        state={
            ingredients:{
                salad:0,
                bacon:0,
                cheese:0,
                meat:0
            },
            totalPrice:40,
            purchasable:false,
            purchasing:false
        }
        isPurchasable(ingredients)
        {
            const sum=Object.keys(ingredients)
            .map(igKey=>{
                return ingredients[igKey];
            })
            .reduce((sum, el)=>{
                return sum+el;
            },0);
        this.setState({purchasable:sum>0});
        }
        addIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        const updatedCount=oldCount+1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const price=this.state.totalPrice;
        const addPrice=INGREDIENTS_PRICES[type];
        const newPrice=price+addPrice;
        this.setState({ingredients:updatedIngredients,totalPrice:newPrice})
        this.isPurchasable(updatedIngredients);
        }
        removeIngredientHandler=(type)=>{
            const oldCount=this.state.ingredients[type];
            if(oldCount<=0)
            return null;
            const updatedCount=oldCount-1;
            const updatedIngredients={
                ...this.state.ingredients
            };
            updatedIngredients[type]=updatedCount;
            const price=this.state.totalPrice;
            const deductPrice=INGREDIENTS_PRICES[type];
            const newPrice=price-deductPrice;
            this.setState({ingredients:updatedIngredients,totalPrice:newPrice})
            this.isPurchasable(updatedIngredients);
            }   
            purchaseHandler=()=>(
                this.setState({purchasing:true})
            )
            purchaseCancelHandler=()=>{
                this.setState({purchasing:false})  
            }
            purchaseContinueHandler=()=>{
                alert('You continue!');
            }
        
        render(){
            
            const disableInfo={
                ...this.state.ingredients
            };
            for(let key in disableInfo)
            {
                disableInfo[key]=disableInfo[key]<=0;
            }
            
            return(
                <Aux>
                    <Modal show={this.state.purchasing} removed={this.purchaseCancelHandler}>
                    <OrderSummary 
                    ingredients={this.state.ingredients}
                    cancel={this.purchaseCancelHandler}
                    continue={this.purchaseContinueHandler}
                    price={this.state.totalPrice}>
                    </OrderSummary>
                    </Modal>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler} 
                    disabled1={disableInfo}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                    purchasable={this.state.purchasable}/>
                </Aux>
            );
        }
    }
    export default BurgerBuilder;