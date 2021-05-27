import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

import { FILTER, strOptions, FILTERING } from "../../constants";
import FilterHandler from "../utils/FilterHandler";
import FilterDropdown from "../utils/FilterDropdown";
import FilterField from "../utils/FilterField";
import AddItem from "../utils/AddItem";
import ResourceAPIs from "../../utils/ResourceAPI";
import DefectDetailsTable from "./DefectDetailsTable";
import { handleErr, constructDropdownArray } from "../utils/MiscellaniosUtils";

class Defects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: {
        name: {
          condition: "eq",
          value: ""
        },
        plantId: {
          condition: "eq",
          value: 0
        },
        size: 20,
        from: 0
      },
      isProcessing: false,
      filterBtnText: FILTER,
      errMsg: "",
      results: [],
      plants: [],
      isPlantLoaded: false,
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
      this.searchDefects();
    }
  }

  clearFilters = () => {
    this.setState({
      filters: {
        name: {
          condition: "eq",
          value: ""
        },
        plantId: {
          condition: "eq",
          value: 0
        },
        size: 20,
        from: 0
      }
    });
  };

  onChangeNameValue = event => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.name.value = event.target.value;
    this.setState(stateCopy);
  };

  onChangePlantValue = selectedValue => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.plantId.value = selectedValue;
    this.setState(stateCopy);
  };

  onChangeNameFilter = selectedValue => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.name.condition = selectedValue;
    this.setState(stateCopy);
  };

  onChangePlantFilter = selectedValue => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.plantId.condition = selectedValue;
    this.setState(stateCopy);
  };

  getPlants = () => {
    new ResourceAPIs()
      .getPlantInfos()
      .then(response => {
        this.setState(
          {
            plants: constructDropdownArray(response.data)
          },
          () => {
            this.setState({ isPlantLoaded: true });
          }
        );
      })
      .catch(error => {
        handleErr(error);
      });
  };

  handleAddNew = () => {
    new ResourceAPIs()
      .createDefect()
      .then(res => {
        window.location.href = "/defects/" + res.data;
      })
      .catch(error => {
        handleErr(error);
      });
  };

  increaseSize = () => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.from = this.state.filters.from + 20;
    this.setState(stateCopy);
  };

  decreaseSize = () => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.from = this.state.filters.from - 20;
    this.setState(stateCopy);
  };

  handleFilter = () => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.from = 0;
    this.setState(stateCopy);

    this.searchDefects();
  };

  searchDefects() {
    this.setState({
      filterBtnText: FILTERING,
      isProcessing: true
    });
    new ResourceAPIs()
      .searchDefects(this.state.filters)
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
    this.getPlants();
  }

  render() {
    if (!this.state.isPlantLoaded) {
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
                        label="Name"
                        filterOptions={strOptions}
                        filterHandler={this.onChangeNameFilter}
                        fieldHandler={this.onChangeNameValue}
                        value={this.state.filters.name.value}
                      />
                    </Col>
                    <Col xs={4}>
                      <FilterDropdown
                        label="Plants"
                        filterOptions={strOptions}
                        filterHandler={this.onChangePlantFilter}
                        dropdownHandler={this.onChangePlantValue}
                        dropdownOptions={this.state.plants}
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
                        label="Add New Defect"
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
            <DefectDetailsTable
              results={this.state.results}
              plants={this.state.plants}
              isUpdate={this.toggleIsUpdated}
            />
          </Row>
        </div>
      );
    }
  }
}

export default Defects;
