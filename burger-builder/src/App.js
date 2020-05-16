import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout.js';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch, Redirect } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actionTypes from './store/actions/index';
//We have to apply lazy loading
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    //This code will help us in user mannully entering the path and accessing it
    let routes = (

      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Redirect to="/" />
      </Switch>

    );
    if (this.props.isAutheticated) {
      routes = (
        <Switch>
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/logout" exact component={Logout}></Route>
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Redirect to="/" />
        </Switch>

      );
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>

    );
  }

}
const mapStateToProps = state => {
  return {
    isAutheticated:state.auth.token !== null
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actionTypes.authCheckState())
  };
}
//We can connect this with withRouterConnect(which is a higher order component) if the routing causes an error
export default connect(mapStateToProps, mapDispatchToProps)(App);
//BrowserRouter is used in index.js because the app is bounded  there.



