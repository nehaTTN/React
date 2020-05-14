import * as actionTypes from '../actions/actionsTypes';
import updatedObject from '../utility';
import { act } from '@testing-library/react';
const initialState = {
    orders: [],
    loading: false,
    purchased: false
}
const purchaseBurgerStart=(state,action)=>{
    return updatedObject(state, { loading: true })

}
const purchaseBurgerSuccess=(state,action)=>{
    const newOrder = updatedObject(action.orderData,{id: action.orderId})//We are merging the orderId and orderData together
    return updatedObject(state,{
    orders: state.orders.concat(newOrder),
    loading: false,
    purchased: true
});
}
const purchaseBurgerFailed=(state,action)=>{
    return updatedObject(state, { loading: false })

}
const purchaseInit=(state,action)=>{
    return updatedObject(state, { purchased: false })
}
const fetchOrdersStart=(state,action)=>{
    return updatedObject(state, { loading: true })
}
const fetchOrdersSuccess=(state,action)=>{
    return updatedObject(state, {
        orders: action.orders,
        loading: false

    })
}
const fetchOrdersFail=(state,action)=>{
    return updatedObject(state, { loading: false })
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state,action);
        case actionTypes.PURCHASE_BURGER_FAILED:return purchaseBurgerFailed(state,action);
        case actionTypes.PURCHASE_BURGER_START:return purchaseBurgerStart(state,action);
        case actionTypes.PURCHASE_INIT:return purchaseInit(state,action);
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state,action);
        case actionTypes.FETCH_ORDERS_SUCCESS:return fetchOrdersSuccess(state,action);
        case actionTypes.FETCH_ORDERS_FAIL:return fetchOrdersFail(state,action);
         default:return state

    }
}
export default reducer;