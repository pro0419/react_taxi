import React, { Component } from "react";
import FindVehicle from "./find-vehicle-root.jsx";
import { Provider } from "react-redux";
import FindVehicleStore from "../../stores/find-vehicle.js";

class FindVehicleController extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={FindVehicleStore}>
        <FindVehicle/>
      </Provider>
    );
  }
}

export default FindVehicleController;