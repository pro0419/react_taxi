import React from 'react'
import { Provider } from 'react-redux'
import InspectorPanelRoot from './inspector-panel-root.jsx'
import store from '../../store/store.js'
import InspectorCreateTicket from './utils/create-ticket/inspector-panel-create-ticket.jsx'
import InspectorParkingField from './utils/parking-field/inspector-panel-parking-field.jsx'
import InspectorSearchPlate from './utils/search-plate/inspector-panel-search-plate.jsx'
import InspectorSearchLocation from './utils/search-location/inspector-panel-search-location.jsx'
import InspectorSearchCategory from './utils/search-category/inspector-panel-search-category.jsx'
import InspectorVehicleInfo from './utils/vehicle-info/inspector-panel-vehicle-info.jsx'
import CreateTicket from './utils/vehicle-info/utils/create-ticket.jsx'
import InspectorMapView from './utils/map-view/inspector-panel-map-view.jsx'
import InspectorListView from './utils/list-view/inspector-panel-list-view.jsx'

export class InspectorPanelController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <InspectorPanelRoot townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}

export class InspectorMapViewController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <InspectorMapView townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}

export class InspectorMapTicketController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <CreateTicket vehicleCode={this.props.params.vehicleCode} />
      </Provider>
    );
  }
}

export class InspectorListViewController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <InspectorListView townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}

export class InspectorCreateTicketController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <InspectorCreateTicket townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}

export class InspectorParkingFieldController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <InspectorParkingField townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}

export class InspectorSearchPlateController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <InspectorSearchPlate townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}

export class InspectorSearchLocationController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <InspectorSearchLocation townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}

export class InspectorSearchCategoryController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <InspectorSearchCategory townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}

export class InspectorVehicleInfoController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <InspectorVehicleInfo vehicleCode={this.props.params.vehicleCode} />
      </Provider>
    );
  }
}