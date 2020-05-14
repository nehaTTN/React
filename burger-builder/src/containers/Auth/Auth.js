import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import styles from './Auth.module.css';
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
                    isEmail:true
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
                    minLength:6
                },
                valid: false,
                touched: false//To highlight the form fields only if the user touvhed the field otherwise not.
            }
        }
    }
    render() {
        let formElementsArray = [];//We are creating an array of formData
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        } 
        const form=formElementsArray.map(formElement => (
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

        return (
            <div className={styles.Auth}>
                <form>
                    {form}
                <Button btnType="Success">SUBMIT</Button>
                </form>
            </div>
        );
    }
}
export default Auth;