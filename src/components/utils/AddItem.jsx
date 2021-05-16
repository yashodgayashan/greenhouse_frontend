import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Add } from "@material-ui/icons";

class AddItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row style={{ display: "block", textAlign: "center" }}>
        <p style={{ fontSize: 12, marginTop: 17 }}>{this.props.label}</p>
        <Button variant="primary" onClick={this.props.handleAddNew}>
          <Add /> Add New
        </Button>
      </Row>
    );
  }
}

export default AddItem;
