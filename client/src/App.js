import React, { Component } from 'react';
import './App.css';
import checkAuth from './Functions'
import HeaderMenu from './app/header'

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
        <HeaderMenu username={this.state.viewData.username} />
      </div>
    );
  }
}

export default App;
