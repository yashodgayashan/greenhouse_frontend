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

class SensorDetailsTable extends Component {
  constructor(props) {
    super(props);
  }
  editGreenhouse = id => {
    window.location.href = "/sensors/" + id;
  };

  deleteGreenhouse = id => {
    deleteMessage(createIsDeleteMsg("Sensor", id), this.deleteApiCall, id);
  };

  deleteApiCall = id => {
    new ResourceAPIs()
      .deleteSensor(id)
      .then(response => {
        createDeleteMsg("Sensor", id);
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
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Data Type</TableCell>
                  <TableCell align="right">Min Value</TableCell>
                  <TableCell align="right">Max Value</TableCell>
                  <TableCell align="right">Technology</TableCell>
                  <TableCell align="right">Voltage</TableCell>
                  <TableCell align="right">Modified At</TableCell>
                  <TableCell align="right">Controlls</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.results.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row" align="right">
                      <a href={"/sensors/" + row.id} target="_blank">
                        {row.id}
                      </a>
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                    <TableCell align="right">{row.dataType}</TableCell>
                    <TableCell align="right">{row.minValue}</TableCell>
                    <TableCell align="right">{row.maxValue}</TableCell>
                    <TableCell align="right">{row.technology}</TableCell>
                    <TableCell align="right">{row.workingVoltage}</TableCell>
                    <TableCell align="right">
                      {format2NiceDate(row.modifiedAt)}
                    </TableCell>
                    <TableCell align="right">
                      <EditIcon
                        color="primary"
                        onClick={() => this.editGreenhouse(row.id)}
                      />
                      <DeleteIcon
                        color="secondary"
                        onClick={() => this.deleteGreenhouse(row.id)}
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

export default SensorDetailsTable;
