import React, { Component } from "react";
import NewVehicleForm from "./my-vehicles-root.jsx";
import { Provider } from "react-redux";
import VehiclesStore from "../../stores/vehicle.js";

class NewVehicleController extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={VehiclesStore}>
        <NewVehicleForm/>
      </Provider>
    );
  }
}

export default NewVehicleController;