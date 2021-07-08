import React, { Component } from "react";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Clear } from "@material-ui/icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { SAVE } from "../../constants";
import { format2NiceDate, format2Time } from "../../utils/DateUtils";
import ResourceAPIs from "../../utils/ResourceAPI";
import {
  showSaveSpinner,
  handleError,
  handleErr,
  constructLocationArray,
  deleteMessage,
  createIsDeleteMsg
} from "../utils/MiscellaniosUtils";
import { getIdFromUrl } from "../../utils/MiscellaniosUtils";
import DisabledFormComponent from "../utils/FormComponent";
import FormComponent from "../utils/FormComponent";
import FormDropdown from "../utils/FormDropdown";
import ChartGrid from "./dataVisualization/ChartsGrid";
import { FaYenSign } from "react-icons/fa";

const MySwal = withReactContent(Swal);

class GreenhouseDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      greenhouse: {
        id: "",
        name: "",
        location: "",
        locationId: 0,
        length: "",
        width: "",
        height: "",
        waterFlow: "",
        createdAt: "",
        modifiedAt: ""
      },
      waterSchedule: {
        greenhouseId: "",
        startDate: "",
        endDate: "",
        wateringTime: ""
      },
      waterScheduleIsEnable: 0,
      isEnableOptions: [ { value: 1, label: "Yes" }, { value: 0, label: "No" } ],
      waterSchedules: [],
      errMsg: "",
      isGreenhouseLoaded: false,
      isSchedulesLoaded: false,
      isProcessing: false,
      saveGreenhouseBtnText: SAVE,
      locations: []
    };
  }

  componentDidMount() {
    this.getLocations();
  }

  getLocations = () => {
    new ResourceAPIs()
      .getLocations()
      .then(response => {
        this.setState(
          {
            locations: constructLocationArray(response.data)
          },
          () => {
            this.getGreenhouseById();
          }
        );
      })
      .catch(error => {
        handleErr(error);
      });
  };

  getGreenhouseById = () => {
    new ResourceAPIs()
      .getGreenhouse(getIdFromUrl())
      .then(result => {
        let greenhouseObj = result.data;
        this.getSchedulesById(greenhouseObj.id);
        this.setState({
          greenhouse: {
            id: greenhouseObj.id,
            name: greenhouseObj.name,
            location: greenhouseObj.location,
            locationId: greenhouseObj.locationId,
            length: greenhouseObj.length,
            width: greenhouseObj.width,
            height: greenhouseObj.height,
            waterFlow: greenhouseObj.waterFlow,
            createdAt: greenhouseObj.createdAt,
            modifiedAt: greenhouseObj.modifiedAt
          },
          isGreenhouseLoaded: true
        });
      })
      .catch(error => {
        handleError(error);
        this.setState({
          isGreenhouseLoaded: false,
          error
        });
      });
  };

  getSchedulesById = (id) => {
    new ResourceAPIs()
      .getWaterSchedulesByGreenhouseId(id)
      .then(results => {
        this.setState({
          waterSchedules: this.constructWaterSchedulesArray(results.data)
        }, 
        () => {
          this.setState({ isSchedulesLoaded: true });
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  constructWaterSchedulesArray = waterScchedules => {
    let schedulesArray = [];
    waterScchedules.forEach(schedule => {
      if (schedule.enabled === false) {
        schedule.enabled = "No";
      } else {
        schedule.enabled = "Yes";
      }
      let element = { 
        id: schedule.id,
        greenhouseId: schedule.greenhouseId,
        startDate: schedule.startDate,
        endDate: schedule.endDate,
        wateringTime: schedule.wateringTime,
        isEnabled: schedule.enabled,
        createdAt: schedule.createdAt,
        modifiedAt: schedule.modifiedAt
      };
      schedulesArray.push(element);
    })
    return schedulesArray;
  }

  handleCancelEditGreenhouse = () => {
    this.getGreenhouseById();
  };

  handleCancelEditSchedule = () => {
    this.getSchedulesById();
  };

  deleteSchedule = id => {
    deleteMessage(createIsDeleteMsg("Water Schedule", id), this.scheduleDeleteApiCall, id);
  }

  scheduleDeleteApiCall = id => {
    new ResourceAPIs()
      .deleteWaterSchedule(id)
      .then(results => {
        createIsDeleteMsg("Water Schedule", id);
        this.getSchedulesById(this.state.greenhouse.id);
      })
      .catch(error => {
        console.log(error);
      })
  }

  onChangeName = event => {
    let newState = Object.assign({}, this.state);
    newState.greenhouse.name = event.target.value;
    this.setState(newState);
  };

  onChangeLocation = event => {
    let newState = Object.assign({}, this.state);
    newState.greenhouse.location = event.target.value;
    this.setState(newState);
  };

  onChangeWaterFlow = event => {
    let newState = Object.assign({}, this.state);
    newState.greenhouse.waterFlow = event.target.value;
    this.setState(newState);
  };

  onChangeLocationId = selectedValue => {
    let newState = Object.assign({}, this.state);
    newState.greenhouse.locationId = selectedValue;
    this.setState(newState);
  };

  onChangeWidth = event => {
    let newState = Object.assign({}, this.state);
    newState.greenhouse.width = event.target.value;
    this.setState(newState);
  };

  onChangeHeight = event => {
    let newState = Object.assign({}, this.state);
    newState.greenhouse.height = event.target.value;
    this.setState(newState);
  };

  onChangeLength = event => {
    let newState = Object.assign({}, this.state);
    newState.greenhouse.length = event.target.value;
    this.setState(newState);
  };

  //----------------------

  handleEditGreenhouse = () => {
    if (this.greenhouseFormValidation()) {
      new ResourceAPIs()
      .updateGreenhouse(getIdFromUrl(), this.state.greenhouse)
      .then(result => {
        MySwal.fire(
          "Updated!",
          "Greenhouse " + this.state.greenhouse.id + " has been Updated.",
          "success"
        );
      })
      .catch(error => {
        handleError(error);
        this.setState({
          isGreenhouseLoaded: false,
          error
        });
      });
    } else {
      MySwal.fire(
        "Not Updated!",
        "All fields required.",
        "Try again1"
      );
    }
  };

  onChangeStartDate = event => {
    let newState = Object.assign({}, this.state);
    newState.waterSchedule.startDate = event.target.value;
    this.setState(newState);
  };

  onChangeEndDate = event => {
    let newState = Object.assign({}, this.state);
    newState.waterSchedule.endDate = event.target.value;
    this.setState(newState);
  };

  onChangeWateringTime = event => {
    let newState = Object.assign({}, this.state);
    let timestamp = new Date();
    let timeValue = event.target.value;
    timestamp.setHours(timeValue.toString().substring(0,2));
    timestamp.setMinutes(timeValue.toString().substring(3,5));
    newState.waterSchedule.wateringTime = timestamp;
    this.setState(newState);
  }

  setEnable = status => {
    let newState = Object.assign({}, this.state);
    newState.waterScheduleIsEnable = status;
    this.setState(newState);
  }

  handleEditSchedule = () => {
    let newState = Object.assign({}, this.state);
    newState.waterSchedule.greenhouseId = this.state.greenhouse.id;
    console.log(this.state.waterSchedule);
    if (this.scheduleFormValidation()) {
      new ResourceAPIs()
      .createSchedule(this.state.waterScheduleIsEnable, this.state.waterSchedule)
      .then(results => {
        MySwal.fire(
          "Created!",
          "Water Schedule " + this.state.waterSchedule.id + " has been Created.",
          "success"
        );
        this.setState({
          waterSchedule: {
            startDate: "",
            endDate: ""
          },
          waterScheduleIsEnable: 0
        })
        this.getSchedulesById(this.state.greenhouse.id);
      })
      .catch(error => {
        handleError(error);
      })
    } else {
      MySwal.fire(
        "Not Created!",
        "All fields required.",
        "error"
      );
    }
  };

  scheduleFormValidation = () => {
    let formData = this.state;
    let formIsValid = true;

    if (!formData.waterSchedule.startDate) {
      formIsValid = false;
    }

    if (!formData.waterSchedule.endDate) {
      formIsValid = false;
    }

    return formIsValid;
  }

  //----------------------

  greenhouseFormValidation = () => {
    let formData = this.state;
    let formIsValid = true;

    if (!formData.greenhouse.name) {
      formIsValid = false;
    }

    if (!formData.greenhouse.location) {
      formIsValid = false;
    }

    if (!formData.greenhouse.length) {
      formIsValid = false;
    }

    if (!formData.greenhouse.width) {
      formIsValid = false;
    }

    if (!formData.greenhouse.height) {
      formIsValid = false;
    }

    return formIsValid;
  }

  render() {
    if (!this.state.isGreenhouseLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <div style={{ marginLeft: "5%", marginRight: "5%" }}>
          <Row>
            <Col>
              <div>
                <Card border="secondary">
                  <Card.Header as="h5">
                    <span style={{ marginTop: 60 }}>Greenhouse Details</span>

                    <div style={{ float: "right" }}>
                      <span
                        style={{ fontSize: 12, color: "red", marginRight: 60 }}
                      >
                        {this.state.errMsg}
                      </span>
                      <Button
                        variant="success"
                        size="sm"
                        style={{ width: 100 }}
                        disabled={this.state.isProcessing}
                        onClick={this.handleEditGreenhouse}
                      >
                        {showSaveSpinner(this.state.saveGreenhouseBtnText)}
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        style={{ marginLeft: 10, width: 100 }}
                        onClick={this.handleCancelEditGreenhouse}
                        disabled={this.state.isProcessing}
                      >
                        <Clear /> Cancel
                      </Button>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Row>
                        <Col xs={6}>
                          <DisabledFormComponent
                            name="ID"
                            inputType="number"
                            value={this.state.greenhouse.id}
                          />
                          <FormComponent
                            name="Name"
                            inputType="text"
                            value={this.state.greenhouse.name}
                            onChange={this.onChangeName}
                          />
                          <FormComponent
                            name="Length(ft)"
                            inputType="number"
                            value={this.state.greenhouse.length}
                            onChange={this.onChangeLength}
                          />
                          <FormComponent
                            name="Width(ft)"
                            inputType="number"
                            value={this.state.greenhouse.width}
                            onChange={this.onChangeWidth}
                          />
                          <FormComponent
                            name="Height(ft)"
                            inputType="number"
                            value={this.state.greenhouse.height}
                            onChange={this.onChangeHeight}
                          />
                        </Col>
                        <Col xs={6}>
                          <FormComponent
                            name="Place"
                            inputType="text"
                            value={this.state.greenhouse.location}
                            onChange={this.onChangeLocation}
                          />
                          <FormDropdown
                            name="Location"
                            value={this.state.greenhouse.locationId}
                            options={this.state.locations}
                            handleOnChange={this.onChangeLocationId}
                          />
                          <FormComponent
                            name="Water Flow"
                            inputType="text"
                            value={this.state.greenhouse.waterFlow}
                            onChange={this.onChangeWaterFlow}
                          />
                          <Row>
                            <Col>
                              <Form.Label>Created At</Form.Label>
                            </Col>
                            <Col>
                              <Badge variant="secondary">
                                {format2NiceDate(
                                  this.state.greenhouse.createdAt
                                )}
                              </Badge>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Form.Label>Updated At</Form.Label>
                            </Col>
                            <Col>
                              <Badge variant="secondary">
                                {format2NiceDate(
                                  this.state.greenhouse.modifiedAt
                                )}
                              </Badge>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Form>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <Card border="secondary">
                  <Card.Header as="h5">
                  <span style={{ marginTop: 60 }}>Greenhouse Water Schedules</span>
                    </Card.Header>
                    <Card.Body>
                    <TableContainer component={Paper}>
                      <Table aria-label="simple table" size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell align="right">ID</TableCell>
                            <TableCell align="right">Water Flow</TableCell>
                            <TableCell align="right">Start Date</TableCell>
                            <TableCell align="right">End Date</TableCell>
                            <TableCell align="right">Watering Time</TableCell>
                            <TableCell align="right">Enable</TableCell>
                            <TableCell align="right">Created At</TableCell>
                            <TableCell align="right">Modified At</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.waterSchedules.map((schedule, index) => (
                            <TableRow key={schedule.id}>
                              <TableCell component="th" scope="row" align="right">{schedule.id}</TableCell>
                              <TableCell align="right">{this.state.greenhouse.waterFlow}</TableCell>
                              <TableCell align="right">{schedule.startDate}</TableCell>
                              <TableCell align="right">{schedule.endDate}</TableCell>
                              <TableCell align="right">
                                {format2Time(schedule.wateringTime)}
                                </TableCell>
                              <TableCell align="right">{schedule.isEnabled}</TableCell>
                              <TableCell align="right">
                                {format2NiceDate(schedule.createdAt)}
                                </TableCell>
                              <TableCell align="right">
                                {format2NiceDate(schedule.modifiedAt)}
                              </TableCell>
                              <TableCell align="right">
                                <EditIcon
                                  color="primary"
                                  onClick={() => this.editSchedule(schedule.id)}
                                />
                                <DeleteIcon
                                  color="secondary"
                                  onClick={() => this.deleteSchedule(schedule.id)}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Card.Body>
                  <Card border="secondary">
                  <Card.Header as="h5">
                    <span style={{ marginTop: 60 }}>Add New Water Schedule</span>
                    <div style={{ float: "right" }}>
                      <span
                        style={{ fontSize: 12, color: "red", marginRight: 60 }}
                      >
                        {this.state.errMsg}
                      </span>
                      <Button
                        variant="success"
                        size="sm"
                        style={{ width: 100 }}
                        disabled={this.state.isProcessing}
                        onClick={this.handleEditSchedule}
                      >
                        {showSaveSpinner(this.state.saveGreenhouseBtnText)}
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        style={{ marginLeft: 10, width: 100 }}
                        onClick={this.handleCancelEditSchedule}
                        disabled={this.state.isProcessing}
                      >
                        <Clear /> Cancel
                      </Button>
                    </div>
                  </Card.Header>
                </Card>
                  <Row>
                    <Col xs={12}>
                      <Card>
                        <Card.Body>
                          <Row>
                            <Col xs={6}>
                              <DisabledFormComponent
                                name="Greenhouse ID"
                                inputType="number"
                                value={this.state.greenhouse.id}
                              />
                              <FormComponent
                                name="Start Date"
                                inputType="date"
                                value={this.state.waterSchedule.startDate}
                                onChange={this.onChangeStartDate}
                              />
                              <FormComponent
                                name="End Date"
                                inputType="date"
                                value={this.state.waterSchedule.endDate}
                                onChange={this.onChangeEndDate}
                              />
                            </Col>
                            <Col xs={6}>
                              <DisabledFormComponent
                                name="Greenhouse water flow"
                                inputType="text"
                                value={this.state.greenhouse.waterFlow}
                              />
                              <FormComponent
                                name="Watering Time"
                                inputType="time"
                                onChange={this.onChangeWateringTime}
                              />
                              <FormDropdown
                                name="Enable"
                                options={this.state.isEnableOptions}
                                handleOnChange={this.setEnable}
                              />
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Card>
              </div>
            </Col>
          </Row>
          <ChartGrid 
            id={this.state.greenhouse.id}
            startDate={"2021-06-07"}
            endDate={"2021-06-13"}
          />
        </div>
      );
    }
  }
}

export default GreenhouseDetails;
