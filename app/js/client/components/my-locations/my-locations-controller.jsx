import React, { Component } from "react";
import MyLocations from "./my-locations-root.jsx";
import { Provider } from "react-redux";
import LocationsStore from "../../stores/locations.js";

class MyLocationsController extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={LocationsStore}>
        <MyLocations/>
      </Provider>
    );
  }
}

export default MyLocationsController;