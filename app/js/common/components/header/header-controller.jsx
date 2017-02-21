import React, { Component } from "react";
import Header from "./header.jsx";
import { Provider } from "react-redux";
import { MenuStore } from "./header.js";

class HeaderController extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={MenuStore}>
        <Header/>
      </Provider>
    );
  }
}

export default HeaderController;