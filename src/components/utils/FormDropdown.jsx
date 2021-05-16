import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const whFilterStyle = {
  fontSize: 12,
  width: "95%",
  marginTop: 6
};

class FormDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: getValue(this.props.options, this.props.value),
      options: this.props.options
    };
  }

  handleOnChange = event => {
    this.setState(
      {
        value: event.target.value
      },
      () => this.props.handleOnChange(this.state.value.value)
    );
  };

  render() {
    return (
      <div>
        <Form.Group controlId="formBasicPassword">
          <Row>
            <Col xs={4}>
              <Form.Label>{this.props.name}</Form.Label>
            </Col>
            <Col xs={8}>
              <select
                onChange={this.handleOnChange}
                value={this.state.value.value}
                style={whFilterStyle}
              >
                {createSelectItems(this.state.options)}
              </select>
            </Col>
          </Row>
        </Form.Group>
      </div>
    );
  }
}

export function getValue(opts, value) {
  let output;
  opts.map(location => {
    if (location.value == value) {
      output = location;
      return;
    }
  });
  return output;
}

export function createSelectItems(opts) {
  let items = [];
  for (let i = 0; i < opts.length; i++) {
    items.push(
      <option key={opts[i].value} value={opts[i].value}>
        {opts[i].label}
      </option>
    );
  }
  return items;
}

export default FormDropdown;
