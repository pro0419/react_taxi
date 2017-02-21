import React, { Component } from "react";
import SignIn from "./sign-in-root.jsx";
import { Provider } from "react-redux";
import UserStore from "../../stores/user.js";

class SignInController extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={UserStore}>
        <SignIn/>
      </Provider>
    );
  }
}

export default SignInController;