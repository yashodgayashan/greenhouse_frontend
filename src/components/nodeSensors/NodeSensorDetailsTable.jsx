import React, { Component } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import EditIcon from "@material-ui/icons/Edit";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";

import { format2NiceDate } from "../../utils/DateUtils";
import {
  deleteMessage,
  createIsDeleteMsg,
  createDeleteMsg,
  handleErr
} from "../utils/MiscellaniosUtils";
import ResourceAPIs from "../../utils/ResourceAPI";

class NodeSensorDetailsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getSensorName = id => {
    let label;
    this.props.sensors.map(sensor => {
      if (sensor.value == id) {
        label = sensor.label;
        return;
      }
    });
    return label;
  };

  editNodeSensor = id => {
    window.location.href = "/node-sensors/" + id;
  };

  deleteNodeSensor = id => {
    deleteMessage(createIsDeleteMsg("NodeSensor", id), this.deleteApiCall, id);
  };

  deleteApiCall = id => {
    new ResourceAPIs()
      .deleteNodeSensor(id)
      .then(response => {
        createDeleteMsg("NodeSensor", id);
        this.props.isUpdate();
      })
      .catch(error => {
        handleErr(error);
      });
  };

  render() {
    return (
      <>
        {this.props.results.length > 0 ? (
          <TableContainer component={Paper}>
            <Table aria-label="simple table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="right">ID</TableCell>
                  <TableCell align="right">Node Id</TableCell>
                  <TableCell align="right">Sensor</TableCell>
                  <TableCell align="right">Min Value</TableCell>
                  <TableCell align="right">Max Value</TableCell>
                  <TableCell align="right">Created At</TableCell>
                  <TableCell align="right">Modified At</TableCell>
                  <TableCell align="right">Controlls</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.results.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row" align="right">
                      <a href={"/node-sensors/" + row.id} target="_blank">
                        {row.id}
                      </a>
                    </TableCell>
                    <TableCell align="right">{row.nodeId}</TableCell>
                    <TableCell align="right">
                      {this.getSensorName(row.sensorId)}
                    </TableCell>
                    <TableCell align="right">{row.minValue}</TableCell>
                    <TableCell align="right">{row.maxValue}</TableCell>
                    <TableCell align="right">
                      {format2NiceDate(row.createdAt)}
                    </TableCell>
                    <TableCell align="right">
                      {format2NiceDate(row.modifiedAt)}
                    </TableCell>
                    <TableCell align="right">
                      <EditIcon
                        color="primary"
                        onClick={() => this.editNodeSensor(row.id)}
                      />
                      <DeleteIcon
                        color="secondary"
                        onClick={() => this.deleteNodeSensor(row.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p></p>
        )}
      </>
    );
  }
}

export default NodeSensorDetailsTable;
