import React, { Component } from "react";
import Button from "react-bootstrap/Button";

import { filterBtn } from "../../constants";
import { showFilterSpinner } from "./MiscellaniosUtils";

class FilterButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Button
          variant="success"
          style={filterBtn}
          onClick={this.props.onClick}
          disabled={this.props.disabled}
        >
          {showFilterSpinner(this.props.label)}
        </Button>
      </>
    );
  }
}

export default FilterButton;
