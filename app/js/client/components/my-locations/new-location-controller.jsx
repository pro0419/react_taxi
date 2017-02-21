import React, { Component } from "react";
import NewLocationForm from "./new-location.jsx";
import { Provider } from "react-redux";
import NewLocationStore from "../../stores/new-location.js";

class NewLocationController extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={NewLocationStore}>
        <NewLocationForm/>
      </Provider>
    );
  }
}

export default NewLocationController;