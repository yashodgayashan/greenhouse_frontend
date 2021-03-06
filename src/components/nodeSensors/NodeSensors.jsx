import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

import { FILTER, intOptions, FILTERING, strOptions } from "../../constants";
import FilterHandler from "../utils/FilterHandler";
import FilterDropdown from "../utils/FilterDropdown";
import FilterField from "../utils/FilterField";
import AddItem from "../utils/AddItem";
import ResourceAPIs from "../../utils/ResourceAPI";
import NodeSensorDetailsTable from "./NodeSensorDetailsTable";
import {
  handleErr,
  constructSensorArray,
  constructNodeArray
} from "../utils/MiscellaniosUtils";

class NodeSensor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: {
        nodeId: {
          condition: "eq",
          value: 0
        },
        sensorId: {
          condition: "eq",
          value: 0
        },
        size: 100,
        from: 0
      },
      isProcessing: false,
      filterBtnText: FILTER,
      errMsg: "",
      results: [],
      nodes: [],
      sensors: [],
      isNodeSensorLoaded: false,
      isUpdated: false
    };
  }

  toggleIsUpdated = () => {
    this.setState((prevState, prevProps) => ({
      isUpdated: !prevState.isUpdated
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isUpdated !== this.state.isUpdated) {
      this.searchNodeSensor();
    }
  }

  clearFilters = () => {
    this.setState({
      filters: {
        nodeId: {
          condition: "eq",
          value: 0
        },
        sensorId: {
          condition: "eq",
          value: 0
        },
        size: 100,
        from: 0
      }
    });
  };

  onChangeNodeIdValue = selectedValue => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.nodeId.value = selectedValue;
    this.setState(stateCopy);
  };

  onChangeNodeIdFilter = selectedValue => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.nodeId.condition = selectedValue;
    this.setState(stateCopy);
  };

  onChangeSensorIdValue = selectedValue => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.sensorId.value = selectedValue;
    this.setState(stateCopy);
  };

  onChangeSensorIdFilter = selectedValue => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.sensorId.condition = selectedValue;
    this.setState(stateCopy);
  };

  getSensors = () => {
    new ResourceAPIs()
      .getSensors()
      .then(response => {
        this.setState(
          {
            sensors: constructSensorArray(response.data)
          },
          () => {
            this.getNodes();
          }
        );
      })
      .catch(error => {
        handleErr(error);
      });
  };

  getNodes = () => {
    new ResourceAPIs()
      .getNodes()
      .then(response => {
        this.setState(
          {
            nodes: constructNodeArray(response.data)
          },
          () => {
            this.setState({ isNodeSensorLoaded: true });
          }
        );
      })
      .catch(error => {
        handleErr(error);
      });
  };

  handleAddNew = () => {
    new ResourceAPIs()
      .createNodeSensor()
      .then(res => {
        window.location.href = "/node-sensors/" + res.data;
      })
      .catch(error => {
        handleErr(error);
      });
  };

  increaseSize = () => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.from = this.state.filters.from + 100;
    this.setState(stateCopy);
  };

  decreaseSize = () => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.from = this.state.filters.from - 100;
    this.setState(stateCopy);
  };

  handleFilter = () => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.from = 0;
    this.setState(stateCopy);

    this.searchNodeSensor();
  };

  searchNodeSensor() {
    this.setState({
      filterBtnText: FILTERING,
      isProcessing: true
    });
    new ResourceAPIs()
      .searchNodeSensors(this.state.filters)
      .then(res => {
        this.setState({
          filterBtnText: FILTER,
          isProcessing: false,
          results: res.data
        });
      })
      .catch(error => {
        handleErr(error);
        this.setState({
          filterBtnText: FILTER,
          isProcessing: false,
          results: error
        });
      });
  }

  componentDidMount() {
    this.getSensors();
  }

  render() {
    if (!this.state.isNodeSensorLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <div>
          <Row>
            <Col xs={12}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col xs={4}>
                      <FilterDropdown
                        label="Node Id"
                        filterOptions={intOptions}
                        filterHandler={this.onChangeNodeIdFilter}
                        dropdownHandler={this.onChangeNodeIdValue}
                        dropdownOptions={this.state.nodes}
                      />
                    </Col>
                    <Col xs={4}>
                      <FilterDropdown
                        label="Sensor"
                        filterOptions={strOptions}
                        filterHandler={this.onChangeSensorIdFilter}
                        dropdownHandler={this.onChangeSensorIdValue}
                        dropdownOptions={this.state.sensors}
                      />
                    </Col>
                    <Col xs={2}>
                      <FilterHandler
                        errMsg={this.state.errMsg}
                        decreaseSize={this.decreaseSize}
                        increaseSize={this.increaseSize}
                        handleFilter={this.handleFilter}
                        isProcessing={this.state.isProcessing}
                        results={this.state.results}
                        filterBtnText={this.state.filterBtnText}
                        clearFilters={this.clearFilters}
                        filters={this.state.filters}
                      />
                    </Col>
                    <Col xs={2}>
                      <AddItem
                        label="Add New Node Sensor"
                        handleAddNew={this.handleAddNew}
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br />
          <Row>
            <NodeSensorDetailsTable
              results={this.state.results}
              sensors={this.state.sensors}
              isUpdate={this.toggleIsUpdated}
            />
          </Row>
        </div>
      );
    }
  }
}

export default NodeSensor;
