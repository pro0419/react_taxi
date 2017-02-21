import React, { Component } from "react";
import FindParking from "./find-parking-root.jsx";
import { Provider } from "react-redux";
import ParkingStore from "../../stores/parking.js";

class ParkingController extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={ParkingStore}>
        <FindParking/>
      </Provider>
    );
  }
}

export default ParkingController;