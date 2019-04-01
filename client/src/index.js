import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from "history";
import UserFunctions from './app/UserFunctions';
import { Router, Switch } from 'react-router-dom'

import "./assets/css/material-dashboard-react.css";

const hist = createBrowserHistory();

const routing = (
    <Router history={hist}>
      <Switch>
        <UserFunctions />
      </Switch>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
