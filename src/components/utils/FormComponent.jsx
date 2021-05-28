import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class FormComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const value = this.props.value === null ? "" : this.props.value;
    return (
      <Form.Group controlId="formBasicPassword">
        <Row>
          <Col xs={4}>
            <Form.Label>{this.props.name}</Form.Label>
          </Col>
          <Col xs={8}>
            <Form.Control
              type={this.props.inputType}
              size="sm"
              value={value}
              onChange={this.props.onChange}
            />
          </Col>
        </Row>
      </Form.Group>
    );
  }
}

export default FormComponent;
