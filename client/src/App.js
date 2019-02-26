import React, { Component } from 'react';
import './App.css';
import checkAuth from './Functions'

class App extends Component {
  state = {
    viewData: {}
  };

  componentDidMount() {
    checkAuth().then((result) => {
      if (!result) {
        window.location.replace("/");
      } else {
        this.setState({ viewData: result });
      }
    });
  }

  logout = () => {
    window.location.replace("/logout");
  }
  render() {
    return (
      <div className="App">
        <div className="simple-text">You are logged in as: {this.state.viewData.username}</div>
        <div className="simple-logout"><a href="/logout">Logout</a></div>
      </div>
    );
  }
}

export default App;
