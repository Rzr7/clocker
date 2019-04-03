import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Timer from "components/Timer/Timer.jsx";
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Icon  from '@material-ui/core/Icon';

import { getTimers, createTimer } from 'util/APIUtils';

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import timerStyle from "assets/jss/material-dashboard-react/components/timerStyle.jsx";
class Dashboard extends React.Component {
  state = {
    value: 0,
    timers: []
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.getUserTimers = this.getUserTimers.bind(this);
    this.addTimer = this.addTimer.bind(this);
    this.stopAllTimers = this.stopAllTimers.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  getUserTimers = () => {
    getTimers()
    .then(response => {
      if (this._isMounted) {
        this.setState({
          timers: response.timers
        });
      }
    }).catch(error => {
      
    });
  };

  stopAllTimers = () => {
    this.state.timers.map((child, i) => {
      this.child.stopFromParent();
    });
  };

  addTimer = () => {
    this.stopAllTimers();
    createTimer()
    .then(response => {
      this.getUserTimers();
    }).catch(error => { 
      
    });
  };

  componentDidMount() {
    this.getUserTimers();
    this._isMounted = true;
  };

  componentWillUnmount() {
    this._isMounted = false;
  };

  render() {
    const { classes } = this.props;
    
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Timers</h4>
                    <Tooltip 
                    id="tooltip-top"
                    placement="top"
                    title="Create Timer"
                    aria-label="Create Timer"
                    onClick={() => this.addTimer()}
                    className={timerStyle.timerStartBtn}>
                        <Fab size="medium" color="secondary">
                          <Icon>add</Icon>
                        </Fab>
                    </Tooltip>
              </CardHeader>
              <CardBody>
              {this.state.timers.map((timer, i) => {  
                return (<Timer 
                  onRef={ref => (this.child = ref)} 
                  key={timer.id} 
                  time={timer.difference} 
                  name={timer.title} 
                  date={timer.start_date} 
                  dateStart={timer.start_time} 
                  timestamp={timer.start_at} 
                  dateEnd={timer.end_time} 
                  id={timer.id} 
                  usertimers={() => this.getUserTimers()} 
                  stopTimers={() => this.stopAllTimers()}
                  />) 
              })}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
