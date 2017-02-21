import React, { Component } from "react";
import MyWallet from "./my-wallet-root.jsx";
import { Provider } from "react-redux";
import WalletStore from "../../stores/wallet.js";

class MyWalletController extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={WalletStore}>
        <MyWallet/>
      </Provider>
    );
  }
}

export default MyWalletController;