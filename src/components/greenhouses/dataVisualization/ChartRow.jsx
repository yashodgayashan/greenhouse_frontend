import React, { Component } from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Chart from "./Chart";

class ChartRow extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Row>
          {this.props.data.nodeData.map((data, index) => (
              <Col xs={6} key={index}>
                <Chart data={data} />
              </Col>
          ))}
        </Row>
      </>
    )
  }
}

export default ChartRow;