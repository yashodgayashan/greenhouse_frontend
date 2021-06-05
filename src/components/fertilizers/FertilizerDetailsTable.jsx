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

class FertilizerDetailsTable extends Component {
  constructor(props) {
    super(props);
  }

  getPlantSpeciesName = id => {
    let label;
    this.props.plants.map(plant => {
      if (plant.value == id) {
        label = plant.label;
        return;
      }
    });
    return label;
  };

  editFertilizer = id => {
    window.location.href = "/fertilizer/" + id;
  };

  deleteFertilizer = id => {
    deleteMessage(createIsDeleteMsg("Fertilizer", id), this.deleteApiCall, id);
  };

  deleteApiCall = id => {
    new ResourceAPIs()
      .deleteFertilizer(id)
      .then(response => {
        createDeleteMsg("Fertilizer", id);
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
                  <TableCell align="right">Plant</TableCell>
                  <TableCell align="right">Stage</TableCell>
                  <TableCell align="right">Medium</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Frequency</TableCell>
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
                    <TableCell align="right">{row.description}</TableCell>
                    <TableCell align="right">
                      {this.getPlantSpeciesName(row.plantId)}
                    </TableCell>
                    <TableCell align="right">{row.stage}</TableCell>
                    <TableCell align="right">{row.medium}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{row.frequency}</TableCell>
                    <TableCell align="right">
                      {format2NiceDate(row.createdAt)}
                    </TableCell>
                    <TableCell align="right">
                      {format2NiceDate(row.modifiedAt)}
                    </TableCell>
                    <TableCell align="right">
                      <EditIcon
                        color="primary"
                        onClick={() => this.editFertilizer(row.id)}
                      />
                      <DeleteIcon
                        color="secondary"
                        onClick={() => this.deleteFertilizer(row.id)}
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

export default FertilizerDetailsTable;
