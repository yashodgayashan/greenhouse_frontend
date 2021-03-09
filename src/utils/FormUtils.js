import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function getFormComponent(
  componentName,
  inputType,
  value,
  changeFunction
) {
  if (value === null) {
    value = "";
  }
  return (
    <Form.Group controlId="formBasicPassword">
      <Row>
        <Col xs={4}>
          <Form.Label>{componentName}</Form.Label>
        </Col>
        <Col xs={8}>
          <Form.Control
            type={inputType}
            size="sm"
            value={value}
            onChange={changeFunction}
          />
        </Col>
      </Row>
    </Form.Group>
  );
}

export function getDisabledFormComponent(componentName, inputType, value) {
  return (
    <Form.Group controlId="formBasicPassword">
      <Row>
        <Col xs={4}>
          <Form.Label>{componentName}</Form.Label>
        </Col>
        <Col xs={8}>
          <Form.Control
            type={inputType}
            size="sm"
            value={value}
            disabled={true}
          />
        </Col>
      </Row>
    </Form.Group>
  );
}
