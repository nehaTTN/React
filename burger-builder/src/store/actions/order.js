import * as actionTypes from '../../store/actions/actionsTypes';
import axios from '../../axios-orders';
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
}

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    };
}
export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
}
export const purchaseInit = () => {

    return {
        type: actionTypes.PURCHASE_INIT
    };
}

export const purchaseBurger = (orderData) => {

    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))//We havvr transferred orderData so that we can store it in our local store
            })
            .catch(error => {
                dispatch(purchaseBurgerFailed(error))
            });
    }
}
export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
}
export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
}
export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
}
export const fetchOrders = () => {
    return dispatch => {
        //Here the data received will not be in array form.
        //So we have to convert it in array
        dispatch(fetchOrdersStart())
        axios.get('/orders.json')
            .then(response => {
                let fetchedData = [];
                for (let key in response.data) {
                    fetchedData.push({
                        ...response.data[key],
                        id: key//Assigning it a key so that it can a unquie id
                    });
                }

                dispatch(fetchOrdersSuccess(fetchedData))
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error))
            })
    };
}