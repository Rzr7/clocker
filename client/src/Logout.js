import React from 'react'

import { ACCESS_TOKEN } from 'constants/index.js';

class Logout extends React.Component {

    componentDidMount() {
        this.logout();
    }

    logout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.clear();
        window.location.replace("/");
    }
    render() {
      return (
        <div className="App">
          Loging out
        </div>
      );
    }
  }
export default Logout