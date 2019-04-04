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
import TimersList from "components/Timer/TimersList.jsx";
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Icon  from '@material-ui/core/Icon';
import { MuiPickersUtilsProvider  } from "material-ui-pickers";
import MomentUtils from '@date-io/moment';

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
class Dashboard extends React.Component {
  state = {
    value: 0,
    timers: []
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  addTimer = () => {
    this.child.addTimer();
  };

  render() {
    const { classes } = this.props;
    
    return (
      <div>
        <MuiPickersUtilsProvider utils={MomentUtils}>
 
        
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
                    className={classes.timerCreateBtn}>
                        <Fab size="medium" color="secondary">
                          <Icon>add</Icon>
                        </Fab>
                    </Tooltip>
              </CardHeader>
              <CardBody>
                <TimersList onRef={ref => (this.child = ref)} />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
