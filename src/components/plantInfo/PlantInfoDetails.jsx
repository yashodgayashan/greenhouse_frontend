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
import { showSaveSpinner, handleError } from "../utils/MiscellaniosUtils";
import { getIdFromUrl } from "../../utils/MiscellaniosUtils";
import DisabledFormComponent from "../utils/FormComponent";
import FormComponent from "../utils/FormComponent";

const MySwal = withReactContent(Swal);

class PlantInfoDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plantInfo: {
        id: "",
        name: "",
        description: "",
        plantDuration: 0,
        minTemperature: "",
        maxTemperature: "",
        createdAt: "",
        modifiedAt: ""
      },
      errMsg: "",
      isPlantInfoLoaded: false,
      isProcessing: false,
      saveBtnText: SAVE
    };
  }

  componentDidMount() {
    this.getPlantInfoById();
  }

  getPlantInfoById = () => {
    new ResourceAPIs()
      .getPlantInfo(getIdFromUrl())
      .then(result => {
        let plantInfoObj = result.data;
        this.setState({
          plantInfo: {
            id: plantInfoObj.id,
            name: plantInfoObj.name,
            description: plantInfoObj.description,
            plantDuration: plantInfoObj.plantDuration,
            minTemperature: plantInfoObj.minTemperature,
            maxTemperature: plantInfoObj.maxTemperature,
            createdAt: plantInfoObj.createdAt,
            modifiedAt: plantInfoObj.modifiedAt
          },
          isPlantInfoLoaded: true
        });
      })
      .catch(error => {
        handleError(error);
        this.setState({
          isPlantInfoLoaded: false,
          error
        });
      });
  };

  handleCancelEditPlantInfo = () => {
    this.getPlantInfoById();
  };

  onChangeName = event => {
    let newState = Object.assign({}, this.state);
    newState.plantInfo.name = event.target.value;
    this.setState(newState);
  };

  onChangeDescription = event => {
    let newState = Object.assign({}, this.state);
    newState.plantInfo.description = event.target.value;
    this.setState(newState);
  };

  onChangeDuration = event => {
    let newState = Object.assign({}, this.state);
    newState.plantInfo.plantDuration = event.target.value;
    this.setState(newState);
  };

  onChangeMinTemp = event => {
    let newState = Object.assign({}, this.state);
    newState.plantInfo.minTemperature = event.target.value;
    this.setState(newState);
  };

  onChangeMaxTemp = event => {
    let newState = Object.assign({}, this.state);
    newState.plantInfo.maxTemperature = event.target.value;
    this.setState(newState);
  };

  handleEditPlantInfo = () => {
    new ResourceAPIs()
      .updatePlantInfo(getIdFromUrl(), this.state.plantInfo)
      .then(result => {
        MySwal.fire(
          "Updated!",
          "Plant Info " + this.state.plantInfo.id + " has been Updated.",
          "success"
        );
      })
      .catch(error => {
        handleError(error);
        this.setState({
          isPlantInfoLoaded: false,
          error
        });
      });
  };

  render() {
    if (!this.state.isPlantInfoLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <div style={{ marginLeft: "5%", marginRight: "5%" }}>
          <Row>
            <Col>
              <div>
                <Card border="secondary">
                  <Card.Header as="h5">
                    <span style={{ marginTop: 60 }}>Plant Info Details</span>

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
                        onClick={this.handleEditPlantInfo}
                      >
                        {showSaveSpinner(this.state.saveBtnText)}
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        style={{ marginLeft: 10, width: 100 }}
                        onClick={this.handleCancelEditPlantInfo}
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
                            value={this.state.plantInfo.id}
                          />
                          <FormComponent
                            name="Name"
                            inputType="text"
                            value={this.state.plantInfo.name}
                            onChange={this.onChangeName}
                          />
                          <FormComponent
                            name="Description"
                            inputType="text"
                            value={this.state.plantInfo.description}
                            onChange={this.onChangeDescription}
                          />
                          <FormComponent
                            name="Plan Duration"
                            inputType="number"
                            value={this.state.plantInfo.plantDuration}
                            onChange={this.onChangeDuration}
                          />
                        </Col>
                        <Col xs={6}>
                          <FormComponent
                            name="Min Temp(C)"
                            inputType="text"
                            value={this.state.plantInfo.minTemperature}
                            onChange={this.onChangeMinTemp}
                          />
                          <FormComponent
                            name="Max Temp(C)"
                            inputType="text"
                            value={this.state.plantInfo.maxTemperature}
                            onChange={this.onChangeMaxTemp}
                          />
                          <Row>
                            <Col>
                              <Form.Label>Created At</Form.Label>
                            </Col>
                            <Col>
                              <Badge variant="secondary">
                                {format2NiceDate(
                                  this.state.plantInfo.createdAt
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
                                  this.state.plantInfo.modifiedAt
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

export default PlantInfoDetails;
