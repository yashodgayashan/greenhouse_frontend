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

import {
  SAVE,
  PlantStageOptions,
  FertilizerFrequencyOptions
} from "../../constants";
import { format2NiceDate } from "../../utils/DateUtils";
import ResourceAPIs from "../../utils/ResourceAPI";
import {
  showSaveSpinner,
  handleError,
  handleErr,
  constructPlantSpeciesArray
} from "../utils/MiscellaniosUtils";
import { getIdFromUrl } from "../../utils/MiscellaniosUtils";
import DisabledFormComponent from "../utils/FormComponent";
import FormComponent from "../utils/FormComponent";
import FormDropdown from "../utils/FormDropdown";

const MySwal = withReactContent(Swal);

class FertilizerDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fertilizer: {
        id: "",
        name: "",
        description: "",
        plantId: 0,
        stage: "",
        medium: "",
        quantity: "",
        frequency: "",
        createdAt: "",
        modifiedAt: ""
      },
      errMsg: "",
      isFertilizerLoaded: false,
      isProcessing: false,
      saveBtnText: SAVE,
      plants: []
    };
  }

  componentDidMount() {
    this.getPlants();
  }

  getPlants = () => {
    new ResourceAPIs()
      .getPlantInfos()
      .then(response => {
        this.setState(
          {
            plants: constructPlantSpeciesArray(response.data)
          },
          () => {
            this.getFertilizerById();
          }
        );
      })
      .catch(error => {
        handleErr(error);
      });
  };

  getFertilizerById = () => {
    new ResourceAPIs()
      .getFertilizer(getIdFromUrl())
      .then(result => {
        let fertilizerObj = result.data;
        this.setState({
          fertilizer: {
            id: fertilizerObj.id,
            name: fertilizerObj.name,
            description: fertilizerObj.description,
            plantId: fertilizerObj.plantId,
            stage: fertilizerObj.stage,
            medium: fertilizerObj.medium,
            quantity: fertilizerObj.quantity,
            frequency: fertilizerObj.frequency,
            createdAt: fertilizerObj.createdAt,
            modifiedAt: fertilizerObj.modifiedAt
          },
          isFertilizerLoaded: true
        });
      })
      .catch(error => {
        handleError(error);
        this.setState({
          isFertilizerLoaded: false,
          error
        });
      });
  };

  handleCancelEdit = () => {
    this.getFertilizerById();
  };

  onChangeName = event => {
    let newState = Object.assign({}, this.state);
    newState.fertilizer.name = event.target.value;
    this.setState(newState);
  };

  onChangeDescription = event => {
    let newState = Object.assign({}, this.state);
    newState.fertilizer.description = event.target.value;
    this.setState(newState);
  };

  onChangePlantId = selectedValue => {
    let newState = Object.assign({}, this.state);
    newState.fertilizer.plantId = selectedValue;
    this.setState(newState);
  };

  onChangeStage = selectedValue => {
    let newState = Object.assign({}, this.state);
    newState.fertilizer.stage = selectedValue;
    this.setState(newState);
  };

  onChangeMedium = event => {
    let newState = Object.assign({}, this.state);
    newState.fertilizer.medium = event.target.value;
    this.setState(newState);
  };

  onChangeQuantity = event => {
    let newState = Object.assign({}, this.state);
    newState.fertilizer.quantity = event.target.value;
    this.setState(newState);
  };

  onChangeFrequency = selectedValue => {
    let newState = Object.assign({}, this.state);
    newState.fertilizer.frequency = selectedValue;
    this.setState(newState);
  };

  handleEditFertilizer = () => {
    new ResourceAPIs()
      .updateFertilizer(getIdFromUrl(), this.state.fertilizer)
      .then(result => {
        MySwal.fire(
          "Updated!",
          "Fertilizer " + this.state.fertilizer.id + " has been Updated.",
          "success"
        );
      })
      .catch(error => {
        handleError(error);
        this.setState({
          isFertilizerLoaded: false,
          error
        });
      });
  };

  render() {
    if (!this.state.isFertilizerLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <div style={{ marginLeft: "5%", marginRight: "5%" }}>
          <Row>
            <Col>
              <div>
                <Card border="secondary">
                  <Card.Header as="h5">
                    <span style={{ marginTop: 60 }}>Fertilizer Details</span>

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
                        onClick={this.handleEditFertilizer}
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
                            value={this.state.fertilizer.id}
                          />
                          <FormComponent
                            name="Name"
                            inputType="text"
                            value={this.state.fertilizer.name}
                            onChange={this.onChangeName}
                          />
                          <FormComponent
                            name="Description"
                            inputType="text"
                            value={this.state.fertilizer.description}
                            onChange={this.onChangeDescription}
                          />
                          <FormDropdown
                            name="Plant"
                            value={this.state.fertilizer.plantId}
                            options={this.state.plants}
                            handleOnChange={this.onChangePlantId}
                          />
                          <FormDropdown
                            name="Stage"
                            value={this.state.fertilizer.stage}
                            options={PlantStageOptions}
                            handleOnChange={this.onChangeStage}
                          />
                        </Col>
                        <Col xs={6}>
                          <FormComponent
                            name="Medium"
                            inputType="text"
                            value={this.state.fertilizer.medium}
                            onChange={this.onChangeMedium}
                          />
                          <FormComponent
                            name="Quantity"
                            inputType="number"
                            value={this.state.fertilizer.quantity}
                            onChange={this.onChangeQuantity}
                          />
                          <FormDropdown
                            name="Frequency"
                            value={this.state.fertilizer.frequency}
                            options={FertilizerFrequencyOptions}
                            handleOnChange={this.onChangeFrequency}
                          />
                          <Row>
                            <Col>
                              <Form.Label>Created At</Form.Label>
                            </Col>
                            <Col>
                              <Badge variant="secondary">
                                {format2NiceDate(
                                  this.state.fertilizer.createdAt
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
                                  this.state.fertilizer.modifiedAt
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

export default FertilizerDetails;
