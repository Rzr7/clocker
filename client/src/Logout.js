import React from 'react'

class Logout extends React.Component {

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