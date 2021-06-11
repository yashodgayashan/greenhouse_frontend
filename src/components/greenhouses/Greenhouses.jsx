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
import GreenhouseDetailsTable from "./GreenhouseDetailsTable";
import { handleErr } from "../utils/MiscellaniosUtils";
import ChartsGrid from "./dataVisualization/ChartsGrid";

class Greenhouses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: {
        name: {
          condition: "eq",
          value: ""
        },
        location: {
          condition: "eq",
          value: ""
        },
        locationId: {
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
      locations: [],
      isGreenhouseLoaded: false,
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
      this.searchGreenhouses();
    }
  }

  clearFilters = () => {
    this.setState({
      filters: {
        name: {
          condition: "eq",
          value: ""
        },
        location: {
          condition: "eq",
          value: ""
        },
        locationId: {
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

  onChangeLocationValue = event => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.location.value = event.target.value;
    this.setState(stateCopy);
  };

  onChangeGreenhouseLocationValue = selectedValue => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.locationId.value = selectedValue;
    this.setState(stateCopy);
  };

  onChangeNameFilter = selectedValue => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.name.condition = selectedValue;
    this.setState(stateCopy);
  };

  onChangeLocationFilter = selectedValue => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.location.condition = selectedValue;
    this.setState(stateCopy);
  };

  onChangeGreenhouseLocationFilter = selectedValue => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.locationId.condition = selectedValue;
    this.setState(stateCopy);
  };

  getLocations = () => {
    new ResourceAPIs()
      .getLocations()
      .then(response => {
        this.setState(
          {
            locations: this.constructLocationArray(response.data)
          },
          () => {
            this.setState({ isGreenhouseLoaded: true });
          }
        );
      })
      .catch(error => {
        handleErr(error);
      });
  };

  handleAddNew = () => {
    new ResourceAPIs()
      .createGreenhouse()
      .then(res => {
        window.location.href = "/greenhouses/" + res.data;
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

    this.searchGreenhouses();
  };

  searchGreenhouses() {
    this.setState({
      filterBtnText: FILTERING,
      isProcessing: true
    });
    new ResourceAPIs()
      .searchGreenhouses(this.state.filters)
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

  constructLocationArray = locations => {
    let locationArray = [];
    locations.forEach(location => {
      let element = { value: location.id, label: location.name };
      locationArray.push(element);
    });
    return locationArray;
  };

  componentDidMount() {
    this.getLocations();
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
                        label="Name"
                        filterOptions={strOptions}
                        filterHandler={this.onChangeNameFilter}
                        fieldHandler={this.onChangeNameValue}
                        value={this.state.filters.name.value}
                      />
                    </Col>
                    <Col xs={4}>
                      <FilterDropdown
                        label="Greenhouse Location"
                        filterOptions={strOptions}
                        filterHandler={this.onChangeGreenhouseLocationFilter}
                        dropdownHandler={this.onChangeGreenhouseLocationValue}
                        dropdownOptions={this.state.locations}
                      />
                      <FilterField
                        label="Location"
                        filterOptions={strOptions}
                        filterHandler={this.onChangeLocationFilter}
                        fieldHandler={this.onChangeLocationValue}
                        value={this.state.filters.location.value}
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
                        label="Add New Greenhouse"
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
            <GreenhouseDetailsTable
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

export default Greenhouses;
