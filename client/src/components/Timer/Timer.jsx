import React from "react";
// nodejs library to set properties for components
//import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from '@material-ui/core/Paper';
// @material-ui/icons

import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Icon  from '@material-ui/core/Icon';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Moment from 'moment';
import { setTimerTitle, stopTimer, resumeTimer } from 'util/APIUtils';

// core components
import timerStyle from "assets/jss/material-dashboard-react/components/timerStyle.jsx";

class Timer extends React.Component {
    state = {
        id: null,
    };

    constructor(props) {
        super(props);
        this.state = {
          id: this.props.id,
          name: this.props.name,
          showTitle: true,
          date: this.props.date,
          dateStart: this.props.dateStart,
          dateEnd: this.props.dateEnd,
          time: this.props.time,
          timestamp: this.props.timestamp,
          timerButton: <Icon>play_arrow</Icon>,
          timerButtonTooltip: "Resume",
          stopped: true,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleTitleClick = this.handleTitleClick.bind(this);
        this.timer = this.timer.bind(this);
        this.stopCurrentTimer = this.stopCurrentTimer.bind(this);
        this.stopCurrentTimer = this.stopCurrentTimer.bind(this);
        this.handleTimerButton = this.handleTimerButton.bind(this);
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    handleTitleClick = event => {
        if (this.state.showTitle === true) {
            this.setState({
                showTitle: false,
                isFocusedTitle: true,
            });
        } else {
            this.setState({
                showTitle: true,
                isFocusedTitle: false,
            });
            var data = {
                title: this.state.name
            };
            setTimerTitle(this.state.id, data);
        }
    };

    componentDidMount() {
        if (this.state.dateEnd === null) {
            this.timer(); 
            var intervalId = setInterval(this.timer, 1000);
            this.setState({
                intervalId: intervalId,
                timerButton: <Icon>stop</Icon>,
                timerButtonTooltip: "Stop",
                stopped: false
            });
        }
        this.props.onRef(this);
    };

    timer = () => {
        if (this.state.dateEnd === null) {
            var ms = Moment().diff(Moment(this.state.timestamp));
            var d = Moment.duration(ms);
            var hours = String((d.days() * 24) + d.hours()).padStart(2, '0');
            var minutes = String(d.minutes()).padStart(2, '0');
            var seconds = String(d.seconds()).padStart(2, '0');
            var s = hours + ':' + minutes + ':' + seconds;
            this.setState({
                time: s
            });
        }
    };

    stopCurrentTimer = () => {
        if (!this.state.stopped) {
            if (this.state.intervalId !== null) {
                clearInterval(this.state.intervalId);
            }
            this.setState({
                dateEnd: Moment().format('HH:mm:ss'),
                timerButtonTooltip: "Resume",
                timerButton: <Icon>play_arrow</Icon>,
                intervalId: null,
            });
            stopTimer(this.state.id)
                .then(response => {
                    this.props.usertimers();
                }).catch(error => {
                    
                });
        }
    };

    resumeCurrentTimer = () => {
        resumeTimer(this.state.id)
            .then(response => {
                this.props.usertimers();
            }).catch(error => {
                
            });
    };

    handleTimerButton = () => {
        if (!this.state.stopped) {
            this.stopCurrentTimer();
        } else {
            this.props.stopTimers();
            this.resumeCurrentTimer();
        }
    }

    stopFromParent = () => {
        this.stopCurrentTimer();
    }

    componentWillUnmount() {
        if (this.state.intervalId !== null) {
            clearInterval(this.state.intervalId);
        }
        this.props.onRef(undefined);
    };
  
  render() {
    
    const {
        classes,
        className,
        time,
        date,
        dateStart,
        dateEnd,
        name,
        id,
        onRef,
        stopTimers,
        usertimers,
        ...rest
      } = this.props;
    return (
        <div className={classes.timerWrapper} {...rest}>
        <Paper elevation={1}>
            <GridContainer>
                <GridItem xs={6} sm={6} md={6}>
                <div className={classes.timerTextWrapper}>
                    <div className={classes.timerText}>
                        <span style={{display: this.state.showTitle ? 'block' : 'none' }} onClick={this.handleTitleClick} className={classes.timerTitle}>{this.state.name}</span>
                        <span style={{display: this.state.showTitle ? 'none' : 'block' }}>
                        <CustomInput
                            id="title"
                            inputProps={{
                                placeholder: "Title",
                                value: this.state.name,
                                onChange: this.handleChange('name'),
                                onBlur: this.handleTitleClick,
                                className: classes.timerInput,
                                autoFocus: this.state.isFocusedTitle,
                                key: this.state.isFocusedTitle
                            }}
                            formControlProps={{
                                fullWidth: true,
                                className: classes.timerInput,
                            }}
                        />
                        </span>
                    </div>
                </div>
                </GridItem>
                <GridItem xs={3} sm={3} md={3}>
                    <div className={classes.timerDate}>
                    <GridContainer>
                        <GridItem xs={3} sm={3} md={3}>
                            <span className={classes.timerDay}>{this.state.date}</span>
                        </GridItem>
                        <GridItem xs={5} sm={5} md={5}>
                            <GridContainer>
                                <GridItem xs={6} sm={6} md={5}>
                                    {this.state.dateStart}
                                </GridItem>
                                <GridItem xs={6} sm={6} md={1}>
                                    - 
                                </GridItem>
                                <GridItem xs={6} sm={6} md={5}>
                                    {this.state.dateEnd}
                                </GridItem>
                            </GridContainer>
                        </GridItem>
                    </GridContainer>
                    </div>
                         
                    
                </GridItem>
                <GridItem xs={2} sm={2} md={2}>
                    <div className={classes.timerTime}>
                        {this.state.time} h
                    </div>
                </GridItem>
                <GridItem xs={1} sm={1} md={1}>
                    <Tooltip 
                    id="tooltip-top"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                    title={this.state.timerButtonTooltip}
                    aria-label={this.state.timerButtonTooltip}
                    onClick={() => this.handleTimerButton()}
                    className={classes.timerStartBtn}>
                        <Fab size="medium" color="secondary" className={classes.margin}>
                            {this.state.timerButton}
                        </Fab>
                    </Tooltip>
                </GridItem>
            </GridContainer>
        </Paper>
        </div>
    );
  }
}
/*
Timer.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  date: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
*/
export default withStyles(timerStyle)(Timer);
