import React, { Component } from "react";
import MyTickets from "./my-tickets-root.jsx";
import { Provider } from "react-redux";
import TicketsStore from "../../stores/tickets.js";

class MyTicketsController extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={TicketsStore}>
        <MyTickets/>
      </Provider>
    );
  }
}

export default MyTicketsController;