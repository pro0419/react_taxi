import React from 'react';
import ReactDOM from "react-dom";
import { Router, Route, Link, hashHistory, browserHistory } from "react-router";
import { Provider } from 'react-redux';
import store from './store/store.js'
import cookie from "react-cookie";
import TownshipListController from './containers/township-list/township-list-controller.jsx';
import {
  TownshipPanelController, 
  TownshipUsersController, 
  TownshipUserProfilesController, 
  TownshipFacilitiesController, 
  TownshipPermitsController, 
  TownshipPermitRequestsController,
  TownshipSubscriptionsController,
  TownshipViolationCodeController,
  TownshipHearingPlaceController,
  TownshipParkingRulesController,

} from "./containers/township-panel/township-panel-controller.jsx"
import {
  BursarPanelController,
  BursarParkingController,
  BursarPermitController,
  BursarTicketController,
  BursarWalletController,
  BursarTicketRatesController,
  BursarWebReportsController,
  BursarReportsController,
} from './containers/bursar-panel/bursar-panel-controller.jsx'
import {
  InspectorPanelController,
	InspectorMapViewController,
  InspectorMapTicketController,
	InspectorListViewController,
  InspectorCreateTicketController,
  InspectorSearchPlateController,
  InspectorSearchLocationController,
  InspectorSearchCategoryController,
  InspectorParkingFieldController,
  InspectorVehicleInfoController,
} from './containers/inspector-panel/inspector-panel-controller.jsx'


export default function AdminIndex() {
  const role = cookie.load('role')
  const roleId = cookie.load('roleId')

  switch (role) {
    case "ApiAdmin":
      return superAdminRoutes()
    case "TwpAdmin":
      return twpAdminRoutes()
    case "TwpBursar":
      return twpBursarRoutes()
    case "TwpInspector":
      return twpInspectorRoutes()
    default:
      break;
  }
}

const superAdminRoutes = () => {
   return (
      <div>
        <Route path="admin" component={TownshipListController}/>

        <Route path="admin/township/:townshipCode" component={TownshipPanelController}/>
        <Route path="admin/township/users/:townshipCode" component={TownshipUsersController}/>
        <Route path="admin/township/user-profiles/:townshipCode" component={TownshipUserProfilesController}/>
        <Route path="admin/township/facilities/:townshipCode" component={TownshipFacilitiesController}/>
        <Route path="admin/township/parking-rules/:townshipCode" component={TownshipParkingRulesController}/>
        <Route path="admin/township/permit/:townshipCode" component={TownshipPermitsController}/>

        <Route path="admin/township/permit/township-permits/:townshipCode" component={TownshipPermitsController}/>
        <Route path="admin/township/permit/parking-permits/:townshipCode" component={TownshipPermitsController}/>
        <Route path="admin/township/permit/permit-type/:townshipCode" component={TownshipPermitsController}/>
        <Route path="admin/township/permit/locations-rate/:townshipCode" component={TownshipPermitsController}/>

        <Route path="admin/township/permit-requests/:townshipCode" component={TownshipPermitRequestsController}/>
        <Route path="admin/township/subscriptions/:townshipCode" component={TownshipSubscriptionsController}/>
        <Route path="admin/township/violation-code/:townshipCode" component={TownshipViolationCodeController}/>
        <Route path="admin/township/hearing-place/:townshipCode" component={TownshipHearingPlaceController}/>

        <Route path="admin/bursar/:townshipCode" component={BursarPanelController} />
        <Route path="admin/bursar/parking/:townshipCode" component={BursarParkingController} />
        <Route path="admin/bursar/permit/:townshipCode" component={BursarPermitController} />
        <Route path="admin/bursar/ticket/:townshipCode" component={BursarTicketController} />
        <Route path="admin/bursar/wallet/:townshipCode" component={BursarWalletController} />
        <Route path="admin/bursar/ticket-rates/:townshipCode" component={BursarTicketRatesController} />
        <Route path="admin/bursar/bursar-reports/:townshipCode" component={BursarReportsController} />
        <Route path="admin/bursar/web-reports/:townshipCode" component={BursarWebReportsController} />

        <Route path="admin/inspector/:townshipCode" component={InspectorPanelController} />
				<Route path="admin/inspector/map-view/:townshipCode" component={InspectorMapViewController} />
        <Route path="admin/inspector/map-view/create-ticket/:vehicleCode" component={InspectorCreateTicketController} />
				<Route path="admin/inspector/list-view/:townshipCode" component={InspectorListViewController} />
        <Route path="admin/inspector/parking-field/:townshipCode" component={InspectorParkingFieldController} />
        <Route path="admin/inspector/search-plate/:townshipCode" component={InspectorSearchPlateController} />
        <Route path="admin/inspector/search-location/:townshipCode" component={InspectorSearchLocationController} />
        <Route path="admin/inspector/search-category/:townshipCode" component={InspectorSearchCategoryController} />
        <Route path="admin/inspector/create-ticket/:townshipCode" component={InspectorCreateTicketController} />
        <Route path="admin/inspector/vehicle-info/:vehicleCode" component={InspectorVehicleInfoController} />
        <Route path="admin/inspector/vehicle-info/create-ticket/:vehicleCode" component={InspectorMapTicketController} />
      </div>
  );
}

const twpAdminRoutes = () => {
   return (
      <div>
        <Route path="admin/township/:townshipCode" component={TownshipPanelController}/>
        <Route path="admin/township/users/:townshipCode" component={TownshipUsersController}/>
        <Route path="admin/township/user-profiles/:townshipCode" component={TownshipUserProfilesController}/>
        <Route path="admin/township/facilities/:townshipCode" component={TownshipFacilitiesController}/>
        <Route path="admin/township/parking-rules/:townshipCode" component={TownshipParkingRulesController}/>
        <Route path="admin/township/permit/:townshipCode" component={TownshipPermitsController}/>
        <Route path="admin/township/permit/township-permits/:townshipCode" component={TownshipPermitsController}/>
        <Route path="admin/township/permit/parking-permits/:townshipCode" component={TownshipPermitsController}/>
        <Route path="admin/township/permit/permit-type/:townshipCode" component={TownshipPermitsController}/>
        <Route path="admin/township/permit/locations-rate/:townshipCode" component={TownshipPermitsController}/>
        <Route path="admin/township/permit-requests/:townshipCode" component={TownshipPermitRequestsController}/>
        <Route path="admin/township/subscriptions/:townshipCode" component={TownshipSubscriptionsController}/>
        <Route path="admin/township/violation-code/:townshipCode" component={TownshipViolationCodeController}/>
        <Route path="admin/township/hearing-place/:townshipCode" component={TownshipHearingPlaceController}/>
      </div>
  );
}

const twpBursarRoutes = () => {
   return (
      <div>
        <Route path="admin/bursar/:townshipCode" component={BursarPanelController} />
        <Route path="admin/bursar/parking/:townshipCode" component={BursarParkingController} />
        <Route path="admin/bursar/permit/:townshipCode" component={BursarPermitController} />
        <Route path="admin/bursar/ticket/:townshipCode" component={BursarTicketController} />
        <Route path="admin/bursar/wallet/:townshipCode" component={BursarWalletController} />
        <Route path="admin/bursar/ticket-rates/:townshipCode" component={BursarTicketRatesController} />
        <Route path="admin/bursar/bursar-reports/:townshipCode" component={BursarReportsController} />
        <Route path="admin/bursar/web-reports/:townshipCode" component={BursarWebReportsController} />
      </div>
  );
}

const twpInspectorRoutes = () => {
   return (
      <div>
        <Route path="admin/inspector/:townshipCode" component={InspectorPanelController} />
				<Route path="admin/inspector/map-view/:townshipCode" component={InspectorMapViewController} />
        <Route path="admin/inspector/map-view/create-ticket/:vehicleCode" component={InspectorCreateTicketController} />
				<Route path="admin/inspector/list-view/:townshipCode" component={InspectorListViewController} />
        <Route path="admin/inspector/parking-field/:townshipCode" component={InspectorParkingFieldController} />
        <Route path="admin/inspector/search-plate/:townshipCode" component={InspectorSearchPlateController} />
        <Route path="admin/inspector/search-location/:townshipCode" component={InspectorSearchLocationController} />
        <Route path="admin/inspector/search-category/:townshipCode" component={InspectorSearchCategoryController} />
        <Route path="admin/inspector/create-ticket/:townshipCode" component={InspectorCreateTicketController} />
        <Route path="admin/inspector/vehicle-info/:vehicleCode" component={InspectorVehicleInfoController} />
        <Route path="admin/inspector/vehicle-info/create-ticket/:vehicleCode" component={InspectorMapTicketController} />
      </div>
  );
}
