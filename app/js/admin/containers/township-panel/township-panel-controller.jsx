import React from 'react'
import { Provider } from 'react-redux'
import TownshipPanelRoot from './township-panel-root.jsx'
import TownshipPanelUsers from './utils/users/township-panel-users.jsx'
import TownshipPanelUserProfiles from './utils/user-profiles/township-panel-user-profiles'
import TownshipPanelFacilities from './utils/facilities/township-panel-facilities.jsx'
import TownshipPanelPermits from './utils/permits/township-panel-permits.jsx'
import TownshipPanelPermitRequests from './utils/permit-requests/township-panel-permit-requests.jsx'
import TownshipPanelViolationCode from './utils/violation-code/township-panel-violation-code.jsx'
import TownshipPanelHearingPlace from './utils/hearing-place/township-panel-hearing-place.jsx'
import TownshipPanelParkingRules from './utils/parking-rules/township-panel-parking-rules.jsx'
import Subscriptions from './utils/subscriptions/subscriptions.jsx'
import store from '../../store/store.js'

export class TownshipPanelController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <TownshipPanelRoot townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}

export class TownshipUsersController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <TownshipPanelUsers townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}

export class TownshipUserProfilesController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <TownshipPanelUserProfiles townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}

export class TownshipFacilitiesController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <TownshipPanelFacilities townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}

export class TownshipPermitsController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <TownshipPanelPermits townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}

export class TownshipPermitRequestsController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <TownshipPanelPermitRequests townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}

export class TownshipSubscriptionsController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <Subscriptions townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}

export class TownshipHearingPlaceController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <TownshipPanelHearingPlace townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}

export class TownshipViolationCodeController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <TownshipPanelViolationCode townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}

export class TownshipParkingRulesController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <TownshipPanelParkingRules townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}