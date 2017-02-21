import React, { Component } from "react";
import Nearby from "./nearby-root.jsx";
import { Provider } from "react-redux";
import NearbyStore from "../../stores/nearby.js";

class NearbyController extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={NearbyStore}>
        <Nearby/>
      </Provider>
    );
  }
}

export default NearbyController;