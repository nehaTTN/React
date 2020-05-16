import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems=(props)=>(
    <ul className={styles.NavigationItems}>
    <NavigationItem link="/" exact active> Burger Builder</NavigationItem>
    {/* //We are passing excat here as a prop so that it wont get applied to every link */}
    {props.isAuthenticated?<NavigationItem link="/orders">Orders</NavigationItem>:null}
    {/* In the above action The orders will be only shown if the user is autenticated. */}
    {props.isAuthenticated
    ?<NavigationItem link="/logout">Logout</NavigationItem>
    :<NavigationItem link="/auth">Authenticate</NavigationItem>}
    


    </ul>

)
export default navigationItems;