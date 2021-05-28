import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import { Add, SkipNext, SkipPrevious } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { FILTER, strOptions, FILTERING } from "../../constants";
import FilterSelect from "../utils/FilterSelect";
import { showFilterSpinner, handleErr } from "../utils/MiscellaniosUtils";
import ResourceAPIs from "../../utils/ResourceAPI";
import { format2NiceDate } from "../../utils/DateUtils";

const MySwal = withReactContent(Swal);

const filterBtn = {
  marginRight: 10,
  width: 120
};

const filterLabel = {
  marginBottom: 0
};

const resultsDescStyle = {
  fontSize: 12
};

const dropdownCol = {
  paddingRight: 0
};

const inputCol = {
  paddingLeft: 0,
  paddingRight: 30
};

class Locations extends Component {
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
        size: 100,
        from: 0
      },
      isProcessing: false,
      filterBtnText: FILTER,
      errMsg: "",
      results: []
    };
  }

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
        size: 100,
        from: 0
      }
    });
  };

  handleNext = () => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.from = this.state.filters.from + 100;
    this.setState(stateCopy);

    this.searchLocations();
  };

  handlePrev = () => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.from = this.state.filters.from - 100;
    this.setState(stateCopy);

    this.searchLocations();
  };

  handleFilter = () => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.filters.from = 0;
    this.setState(stateCopy);

    this.searchLocations();
  };

  searchLocations() {
    this.setState({
      filterBtnText: FILTERING,
      isProcessing: true
    });
    new ResourceAPIs()
      .searchLocations(this.state.filters)
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

  editLocation = id => {
    window.location.href = "/locations/" + id;
  };

  deleteLocation = id => {
    MySwal.fire({
      title: "You want to Delete Location with ID " + id + "?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        new ResourceAPIs()
          .deleteLocation(id)
          .then(response => {
            MySwal.fire(
              "Deleted!",
              "Location " + id + " has been deleted.",
              "success"
            );
            this.searchLocations();
          })
          .catch(error => {
            handleErr(error);
            this.setState({
              isProcessing: false,
              results: error
            });
          });
      }
    });
  };

  handleAddNew = () => {
    new ResourceAPIs()
      .createLocation()
      .then(res => {
        window.location.href = "/locations/" + res.data;
      })
      .catch(error => {
        handleErr(error);
      });
  };

  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <Card>
              <Card.Body>
                <Row>
                  <Col xs={4}>
                    <Form.Label style={filterLabel}>Name</Form.Label>
                    <Row>
                      <Col style={dropdownCol}>
                        <FilterSelect
                          options={strOptions}
                          handleOnChange={this.onChangeNameFilter}
                        />
                      </Col>
                      <Col style={inputCol}>
                        <Form.Control
                          size="sm"
                          type="text"
                          onChange={this.onChangeNameValue}
                          value={this.state.filters.name.value}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={4}>
                    <Form.Label style={filterLabel}>Location</Form.Label>
                    <Row>
                      <Col style={dropdownCol}>
                        <FilterSelect
                          options={strOptions}
                          handleOnChange={this.onChangeLocationFilter}
                        />
                      </Col>
                      <Col style={inputCol}>
                        <Form.Control
                          size="sm"
                          type="text"
                          onChange={this.onChangeLocationValue}
                          value={this.state.filters.location.value}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={2}>
                    <Row style={{ display: "block", textAlign: "center" }}>
                      <Form.Text className="text-muted">
                        {this.state.errMsg}
                      </Form.Text>
                    </Row>
                    <Row style={{ display: "block", textAlign: "center" }}>
                      <IconButton
                        onClick={this.handlePrev}
                        disabled={
                          this.state.isProcessing ||
                          this.state.filters.from < 100
                        }
                      >
                        <SkipPrevious />
                      </IconButton>
                      <span style={resultsDescStyle}>
                        {this.state.results.length} results (Page{" "}
                        {this.state.filters.from / 100 + 1})
                      </span>
                      <IconButton
                        onClick={this.handleNext}
                        disabled={
                          this.state.isProcessing ||
                          this.state.results.length !== 100
                        }
                      >
                        <SkipNext />
                      </IconButton>
                    </Row>
                    <Row
                      align="center"
                      style={{ display: "block", textAlign: "center" }}
                    >
                      <Button
                        variant="success"
                        style={filterBtn}
                        onClick={this.handleFilter}
                        disabled={this.state.isProcessing}
                      >
                        {showFilterSpinner(this.state.filterBtnText)}
                      </Button>
                      <Button variant="secondary" onClick={this.clearFilters}>
                        Clear
                      </Button>
                    </Row>
                  </Col>
                  <Col xs={2}>
                    <Row style={{ display: "block", textAlign: "center" }}>
                      <p style={{ fontSize: 12, marginTop: 17 }}>
                        Add New Location
                      </p>
                      <Button variant="primary" onClick={this.handleAddNew}>
                        <Add /> Add New
                      </Button>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col xs={12}>
            {this.state.results.length > 0 ? (
              <TableContainer component={Paper}>
                <Table aria-label="simple table" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">ID</TableCell>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Location</TableCell>
                      <TableCell align="right">Latitude</TableCell>
                      <TableCell align="right">Longatude</TableCell>
                      <TableCell align="right">Created At</TableCell>
                      <TableCell align="right">Modified At</TableCell>
                      <TableCell align="right">Controlls</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.results.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row" align="right">
                          <a href={"/locations/" + row.id} target="_blank">
                            {row.id}
                          </a>
                        </TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.location}</TableCell>
                        <TableCell align="right">{row.latitude}</TableCell>
                        <TableCell align="right">{row.longatude}</TableCell>
                        <TableCell align="right">
                          {format2NiceDate(row.createdAt)}
                        </TableCell>
                        <TableCell align="right">
                          {format2NiceDate(row.modifiedAt)}
                        </TableCell>
                        <TableCell align="right">
                          <EditIcon
                            color="primary"
                            onClick={() => this.editLocation(row.id)}
                          />
                          <DeleteIcon
                            color="secondary"
                            onClick={() => this.deleteLocation(row.id)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <p></p>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Locations;
