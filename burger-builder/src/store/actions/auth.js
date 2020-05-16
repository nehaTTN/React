import * as actionTypes from './actionsTypes';
import axios from 'axios';
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}
export const authSuccess = (token,userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    };
}
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
}
export const authLogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return{
    type:actionTypes.AUTH_LOGOUT
    };
};
export const authCheckTimeOut=(expirationTime)=>{
//It will expire the session after 1 hour and we are calling setTimeOut which is an async function
return dispatch=>{
    setTimeout(()=>{
     dispatch(authLogout())
    },expirationTime*1000);//Here we pass time in miliseconds and from response.data we get in seconds 
}
}
export const auth = (email, password,isSignUp) => {
    console.log('Before dispatching');
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
    
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYV6tnV6R6EhHnFaaf96hoNX1xONXwj8I'
        if(!isSignUp)
        { 
         url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYV6tnV6R6EhHnFaaf96hoNX1xONXwj8I'
        }
        
        axios.post(url, authData)
        .then(response=>{ 
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

         // //localstorage is by default provided by javascript and it will help us to store data in our browser
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate)//It is like key value pair
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data.idToken,response.data.localId));
        dispatch(authCheckTimeOut(response.data.expiresIn));

        })
        .catch(error=>{
            dispatch(authFail(error.response.data.error))//It will give us the error generatd in the response data
            
        })

    };
}
export const setAuthRedirectPath=(path)=>{
    return{
    type:actionTypes.SET_AUTH_REDIRECT_PATH,
    path:path
    };
    } 


    export const authCheckState = () => {//This method is written  so that if the page is refreshed the user still remains loggedIn
        return dispatch => {
            const token = localStorage.getItem('token');
            if (!token) {
                dispatch(authLogout());
            } else {
                const expirationDate = new Date(localStorage.getItem('expirationDate'));
                if (expirationDate <= new Date()) {
                    dispatch(authLogout());
                } else {
                    const userId = localStorage.getItem('userId');
                    dispatch(authSuccess(token, userId));
                    dispatch(authCheckTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000 ));
                }   
            }
        };
    };