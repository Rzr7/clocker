import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
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
