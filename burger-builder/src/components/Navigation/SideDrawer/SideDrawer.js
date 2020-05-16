import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';
const sideDrawer=(props)=>{
    let attatchedClasses=[styles.SideDrawer,styles.Close];
    if(props.open)
    {
        attatchedClasses=[styles.SideDrawer,styles.Open]
    }
    return(
        <Aux>
        <Backdrop show={props.open}
        clicked={props.close}/>
        {/* //Whenever we will click anyywhere in the side drawer it will be closed */}
        <div className={attatchedClasses.join(' ')} onClick={props.close}>
        <div className={styles.Logo}>
        <Logo/>
        </div>
        <nav>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
        </div>
        </Aux>
    );   
  }
export default sideDrawer