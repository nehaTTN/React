import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner.js';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import { connect } from 'react-redux';
//  import * as actionTypes from '../../store/actions/actionsTypes';
import * as actionCreators from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        //ingredients=null,
        // totalPrice:40,
        // purchasable:false,
        purchasing: false,
        // loading:false,
        // error:false
    }

    componentDidMount() {
        // axios.get('https://react-my-burger-88f22.firebaseio.com/ingredients.json')
        // .then(response=>{

        //     this.setState({ingredients:response.data})

        // })
        // .catch(error=>{
        //     this.setState({error:true});
        // });
        //It is alternatively done in actionCreation
        this.props.initIngredients(); 
    }

    isPurchasable(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
        // this.setState({purchasable:sum>0});
    }
    // addIngredientHandler=(type)=>{
    // const oldCount=this.state.ingredients[type];
    // const updatedCount=oldCount+1;
    // const updatedIngredients={
    //     ...this.state.ingredients
    // };
    // updatedIngredients[type]=updatedCount;
    // const price=this.state.totalPrice;
    // const addPrice=INGREDIENTS_PRICES[type];
    // const newPrice=price+addPrice;
    // this.setState({ingredients:updatedIngredients,totalPrice:newPrice})
    // this.isPurchasable(updatedIngredients);
    // }
    // removeIngredientHandler=(type)=>{
    //     const oldCount=this.state.ingredients[type];
    //     if(oldCount<=0)
    //     return null;
    //     const updatedCount=oldCount-1;
    //     const updatedIngredients={
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type]=updatedCount;
    //     const price=this.state.totalPrice;
    //     const deductPrice=INGREDIENTS_PRICES[type];
    //     const newPrice=price-deductPrice;
    //     this.setState({ingredients:updatedIngredients,totalPrice:newPrice})
    //     this.isPurchasable(updatedIngredients);
    //     }   
    purchaseHandler = () => (
        this.setState({ purchasing: true })
    )
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        // let queryParams=[];
        // console.log('queryParams',queryParams);
        // for(let i in this.props.ingred)
        // {
        //     //Converting the ingredients into queryparam
        //     queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.props.ingred[i]));
        //     console.log(queryParams);
        // }
        // queryParams.push('price='+this.state.totalPrice);

        // let queryString=queryParams.join('&');


        //Redirecting the page to the checkout with ingredients as query params
        this.props.purchaseInit();
        this.props.history.push('/checkout');
        // pathname:'/checkout',
        // search:'?' + queryString
    }

    render() {

        const disableInfo = {
            ...this.props.ingred
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />

        if (this.props.ingred) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingred} />
                    <BuildControls
                        ingredientAdded={this.props.addIngredient}//I have already passed the value of ingredients in build controls so I dont need to pass them here
                        ingredientRemoved={this.props.removeIngredient}
                        disabled1={disableInfo}
                        price={this.props.price}
                        ordered={this.purchaseHandler}

                        purchasable={this.isPurchasable(this.props.ingred)} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ingred}
                cancel={this.purchaseCancelHandler}
                continue={this.purchaseContinueHandler}
                price={this.props.price} />
        }
        // if (this.state.loading) {
        //     orderSummary = <Spinner />
        // }
        return (
            <Aux>
                <Modal show={this.state.purchasing} removed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
const mapStateToProps = state => {//This will be used to fetch values from the global state 
    return {
        ingred: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error
    };
}
const mapDispatchToProps = dispatch => {//This will be used to update the value to global state
    console.log(' mapDispatchToProps')
    return {
        addIngredient: (ingredName) => dispatch(actionCreators.addIngredient(ingredName)),
        removeIngredient: (ingredName) => dispatch(actionCreators.removeIngredient(ingredName)),
        initIngredients: () => dispatch(actionCreators.initIngredients()),
        purchaseInit:()=>dispatch(actionCreators.purchaseInit())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));