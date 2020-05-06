import React,{Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../../components/UI/Button/Button';

class OrderSummary extends Component{
    componentDidUpdate()
    {
        console.log('[OrderSummary] will update');
    }
    render()
    {
       
        const ingredientsSummary=Object.keys(this.props.ingredients)
        .map(igKey=>{
            return(
                <li key={igKey}>
                <span style={{textTransform:"capitalize"}}></span>
                {igKey}:{this.props.ingredients[igKey]}
                </li>
            );
        });
        return(
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price:{this.props.price} Rupees</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={this.props.cancel}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.continue}>ORDER</Button>
        </Aux>
        )
    }
}
export default OrderSummary; 