import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import FilterSelect from "./FilterSelect";
import { dropdownCol, filterLabel, inputCol } from "../../constants";

class FilterFiled extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Form.Label style={filterLabel}>{this.props.label}</Form.Label>
        <Row>
          <Col style={dropdownCol}>
            <FilterSelect
              options={this.props.filterOptions}
              handleOnChange={this.props.filterHandler}
            />
          </Col>
          <Col style={inputCol}>
            <Form.Control
              size="sm"
              type="text"
              onChange={this.props.fieldHandler}
              value={this.props.value}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default FilterFiled;
