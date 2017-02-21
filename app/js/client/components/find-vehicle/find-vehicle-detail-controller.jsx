import React, { Component } from "react";
import FindVehicleDetail from "./find-vehicle-detail-root.jsx";
import { Provider } from "react-redux";
import FindVehicleStore from "../../stores/find-vehicle.js";

class FindVehicleDetailController extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const parkingId = this.props.params.parkingId;
    return (
      <Provider store={FindVehicleStore}>
        <FindVehicleDetail parkingId={parkingId}/>
      </Provider>
    );
  }
}

export default FindVehicleDetailController;