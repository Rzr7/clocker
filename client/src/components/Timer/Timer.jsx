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
import { setTimerTitle, stopTimer, resumeTimer, fetchTimer, updateTimerTime } from 'util/APIUtils';
import DeleteIcon from '@material-ui/icons/Delete';
import { TimePicker } from "material-ui-pickers";


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
          difference: this.props.time,
          timestamp: this.props.timestamp,
          timerButton: <Icon>play_arrow</Icon>,
          timerButtonTooltip: "Resume",
          stopped: this.props.stopped,
          timepickerValueStart: Moment(this.props.dateStart, "HH:mm:ss"),
          timepickerValueEnd: Moment(this.props.dateEnd, "HH:mm:ss")
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleTitleClick = this.handleTitleClick.bind(this);
        this.timer = this.timer.bind(this);
        this.stopCurrentTimer = this.stopCurrentTimer.bind(this);
        this.stopCurrentTimer = this.stopCurrentTimer.bind(this);
        this.handleTimerButton = this.handleTimerButton.bind(this);
        this.stopCurrentTimer = this.stopCurrentTimer.bind(this);
        this.editStartTime = this.editStartTime.bind(this);
        this.editEndTime = this.editEndTime.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
        this.updateTimersTimeAfterTimepicker = this.updateTimersTimeAfterTimepicker.bind(this);
        this.timePickerStart = React.createRef();
        this.timePickerEnd = React.createRef();
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
            this.intervalId = setInterval(() => this.timer(), 1000);
            this.setState({
                timerButton: <Icon>stop</Icon>,
                timerButtonTooltip: "Stop",
                stopped: false,
                highlight: this.props.classes.timerActive
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
                difference: s
            });
        }
    };

    stopCurrentTimer = () => {
        if (!this.state.stopped) {
            stopTimer(this.state.id)
                .then(response => {
                    this.updateTimer();
                }).catch(error => {
                    
                });
        }
    };

    resumeCurrentTimer = () => {
        resumeTimer(this.state.id)
            .then(response => {
                this.updateTimer();
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

    deleteCurrentTimer = () => {
        this.props.removeMe(this.state.id);
    }

    editEndTime = () => {
        this.timePickerEnd.current.open();
    }

    editStartTime = () => {
        this.timePickerStart.current.open();
    }

    handleEndChange = date => {
        this.setState({
            timepickerValueEnd: date,
        }, () => this.updateTimersTimeAfterTimepicker());
    }

    handleStartChange = date => {
        this.setState({
            timepickerValueStart: date,
        }, () => this.updateTimersTimeAfterTimepicker());
    }

    updateTimersTimeAfterTimepicker = () => {
        var updateData = {
            start_time: this.state.timepickerValueStart.format(),
            end_time: this.state.timepickerValueEnd.format(),
        }
        updateTimerTime(updateData, this.state.id).then(response => {
            this.updateTimer();
        });
    }

    updateTimer = () => {
        fetchTimer(this.state.id)
        .then(response => {
            if (!this.state.stopped && response.end_time) {
                this.setState({
                    dateEnd: Moment().format('HH:mm:ss'),
                    timerButtonTooltip: "Resume",
                    timerButton: <Icon>play_arrow</Icon>,
                    highlight: ''
                });
                clearInterval(this.state.intervalId);
            }
            this.setState({
                name: response.title,
                date: response.start_date,
                dateStart: response.start_time,
                dateEnd: response.end_time,
                difference: response.difference,
                timestamp: response.timestamp,
                stopped: response.end_time ? true : false
            });
            this.props.userTimers();
        });
    }

    componentWillUnmount() {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
        }
        this.props.onRef(undefined);
    };

    componentWillReceiveProps(props) {
        const { refresh, id } = this.props;
        if (props.refresh !== refresh) {
          this.updateTimer();
        }
    }
  
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
        userTimers,
        refresh,
        stopped,
        removeMe,
        ...rest
      } = this.props;
    return (
        <div className={classes.timerWrapper} {...rest}>
        
        <Paper elevation={1} className={classes.timerPaper + ' ' + this.state.highlight}>
            <GridContainer>
                <GridItem xs={5} sm={4} md={3}>
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
                <GridItem xs={3} sm={3} md={5}>
                    <div className={classes.timerDate}>
                    <GridContainer>
                        <GridItem xs={6} sm={6} md={4}>
                            <span className={classes.timerDay}>{this.state.date}</span>
                        </GridItem>
                        <GridItem xs={6} sm={6} md={6}>
                            <div className={classes.timerEnd}>
                                <span className={classes.timerTimeHover} onClick={() => this.editStartTime()}>{this.state.dateStart}</span> - <span className={classes.timerTimeHover} onClick={() => this.editEndTime()}>{this.state.dateEnd}</span>
                            </div>
                        </GridItem>
                    </GridContainer>
                    </div>
                         
                    
                </GridItem>
                <GridItem xs={6} sm={4} md={1}>
                    <div className={classes.timerTime}>
                        {this.state.difference} h
                    </div>
                </GridItem>
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
                    <div className={classes.timerControls}>
                        <Tooltip 
                        id="tooltip-top"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                        title="Delete"
                        aria-label="Delete"
                        onClick={() => this.deleteCurrentTimer()}
                        >
                            <DeleteIcon className={classes.icon} />
                        </Tooltip>
                        <TimePicker
                        ampm={false}
                        format="HH:mm:ss"
                        label="24 hours"
                        value={this.state.timepickerValueEnd}
                        onChange={this.handleEndChange}
                        className={classes.hidden}
                        ref={this.timePickerEnd}
                        />
                        <TimePicker
                        ampm={false}
                        format="HH:mm:ss"
                        label="24 hours"
                        value={this.state.timepickerValueStart}
                        onChange={this.handleStartChange}
                        className={classes.hidden}
                        ref={this.timePickerStart}
                        />
                    </div>
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
