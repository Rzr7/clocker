import React, { Component } from 'react';
import './App.css';
import $ from "jquery";
import axios from "axios";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import checkAuth from './Functions'

library.add(faCheck)

class App extends Component {
  state = {};
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    checkAuth().then(function(result) {
      if (!result) {
        window.location.replace("/");
      }
    });
  }

  logout = () => {
    window.location.replace("/logout");
  }
  render() {
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default App;
