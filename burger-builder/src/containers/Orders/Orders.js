import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from 'axios';
class Orders extends Component{
    state={
        orders:[],
        loading:false
    }
    componentDidMount()
    {
        //Here the data received will not be in array form.
        //So we have to convert it in array
        axios.get('/orders.json')
        .then(response=>{
            let fetchedData=[];
            for(let key in response.data)
            {
             fetchedData.push({
                 ...response.data[key],
                 id:key//Assigning it a key so that it can a unquie id
             });
            }
            console.log(response.data);
             this.setState({loading:false,orders:fetchedData});
        })
        .catch(error=>{
            this.setState({loading:false});
        })
        
    }
    render(){

        return(
            <div> 
            {this.state.orders.map(order=>(
            <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.totalPrice} />
            
            ))}
            </div>
      
        );
    }
}
export default withErrorHandler(Orders,axios);