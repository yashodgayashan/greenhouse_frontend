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

import { SAVE, levelOptions } from "../../constants";
import { format2NiceDate } from "../../utils/DateUtils";
import ResourceAPIs from "../../utils/ResourceAPI";
import {
  showSaveSpinner,
  handleError,
  handleErr,
  constructDropdownArray
} from "../utils/MiscellaniosUtils";
import { getIdFromUrl } from "../../utils/MiscellaniosUtils";
import DisabledFormComponent from "../utils/FormComponent";
import FormComponent from "../utils/FormComponent";
import FormDropdown from "../utils/FormDropdown";
import DefectManage from "./DefectManage";

const MySwal = withReactContent(Swal);

class DefectDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defect: {
        id: "",
        name: "",
        description: "",
        plantId: 0,
        level: "",
        createdAt: "",
        modifiedAt: ""
      },
      errMsg: "",
      isDefectLoaded: false,
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
            plants: constructDropdownArray(response.data)
          },
          () => {
            this.getDefectById();
          }
        );
      })
      .catch(error => {
        handleErr(error);
      });
  };

  getDefectById = () => {
    new ResourceAPIs()
      .getDefect(getIdFromUrl())
      .then(result => {
        let defect = result.data;
        this.setState({
          defect: {
            id: defect.id,
            name: defect.name,
            description: defect.description,
            plantId: defect.plantId,
            level: defect.level,
            createdAt: defect.createdAt,
            modifiedAt: defect.modifiedAt
          },
          isDefectLoaded: true
        });
      })
      .catch(error => {
        handleError(error);
        this.setState({
          isDefectLoaded: false,
          error
        });
      });
  };

  handleCancelEdit = () => {
    this.getDefectById();
  };

  onChangeName = event => {
    let newState = Object.assign({}, this.state);
    newState.defect.name = event.target.value;
    this.setState(newState);
  };

  onChangeDescription = event => {
    let newState = Object.assign({}, this.state);
    newState.defect.description = event.target.value;
    this.setState(newState);
  };

  onChangePlantId = plantId => {
    let newState = Object.assign({}, this.state);
    newState.defect.plantId = plantId;
    this.setState(newState);
  };

  onChangeLevel = Level => {
    let newState = Object.assign({}, this.state);
    newState.defect.level = Level;
    this.setState(newState);
  };

  handleEditDefect = () => {
    new ResourceAPIs()
      .updateDefect(getIdFromUrl(), this.state.defect)
      .then(result => {
        MySwal.fire(
          "Updated!",
          "Defect " + this.state.defect.id + " has been Updated.",
          "success"
        );
      })
      .catch(error => {
        handleError(error);
        this.setState({
          isDefectLoaded: false,
          error
        });
      });
  };

  render() {
    if (!this.state.isDefectLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <div style={{ marginLeft: "5%", marginRight: "5%" }}>
          <Row>
            <Col>
              <div>
                <Card border="secondary">
                  <Card.Header as="h5">
                    <span style={{ marginTop: 60 }}>Defect Details</span>

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
                        onClick={this.handleEditDefect}
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
                            value={this.state.defect.id}
                          />
                          <FormComponent
                            name="Name"
                            inputType="text"
                            value={this.state.defect.name}
                            onChange={this.onChangeName}
                          />
                          <FormComponent
                            name="Description"
                            inputType="text"
                            value={this.state.defect.description}
                            onChange={this.onChangeDescription}
                          />
                          <FormDropdown
                            name="Plant"
                            value={this.state.defect.plantId}
                            options={this.state.plants}
                            handleOnChange={this.onChangePlantId}
                          />
                        </Col>
                        <Col xs={6}>
                          <FormDropdown
                            name="Level"
                            value={this.state.defect.level}
                            options={levelOptions}
                            handleOnChange={this.onChangeLevel}
                          />
                          <Row>
                            <Col>
                              <Form.Label>Created At</Form.Label>
                            </Col>
                            <Col>
                              <Badge variant="secondary">
                                {format2NiceDate(this.state.defect.createdAt)}
                              </Badge>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Form.Label>Updated At</Form.Label>
                            </Col>
                            <Col>
                              <Badge variant="secondary">
                                {format2NiceDate(this.state.defect.modifiedAt)}
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
          <br />
          <DefectManage />
        </div>
      );
    }
  }
}

export default DefectDetails;
