import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    return (
      //I can set the basename here as follows
      // <BrowserRouter basename="/">
      <BrowserRouter >
      <div className="App">
        <Blog />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
