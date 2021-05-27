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
  handleErr,
  constructNodeArray,
  constructSensorArray
} from "../utils/MiscellaniosUtils";
import { getIdFromUrl } from "../../utils/MiscellaniosUtils";
import DisabledFormComponent from "../utils/FormComponent";
import FormComponent from "../utils/FormComponent";
import FormDropdown from "../utils/FormDropdown";

const MySwal = withReactContent(Swal);

class NodeSensorDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nodeSensor: {
        id: "",
        nodeId: "",
        sensorId: "",
        minValue: 0,
        maxValue: 0,
        createdAt: "",
        modifiedAt: ""
      },
      errMsg: "",
      isNodeSensorLoaded: false,
      isProcessing: false,
      saveBtnText: SAVE,
      nodes: [],
      sensors: []
    };
  }

  componentDidMount() {
    this.getSensors();
  }

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
            this.getNodeSensorById();
          }
        );
      })
      .catch(error => {
        handleErr(error);
      });
  };

  getNodeSensorById = () => {
    new ResourceAPIs()
      .getNodeSensor(getIdFromUrl())
      .then(result => {
        let nodeSensorObj = result.data;
        this.setState({
          nodeSensor: {
            id: nodeSensorObj.id,
            nodeId: nodeSensorObj.nodeId,
            sensorId: nodeSensorObj.sensorId,
            minValue: nodeSensorObj.minValue,
            maxValue: nodeSensorObj.maxValue,
            createdAt: nodeSensorObj.createdAt,
            modifiedAt: nodeSensorObj.modifiedAt
          },
          isNodeSensorLoaded: true
        });
      })
      .catch(error => {
        handleError(error);
        this.setState({
          isNodeSensorLoaded: false,
          error
        });
      });
  };

  handleCancelEdit = () => {
    this.getNodeSensorById();
  };

  onChangeNodeId = selectedValue => {
    let newState = Object.assign({}, this.state);
    newState.nodeSensor.nodeId = selectedValue;
    this.setState(newState);
  };

  onChangeSensor = selectedValue => {
    let newState = Object.assign({}, this.state);
    newState.nodeSensor.sensorId = selectedValue;
    this.setState(newState);
  };

  onChangeMinValue = event => {
    let newState = Object.assign({}, this.state);
    newState.nodeSensor.minValue = event.target.value;
    this.setState(newState);
  };

  onChangeMaxValue = event => {
    let newState = Object.assign({}, this.state);
    newState.nodeSensor.maxValue = event.target.value;
    this.setState(newState);
  };

  handleEditNodeSensor = () => {
    new ResourceAPIs()
      .updateNodeSensor(getIdFromUrl(), this.state.nodeSensor)
      .then(result => {
        MySwal.fire(
          "Updated!",
          "Node Sensor " + this.state.nodeSensor.id + " has been Updated.",
          "success"
        );
      })
      .catch(error => {
        handleError(error);
        this.setState({
          isNodeSensorLoaded: false,
          error
        });
      });
  };

  render() {
    if (!this.state.isNodeSensorLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <div style={{ marginLeft: "5%", marginRight: "5%" }}>
          <Row>
            <Col>
              <div>
                <Card border="secondary">
                  <Card.Header as="h5">
                    <span style={{ marginTop: 60 }}>Node Sensor Details</span>

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
                        onClick={this.handleEditNodeSensor}
                      >
                        {showSaveSpinner(this.state.saveBtnText)}
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        style={{ marginLeft: 10, width: 100 }}
                        onClick={this.handleCancelEdit}
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
                            value={this.state.nodeSensor.id}
                          />
                          <FormDropdown
                            name="Node Id"
                            value={this.state.nodeSensor.nodeId}
                            options={this.state.nodes}
                            handleOnChange={this.onChangeNodeId}
                          />
                          <FormDropdown
                            name="Sensor"
                            value={this.state.nodeSensor.sensorId}
                            options={this.state.sensors}
                            handleOnChange={this.onChangeSensor}
                          />
                        </Col>
                        <Col xs={6}>
                          <FormComponent
                            name="Min Value"
                            inputType="number"
                            value={this.state.nodeSensor.minValue}
                            onChange={this.onChangeMinValue}
                          />
                          <FormComponent
                            name="Max Value"
                            inputType="number"
                            value={this.state.nodeSensor.maxValue}
                            onChange={this.onChangeMaxValue}
                          />
                          <Row>
                            <Col>
                              <Form.Label>Created At</Form.Label>
                            </Col>
                            <Col>
                              <Badge variant="secondary">
                                {format2NiceDate(
                                  this.state.nodeSensor.createdAt
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
                                  this.state.nodeSensor.modifiedAt
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
        </div>
      );
    }
  }
}

export default NodeSensorDetails;
