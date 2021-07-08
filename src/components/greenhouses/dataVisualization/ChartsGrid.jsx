import React, { Component } from 'react';
import ResourceAPIs from '../../../utils/ResourceAPI';
import ChartRow from './ChartRow';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

class ChartsGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isDataLoaded: false
    }
  }

  getGreenHouseData =() => {
    // console.log(this.props.startDate);
    new ResourceAPIs()
    .getGreenhouseData(this.props.id, this.props.startDate, this.props.endDate)
    .then(results => {
      // console.log(results);
      this.setState({ 
        data: results.data,
        isDataLoaded: true 
      }, () => {
        // console.log(this.state.data);
        // console.log(this.state.data.length);
      })
    }).catch(error => {
      console.log(error);
    })
  }

  componentDidMount() {
    this.getGreenHouseData();
  }

  render() {
    if (!this.state.isDataLoaded) {
      return <p>Loading...</p>
    } else {
      return (
        <>
          {this.state.data.map((dataSet, index) => (
            <Row key={index}>
              <Col>
                <Card>
                <Card.Body>
                  <Row>
                    <Card.Header as="h5">
                      <span>Node: {dataSet.nodeId}</span>
                    </Card.Header>
                  </Row>
                  <Row>
                    <Col xs={1}></Col>
                    <Col xs={10}>
                      <ChartRow data={dataSet} />
                    </Col>
                    <Col xs={1}></Col>
                  </Row>
                  </Card.Body>
                </Card>
              </Col>  
            </Row>
          ))}
        </>
      );
    }
  }
}

export default ChartsGrid;