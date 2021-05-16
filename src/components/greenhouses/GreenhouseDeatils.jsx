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
  constructLocationArray
} from "../utils/MiscellaniosUtils";
import { getIdFromUrl } from "../../utils/MiscellaniosUtils";
import DisabledFormComponent from "../utils/FormComponent";
import FormComponent from "../utils/FormComponent";
import FormDropdown from "../utils/FormDropdown";

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
        createdAt: "",
        modifiedAt: ""
      },
      errMsg: "",
      isGreenhouseLoaded: false,
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
        this.setState({
          greenhouse: {
            id: greenhouseObj.id,
            name: greenhouseObj.name,
            location: greenhouseObj.location,
            locationId: greenhouseObj.locationId,
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

  handleCancelEditGreenhouse = () => {
    this.getGreenhouseById();
  };

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

  onChangeLocationId = selectedValue => {
    let newState = Object.assign({}, this.state);
    newState.greenhouse.locationId = selectedValue;
    this.setState(newState);
  };

  handleEditGreenhouse = () => {
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
  };

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
                            name="Place"
                            inputType="text"
                            value={this.state.greenhouse.location}
                            onChange={this.onChangeLocation}
                          />
                        </Col>
                        <Col xs={6}>
                          <FormDropdown
                            name="Location"
                            value={this.state.greenhouse.locationId}
                            options={this.state.locations}
                            handleOnChange={this.onChangeLocationId}
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
        </div>
      );
    }
  }
}

export default GreenhouseDetails;
