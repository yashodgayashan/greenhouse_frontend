import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

import { FILTER, strOptions, FILTERING } from "../../constants";
import ResourceAPIs from "../../utils/ResourceAPI";
import { handleErr } from "../utils/MiscellaniosUtils";
import FilterHandler from "../utils/FilterHandler";
import FilterField from "../utils/FilterField";
import AddItem from "../utils/AddItem";
import SensorDetailsTable from "./SensorDetailsTable";

class Sensors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: {
        name: {
          condition: "eq",
          value: ""
        },
        description: {
          condition: "eq",
          value: ""
        },
        size: 100,
        from: 0
      },
      isProcessing: false,
      filterBtnText: FILTER,
      errMsg: "",
      results: [],
      isSensorsLoaded: false,
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
      this.searchSensors();
    }
  }

  clearFilters = () => {
    this.setState({
      filters: {
        name: {
          condition: "eq",
          value: ""
        },
        description: {
          condition: "eq",
          value: ""
        },
        size: 100,
        from: 0
      }
    });
  };

  onChangeNameValue = event => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.name.value = event.target.value;
    this.setState(stateCopy);
  };

  onChangeDescriptionValue = event => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.description.value = event.target.value;
    this.setState(stateCopy);
  };

  onChangeNameFilter = selectedValue => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.name.condition = selectedValue;
    this.setState(stateCopy);
  };

  onChangeDescriptionFilter = selectedValue => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.description.condition = selectedValue;
    this.setState(stateCopy);
  };

  handleAddNew = () => {
    new ResourceAPIs()
      .createSensor()
      .then(res => {
        window.location.href = "/sensors/" + res.data;
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

    this.searchSensors();
  };

  searchSensors() {
    this.setState({
      filterBtnText: FILTERING,
      isProcessing: true
    });
    new ResourceAPIs()
      .searchSensors(this.state.filters)
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

  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <Card>
              <Card.Body>
                <Row>
                  <Col xs={4}>
                    <FilterField
                      label="Name"
                      filterOptions={strOptions}
                      filterHandler={this.onChangeNameFilter}
                      fieldHandler={this.onChangeNameValue}
                      value={this.state.filters.name.value}
                    />
                  </Col>
                  <Col xs={4}>
                    <FilterField
                      label="Description"
                      filterOptions={strOptions}
                      filterHandler={this.onChangeDescriptionFilter}
                      fieldHandler={this.onChangeDescriptionValue}
                      value={this.state.filters.description.value}
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
                      label="Add New Sensor"
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
          <SensorDetailsTable
            results={this.state.results}
            isUpdate={this.toggleIsUpdated}
          />
        </Row>
      </div>
    );
  }
}

export default Sensors;
