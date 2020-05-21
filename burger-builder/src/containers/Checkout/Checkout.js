// import React, { Component } from "react";
// import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
// import ContactData from './ContactData/ContactData';
// import { Route, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// const Checkout = props => {
//     //We will pass the ingredients in the query parameters
//     // state={
//     //     ingredients:{
//     //         salad:1,
//     //         cheese:1,
//     //         bacon:1,
//     //         meat:1
//     //     },
//     //     // ingredients:{},
//     //     totalPrice:0

//     // }
//     // //Even if we referesh the page the state will be the same because we are 
//     // //setting it in componentDidMount.
//     // //Here we are adding it in componentDidMount because it will not chnage again and again
//     // componentDidMount()
//     // {

//     //     const query=new URLSearchParams(this.props.location.search);
//     //     // URLSearchParams are used to parse strings after ?

//     //     const ingredients={};
//     //     let amount=0;

//     //     for(let param of query.entries())
//     //     {

//     //         if(param[0] === 'price')
//     //         {
//     //             console.log('param',param[0]);
//     //         amount=param[1];
//     //         console.log('amount',amount);

//     //         }
//     //         else{
//     //         // We get this in this form ['salad','1']
//     //         ingredients[param[0]]=+param[1];//Converting this string into integer with using'+'
//     //         }


//     //     }

//     //     this.setState({ingredients:ingredients,totalPrice:amount});
//     //     console.log('price',this.state.totalPrice);
//     // }
//     const checkoutCancelHandler = () => {
//         props.history.goBack();//Here we are going to the previous paage.
//     }
//     const checkoutContinueHandler = () => {
//         props.history.replace('/checkout/contact-data');//rediecting to the other page
//     }
//     //In checkout summary if not redirected or spinner is not shown it will show error in contact data
//     //because the ingredients are null their
//     let summary = <Redirect to='/' />
//     if(props.ingred)
//     {
//     const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null
//     summary = (
//         <div>
//             {purchasedRedirect}
//             <CheckoutSummary
//                 ingredients={props.ingred}
//                 checkoutCanceled={checkoutCancelHandler}
//                 checkoutContinued={checkoutContinueHandler} />
//             <Route path={props.match.path + '/contact-data'}
//                 component={ContactData}
//             // render={(props)=><ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}
//             />
//         </div>
//     );
//     }
//     return summary;
// }
// const mapStateToProps = state => {
//     return {
//         ingred: state.burgerBuilder.ingredients,
//         purchased: state.order.purchased
//     };
// }
// export default connect(mapStateToProps)(Checkout);
// //We can omit the second value in this
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = props => {
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

  let summary = <Redirect to="/" />;
  if (props.ings) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        <Route
          path={props.match.path + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  }
  return summary;
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);