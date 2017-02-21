import React, { Component } from "react";
import Traffic from "./traffic-root.jsx";
import { Provider } from "react-redux";
import TrafficStore from "../../stores/traffic.js";

class TrafficController extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={TrafficStore}>
        <Traffic/>
      </Provider>
    );
  }
}

export default TrafficController;