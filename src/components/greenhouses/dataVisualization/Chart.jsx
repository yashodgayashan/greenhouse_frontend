import { capitalize } from '@material-ui/core';
import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import Card from "react-bootstrap/Card";

class Chart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      datasets: [
        {
          label: capitalize(this.props.data.measuringParameter),
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: this.props.data.dataList
        }
      ]
    }
  }

  componentDidMount() {
    let dateList = this.props.data.dateList;
    let lablesList = [];
    dateList.map((date, index) => (
      lablesList.push(new Date(date).toUTCString())
    ))
    this.setState({ labels: lablesList })
  }

  render() {
    return (
      <>
      <Card>
        <Card.Header>
          {capitalize(this.props.data.measuringParameter)}
        </Card.Header>
        <Card.Body>
          <Line
            data={this.state}
            options={{
              title:{
                display:true,
                text:'Average Rainfall per month',
                fontSize:20
              },
              legend:{
                display:true,
                position:'right'
              }
            }}
          />
        </Card.Body>
      </Card>
      </>
    )
  }
}

export default Chart