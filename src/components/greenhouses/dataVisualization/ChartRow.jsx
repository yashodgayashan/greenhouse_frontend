import React, { Component } from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { Chart } from 'react-chartjs-2';

class ChartRow extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Row>
            <Col xs={12}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col xs={2}></Col>
                    <Col xs={8}>
                      <Chart />
                    </Col>
                    <Col xs={2}></Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
      </div>
    )
  }
}

export default ChartRow;