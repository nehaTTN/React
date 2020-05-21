import React, { useEffect, Suspense } from 'react';
import Layout from './hoc/Layout/Layout.js';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actionTypes from './store/actions/index';
const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});
const App = props => {
  useEffect(() => {
    props.onTryAutoSignup();
  }, []);
  //This code will help us in user mannully entering the path and accessing it
  let routes = (
    <Switch>
      <Route path="/auth" render={props => <Auth  {...props}/>} />
      <Route path="/" exact component={BurgerBuilder}></Route>
      <Redirect to="/" />
    </Switch>

  );
  if (props.isAutheticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={props => <Checkout {...props} />} />
        <Route path="/orders" render={props => <Orders  {...props}/>} />
        <Route path="/logout" exact component={Logout}></Route>
        <Route path="/auth" render={props => <Auth {...props} />}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Redirect to="/" />
        </Switch>

      );}
    return (
        <div>
          <Layout>
          <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
          </Layout>
        </div>

    );
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



