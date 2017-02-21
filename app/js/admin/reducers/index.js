import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import _ from 'lodash';

import {
  townshipListFetched, 
  townshipCreate, 
  townshipListEdited,
  townshipDetailsFetched, 
  uploadedImage,
	townshipImageEdited,
  townshipDetails
} from './reducer-township-list.js';

import {
  townshipUsersFetched, 
  townshipUsersEdited, 
  townshipUsersCreated, 

  townshipFacilitiesFetched,
  townshipFacilitiesEdited,
  townshipFacilitiesCreated,

  townshipLocationsFetched,
  townshipLocationsEdited,
  townshipLocationsCreated,

  townshipPermitRequestsFetched,
  townshipPermitRequestsEdited,

  townshipParkingPermitsFetched,
  townshipParkingPermitsEdited,
  townshipParkingPermitsCreated,

  townshipPermitsListFetched,
  townshipPermitsListEdited,
  townshipPermitsListCreated,

  townshipLocationsRateFetched,
  townshipLocationsRateEdited,
  townshipLocationsRateCreated,

  townshipPermitTypesFetched,
  townshipPermitTypesEdited,
  townshipPermitTypesCreated,

  townshipViolationCodeFetched,
  townshipViolationCodeEdited,
  townshipViolationCodeCreated,

  townshipHearingPlaceFetched,
  townshipHearingPlaceEdited,
  townshipHearingPlaceCreated,

  townshipParkingRulesFetched,
  townshipParkingRulesEdited,
  townshipParkingRulesCreated
} from './reducer-township-panel.js';

import {
  townshipSchemeTypesFetched,
  dataFetched,
  dataCreated,
  dataEdited
  } from './reducer-township-common.js';

import {
  bursarParkingPaymentCreated,
  bursarParkingPaymentFetched,
  bursarParkingPaymentEdited,

  bursarPermitPaymentCreated,
  bursarPermitPaymentEdited,
  bursarPermitPaymentFetched,

  bursarTicketPaymentCreated,
  bursarTicketPaymentEdited,
  bursarTicketPaymentFetched,

  bursarWalletPaymentCreated,
  bursarWalletPaymentEdited,
  bursarWalletPaymentFetched,

  bursarTicketRatesCreated,
  bursarTicketRatesEdited,
  bursarTicketRatesFetched,
} from './reducer-bursar-panel.js';

import {
  inspectorParkingFieldCreated,
  inspectorParkingFieldFetched,
  inspectorParkingFieldEdited,

  inspectorPlateCreated,
  inspectorPlateFetched,
  inspectorPlateEdited,

  inspectorTicketCreated,
  inspectorTicketFetched,
  inspectorTicketEdited,
  mapViewUpdated
} from './reducer-inspector-panel.js';

// Super Admin Panel

var townshipReducers = { 
  townshipListFetched: townshipListFetched,
  townshipCreate: townshipCreate,
  townshipListEdited: townshipListEdited,
  townshipDetails: townshipDetails,
  townshipDetailsFetched: townshipDetailsFetched,
  uploadedImage: uploadedImage,
	townshipImageEdited: townshipImageEdited
};

// Township Panel

var townshipPanelReducers = { 
  townshipUsersFetched: townshipUsersFetched,
  townshipUsersEdited: townshipUsersEdited,
  townshipUsersCreated: townshipUsersCreated,

  townshipFacilitiesFetched: townshipFacilitiesFetched,
  townshipFacilitiesEdited: townshipFacilitiesEdited,
  townshipFacilitiesCreated: townshipFacilitiesCreated,

  townshipLocationsFetched: townshipLocationsFetched,
  townshipLocationsEdited: townshipLocationsEdited,
  townshipLocationsCreated: townshipLocationsCreated,

  townshipPermitRequestsFetched: townshipPermitRequestsFetched,
  townshipPermitRequestsEdited: townshipPermitRequestsEdited,

  townshipPermitTypesFetched: townshipPermitTypesFetched,
  townshipPermitTypesCreated: townshipPermitTypesCreated,
  townshipPermitTypesEdited: townshipPermitTypesEdited,

  townshipParkingPermitsFetched: townshipParkingPermitsFetched,
  townshipParkingPermitsEdited: townshipParkingPermitsEdited,
  townshipParkingPermitsCreated: townshipParkingPermitsCreated,

  townshipPermitsListFetched: townshipPermitsListFetched,
  townshipPermitsListEdited: townshipPermitsListEdited,
  townshipPermitsListCreated: townshipPermitsListCreated,

  townshipLocationsRateFetched: townshipLocationsRateFetched,
  townshipLocationsRateEdited: townshipLocationsRateEdited,
  townshipLocationsRateCreated: townshipLocationsRateCreated,

  townshipViolationCodeFetched: townshipViolationCodeFetched,
  townshipViolationCodeEdited: townshipViolationCodeEdited,
  townshipViolationCodeCreated: townshipViolationCodeCreated,

  townshipHearingPlaceFetched: townshipHearingPlaceFetched,
  townshipHearingPlaceEdited: townshipHearingPlaceEdited,
  townshipHearingPlaceCreated: townshipHearingPlaceCreated,

  townshipParkingRulesFetched: townshipParkingRulesFetched,
  townshipParkingRulesEdited: townshipParkingRulesEdited,
  townshipParkingRulesCreated: townshipParkingRulesCreated,
};

var bursarPanelReducers = { 
  bursarParkingPaymentCreated: bursarParkingPaymentCreated,
  bursarParkingPaymentFetched: bursarParkingPaymentFetched,
  bursarParkingPaymentEdited: bursarParkingPaymentEdited,

  bursarPermitPaymentCreated: bursarPermitPaymentCreated,
  bursarPermitPaymentEdited: bursarPermitPaymentEdited,
  bursarPermitPaymentFetched: bursarPermitPaymentFetched,

  bursarTicketPaymentCreated: bursarTicketPaymentCreated,
  bursarTicketPaymentEdited: bursarTicketPaymentEdited,
  bursarTicketPaymentFetched: bursarTicketPaymentFetched,

  bursarWalletPaymentCreated: bursarWalletPaymentCreated,
  bursarWalletPaymentEdited: bursarWalletPaymentEdited,
  bursarWalletPaymentFetched: bursarWalletPaymentFetched,
  
  bursarTicketRatesCreated: bursarTicketRatesCreated,
  bursarTicketRatesEdited: bursarTicketRatesEdited,
  bursarTicketRatesFetched: bursarTicketRatesFetched,
};

var inspectorPanelReducers = {
  inspectorParkingFieldCreated: inspectorParkingFieldCreated,
  inspectorParkingFieldFetched: inspectorParkingFieldFetched,
  inspectorParkingFieldEdited: inspectorParkingFieldEdited,

  inspectorPlateCreated: inspectorPlateCreated,
  inspectorPlateFetched: inspectorPlateFetched,
  inspectorPlateEdited: inspectorPlateEdited,

  inspectorTicketCreated: inspectorTicketCreated,
  inspectorTicketFetched: inspectorTicketFetched,
  inspectorTicketEdited: inspectorTicketEdited,
  mapViewUpdated: mapViewUpdated,
}

// Common / Shared between township stuff.

var townshipCommonReducers = { 
  townshipSchemeTypesFetched: townshipSchemeTypesFetched,
  dataFetched: dataFetched,
  dataCreated: dataCreated,
  dataEdited: dataEdited
};

var reduxFormReducer = { 
  form: formReducer 
};

var combinedReducerObjects = _.assign(
  townshipReducers, 
  townshipPanelReducers, 
  townshipCommonReducers,
  bursarPanelReducers,
  inspectorPanelReducers,
  reduxFormReducer
);

const rootReducer = combineReducers(combinedReducerObjects);

export default rootReducer;