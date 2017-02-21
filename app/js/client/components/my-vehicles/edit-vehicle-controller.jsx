import React, { Component } from "react";
import NewVehicleForm from "./my-vehicles-root.jsx";
import { Provider } from "react-redux";
import VehiclesStore from "../../stores/vehicle.js";

class EditVehicleController extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const vehicleId = this.props.params.vehicleId;
    return (
      <Provider store={VehiclesStore}>
        <NewVehicleForm vehicleId={vehicleId}/>
      </Provider>
    );
  }
}

export default EditVehicleController;