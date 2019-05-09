import React from "react";
import Chart from 'react-google-charts';
import {reportCurYear, 
    reportPrevYear, 
    reportCurMonth, 
    reportPrevMonth, 
    reportCurWeek, 
    reportPrevWeek} from 'util/APIUtils';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import dropdownStyle from "assets/jss/material-dashboard-react/dropdownStyle.jsx";

class BarChart extends React.Component {
    state = {
        chartData:
        {
            curYear: [
                ['Month', 'Total Hours'],
                ['January', 0],
                ['February', 0],
                ['March', 0],
                ['April', 0],
                ['May', 0],
                ['June', 0],
                ['July', 0],
                ['August',  0],
                ['September', 0],
                ['October', 0],
                ['November', 0],
                ['December', 0]
            ],
            prevYear: [
                ['Month', 'Total Hours'],
                ['January', 0],
                ['February', 0],
                ['March', 0],
                ['April', 0],
                ['May', 0],
                ['June', 0],
                ['July', 0],
                ['August',  0],
                ['September', 0],
                ['October', 0],
                ['November', 0],
                ['December', 0]
            ],
            curMonth: [
                ['Day', 'Total Hours'],
                ['1', 0],
                ['2', 0],
                ['3', 0],
                ['4', 0],
                ['5', 0],
                ['6', 0],
                ['7', 0],
                ['8', 0],
                ['9', 0],
                ['10', 0],
                ['11', 0],
                ['12', 0],
                ['13', 0],
                ['14', 0],
                ['15', 0],
                ['16', 0],
                ['17', 0],
                ['18', 0],
                ['19', 0],
                ['20', 0],
                ['21', 0],
                ['22', 0],
                ['23', 0],
                ['24', 0],
                ['25', 0],
                ['26', 0],
                ['27', 0],
                ['28', 0],
                ['29', 0],
                ['30', 0],
                ['31', 0]
            ],
            prevMonth: [
                ['Day', 'Total Hours'],
                ['1', 0],
                ['2', 0],
                ['3', 0],
                ['4', 0],
                ['5', 0],
                ['6', 0],
                ['7', 0],
                ['8', 0],
                ['9', 0],
                ['10', 0],
                ['11', 0],
                ['12', 0],
                ['13', 0],
                ['14', 0],
                ['15', 0],
                ['16', 0],
                ['17', 0],
                ['18', 0],
                ['19', 0],
                ['20', 0],
                ['21', 0],
                ['22', 0],
                ['23', 0],
                ['24', 0],
                ['25', 0],
                ['26', 0],
                ['27', 0],
                ['28', 0],
                ['29', 0],
                ['30', 0]
            ],
            curWeek: [
                ['Day', 'Total Hours'],
                ['Monday', 0],
                ['Tuesday', 0],
                ['Wednesday', 0],
                ['Thursday', 0],
                ['Friday', 0],
                ['Saturday', 0],
                ['Sunday',  0]
            ],
            prevWeek: [
                ['Day', 'Total Hours'],
                ['Monday', 0],
                ['Tuesday', 0],
                ['Wednesday', 0],
                ['Thursday', 0],
                ['Friday', 0],
                ['Saturday', 0],
                ['Sunday',  0]
            ],
        },
        chartSubTitle: 'This Year',
        currentFilter: 'curYear',
    };

    styles = {
        formControl: {
          minWidth: 250,
        },
    };

    months = [
        0,
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    dayOfWeek = [
        0,
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    handleFilterChange = event => {
        this.setState({ [event.target.name]: event.target.value }, () => {
            this.updateCharts();
        });
    };

    componentWillUnmount() {
        this.setState({chartData: []});
    }

    componentDidMount() {
        this.updateCharts();
    }

    updateCharts() {
        var newChartDataUnformatted = [];
        switch (this.state.currentFilter) {
            case 'curYear':
                reportCurYear().then(response => {
                    newChartDataUnformatted = Object.keys(response.reportResponse);
                    var that = this;
                    newChartDataUnformatted.map(function (month, index) {
                        that.state.chartData.curYear.map(function (data, index) {
                            if (data[0] === that.months[month]) {
                                data[1] = response.reportResponse[month];
                            }
                            return data;
                        });
                        return newChartDataUnformatted;
                    });
                    this.setState({
                        chartSubTitle: 'This Year'
                    });
                }).catch(error => {
                      console.log(error);
                });
                break;
            case 'prevYear':
                reportPrevYear().then(response => {
                    newChartDataUnformatted = Object.keys(response.reportResponse);
                    var that = this;
                    newChartDataUnformatted.map(function (month, index) {
                        that.state.chartData.prevYear.map(function (data, index) {
                            if (data[0] === that.months[month]) {
                                data[1] = response.reportResponse[month];
                            }
                            return data;
                        });
                        return newChartDataUnformatted;
                    });
                    this.setState({
                        chartSubTitle: 'Previous Year'
                    });
                }).catch(error => {
                    console.log(error);
                });
                break;
            case 'curMonth':
                reportCurMonth().then(response => {
                    newChartDataUnformatted = Object.keys(response.reportResponse);
                    var that = this;
                    newChartDataUnformatted.map(function (day, index) {
                        that.state.chartData.curMonth.map(function (data, index) {
                            if (data[0] === day) {
                                data[1] = response.reportResponse[day];
                            }
                            return data;
                        });
                        return newChartDataUnformatted;
                    });
                    this.setState({
                        chartSubTitle: 'This Month'
                    });
                }).catch(error => {
                    console.log(error);
                });
                break;
            case 'prevMonth':
                reportPrevMonth().then(response => {
                    newChartDataUnformatted = Object.keys(response.reportResponse);
                    var that = this;
                    newChartDataUnformatted.map(function (day, index) {
                        that.state.chartData.prevMonth.map(function (data, index) {
                            if (data[0] === day) {
                                data[1] = response.reportResponse[day];
                            }
                            return data;
                        });
                        return newChartDataUnformatted;
                    });
                    this.setState({
                        chartSubTitle: 'Previous Month'
                    });
                }).catch(error => {
                    console.log(error);
                });
                break;
            case 'curWeek':
                reportCurWeek().then(response => {
                    newChartDataUnformatted = Object.keys(response.reportResponse);
                    var that = this;
                    newChartDataUnformatted.map(function (day, index) {
                        that.state.chartData.curWeek.map(function (data, index) {
                            if (data[0] === that.dayOfWeek[day]) {
                                data[1] = response.reportResponse[day];
                            }
                            return data;
                        });
                        return newChartDataUnformatted;
                    });
                    this.setState({
                        chartSubTitle: 'This Week'
                    });
                }).catch(error => {
                    console.log(error);
                });
                break;
            case 'prevWeek':
                reportPrevWeek().then(response => {
                    newChartDataUnformatted = Object.keys(response.reportResponse);
                    var that = this;
                    newChartDataUnformatted.map(function (day, index) {
                        that.state.chartData.prevWeek.map(function (data, index) {
                            if (data[0] === that.dayOfWeek[day]) {
                                data[1] = response.reportResponse[day];
                            }
                            return data;
                        });
                        return newChartDataUnformatted;
                    });
                    this.setState({
                        chartSubTitle: 'Previous Week'
                    });
                }).catch(error => {
                    console.log(error);
                });
                break;
            default:
                
        }
    }

    render() {
        return (
            <div>
                <div className="chartFilter">
                    <FormControl style={this.styles.formControl}>
                        <InputLabel htmlFor="period">Period</InputLabel>
                        <Select
                            value={this.state.currentFilter}
                            onChange={this.handleFilterChange}
                            inputProps={{
                            name: 'currentFilter',
                            id: 'period',
                            }}
                        >
                            <MenuItem value={'curYear'}>This Year</MenuItem>
                            <MenuItem value={'prevYear'}>Previous Year</MenuItem>
                            <MenuItem value={'curMonth'}>This Month</MenuItem>
                            <MenuItem value={'prevMonth'}>Previous Month</MenuItem>
                            <MenuItem value={'curWeek'}>This Week</MenuItem>
                            <MenuItem value={'prevWeek'}>Previous Week</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <Chart
                    width={'100%'}
                    height={500}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={this.state.chartData[this.state.currentFilter]}
                    options={{
                        backgroundColor: {
                            fill: '#eeeeee',
                        },
                        chartArea: {
                            // leave room for y-axis labels
                            width: '94%'
                        },
                        title: this.state.chartSubTitle,
                        animation: {
                            duration: 200,
                            easing: 'out',
                            startup: true,
                        },
                        legend: 'none',
                        vAxis: {
                            format:'#h',
                            minValue: 0,
                        }
                    }}
                />
            </div>
        );
    }
}

export default withStyles(dropdownStyle)(BarChart);