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
  constructGreenhousesArray
} from "../utils/MiscellaniosUtils";
import { getIdFromUrl } from "../../utils/MiscellaniosUtils";
import DisabledFormComponent from "../utils/FormComponent";
import FormDropdown from "../utils/FormDropdown";

const MySwal = withReactContent(Swal);

class NodeDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      node: {
        id: "",
        greenhouseId: 0,
        createdAt: "",
        modifiedAt: ""
      },
      errMsg: "",
      isNodeLoaded: false,
      isProcessing: false,
      saveBtnText: SAVE,
      greenhouses: []
    };
  }

  componentDidMount() {
    this.getGreenhouses();
  }

  getGreenhouses = () => {
    new ResourceAPIs()
      .getGreenhouses()
      .then(response => {
        this.setState(
          {
            greenhouses: constructGreenhousesArray(response.data)
          },
          () => {
            this.getNodeById();
          }
        );
      })
      .catch(error => {
        handleErr(error);
      });
  };

  getNodeById = () => {
    new ResourceAPIs()
      .getNode(getIdFromUrl())
      .then(result => {
        console.log(result.data);
        let nodeObj = result.data;
        this.setState({
          node: {
            id: nodeObj.id,
            greenhouseId: nodeObj.greenhouseId,
            createdAt: nodeObj.createdAt,
            modifiedAt: nodeObj.modifiedAt
          },
          isNodeLoaded: true
        });
      })
      .catch(error => {
        handleError(error);
        this.setState({
          isNodeLoaded: false,
          error
        });
      });
  };

  handleCancelEditNode = () => {
    this.getNodeById();
  };

  onChangeGreenhouseId = selectedValue => {
    console.log(selectedValue);
    let newState = Object.assign({}, this.state);
    newState.node.greenhouseId = selectedValue;
    this.setState(newState);
  };

  handleEditNode = () => {
    new ResourceAPIs()
      .updateNode(getIdFromUrl(), this.state.node)
      .then(result => {
        MySwal.fire(
          "Updated!",
          "Node " + this.state.node.id + " has been Updated.",
          "success"
        );
      })
      .catch(error => {
        handleError(error);
        this.setState({
          isNodeLoaded: false,
          error
        });
      });
  };

  render() {
    if (!this.state.isNodeLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <div style={{ marginLeft: "5%", marginRight: "5%" }}>
          <Row>
            <Col>
              <div>
                <Card border="secondary">
                  <Card.Header as="h5">
                    <span style={{ marginTop: 60 }}>Node Details</span>

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
                        onClick={this.handleEditNode}
                      >
                        {showSaveSpinner(this.state.saveBtnText)}
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        style={{ marginLeft: 10, width: 100 }}
                        onClick={this.handleCancelEditNode}
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
                            value={this.state.node.id}
                          />
                        </Col>
                        <Col xs={6}>
                          <FormDropdown
                            name="Greenhouse"
                            value={this.state.node.greenhouseId}
                            options={this.state.greenhouses}
                            handleOnChange={this.onChangeGreenhouseId}
                          />
                          <Row>
                            <Col>
                              <Form.Label>Created At</Form.Label>
                            </Col>
                            <Col>
                              <Badge variant="secondary">
                                {format2NiceDate(this.state.node.createdAt)}
                              </Badge>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Form.Label>Updated At</Form.Label>
                            </Col>
                            <Col>
                              <Badge variant="secondary">
                                {format2NiceDate(this.state.node.modifiedAt)}
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

export default NodeDetails;
