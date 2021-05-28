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

class GreenhouseDetailsTable extends Component {
  constructor(props) {
    super(props);
  }

  getLocationName = id => {
    let label;
    this.props.locations.map(location => {
      if (location.value == id) {
        label = location.label;
        return;
      }
    });
    return label;
  };

  editGreenhouse = id => {
    window.location.href = "/greenhouses/" + id;
  };

  deleteGreenhouse = id => {
    deleteMessage(createIsDeleteMsg("Greenhouse", id), this.deleteApiCall, id);
  };

  deleteApiCall = id => {
    new ResourceAPIs()
      .deleteGreenhouse(id)
      .then(response => {
        createDeleteMsg("Greenhouse", id);
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
                  <TableCell align="right">Place</TableCell>
                  <TableCell align="right">Location</TableCell>
                  <TableCell align="right">Length(ft)</TableCell>
                  <TableCell align="right">Height(ft)</TableCell>
                  <TableCell align="right">Width(ft)</TableCell>
                  <TableCell align="right">Created At</TableCell>
                  <TableCell align="right">Modified At</TableCell>
                  <TableCell align="right">Controlls</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.results.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row" align="right">
                      <a href={"/greenhouses/" + row.id} target="_blank">
                        {row.id}
                      </a>
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.location}</TableCell>
                    <TableCell align="right">
                      {this.getLocationName(row.locationId)}
                    </TableCell>
                    <TableCell align="right">{row.length}</TableCell>
                    <TableCell align="right">{row.height}</TableCell>
                    <TableCell align="right">{row.width}</TableCell>
                    <TableCell align="right">
                      {format2NiceDate(row.createdAt)}
                    </TableCell>
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

export default GreenhouseDetailsTable;
