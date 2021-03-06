import React from "react";
// nodejs library to set properties for components
//import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Timer from "components/Timer/Timer.jsx";

import { getTimers, getCategories, getTotalPages, createTimer, stopAllTimers, deleteTimer } from 'util/APIUtils';
import Pagination from "material-ui-flat-pagination";

// core components
import timerStyle from "assets/jss/material-dashboard-react/components/timerStyle.jsx";

class TimersList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      timers: [],
      refresh: false,
      categories: {},
      page: 1,
      totalPages: 1,
    };
    this.getUserTimers = this.getUserTimers.bind(this);
    this.addTimer = this.addTimer.bind(this);
    this.stopAllTimers = this.stopAllTimers.bind(this);
    this.changePage = this.changePage.bind(this);
    this.unmountTimer = this.unmountTimer.bind(this);
    this.props.onRef(this);
  }

  getUserTimers = () => {
   getTimers(this.state.page)
    .then(response => {
      if (this._isMounted) {
        this.setState({
          timers: response.timers
        });
      }
    }).catch(error => {
            
    });
  };

  setTotalPages = () => {
    getTotalPages()
      .then(response => {
        if (this._isMounted) {
          this.setState({
            totalPages: response
          });
        }
    }).catch(error => {
          
    });
  };

  setCategories = () => {
    getCategories()
      .then(response => {
        if (this._isMounted) {
          this.setState({
            categories: response.categories
          });
        }
    }).catch(error => {
          
    });
  };
    
  stopAllTimers = () => {
    stopAllTimers();
    this.updateTimers();
  };

  addTimer = () => {
    this.stopAllTimers();
    createTimer()
      .then(response => {
        this.updateTimers();
      }).catch(error => { 
          
      });
  };

  changePage = (pageNumber) => {
    this.setState({
      page: pageNumber + 1
    }, this.updateTimers());
  };

  updateTimers = () => {
    this.setState({
      refresh: !this.state.refresh
    }, () => this.getUserTimers());
  }

  componentDidMount() {
    this.setCategories();
    this.getUserTimers();
    this.setTotalPages();
    this._isMounted = true;
  };

  componentWillUnmount() {
    this._isMounted = false;
    this.props.onRef(undefined);
  };


  unmountTimer = (id) => {
    deleteTimer(id)
      .then(response => {
          this.getUserTimers();
      }).catch(error => {
          
      });
  }

  render() {
    return (
      <div>{
        this.state.timers.map((timer, i) => {
            return (<Timer 
              onRef={ref => (this.child = ref)} 
              key={timer.id} 
              time={timer.difference} 
              name={timer.title} 
              category={timer.category}
              categoryId={timer.categoryId}
              allCategories={this.state.categories}
              date={timer.start_date} 
              dateStart={timer.start_time} 
              timestamp={timer.start_at} 
              dateEnd={timer.end_time} 
              stopped={timer.end_time ? true : false}
              refresh={this.state.refresh}
              id={timer.id} 
              userTimers={() => this.getUserTimers()} 
              stopTimers={() => this.stopAllTimers()}
              removeMe={(id) => this.unmountTimer(id)}
              />) 
          })}
          <Pagination
            limit={1}
            offset={this.state.page - 1}
            total={this.state.totalPages}
            onClick={(e, page) => this.changePage(page)}
          />
      </div>
    );
  }
}

export default withStyles(timerStyle)(TimersList);
