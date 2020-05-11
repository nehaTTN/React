import React,{Component} from 'react';
import Layout from './hoc/Layout/Layout.js';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route,Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
class App extends Component {
  render()
  {
    return (
      <div>
       <Layout>
      <Switch>
      <Route path="/" exact component={BurgerBuilder}></Route>
      <Route path="/orders" component={Orders}/>
      <Route path="/checkout" component={Checkout}></Route>
     </Switch>
       </Layout>
      </div>
     
    );
  }

}
export default App;
//BrowserRouter is used in index.js because the app is bounded  there.



