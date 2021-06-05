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
import Badge from "react-bootstrap/Badge";

import { format2NiceDate } from "../../utils/DateUtils";
import {
  deleteMessage,
  createIsDeleteMsg,
  createDeleteMsg,
  handleErr
} from "../utils/MiscellaniosUtils";
import ResourceAPIs from "../../utils/ResourceAPI";

const barcodeBadge = {
  width: 100
};

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
                  <TableCell align="right">Details</TableCell>
                  <TableCell align="right">Temperature</TableCell>
                  <TableCell align="right">Duration</TableCell>
                  <TableCell align="right">Plantation</TableCell>
                  <TableCell align="right">Harvest</TableCell>
                  <TableCell align="right">Timestamp</TableCell>
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
                    <TableCell align="left">
                      <Badge variant="primary" style={barcodeBadge}>
                        Name
                      </Badge>{" "}
                      {row.name}
                      <br />
                      <Badge variant="secondary" style={barcodeBadge}>
                        Species
                      </Badge>{" "}
                      {row.species}
                      <br />
                      <Badge variant="success" style={barcodeBadge}>
                        Species
                      </Badge>{" "}
                      {row.description}
                      <br />
                    </TableCell>
                    <TableCell align="right">
                      <Badge variant="danger" style={barcodeBadge}>
                        Min Temp Low
                      </Badge>{" "}
                      {row.minTemperatureLow}
                      <br />
                      <Badge variant="warning" style={barcodeBadge}>
                        Min Temp High
                      </Badge>{" "}
                      {row.minTemperatureHigh}
                      <br />
                      <Badge variant="info" style={barcodeBadge}>
                        Max Temp Low
                      </Badge>{" "}
                      {row.maxTemperatureLow}
                      <br />
                      <Badge variant="dark" style={barcodeBadge}>
                        Max Temp High
                      </Badge>{" "}
                      {row.maxTemperatureHigh}
                      <br />
                    </TableCell>
                    <TableCell align="right">
                      <Badge variant="dark" style={barcodeBadge}>
                        Total Duration
                      </Badge>{" "}
                      {row.plantDuration}
                      <br />
                      <Badge variant="success" style={barcodeBadge}>
                        Stage 1 Duration
                      </Badge>{" "}
                      {row.stage1Duration}
                      <br />
                      <Badge variant="danger" style={barcodeBadge}>
                        Stage 2 Duration
                      </Badge>{" "}
                      {row.stage2Duration}
                      <br />
                      <Badge variant="warning" style={barcodeBadge}>
                        Stage 3 Duration
                      </Badge>{" "}
                      {row.stage3Duration}
                      <br />
                      <Badge variant="info" style={barcodeBadge}>
                        Stage 4 Duration
                      </Badge>{" "}
                      {row.stage4Duration}
                      <br />
                    </TableCell>
                    <TableCell align="left">
                      <Badge variant="success" style={barcodeBadge}>
                        Spacing
                      </Badge>{" "}
                      {row.spacing}
                      <br />
                      <Badge variant="danger" style={barcodeBadge}>
                        Plants per pot
                      </Badge>{" "}
                      {row.plantsPerPot}
                      <br />
                      <Badge variant="warning" style={barcodeBadge}>
                        Soil
                      </Badge>{" "}
                      {row.solid}
                      <br />
                    </TableCell>
                    <TableCell align="left">
                      <Badge variant="danger" style={barcodeBadge}>
                        Min No Of Harvest
                      </Badge>{" "}
                      {row.minNoOfHarvest}
                      <br />
                      <Badge variant="warning" style={barcodeBadge}>
                        Max No Of Harvest
                      </Badge>{" "}
                      {row.maxNumberOfHarvest}
                      <br />
                      <Badge variant="info" style={barcodeBadge}>
                        Avg Weight of Corp
                      </Badge>{" "}
                      {row.averageWeightOfHarvest}
                      <br />
                    </TableCell>
                    <TableCell align="right">
                      {format2NiceDate(row.modifiedAt)}
                      {format2NiceDate(row.createdAt)}
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
