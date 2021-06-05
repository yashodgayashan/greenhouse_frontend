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
        name: null,
        species: null,
        description: null,
        plantDuration: null,
        minTemperatureLow: null,
        minTemperatureHigh: null,
        maxTemperatureLow: null,
        maxTemperatureHigh: null,
        spacing: null,
        plantsPerPot: null,
        minNoOfHarvest: null,
        maxNumberOfHarvest: null,
        averageWeightOfHarvest: null,
        stage1Duration: null,
        stage2Duration: null,
        stage3Duration: null,
        stage4Duration: null,
        solid: null
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
        console.log(plantInfoObj);
        this.setState({
          plantInfo: {
            id: plantInfoObj.id,
            name: plantInfoObj.name,
            species: plantInfoObj.species,
            description: plantInfoObj.description,
            plantDuration: plantInfoObj.plantDuration,
            minTemperatureLow: plantInfoObj.minTemperatureLow,
            minTemperatureHigh: plantInfoObj.minTemperatureHigh,
            maxTemperatureLow: plantInfoObj.maxTemperatureLow,
            maxTemperatureHigh: plantInfoObj.maxTemperatureHigh,
            spacing: plantInfoObj.spacing,
            plantsPerPot: plantInfoObj.plantsPerPot,
            minNoOfHarvest: plantInfoObj.minNoOfHarvest,
            maxNumberOfHarvest: plantInfoObj.maxNumberOfHarvest,
            averageWeightOfHarvest: plantInfoObj.averageWeightOfHarvest,
            stage1Duration: plantInfoObj.stage1Duration,
            stage2Duration: plantInfoObj.stage2Duration,
            stage3Duration: plantInfoObj.stage3Duration,
            stage4Duration: plantInfoObj.stage4Duration,
            solid: plantInfoObj.solid,
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

  onChangeSpecies = event => {
    let newState = Object.assign({}, this.state);
    newState.plantInfo.species = event.target.value;
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

  onChangeMinTemperatureLow = event => {
    let newState = Object.assign({}, this.state);
    newState.plantInfo.minTemperatureLow = event.target.value;
    this.setState(newState);
  };

  onChangeMinTemperatureHigh = event => {
    let newState = Object.assign({}, this.state);
    newState.plantInfo.minTemperatureHigh = event.target.value;
    this.setState(newState);
  };

  onChangeMaxTemperatureLow = event => {
    let newState = Object.assign({}, this.state);
    newState.plantInfo.maxTemperatureLow = event.target.value;
    this.setState(newState);
  };

  onChangeMaxTemperatureHigh = event => {
    let newState = Object.assign({}, this.state);
    newState.plantInfo.maxTemperatureHigh = event.target.value;
    this.setState(newState);
  };

  onChangeSpacing = event => {
    let newState = Object.assign({}, this.state);
    newState.plantInfo.spacing = event.target.value;
    this.setState(newState);
  };

  onChangePlantsPerPot = event => {
    let newState = Object.assign({}, this.state);
    newState.plantInfo.plantsPerPot = event.target.value;
    this.setState(newState);
  };

  onChangeMinNoOfHarvest = event => {
    let newState = Object.assign({}, this.state);
    newState.plantInfo.minNoOfHarvest = event.target.value;
    this.setState(newState);
  };

  onChangeMaxNumberOfHarvest = event => {
    let newState = Object.assign({}, this.state);
    newState.plantInfo.maxNumberOfHarvest = event.target.value;
    this.setState(newState);
  };

  onChangeAverageWeightOfHarvest = event => {
    let newState = Object.assign({}, this.state);
    newState.plantInfo.averageWeightOfHarvest = event.target.value;
    this.setState(newState);
  };

  onChangeStage1Duration = event => {
    let newState = Object.assign({}, this.state);
    newState.plantInfo.stage1Duration = event.target.value;
    this.setState(newState);
  };

  onChangeStage1Duration = event => {
    let newState = Object.assign({}, this.state);
    newState.plantInfo.stage1Duration = event.target.value;
    this.setState(newState);
  };

  onChangeStage2Duration = event => {
    let newState = Object.assign({}, this.state);
    newState.plantInfo.stage2Duration = event.target.value;
    this.setState(newState);
  };

  onChangeStage3Duration = event => {
    let newState = Object.assign({}, this.state);
    newState.plantInfo.stage3Duration = event.target.value;
    this.setState(newState);
  };

  onChangeStage4Duration = event => {
    let newState = Object.assign({}, this.state);
    newState.plantInfo.stage4Duration = event.target.value;
    this.setState(newState);
  };

  onChangeSolid = event => {
    let newState = Object.assign({}, this.state);
    newState.plantInfo.solid = event.target.value;
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
                            name="Species"
                            inputType="text"
                            value={this.state.plantInfo.species}
                            onChange={this.onChangeSpecies}
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
                          <FormComponent
                            name="Min Temperature Low(C)"
                            inputType="number"
                            value={this.state.plantInfo.minTemperatureLow}
                            onChange={this.onChangeMinTemperatureLow}
                          />
                          <FormComponent
                            name="Min Temperature High(C)"
                            inputType="number"
                            value={this.state.plantInfo.minTemperatureHigh}
                            onChange={this.onChangeMinTemperatureHigh}
                          />
                          <FormComponent
                            name="Max Temperature Low(C)"
                            inputType="number"
                            value={this.state.plantInfo.maxTemperatureLow}
                            onChange={this.onChangeMaxTemperatureLow}
                          />
                          <FormComponent
                            name="Max Temperature High(C)"
                            inputType="number"
                            value={this.state.plantInfo.maxTemperatureHigh}
                            onChange={this.onChangeMaxTemperatureHigh}
                          />
                          <FormComponent
                            name="Spacing"
                            inputType="number"
                            value={this.state.plantInfo.spacing}
                            onChange={this.onChangeSpacing}
                          />
                        </Col>
                        <Col xs={6}>
                          <FormComponent
                            name="Plants per plot"
                            inputType="number"
                            value={this.state.plantInfo.plantsPerPot}
                            onChange={this.onChangePlantsPerPot}
                          />
                          <FormComponent
                            name="Min no of harvest"
                            inputType="number"
                            value={this.state.plantInfo.minNoOfHarvest}
                            onChange={this.onChangeMinNoOfHarvest}
                          />
                          <FormComponent
                            name="Max no of harvest"
                            inputType="number"
                            value={this.state.plantInfo.maxNumberOfHarvest}
                            onChange={this.onChangeMaxNumberOfHarvest}
                          />
                          <FormComponent
                            name="Average weight of harvest"
                            inputType="number"
                            value={this.state.plantInfo.averageWeightOfHarvest}
                            onChange={this.onChangeAverageWeightOfHarvest}
                          />
                          <FormComponent
                            name="Stage 1 Duration"
                            inputType="number"
                            value={this.state.plantInfo.stage1Duration}
                            onChange={this.onChangeStage1Duration}
                          />
                          <FormComponent
                            name="Stage 2 Duration"
                            inputType="number"
                            value={this.state.plantInfo.stage2Duration}
                            onChange={this.onChangeStage2Duration}
                          />
                          <FormComponent
                            name="Stage 3 Duration"
                            inputType="number"
                            value={this.state.plantInfo.stage3Duration}
                            onChange={this.onChangeStage3Duration}
                          />
                          <FormComponent
                            name="Stage 4 Duration"
                            inputType="number"
                            value={this.state.plantInfo.stage4Duration}
                            onChange={this.onChangeStage4Duration}
                          />
                          <FormComponent
                            name="Soil"
                            inputType="text"
                            value={this.state.plantInfo.solid}
                            onChange={this.onChangeSolid}
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
