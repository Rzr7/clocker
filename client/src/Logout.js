import React from 'react'

class Logout extends React.Component {
    state = {};
    constructor(props, context) {
      super(props, context);
    }
  
    componentDidMount() {
        this.logout();
    }

    logout = () => {
        localStorage.removeItem('session');
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