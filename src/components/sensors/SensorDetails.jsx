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

import { SAVE } from "../../constants";
import { format2NiceDate } from "../../utils/DateUtils";
import ResourceAPIs from "../../utils/ResourceAPI";
import {
  showSaveSpinner,
  handleError,
  handleErr
} from "../utils/MiscellaniosUtils";
import { getIdFromUrl } from "../../utils/MiscellaniosUtils";
import DisabledFormComponent from "../utils/FormComponent";
import FormComponent from "../utils/FormComponent";

const MySwal = withReactContent(Swal);

class SensorDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sensor: {
        id: "",
        name: "",
        description: "",
        dataType: "",
        minValue: 0.0,
        maxValue: 0.0,
        technology: "",
        workingVoltage: 0.0,
        dimensions: "",
        specialFacts: "",
        modifiedAt: "",
        createdAt: ""
      },
      errMsg: "",
      isSensorLoaded: false,
      isProcessing: false,
      saveBtnText: SAVE
    };
  }

  componentDidMount() {
    this.getSensorById();
  }
  getSensorById = () => {
    new ResourceAPIs()
      .getSensor(getIdFromUrl())
      .then(result => {
        let sensorObj = result.data;
        this.setState({
          sensor: {
            id: sensorObj.id,
            name: sensorObj.name,
            description: sensorObj.description,
            dataType: sensorObj.dataType,
            minValue: sensorObj.minValue,
            maxValue: sensorObj.maxValue,
            technology: sensorObj.technology,
            workingVoltage: sensorObj.workingVoltage,
            dimensions: sensorObj.dimensions,
            specialFacts: sensorObj.specialFacts,
            createdAt: sensorObj.createdAt,
            modifiedAt: sensorObj.modifiedAt
          },
          isSensorLoaded: true
        });
      })
      .catch(error => {
        handleError(error);
        this.setState({
          isSensorLoaded: false,
          error
        });
      });
  };

  handleCancelEditSensor = () => {
    this.getSensorById();
  };

  onChangeName = event => {
    let newState = Object.assign({}, this.state);
    newState.sensor.name = event.target.value;
    this.setState(newState);
  };

  onChangeDescription = event => {
    let newState = Object.assign({}, this.state);
    newState.sensor.description = event.target.value;
    this.setState(newState);
  };

  onChangeDataType = event => {
    let newState = Object.assign({}, this.state);
    newState.sensor.dataType = event.target.value;
    this.setState(newState);
  };

  onChangeMinValue = event => {
    let newState = Object.assign({}, this.state);
    newState.sensor.minValue = event.target.value;
    this.setState(newState);
  };

  onChangeMaxValue = event => {
    let newState = Object.assign({}, this.state);
    newState.sensor.maxValue = event.target.value;
    this.setState(newState);
  };

  onChangeTechnology = event => {
    let newState = Object.assign({}, this.state);
    newState.sensor.technology = event.target.value;
    this.setState(newState);
  };

  onChangeWorkingVoltage = event => {
    let newState = Object.assign({}, this.state);
    newState.sensor.workingVoltage = event.target.value;
    this.setState(newState);
  };

  onChangeDimensions = event => {
    let newState = Object.assign({}, this.state);
    newState.sensor.dimensions = event.target.value;
    this.setState(newState);
  };

  onChangeSpecialFacts = event => {
    let newState = Object.assign({}, this.state);
    newState.sensor.specialFacts = event.target.value;
    this.setState(newState);
  };

  handleEditSensor = () => {
    new ResourceAPIs()
      .updateSensor(getIdFromUrl(), this.state.sensor)
      .then(result => {
        MySwal.fire(
          "Updated!",
          "Sensor " + this.state.sensor.id + " has been Updated.",
          "success"
        );
      })
      .catch(error => {
        handleError(error);
        this.setState({
          isSensorLoaded: false,
          error
        });
      });
  };

  render() {
    if (!this.state.isSensorLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <div style={{ marginLeft: "5%", marginRight: "5%" }}>
          <Row>
            <Col>
              <div>
                <Card border="secondary">
                  <Card.Header as="h5">
                    <span style={{ marginTop: 60 }}>Sensor Details</span>

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
                        onClick={this.handleEditSensor}
                      >
                        {showSaveSpinner(this.state.saveBtnText)}
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        style={{ marginLeft: 10, width: 100 }}
                        onClick={this.handleCancelEditSensor}
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
                            value={this.state.sensor.id}
                          />
                          <FormComponent
                            name="Name"
                            inputType="text"
                            value={this.state.sensor.name}
                            onChange={this.onChangeName}
                          />
                          <FormComponent
                            name="Description"
                            inputType="text"
                            value={this.state.sensor.description}
                            onChange={this.onChangeDescription}
                          />

                          <FormComponent
                            name="Data Type"
                            inputType="text"
                            value={this.state.sensor.dataType}
                            onChange={this.onChangeDataType}
                          />
                          <FormComponent
                            name="Min Value"
                            inputType="number"
                            value={this.state.sensor.minValue}
                            onChange={this.onChangeMinValue}
                          />
                          <FormComponent
                            name="Max Value"
                            inputType="number"
                            value={this.state.sensor.maxValue}
                            onChange={this.onChangeMaxValue}
                          />
                        </Col>
                        <Col xs={6}>
                          <FormComponent
                            name="Technology"
                            inputType="text"
                            value={this.state.sensor.technology}
                            onChange={this.onChangeTechnology}
                          />
                          <FormComponent
                            name="Working Voltage"
                            inputType="number"
                            value={this.state.sensor.workingVoltage}
                            onChange={this.onChangeWorkingVoltage}
                          />
                          <FormComponent
                            name="Dimensions"
                            inputType="text"
                            value={this.state.sensor.dimensions}
                            onChange={this.onChangeDimensions}
                          />
                          <FormComponent
                            name="Special Facts"
                            inputType="text"
                            value={this.state.sensor.specialFacts}
                            onChange={this.onChangeSpecialFacts}
                          />
                          <Row>
                            <Col>
                              <Form.Label>Created At</Form.Label>
                            </Col>
                            <Col>
                              <Badge variant="secondary">
                                {format2NiceDate(this.state.sensor.createdAt)}
                              </Badge>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Form.Label>Updated At</Form.Label>
                            </Col>
                            <Col>
                              <Badge variant="secondary">
                                {format2NiceDate(this.state.sensor.modifiedAt)}
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
        </div>
      );
    }
  }
}

export default SensorDetails;
