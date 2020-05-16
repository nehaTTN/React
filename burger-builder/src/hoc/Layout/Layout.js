import React,{Component} from 'react';
import Aux from '../Aux/Aux';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';
class Layout extends Component{
  state={
    showSideDrawer:false
  }
  sideDrawerCloseHandler=()=>{
    this.setState({showSideDrawer:false});
  }
  sideDrawerToggleHandler=()=>{
    this.setState((prevState)=>{
    return {showSideDrawer:!prevState.showSideDrawer}
    });
  
}
  render()
  {
    return(
      <Aux>
      <Toolbar 
      isAuth={this.props.isAuthenticated}
      drawerToggleClicked={this.sideDrawerToggleHandler}/>
      <SideDrawer 
      isAuth={this.props.isAuthenticated}
      open={this.state.showSideDrawer}
      close={this.sideDrawerCloseHandler}
      />
        <main className={styles.Content}>
            {this.props.children}
          </main>
    </Aux>

    );

  }
}
const mapStateToProps=state=>{
  return{
   isAuthenticated:state.auth.token!==null//If we do not have token i.e. we are not logged in or the sesson expired
   //In both case we dont have any token
  };
};

export default connect(mapStateToProps)(Layout);
