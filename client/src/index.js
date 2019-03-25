import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from 'react-router-dom'

// core components
import App from './layouts/App.jsx';
import Login from './Login';
import NotFound from './NotFound';
import Logout from './Logout';

import "./assets/css/material-dashboard-react.css";

const hist = createBrowserHistory();

const routing = (
    <Router history={hist}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/app" component={App} />
        <Route path="/logout" component={Logout} />
        <Route component={NotFound}/>
      </Switch>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
