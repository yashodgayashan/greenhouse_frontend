import React, { Component } from "react";
import TabContainer from "react-bootstrap/TabContainer";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Locations from "../locations/Locations";
import LocationDetails from "../locations/LocationDetails";
import Greenhouses from "../greenhouses/Greenhouses";
import GreenhouseDetails from "../greenhouses/GreenhouseDeatils";
import Sensors from "../sensors/Sensors";
import SensorDetails from "../sensors/SensorDetails";
import Nodes from "../nodes/Nodes";
import NodeDetails from "../nodes/NodeDetails";
import NodeSensor from "../nodeSensors/NodeSensors";
import NodeSensorDetails from "../nodeSensors/NodeSensorDetails";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { key: "locations" };
  }

  setKey = val => {
    this.setState({ key: val });
  };

  render() {
    return (
      <div style={{ marginLeft: "1%", marginRight: "1%" }}>
        <TabContainer
          id="left-tabs-example"
          activeKey={this.state.key}
          onSelect={key => {
            this.setKey(key);
          }}
        >
          <Row>
            <Col sm={2}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link href="/locations" eventKey="locations">
                    Locations
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/greenhouses" eventKey="greenhouses">
                    Greenhouses
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/nodes" eventKey="nodes">
                    Nodes
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/sensors" eventKey="sensors">
                    Sensors
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/node-sensors" eventKey="node-sensors">
                    Node Sensors
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10}>
              <Router>
                <Switch>
                  <Route exact path="/locations">
                    <Locations />
                  </Route>
                  <Route exact path="/locations/:id">
                    <LocationDetails />
                  </Route>
                  <Route exact path="/greenhouses">
                    <Greenhouses />
                  </Route>
                  <Route exact path="/greenhouses/:id">
                    <GreenhouseDetails />
                  </Route>
                  <Route exact path="/nodes">
                    <Nodes />
                  </Route>
                  <Route exact path="/nodes/:id">
                    <NodeDetails />
                  </Route>
                  <Route exact path="/sensors">
                    <Sensors />
                  </Route>
                  <Route exact path="/sensors/:id">
                    <SensorDetails />
                  </Route>
                  <Route exact path="/node-sensors">
                    <NodeSensor />
                  </Route>
                  <Route exact path="/node-sensors/:id">
                    <NodeSensorDetails />
                  </Route>
                </Switch>
              </Router>
            </Col>
          </Row>
        </TabContainer>
      </div>
    );
  }
}

export default Home;
