import React, { Component } from "react";
import Transit from "./transit-root.jsx";
import { Provider } from "react-redux";
import TransitStore from "../../stores/transit.js";

class TransitController extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={TransitStore}>
        <Transit/>
      </Provider>
    );
  }
}

export default TransitController;