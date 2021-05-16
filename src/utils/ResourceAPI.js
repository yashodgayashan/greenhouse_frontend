import axios from "axios";
import { HOST_NAME } from "../constants";

export default class ResourceAPI {
  getHTTPClient() {
    let httpClient = axios.create({
      baseURL: HOST_NAME
    });

    httpClient.defaults.headers.post["Content-Type"] = "application/json";

    httpClient.interceptors.response.use(
      function(response) {
        return response;
      },
      function(error) {
        return Promise.reject(error);
      }
    );

    return httpClient;
  }

  // Locations
  getLocations() {
    return this.getHTTPClient().get("/locations");
  }

  searchLocations(filters) {
    return this.getHTTPClient().post("/locations/search", filters);
  }

  deleteLocation(id) {
    return this.getHTTPClient().delete("/locations/" + id);
  }

  createLocation() {
    const location = { name: null, location: null, imageURL: null };
    return this.getHTTPClient().post("/locations", location);
  }

  getLocation(id) {
    return this.getHTTPClient().get("/locations/" + id);
  }

  updateLocation(id, location) {
    return this.getHTTPClient().put("/locations/" + id, location);
  }

  // Greenhouses
  searchGreenhouses(filters) {
    return this.getHTTPClient().post("/greenhouses/search", filters);
  }

  getGreenhouses() {
    return this.getHTTPClient().get("/greenhouses");
  }

  deleteGreenhouse(id) {
    return this.getHTTPClient().delete("/greenhouses/" + id);
  }

  createGreenhouse() {
    const greenhouse = {
      name: null,
      location: null,
      locationId: null,
      imageURL: null
    };
    return this.getHTTPClient().post("/greenhouses", greenhouse);
  }

  getGreenhouse(id) {
    return this.getHTTPClient().get("/greenhouses/" + id);
  }

  updateGreenhouse(id, greenhouse) {
    return this.getHTTPClient().put("/greenhouses/" + id, greenhouse);
  }

  // Sensors
  searchSensors(filters) {
    return this.getHTTPClient().post("/sensors/search", filters);
  }

  getSensors() {
    return this.getHTTPClient().get("/sensors");
  }

  deleteSensor(id) {
    return this.getHTTPClient().delete("/sensors/" + id);
  }

  createSensor() {
    const sensor = {
      name: null,
      description: null,
      dataType: "null",
      minValue: null,
      maxValue: null,
      technology: null,
      workingVoltage: null,
      dimensions: null,
      specialFacts: null
    };
    return this.getHTTPClient().post("/sensors", sensor);
  }

  getSensor(id) {
    return this.getHTTPClient().get("/sensors/" + id);
  }

  updateSensor(id, sensor) {
    return this.getHTTPClient().put("/sensors/" + id, sensor);
  }
}
