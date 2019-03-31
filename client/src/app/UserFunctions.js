import React, { Component } from 'react';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';

import { getCurrentUser } from 'util/APIUtils';
import { ACCESS_TOKEN } from 'constants/index.js';

import Login from 'Login';
import App from 'layouts/App.jsx';
import NotFound from 'NotFound';
import Logout from 'Logout';

class UserFunctions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo="/") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);
  }

  handleLogin() {
    this.loadCurrentUser();
    this.props.history.push("/");
  }

  render() {
    return (
              <Switch>      
                <Route exact path="/" component={Login} >
                </Route>
                <Route path="/logout" component={Logout} ></Route>
                <Route path="/app" component={App} />
                <Route component={NotFound}></Route>
              </Switch>
    );
  }
}

export default withRouter(UserFunctions);