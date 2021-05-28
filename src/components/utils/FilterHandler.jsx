import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { SkipNext, SkipPrevious } from "@material-ui/icons";

import ClearFiler from "./ClearFilter";
import FilterButton from "./FilterButton";
import SkipButton from "./SkipButton";
import { resultsDescStyle } from "../../constants";

class FilterHandler extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Row style={{ display: "block", textAlign: "center" }}>
          <Form.Text className="text-muted">{this.props.errMsg}</Form.Text>
        </Row>
        <Row style={{ display: "block", textAlign: "center" }}>
          <SkipButton
            filterSizeHandler={this.props.decreaseSize}
            onClick={this.props.handleFilter}
            disabled={
              this.props.isProcessing || this.props.results.length < 100
            }
          >
            <SkipPrevious />
          </SkipButton>
          <span style={resultsDescStyle}>
            {this.props.results.length} results (Page{" "}
            {this.props.filters.from / 100 + 1})
          </span>
          <SkipButton
            filterSizeHandler={this.props.increaseSize}
            onClick={this.props.handleFilter}
            disabled={
              this.props.isProcessing || this.props.results.length !== 100
            }
          >
            <SkipNext />
          </SkipButton>
        </Row>
        <Row align="center" style={{ display: "block", textAlign: "center" }}>
          <FilterButton
            onClick={this.props.handleFilter}
            disabled={this.props.isProcessing}
            label={this.props.filterBtnText}
          />
          <ClearFiler onClick={this.props.clearFilters} />
        </Row>
      </>
    );
  }
}

export default FilterHandler;
