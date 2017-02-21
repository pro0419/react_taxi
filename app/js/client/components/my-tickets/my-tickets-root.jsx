import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import cookie from "react-cookie";
import moment from "moment";

import Body from "../../../common/components/body/body.jsx";
import Modal from "./modal.jsx";
import { getTickets, setModalData } from "../../actions/tickets.js";

class MyTickets extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if(!this.checkAuthStatus()) {
      window.location = "/";
    }
    const userId = cookie.load('userId');
    const { dispatch } = this.props;
    dispatch(getTickets(userId));
  }

  checkAuthStatus() {
    const userId = cookie.load('userId');
    if(userId) {
      return true;
    }
  }

  renderNotice() {
    const { errorMessage } = this.props.tickets;
    return errorMessage ? (
      <div className="alert alert-danger">
        {errorMessage}
      </div>
    ) : null;
  }

  setModalData(ticketData) {
    const { dispatch } = this.props;
    dispatch(setModalData(ticketData));
    $(this.refs["my-ticket-details"]).openModal();
  }

  closeModal(e) {
    e.preventDefault();
    $(this.refs["my-ticket-details"]).closeModal();
  }

  renderModal() {
    const { selectedTicket } = this.props.tickets;
    const {
      plate_no,
      date_ticket,
      respond_date,
      violation_fee,
      hearing_date,
      hearing_location,
      hearing_time,
      email
    } = selectedTicket;
    return (
      <div className="modal modal-fixed-footer" ref="my-ticket-details">
        <div className="modal-content">
          <h3>Ticket Details</h3>
          <div>
            <p>Plate No: {plate_no}</p>
            <p>Date Ticket: {date_ticket}</p>
            <p>Respond Date: {respond_date}</p>
            <p>Violation Fee: {violation_fee}</p>
            <p>Hearing Date: {hearing_date}</p>
            <p>Hearing Location: {hearing_location}</p>
            <p>Hearing Time: {hearing_date}</p>
            <p>Email: {email}</p>
          </div>
        </div>
        <div className="modal-footer">
          <a href="javascript:void(0)"
            onclick={this.closeModal.bind(this)}
            className="modal-action modal-close waves-effect waves-green btn-flat">
              OK
          </a>
        </div>
      </div>
    );
  }

  renderTicket(ticketData, index) {
    const { date_ticket, respond_date, violation_fee } = ticketData;
    const ticketDate = moment(date_ticket).format("D MMMM, YYYY");
    const respondDate = moment(respond_date).format("D MMMM, YYYY");

    return (
      <div className="col s12" key={index}>
        <span
          onClick={this.setModalData.bind(this, ticketData)}
          className="ticket-modal-container">
          <div>
            <p>Ticket Date: {ticketDate}</p>
            <h5>Resp. Date: {respondDate}</h5>
            <p>Violation Fee: {violation_fee}</p>
          </div>
        </span>
      </div>
    )
  }

  renderTickets() {
    const { ticketList } = this.props.tickets;
    const notice = this.renderNotice();
    const context = this;
    const tickets = ticketList.map(this.renderTicket, this);
    return (
      <div className="tickets-list">
        {notice}
        <h4>My Tickets</h4>
        <div className="row">
          {tickets} 
        </div>
      </div>
    );
  }

  render() {
    const authStatus = this.checkAuthStatus();
    const { loading } = this.props.tickets;
    const modalData = this.renderModal();
    const content = this.renderTickets();

    return authStatus ? (
      <Body showHeader={true} loading={loading}>
        <div className="my-tickets-root">
          {content}
        </div>
        {modalData}
      </Body>
    ) : null;
  }
}

const MapStateToProps = (state) => {
  return {
    tickets: state.Tickets
  };
};

export default connect(MapStateToProps)(MyTickets);