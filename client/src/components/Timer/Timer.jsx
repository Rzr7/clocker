import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
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
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleTitleClick = this.handleTitleClick.bind(this);
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
        }
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
                        <span className={classes.timerDay}>{date}</span> {dateStart} - {dateEnd}
                    </div>
                </GridItem>
                <GridItem xs={2} sm={2} md={2}>
                    <div className={classes.timerTime}>
                        {time} h
                    </div>
                </GridItem>
                <GridItem xs={1} sm={1} md={1}>
                    <Tooltip 
                    id="tooltip-top"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                    title="Resume" 
                    aria-label="Resume"
                    className={classes.timerStartBtn}>
                        <Fab size="medium" color="secondary" className={classes.margin}>
                            <Icon>play_arrow</Icon>
                        </Fab>
                    </Tooltip>
                </GridItem>
            </GridContainer>
        </Paper>
        </div>
    );
  }
}

Timer.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  time: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default withStyles(timerStyle)(Timer);
