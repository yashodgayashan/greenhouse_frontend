import React, { Component } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Clear from "@material-ui/icons/Clear";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import Form from "react-bootstrap/Form";
import Save from "@material-ui/icons/Save";
import IconButton from "@material-ui/core/IconButton";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { format2NiceDate } from "../../../utils/DateUtils";
import ResourceAPIs from "../../../utils/ResourceAPI";
import { getIdFromUrl } from "../../../utils/MiscellaniosUtils";
import {
  handleErr,
  deleteMessage,
  createIsDeleteMsg,
  createDeleteMsg,
  showSaveSpinner
} from "../../utils/MiscellaniosUtils";
import { SAVE, SAVING } from "../../../constants";
import FormComponent from "../../utils/FormComponent";

const MySwal = withReactContent(Swal);

const locationNameInput = {
  width: 200
};

class Reasons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      isProcessing: false,
      saveQtyBtnText: SAVE,
      reason: {
        name: "",
        description: "",
        diseaseId: parseInt(getIdFromUrl())
      }
    };

    this.onChangeReasonName = event => {
      let newState = Object.assign({}, this.state);
      newState.reason.name = event.target.value;
      this.setState(newState);
    };

    this.onChangeReasonDescription = event => {
      let newState = Object.assign({}, this.state);
      newState.reason.description = event.target.value;
      this.setState(newState);
    };

    this.onChangeName = (event, index) => {
      let stateCopy = Object.assign({}, this.state);
      stateCopy.results[index].edited = true;
      stateCopy.results[index].name = event.target.value;
      this.setState(stateCopy);
    };

    this.onChangeDescription = (event, index) => {
      let stateCopy = Object.assign({}, this.state);
      stateCopy.results[index].edited = true;
      stateCopy.results[index].description = event.target.value;
      this.setState(stateCopy);
    };

    this.cancelSaveQty = index => {
      let stateCopy = Object.assign({}, this.state);
      stateCopy.results[index].edited = false;
      stateCopy.results[index].name = this.state.results[index].untouchedName;
      stateCopy.results[index].description = this.state.results[
        index
      ].untouchedDescription;
      this.setState(stateCopy);
    };
  }

  addUntouchedValues = arr => {
    for (let i = 0; i < arr.length; i++) {
      arr[i].untouchedName = arr[i].name;
      arr[i].untouchedDescription = arr[i].description;
    }
    return arr;
  };

  getReasons = () => {
    new ResourceAPIs()
      .getDefectReasonsById(getIdFromUrl())
      .then(res => {
        this.setState({
          isProcessing: false,
          results: this.addUntouchedValues(res.data)
        });
      })
      .catch(error => {
        handleErr(error);
        this.setState({
          isProcessing: false,
          results: error
        });
      });
  };

  deleteReason = id => {
    deleteMessage(
      createIsDeleteMsg("Defect Reason", id),
      this.deleteApiCall,
      id
    );
  };

  deleteApiCall = id => {
    this.setState({
      isProcessing: true
    });

    new ResourceAPIs()
      .deleteDefectReason(id)
      .then(() => {
        this.getReasons();
        this.setState({
          isProcessing: false
        });
      })
      .catch(
        this.setState({
          isProcessing: false
        })
      );
  };

  clearAddDefectReasons = () => {
    this.setState({
      reason: {
        name: "",
        description: "",
        diseaseId: getIdFromUrl()
      }
    });
  };

  addDefectReason = () => {
    new ResourceAPIs()
      .createDefectReason(this.state.reason)
      .then(result => {
        MySwal.fire("Added!", "Defect Reason" + " has been Added.", "success");
        this.getReasons();
      })
      .catch(error => {
        handleErr(error);
        this.setState({
          isDefectLoaded: false,
          error
        });
      });
    this.clearAddDefectReasons();
  };

  saveQty = index => {
    this.setState({
      saveQtyBtnText: SAVING,
      isProcessing: true
    });
    let content = this.state.results[index];
    let id = parseInt(content.id, 10);

    const defectReason = {
      name: content.name,
      description: content.description,
      diseaseId: getIdFromUrl()
    };

    new ResourceAPIs()
      .updateDefectReason(id, defectReason)
      .then(res => {
        let stateCopy = Object.assign({}, this.state);
        stateCopy.saveQtyBtnText = SAVE;
        stateCopy.isProcessing = false;
        stateCopy.results[index].edited = false;
        stateCopy.results[index].untouchedName = this.state.results[index].name;
        stateCopy.results[index].untouchedDescription = this.state.results[
          index
        ].description;
        this.setState(stateCopy);
      })
      .catch(error => {
        handleErr(error);
        this.setState({
          saveQtyBtnText: SAVE,
          isProcessing: false
        });
      });
    this.setState({
      saveQtyBtnText: SAVE,
      isProcessing: false
    });
  };

  componentDidMount() {
    this.getReasons();
  }

  render() {
    return (
      <div>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Add New Reason
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <span style={{ marginTop: 60 }}>Defect Reason</span>

                <div style={{ float: "right" }}>
                  <span style={{ fontSize: 12, color: "red", marginRight: 60 }}>
                    {this.state.errMsg}
                  </span>
                  <Button
                    variant="success"
                    size="sm"
                    style={{ width: 100 }}
                    disabled={this.state.isProcessing}
                    onClick={this.addDefectReason}
                  >
                    Add
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    style={{ marginLeft: 10, width: 100 }}
                    onClick={this.clearAddDefectReasons}
                    disabled={this.state.isProcessing}
                  >
                    <Clear /> Cancel
                  </Button>
                </div>
                <br />
                <br />
                <Form>
                  <Row>
                    <Col xs={6}>
                      <FormComponent
                        name="Name"
                        inputType="text"
                        value={this.state.reason.name}
                        onChange={this.onChangeReasonName}
                      />
                    </Col>
                    <Col xs={6}>
                      <FormComponent
                        name="Description"
                        inputType="text"
                        value={this.state.reason.description}
                        onChange={this.onChangeReasonDescription}
                      />
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Body>
              {this.state.results.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table aria-label="simple table" size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Reason ID</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Created At</TableCell>
                        <TableCell align="center">Updated At</TableCell>
                        <TableCell>Controls</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.results.map((row, index) => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row" align="right">
                            {row.id}
                          </TableCell>
                          <TableCell align="right">
                            <Form.Control
                              size="sm"
                              type="text"
                              style={locationNameInput}
                              value={row.name == null ? "" : row.name}
                              onChange={e => this.onChangeName(e, index)}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Form.Control
                              size="sm"
                              type="text"
                              as="textarea"
                              rows={3}
                              style={locationNameInput}
                              value={
                                row.description == null ? "" : row.description
                              }
                              onChange={e => this.onChangeDescription(e, index)}
                            />
                          </TableCell>
                          <TableCell align="right">
                            {format2NiceDate(row.createdAt)}
                          </TableCell>
                          <TableCell align="right">
                            {format2NiceDate(row.modifiedAt)}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              color="primary"
                              style={{ padding: 6 }}
                              disabled={this.state.isProcessing || !row.edited}
                              onClick={() => this.saveQty(index)}
                            >
                              <Save />
                            </IconButton>
                            <IconButton
                              color="default"
                              style={{ padding: 6 }}
                              disabled={this.state.isProcessing || !row.edited}
                              onClick={() => this.cancelSaveQty(index)}
                            >
                              <Clear />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              style={{ padding: 6 }}
                              disabled={this.state.isProcessing}
                              onClick={() => this.deleteReason(row.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <p></p>
              )}
            </Card.Body>
          </Card>
        </Accordion>
      </div>
    );
  }
}

export default Reasons;
