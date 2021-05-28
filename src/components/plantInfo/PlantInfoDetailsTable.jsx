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

class PlantInfoDetailsTable extends Component {
  constructor(props) {
    super(props);
  }

  editPlantInfo = id => {
    window.location.href = "/plant-info/" + id;
  };

  deletePlantInfo = id => {
    deleteMessage(
      createIsDeleteMsg("Plant Information", id),
      this.deleteApiCall,
      id
    );
  };

  deleteApiCall = id => {
    new ResourceAPIs()
      .deletePlantInfo(id)
      .then(response => {
        createDeleteMsg("Plant Information", id);
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
                  <TableCell align="right">Duration</TableCell>
                  <TableCell align="right">Min Temperature(C)</TableCell>
                  <TableCell align="right">Max Temperature(C)</TableCell>
                  <TableCell align="right">Created At</TableCell>
                  <TableCell align="right">Modified At</TableCell>
                  <TableCell align="right">Controlls</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.results.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row" align="right">
                      <a href={"/plant-info/" + row.id} target="_blank">
                        {row.id}
                      </a>
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                    <TableCell align="right">{row.plantDuration}</TableCell>
                    <TableCell align="right">{row.minTemperature}</TableCell>
                    <TableCell align="right">{row.maxTemperature}</TableCell>
                    <TableCell align="right">
                      {format2NiceDate(row.createdAt)}
                    </TableCell>
                    <TableCell align="right">
                      {format2NiceDate(row.modifiedAt)}
                    </TableCell>
                    <TableCell align="right">
                      <EditIcon
                        color="primary"
                        onClick={() => this.editPlantInfo(row.id)}
                      />
                      <DeleteIcon
                        color="secondary"
                        onClick={() => this.deletePlantInfo(row.id)}
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

export default PlantInfoDetailsTable;
