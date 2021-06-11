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
    const location = {
      name: null,
      location: null,
      imageURL: null,
      latitude: null,
      longatude: null
    };
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
      imageURL: null,
      width: null,
      height: null,
      length: null
    };
    return this.getHTTPClient().post("/greenhouses", greenhouse);
  }

  getGreenhouse(id) {
    return this.getHTTPClient().get("/greenhouses/" + id);
  }

  updateGreenhouse(id, greenhouse) {
    return this.getHTTPClient().put("/greenhouses/" + id, greenhouse);
  }

  getGreenhouseData(id, startDate, endDate) {
    return this.getHTTPClient().get("/greenhouses/" + id + "/data?startDate=" + startDate + "&endDate=" + endDate)
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

  // Nodes
  searchNodes(filters) {
    return this.getHTTPClient().post("/nodes/search", filters);
  }

  getNodes() {
    return this.getHTTPClient().get("/nodes");
  }

  deleteNode(id) {
    return this.getHTTPClient().delete("/nodes/" + id);
  }

  createNode() {
    const node = {
      greenhouseId: null
    };
    return this.getHTTPClient().post("/nodes", node);
  }

  getNode(id) {
    return this.getHTTPClient().get("/nodes/" + id);
  }

  updateNode(id, node) {
    return this.getHTTPClient().put("/nodes/" + id, node);
  }

  // NodeSensors
  searchNodeSensors(filters) {
    return this.getHTTPClient().post("/node-sensors/search", filters);
  }

  getNodeSensors() {
    return this.getHTTPClient().get("/node-sensors");
  }

  deleteNodeSensor(id) {
    return this.getHTTPClient().delete("/node-sensors/" + id);
  }

  createNodeSensor() {
    const nodeSensor = {
      nodeId: null,
      sensorId: null,
      minValue: null,
      maxValue: null
    };
    return this.getHTTPClient().post("/node-sensors", nodeSensor);
  }

  getNodeSensor(id) {
    return this.getHTTPClient().get("/node-sensors/" + id);
  }

  updateNodeSensor(id, nodeSensor) {
    return this.getHTTPClient().put("/node-sensors/" + id, nodeSensor);
  }

  // Plant Info
  searchPlantInfo(filters) {
    return this.getHTTPClient().post("/plant/info/search", filters);
  }

  getPlantInfos() {
    return this.getHTTPClient().get("/plant/info");
  }

  deletePlantInfo(id) {
    return this.getHTTPClient().delete("/plant/info/" + id);
  }

  createPlantInfo() {
    const plantInfo = {
      name: null,
      description: null,
      minTemperature: null,
      maxTemperature: null,
      plantDuration: null
    };
    return this.getHTTPClient().post("/plant/info", plantInfo);
  }

  getPlantInfo(id) {
    return this.getHTTPClient().get("/plant/info/" + id);
  }

  updatePlantInfo(id, plantInfo) {
    return this.getHTTPClient().put("/plant/info/" + id, plantInfo);
  }

  //Defect Detection
  predictDefect(data) {
    return this.getHTTPClient().post("/defect-detection", data);
  }

  //Defect Detection
  predictHarvest(data) {
    return this.getHTTPClient().post("/harvest", data);
  }

  // Defects
  searchDefects(filters) {
    return this.getHTTPClient().post("/defects/search", filters);
  }

  getDefects() {
    return this.getHTTPClient().get("/defects");
  }

  deleteDefect(id) {
    return this.getHTTPClient().delete("/defects/" + id);
  }

  createDefect() {
    const defect = {
      name: null,
      description: null,
      plantId: null,
      level: null
    };
    return this.getHTTPClient().post("/defects", defect);
  }

  getDefect(id) {
    return this.getHTTPClient().get("/defects/" + id);
  }

  updateDefect(id, defect) {
    return this.getHTTPClient().put("/defects/" + id, defect);
  }

  // Solutions
  getDefectSolutions() {
    return this.getHTTPClient().get("/defect-solutions");
  }

  getDefectSolutionsById(defectId) {
    return this.getHTTPClient().get("/defect-solutions?diseaseId=" + defectId);
  }

  deleteDefectSolution(id) {
    return this.getHTTPClient().delete("/defect-solutions/" + id);
  }

  createDefectSolution(defectSolution) {
    return this.getHTTPClient().post("/defect-solutions", defectSolution);
  }

  getDefectSolution(id) {
    return this.getHTTPClient().get("/defect-solutions/" + id);
  }

  updateDefectSolution(id, defectSolution) {
    return this.getHTTPClient().put("/defect-solutions/" + id, defectSolution);
  }

  // reasons
  getDefectReasons() {
    return this.getHTTPClient().get("/defect-reason");
  }

  getDefectReasonsById(defectId) {
    return this.getHTTPClient().get("/defect-reason?diseaseId=" + defectId);
  }

  deleteDefectReason(id) {
    return this.getHTTPClient().delete("/defect-reason/" + id);
  }

  createDefectReason(defectReason) {
    return this.getHTTPClient().post("/defect-reason", defectReason);
  }

  getDefectReason(id) {
    return this.getHTTPClient().get("/defect-reason/" + id);
  }

  updateDefectReason(id, defectReason) {
    return this.getHTTPClient().put("/defect-reason/" + id, defectReason);
  }

  // precautions
  getDefectPrecautions() {
    return this.getHTTPClient().get("/defect-precautions");
  }

  getDefectPrecautionsById(defectId) {
    return this.getHTTPClient().get(
      "/defect-precautions?diseaseId=" + defectId
    );
  }

  deleteDefectPrecaution(id) {
    return this.getHTTPClient().delete("/defect-precautions/" + id);
  }

  createDefectPrecaution(defectPrecaution) {
    return this.getHTTPClient().post("/defect-precautions", defectPrecaution);
  }

  getDefectPrecaution(id) {
    return this.getHTTPClient().get("/defect-precautions/" + id);
  }

  updateDefectPrecaution(id, defectPrecaution) {
    return this.getHTTPClient().put(
      "/defect-precautions/" + id,
      defectPrecaution
    );
  }
}
