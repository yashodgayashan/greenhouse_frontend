import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";

class SkipButton extends Component {
  constructor(props) {
    super(props);
  }

  handleOnClick = () => {
    this.props.filterSizeHandler();
    this.props.onClick();
  };

  render() {
    return (
      <IconButton onClick={this.handleOnClick} disabled={this.props.disabled}>
        {this.props.children}
      </IconButton>
    );
  }
}

export default SkipButton;
