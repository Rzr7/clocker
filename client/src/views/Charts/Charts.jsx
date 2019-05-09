import React from "react";
import BarChart from 'components/Chart/BarChart.jsx';
import PieChart from 'components/Chart/PieChart.jsx';

class Charts extends React.Component {
    render() {
        return (
          <div style={{display: 'flex'}}>
              <div style={{width: '65%'}}>
                <h2>Clocked Hours by Date</h2>
                <BarChart />
              </div>
              <div style={{width: '35%'}}>
                <h2>Clocked Hours by Category</h2>
                <PieChart />
              </div>

          </div>
        );
    }
}
    
export default Charts;
    