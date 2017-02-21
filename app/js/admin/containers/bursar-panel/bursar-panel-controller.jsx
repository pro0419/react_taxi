import React from 'react'
import { Provider } from 'react-redux'
import BursarPanelRoot from './bursar-panel-root.jsx'
import BursarPanelParkingPayment from './utils/parking-payment/bursar-panel-parking-payment.jsx'
import BursarPanelPermitPayment from './utils/permit-payment/bursar-panel-permit-payment.jsx'
import BursarPanelTicketPayment from './utils/ticket-payment/bursar-panel-ticket-payment.jsx'
import BursarPanelWalletPayment from './utils/wallet-payment/bursar-panel-wallet-payment.jsx'
import BursarPanelTicketRates from './utils/ticket-rates/bursar-panel-ticket-rates.jsx';
import BursarPanelBursarReports from './utils/bursar-reports/bursar-panel-bursar-reports.jsx';
import BursarPanelWebReports from './utils/web-reports/bursar-panel-web-reports.jsx';
import store from '../../store/store.js'

export class BursarPanelController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <BursarPanelRoot townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}

export class BursarParkingController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <BursarPanelParkingPayment townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}

export class BursarPermitController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <BursarPanelPermitPayment townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}

export class BursarTicketController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <BursarPanelTicketPayment townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}

export class BursarWalletController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <BursarPanelWalletPayment townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}

export class BursarTicketRatesController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <BursarPanelTicketRates townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}

export class BursarReportsController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <BursarPanelBursarReports townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}

export class BursarWebReportsController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <BursarPanelWebReports townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}