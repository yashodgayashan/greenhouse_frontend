import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class ClearFiler extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button variant="secondary" onClick={this.props.onClick}>
        Clear
      </Button>
    );
  }
}

export default ClearFiler;
