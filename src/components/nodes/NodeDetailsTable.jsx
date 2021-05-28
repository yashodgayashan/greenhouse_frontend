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

class NodeDetailsTable extends Component {
  constructor(props) {
    super(props);
  }

  getGreenhouseName = id => {
    let label;
    this.props.greenhouses.map(greenhouse => {
      if (greenhouse.value == id) {
        label = greenhouse.label;
        return;
      }
    });
    return label;
  };

  editNode = id => {
    window.location.href = "/nodes/" + id;
  };

  deleteNode = id => {
    deleteMessage(createIsDeleteMsg("Node", id), this.deleteApiCall, id);
  };

  deleteApiCall = id => {
    new ResourceAPIs()
      .deleteNode(id)
      .then(response => {
        createDeleteMsg("Node", id);
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
                  <TableCell align="right">Greenhouse</TableCell>
                  <TableCell align="right">Created At</TableCell>
                  <TableCell align="right">Modified At</TableCell>
                  <TableCell align="right">Controlls</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.results.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row" align="right">
                      <a href={"/nodes/" + row.id} target="_blank">
                        {row.id}
                      </a>
                    </TableCell>
                    <TableCell align="right">
                      {this.getGreenhouseName(row.greenhouseId)}
                    </TableCell>
                    <TableCell align="right">
                      {format2NiceDate(row.createdAt)}
                    </TableCell>
                    <TableCell align="right">
                      {format2NiceDate(row.modifiedAt)}
                    </TableCell>
                    <TableCell align="right">
                      <EditIcon
                        color="primary"
                        onClick={() => this.editNode(row.id)}
                      />
                      <DeleteIcon
                        color="secondary"
                        onClick={() => this.deleteNode(row.id)}
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

export default NodeDetailsTable;
