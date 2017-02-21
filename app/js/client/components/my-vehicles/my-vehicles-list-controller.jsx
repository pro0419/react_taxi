import React, { Component } from "react";
import VehicleList from "./my-vehicles-list.jsx";
import { Provider } from "react-redux";
import VehiclesStore from "../../stores/vehicle.js";

class VehicleListController extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={VehiclesStore}>
        <VehicleList/>
      </Provider>
    );
  }
}

export default VehicleListController;