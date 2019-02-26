import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
import NotFound from './NotFound';
import Logout from './Logout';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

const routing = (
    <Router>
      <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/app" component={App} />
        <Route path="/logout" component={Logout} />
        <Route component={NotFound}/>
      </Switch>
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
