import React,{useState} from 'react';
import Aux from '../Aux/Aux';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';
const Layout = props => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };
 
  
    return(
      <Aux>
      <Toolbar 
      isAuth={props.isAuthenticated}
      drawerToggleClicked={sideDrawerToggleHandler}/>
      <SideDrawer 
      isAuth={props.isAuthenticated}
      open={sideDrawerIsVisible}
      close={sideDrawerClosedHandler}
      />
        <main className={styles.Content}>
            {props.children}
          </main>
    </Aux>

    );

  
}
const mapStateToProps=state=>{
  return{
   isAuthenticated:state.auth.token!==null//If we do not have token i.e. we are not logged in or the sesson expired
   //In both case we dont have any token
  };
};

export default connect(mapStateToProps)(Layout);
