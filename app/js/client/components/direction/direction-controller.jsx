import React, { Component } from "react";
import Direction from "./direction-root.jsx";
import { Provider } from "react-redux";
import DirectionStore from "../../stores/direction.js";

class DirectionController extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={DirectionStore}>
        <Direction/>
      </Provider>
    );
  }
}

export default DirectionController;