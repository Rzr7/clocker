/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Navbar from "components/Navbars/Navbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import checkAuth from 'Functions'

import routes from "routes.js";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-4.jpg";
import logo from "assets/img/time-played.png";

import { getCurrentUser } from 'util/APIUtils';

const switchRoutes = (currentUser) => (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/app") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={() => <prop.component currentUser={currentUser} />}
            key={key}
          />
        );
      }
    })}
  </Switch>
);

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: image,
      color: "blue",
      hasImage: true,
      fixedClasses: "dropdown show",
      mobileOpen: false,
      viewData: {},
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    };
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
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
  drawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
    checkAuth().then((result) => {
      if (!result) {
        window.location.replace("/");
      } else {
        this.setState({ viewData: result });
      }
    });
    this.loadCurrentUser();
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  logout = () => {
    window.location.replace("/logout");
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={routes}
          logoText={"Clocker"}
          logo={logo}
          image={this.state.image}
          handleDrawerToggle={this.drawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Navbar
            routes={routes}
            handleDrawerToggle={this.drawerToggle}
            {...rest}
          />
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes(this.state.currentUser)}</div>
            </div>
           <Footer />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
