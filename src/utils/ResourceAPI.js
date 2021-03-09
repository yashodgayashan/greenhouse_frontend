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
}
