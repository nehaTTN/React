import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-orders';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionCreators from '../../store/actions/index';
class Orders extends Component{
    // state={
    //     orders:[],
    //     loading:false
    // }
    componentDidMount()
    {
        this.props.onFetchOrders(this.props.token,this.props.userId);
        // //Here the data received will not be in array form.
        // //So we have to convert it in array
        // axios.get('/orders.json')
        // .then(response=>{
        //     let fetchedData=[];
        //     for(let key in response.data)
        //     {
        //      fetchedData.push({
        //          ...response.data[key],
        //          id:key//Assigning it a key so that it can a unquie id
        //      });
        //     }

        //      this.setState({loading:false,orders:fetchedData});
        // })
        // .catch(error=>{
        //     this.setState({loading:false});
        // })
        
    }
    render(){
    let orders=<Spinner/>
    if(!this.props.loading)
    {
        orders=(
            this.props.orders.map(order=>(
                <Order
                key={order.id}
                ingredients={order.ingredients}
                prices={order.price} />
                
                ))
        );
    }
        return(
            <div> 
            {orders}
            </div>
      
        );
    }
}
const mapStateToProps=state=>{
    return{
    orders:state.order.orders,
    loading:state.order.loading,
    token:state.auth.token,
    userId:state.auth.userId
    };
}
const mapDispatchToProps=dispatch=>{
    return{
         onFetchOrders:(token,userId)=> dispatch(actionCreators.fetchOrders(token,userId))
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));