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

import { format2NiceDate } from "../../utils/DateUtils";
import {
  getDisabledFormComponent,
  getFormComponent
} from "../../utils/FormUtils";
import { showSaveSpinner, handleError } from "../utils/MiscellaniosUtils";
import { getIdFromUrl } from "../../utils/MiscellaniosUtils";
import { SAVE } from "../../constants";
import ResourceAPIs from "../../utils/ResourceAPI";

const MySwal = withReactContent(Swal);

class LocationDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {
        id: "",
        name: "",
        location: "",
        createdAt: "",
        modifiedAt: ""
      },
      errMsg: "",
      isLocationLoaded: false,
      isProcessing: false,
      saveLocationBtnText: SAVE
    };
  }

  componentDidMount() {
    this.getLocationById();
  }

  getLocationById = () => {
    new ResourceAPIs()
      .getLocation(getIdFromUrl())
      .then(result => {
        let locationObj = result.data;
        this.setState({
          location: {
            id: locationObj.id,
            name: locationObj.name,
            location: locationObj.location,
            createdAt: locationObj.createdAt,
            modifiedAt: locationObj.modifiedAt
          },
          isLocationLoaded: true
        });
      })
      .catch(error => {
        handleError(error);
        this.setState({
          isLocationLoaded: false,
          error
        });
      });
  };

  onChangeName = event => {
    let newState = Object.assign({}, this.state);
    newState.location.name = event.target.value;
    this.setState(newState);
  };

  onChangeLocation = event => {
    let newState = Object.assign({}, this.state);
    newState.location.location = event.target.value;
    this.setState(newState);
  };

  handleCancelEditLocation = () => {
    this.getLocationById();
  };

  handleEditLocation = () => {
    new ResourceAPIs()
      .updateLocation(getIdFromUrl(), this.state.location)
      .then(result => {
        MySwal.fire(
          "Updated!",
          "Location " + this.state.location.id + " has been Updated.",
          "success"
        );
      })
      .catch(error => {
        handleError(error);
        this.setState({
          isLocationLoaded: false,
          error
        });
      });
  };

  render() {
    if (!this.state.isLocationLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <div style={{ marginLeft: "5%", marginRight: "5%" }}>
          <Row>
            <Col>
              <div>
                <Card border="secondary">
                  <Card.Header as="h5">
                    <span style={{ marginTop: 60 }}>Location Details</span>

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
                        onClick={this.handleEditLocation}
                      >
                        {showSaveSpinner(this.state.saveLocationBtnText)}
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        style={{ marginLeft: 10, width: 100 }}
                        onClick={this.handleCancelEditLocation}
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
                          {getDisabledFormComponent(
                            "ID",
                            "number",
                            this.state.location.id
                          )}
                          {getFormComponent(
                            "Name",
                            "text",
                            this.state.location.name,
                            this.onChangeName
                          )}
                          {getFormComponent(
                            "Location",
                            "text",
                            this.state.location.location,
                            this.onChangeLocation
                          )}
                        </Col>
                        <Col xs={6}>
                          <Row>
                            <Col>
                              <Form.Label>Created At</Form.Label>
                            </Col>
                            <Col>
                              <Badge variant="secondary">
                                {format2NiceDate(this.state.location.createdAt)}
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
                                  this.state.location.modifiedAt
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

export default LocationDetails;
