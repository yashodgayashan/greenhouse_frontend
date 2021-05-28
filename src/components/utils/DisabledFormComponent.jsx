import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class DisabledFormComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
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
              value={this.props.value}
              disabled={true}
            />
          </Col>
        </Row>
      </Form.Group>
    );
  }
}

export default DisabledFormComponent;
