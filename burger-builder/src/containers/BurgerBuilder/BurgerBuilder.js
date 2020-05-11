import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
 import Burger from '../../components/Burger/Burger';
 import BuildControls from '../../components/Burger/BuildControls/BuildControls';
 import Modal from '../../components/UI/Modal/Modal';
 import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
 import axios from '../../axios-orders';
 import Spinner from '../../components/UI/Spinner/Spinner.js';
 import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
const INGREDIENTS_PRICES={
    salad:20,
    bacon:40,
    cheese:15,
    meat:60
};

    class BurgerBuilder extends Component{
        state={
            ingredients:0,
            totalPrice:40,
            purchasable:false,
            purchasing:false,
            loading:false,
            error:false
        }
        
        componentDidMount(){
            axios.get('https://react-my-burger-88f22.firebaseio.com/ingredients.json')
            .then(response=>{
                
                this.setState({ingredients:response.data})
               
            })
            .catch(error=>{
                this.setState({error:true});
            });
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
            let queryParams=[];
            console.log('queryParams',queryParams);
            for(let i in this.state.ingredients)
            {
                //Converting the ingredients into queryparam
                queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
                console.log(queryParams);
            }
            queryParams.push('price='+this.state.totalPrice);
            
            let queryString=queryParams.join('&');
            
           
            //Redirecting the page to the checkout with ingredients as query params
            this.props.history.push({
                pathname:'/checkout',
                search:'?' + queryString
            });
        }
        
        render(){
            
            const disableInfo={
                ...this.state.ingredients
            };
            for(let key in disableInfo)
            {
                disableInfo[key]=disableInfo[key]<=0;
            }
        
            let orderSummary=null;
            let burger=this.state.error?<p>Ingredients can't be loaded</p>:<Spinner/>
            if(this.state.ingredients)
            {
                burger=(
                    <Aux>
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
            orderSummary=<OrderSummary 
            ingredients={this.state.ingredients}
            cancel={this.purchaseCancelHandler}
            continue={this.purchaseContinueHandler}
            price={this.state.totalPrice} />
            }
            if(this.state.loading)
            {
            orderSummary=<Spinner />
            }
            return(
                <Aux>
                    <Modal show={this.state.purchasing} removed={this.purchaseCancelHandler}>
                    {orderSummary}
                    </Modal>
                    {burger}
                </Aux>
            );
        }
    }
    export default withErrorHandler(BurgerBuilder,axios) ;