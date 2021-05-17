import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

import { FILTER, strOptions, FILTERING, intOptions } from "../../constants";
import FilterHandler from "../utils/FilterHandler";
import FilterDropdown from "../utils/FilterDropdown";
import FilterField from "../utils/FilterField";
import AddItem from "../utils/AddItem";
import ResourceAPIs from "../../utils/ResourceAPI";
import { handleErr } from "../utils/MiscellaniosUtils";
import NodeDetailsTable from "./NodeDetailsTable";

class Node extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: {
        id: {
          condition: "eq",
          value: 0
        },
        greenhouseId: {
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
      greenhouses: [],
      isNodeLoaded: false,
      isUpdated: false,
      isGreenhousesLoaded: false
    };
  }

  toggleIsUpdated = () => {
    this.setState((prevState, prevProps) => ({
      isUpdated: !prevState.isUpdated
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isUpdated !== this.state.isUpdated) {
      this.searchNodes();
    }
  }

  clearFilters = () => {
    this.setState({
      filters: {
        id: {
          condition: "eq",
          value: 0
        },
        greenhouseId: {
          condition: "eq",
          value: 0
        },
        size: 100,
        from: 0
      }
    });
  };

  onChangeGreenhouseIdValue = selectedValue => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.greenhouseId.value = selectedValue;
    this.setState(stateCopy);
  };

  onChangeIdValue = event => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.id.value = event.target.value;
    this.setState(stateCopy);
  };

  onChangeIdFilter = selectedValue => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.id.condition = selectedValue;
    this.setState(stateCopy);
  };

  onChangeGreenhouseIdFilter = selectedValue => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.greenhouseId.condition = selectedValue;
    this.setState(stateCopy);
  };

  getGreenhouses = () => {
    new ResourceAPIs()
      .getGreenhouses()
      .then(response => {
        this.setState(
          {
            greenhouses: this.constructGreenhousesArray(response.data)
          },
          () => {
            this.setState({ isGreenhouseLoaded: true });
          }
        );
      })
      .catch(error => {
        console.log(error);
        handleErr(error);
      });
  };

  handleAddNew = () => {
    new ResourceAPIs()
      .createNode()
      .then(res => {
        window.location.href = "/nodes/" + res.data;
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

    this.searchNodes();
  };

  searchNodes() {
    this.setState({
      filterBtnText: FILTERING,
      isProcessing: true
    });
    new ResourceAPIs()
      .searchNodes(this.state.filters)
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

  constructGreenhousesArray = greenhouses => {
    let greenhouseArray = [];
    greenhouses.forEach(greenhouse => {
      let element = { value: greenhouse.id, label: greenhouse.name };
      greenhouseArray.push(element);
    });
    return greenhouseArray;
  };

  componentDidMount() {
    this.getGreenhouses();
  }

  render() {
    if (!this.state.isGreenhouseLoaded) {
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
                      <FilterField
                        fieldType="number"
                        label="Id"
                        filterOptions={intOptions}
                        filterHandler={this.onChangeIdFilter}
                        fieldHandler={this.onChangeIdValue}
                        value={this.state.filters.id.value}
                      />
                    </Col>
                    <Col xs={4}>
                      <FilterDropdown
                        label="Greenhouse"
                        filterOptions={strOptions}
                        filterHandler={this.onChangeGreenhouseIdFilter}
                        dropdownHandler={this.onChangeGreenhouseIdValue}
                        dropdownOptions={this.state.greenhouses}
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
                        label="Add New Node"
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
            <NodeDetailsTable
              results={this.state.results}
              greenhouses={this.state.greenhouses}
              isUpdate={this.toggleIsUpdated}
            />
          </Row>
        </div>
      );
    }
  }
}

export default Node;
