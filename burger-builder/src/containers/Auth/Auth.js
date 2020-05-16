import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import styles from './Auth.module.css';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {updatedObject,checkValid} from '../../shared/utility';
//I am having the state locally not in redux
//Because we are maniging this part locally 
class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false//To highlight the form fields only if the user touvhed the field otherwise not.
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false//To highlight the form fields only if the user touvhed the field otherwise not.
            }
        },
        isSignUp: true
    }
    componentDidMount()
    {
        if(!this.props.buildingBurger && this.props.authRedirectPath !=='/')
        {
            //This case means we are trying to redirect to '/checkout' even if we have not build a burger
            this.props.onSetAuthRedirectPath();//I will not pass any path here because we have alredy passed it
        }
    }
    
    inputChangeHandler = (event, controlName) => {
        const updatedControls =updatedObject(this.state.controls,{
            [controlName]: updatedObject(this.state.controls[controlName],{
                value: event.target.value,
                valid: checkValid(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })//This will take the key and deep clone it
              
               
        })
        this.setState({ controls: updatedControls });
    }
    onSubmitHandler = (event) => {
        event.preventDefault()
        //I haveto set the issignUp here
        // this.setState({});
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            };
        })
    }
    render() {
        let formElementsArray = [];//We are creating an array of formData
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}//Passing the aary data into the Input tag.
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                touched={formElement.config.touched}////To highlight the form fields only if the user touvhed the field otherwise not.
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}//It is set for drop down menu to not highlight it
                clicked={(event) => { this.inputChangeHandler(event, formElement.id) }} />//Making it an anonymous function so that we can pass an id
        ))
        if (this.props.loading) {
            form = <Spinner />
        }
        //Also if we have to display the errors from the firebase backend.
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>//This will give us the error messge that the backend displays
                //And we can display that error in the form
            );

        }
        let authRedirect=null
        if(this.props.isAuthenticated)
        {
            authRedirect=<Redirect to={this.props.authRedirectPath}/>//It will redirect us to the main page whenever we login
        }
        return (
            <div className={styles.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.onSubmitHandler}>
                    
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                    <Button
                        clicked={this.switchAuthModeHandler}
                        btnType="Danger">Switch to{this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
                </form>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated:state.auth.token!==null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actionCreators.auth(email, password, isSignUp)),
        onSetAuthRedirectPath:()=>dispatch(actionCreators.setAuthRedirectPath('/'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);