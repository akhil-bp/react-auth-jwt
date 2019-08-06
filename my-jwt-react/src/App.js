import React,{Component} from 'react';
import {BrowserRouter , Switch , Route} from 'react-router-dom';
import './App.css';
import Register from './components/register';
import Header from './components/header';
import Dashboard from './components/dashboard';
import Temp from './components/temp';
import withAuth from './withAuth';
 

export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" component={Register} exact />
            <Route path="/dashboard" component={withAuth(Dashboard)} exact />
            <Route component={Temp} />
          </Switch>
      </BrowserRouter>
    );

  }
}

