import React, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Solutions from "./solutions/solutions";
import Reasons from "./reasons/Reasons";
import Precautions from "./precautions/Precautions";

class DefectManager extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Solution</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Reasons</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Precautions</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Solutions />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <Reasons />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <Precautions />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}

export default DefectManager;
