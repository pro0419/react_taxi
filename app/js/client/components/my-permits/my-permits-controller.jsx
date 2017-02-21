import React, { Component } from "react";
import MyPermits from "./my-permits-root.jsx";
import { Provider } from "react-redux";
import PermitsStore from "../../stores/permits.js";

class MyPermitsController extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={PermitsStore}>
        <MyPermits/>
      </Provider>
    );
  }
}

export default MyPermitsController;