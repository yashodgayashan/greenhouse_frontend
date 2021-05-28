import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import Locations from "./components/locations/Locations";
import LocationDetails from "./components/locations/LocationDetails";
import Greenhouses from "./components/greenhouses/Greenhouses";
import GreenhouseDetails from "./components/greenhouses/GreenhouseDeatils";
import Sensors from "./components/sensors/Sensors";
import SensorDetails from "./components/sensors/SensorDetails";
import Nodes from "./components/nodes/Nodes";
import NodeDetails from "./components/nodes/NodeDetails";
import NodeSensor from "./components/nodeSensors/NodeSensors";
import NodeSensorDetails from "./components/nodeSensors/NodeSensorDetails";
import PlantInfo from "./components/plantInfo/PlantInfo";
import PlantInfoDetails from "./components/plantInfo/PlantInfoDetails";

import DefectDetection from "./components/defectDetection/DefectDetection";
import Defects from "./components/defects/Defects";
import DefectDetails from "./components/defects/DefectDetails";

import Harvest from "./components/harvest/Harvest";

class App extends Component {
  state = {};
  render() {
    const appStyle = {
      whiteSpace: "pre-wrap",
      backgroundImage: "url('/banner.jpg')",
      width: "100%",
      height: "100%",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    };
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/">Green</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="mr-auto">
              <NavDropdown
                title="Environment Control"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="/locations">Locations</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/greenhouses">
                  Greenhouses
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/nodes">Nodes</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/sensors">Sensors</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/node-sensors">
                  Node Sensors
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Defect Detection"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="/defect-detection">
                  Defect Detections
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/defects">Defects</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/harvest">Harvesting</Nav.Link>
              <Nav.Link href="/plant-info">Plant Info</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Router>
          <div>
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
              <Route exact path="/defect-detection">
                <DefectDetection />
              </Route>
              <Route exact path="/harvest">
                <Harvest />
              </Route>
              <Route exact path="/plant-info">
                <PlantInfo />
              </Route>
              <Route exact path="/plant-info/:id">
                <PlantInfoDetails />
              </Route>
              <Route exact path="/defects">
                <Defects />
              </Route>
              <Route exact path="/defects/:id">
                <DefectDetails />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
