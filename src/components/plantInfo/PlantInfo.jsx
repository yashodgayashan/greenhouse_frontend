import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

import { FILTER, strOptions, FILTERING, intOptions } from "../../constants";
import FilterHandler from "../utils/FilterHandler";
import FilterField from "../utils/FilterField";
import AddItem from "../utils/AddItem";
import ResourceAPIs from "../../utils/ResourceAPI";
import PlantInfoDetailsTable from "./PlantInfoDetailsTable";
import { handleErr } from "../utils/MiscellaniosUtils";

class PlantInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: {
        name: {
          condition: "eq",
          value: ""
        },
        duration: {
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
      isPlantInfoLoaded: true,
      isUpdated: false
    };
  }

  toggleIsUpdated = () => {
    this.setState((prevState, prevProps) => ({
      isUpdated: !prevState.isUpdated
    }));
  };

  componentDidUpdate(_, prevState) {
    if (prevState.isUpdated !== this.state.isUpdated) {
      this.searchPlantInfo();
    }
  }

  clearFilters = () => {
    this.setState({
      filters: {
        name: {
          condition: "eq",
          value: ""
        },
        duration: {
          condition: "eq",
          value: 0
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

  onChangeNameFilter = selectedValue => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.name.condition = selectedValue;
    this.setState(stateCopy);
  };

  onChangePlantDurationValue = event => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.duration.value = event.target.value;
    this.setState(stateCopy);
  };

  onChangePlantDurationFilter = selectedValue => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.duration.condition = selectedValue;
    this.setState(stateCopy);
  };

  handleAddNew = () => {
    new ResourceAPIs()
      .createPlantInfo()
      .then(res => {
        window.location.href = "/plant-info/" + res.data;
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

    this.searchPlantInfo();
  };

  searchPlantInfo() {
    this.setState({
      filterBtnText: FILTERING,
      isProcessing: true
    });
    new ResourceAPIs()
      .searchPlantInfo(this.state.filters)
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
    if (!this.state.isPlantInfoLoaded) {
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
                      <FilterField
                        label="Duration"
                        filterOptions={intOptions}
                        filterHandler={this.onChangePlantDurationFilter}
                        fieldHandler={this.onChangePlantDurationValue}
                        value={this.state.filters.duration.value}
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
                        label="Add New Plan Info"
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
            <PlantInfoDetailsTable
              results={this.state.results}
              locations={this.state.locations}
              searchGreenhouse={this.searchGreenhouses}
              isUpdate={this.toggleIsUpdated}
            />
          </Row>
        </div>
      );
    }
  }
}

export default PlantInfo;
