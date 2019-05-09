import React from "react";
import Chart from 'react-google-charts';
import {reportCurYearCategory, 
    reportPrevYearCategory, 
    reportCurMonthCategory, 
    reportPrevMonthCategory, 
    reportCurWeekCategory, 
    reportPrevWeekCategory} from 'util/APIUtils';

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
                ['Category', 'Total Hours'],
                ['No Category', 0]
            ],
            prevYear: [
                ['Category', 'Total Hours'],
                ['No Category', 0]
            ],
            curMonth: [
                ['Category', 'Total Hours'],
                ['No Category', 0]

            ],
            prevMonth: [
                ['Category', 'Total Hours'],
                ['No Category', 0]
            ],
            curWeek: [
                ['Category', 'Total Hours'],
                ['No Category', 0]
            ],
            prevWeek: [
                ['Category', 'Total Hours'],
                ['No Category', 0]
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
                reportCurYearCategory().then(response => {
                    newChartDataUnformatted = Object.keys(response.reportResponse);
                    var newChartData = [['Category', 'Total Hours']];
                    newChartDataUnformatted.map(function (category, index) {
                        newChartData.push([category, response.reportResponse[category]]);
                        return newChartDataUnformatted;
                    });
                    this.state.chartData.curYear = newChartData;
                    this.setState({
                        chartSubTitle: 'This Year',
                    });
                }).catch(error => {
                      console.log(error);
                });
                break;
            case 'prevYear':
                reportPrevYearCategory().then(response => {
                    newChartDataUnformatted = Object.keys(response.reportResponse);
                    var newChartData = [['Category', 'Total Hours']];
                    newChartDataUnformatted.map(function (category, index) {
                        newChartData.push([category, response.reportResponse[category]]);
                        return newChartDataUnformatted;
                    });
                    this.state.chartData.prevYear = newChartData;
                    this.setState({
                        chartSubTitle: 'Previous Year'
                    });
                }).catch(error => {
                    console.log(error);
                });
                break;
            case 'curMonth':
                reportCurMonthCategory().then(response => {
                    newChartDataUnformatted = Object.keys(response.reportResponse);
                    var newChartData = [['Category', 'Total Hours']];
                    newChartDataUnformatted.map(function (category, index) {
                        newChartData.push([category, response.reportResponse[category]]);
                        return newChartDataUnformatted;
                    });
                    this.state.chartData.curMonth = newChartData;
                    this.setState({
                        chartSubTitle: 'This Month'
                    });
                }).catch(error => {
                    console.log(error);
                });
                break;
            case 'prevMonth':
                reportPrevMonthCategory().then(response => {
                    newChartDataUnformatted = Object.keys(response.reportResponse);
                    var newChartData = [['Category', 'Total Hours']];
                    newChartDataUnformatted.map(function (category, index) {
                        newChartData.push([category, response.reportResponse[category]]);
                        return newChartDataUnformatted;
                    });
                    this.state.chartData.prevMonth = newChartData;
                    this.setState({
                        chartSubTitle: 'Previous Month'
                    });
                }).catch(error => {
                    console.log(error);
                });
                break;
            case 'curWeek':
                reportCurWeekCategory().then(response => {
                    newChartDataUnformatted = Object.keys(response.reportResponse);
                    var newChartData = [['Category', 'Total Hours']];
                    newChartDataUnformatted.map(function (category, index) {
                        newChartData.push([category, response.reportResponse[category]]);
                        return newChartDataUnformatted;
                    });
                    this.state.chartData.curWeek = newChartData;
                    this.setState({
                        chartSubTitle: 'This Week'
                    });
                }).catch(error => {
                    console.log(error);
                });
                break;
            case 'prevWeek':
                reportPrevWeekCategory().then(response => {
                    newChartDataUnformatted = Object.keys(response.reportResponse);
                    var newChartData = [['Category', 'Total Hours']];
                    newChartDataUnformatted.map(function (category, index) {
                        newChartData.push([category, response.reportResponse[category]]);
                        return newChartDataUnformatted;
                    });
                    this.state.chartData.prevWeek = newChartData;
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
                    height={400}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={this.state.chartData[this.state.currentFilter]}
                    options={{
                        backgroundColor: {
                            fill: '#eeeeee',
                        },
                        pieHole: 0.3,
                        pieSliceText: 'none',
                        pieSliceTextStyle: {
                            color: 'black',
                        },
                        title: this.state.chartSubTitle,
                        animation: {
                            duration: 200,
                            easing: 'out',
                            startup: true,
                        },
                        tooltip: {
                            text: 'value',
                        }
                    }}
                />
            </div>
        );
    }
}

export default withStyles(dropdownStyle)(BarChart);