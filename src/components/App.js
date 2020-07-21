import React from 'react';
import Header from './Header';
import Toppage from './Toppage';
import Register from './Register';
import Login from './Login';
import Auth from './Auth';
import Home from './Home';

import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import './App.css'

class App extends React.Component {

  render() {

    return (
      
      <Router>

        <Header />
        
        <Switch>

          <Route exact path='/Toppage'>
            <Toppage />
          </Route>

          <Route exact path='/Register'>
            <Register />
          </Route>

          <Route exact path='/Login'>
            <Login />
          </Route>

          <Auth>
            <Switch>

              <Route path='/'>
              
              <Home />

              </Route>

            </Switch>
          </Auth>
        </Switch>
      </Router>
    );
  }
}

export default App;