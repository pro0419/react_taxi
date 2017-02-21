import axios from 'axios';
import {reset, change} from 'redux-form';

import * as types from '../constants/actionTypes.js';
import * as apiTownship from '../api/api-township.js';
import {API_CONFIG} from '../config/api.js';

const AXIOS_INSTANCE = axios.create(API_CONFIG);

export function fetchTownshipUsers(townshipCode) {
  const URL = `township_users?filter=(township_code=${townshipCode})&include_schema=true`;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_USERS_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_USERS_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_USERS_GET_ERROR));
    })
  }
}

export function editTownshipUsers(data, id) {
  const URL = 'township_users?ids=' + id;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_USERS_PUT_REQ));
    return AXIOS_INSTANCE.put(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_USERS_PUT_SUCCESS));
      dispatch(reset('township-panel-users-edit'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_USERS_PUT_ERROR));
      console.log(response);
    })
  }
}

export function createTownshipUsers(data) {
  
  const URL = 'township_users';
  
  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_USERS_POST_REQ));
    return AXIOS_INSTANCE.post(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_USERS_POST_SUCCESS));
      dispatch(reset('township-panel-users-edit'));
      console.log(response);
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_USERS_POST_ERROR));
      console.log(response);
    })
  }
}


export function fetchTownshipFacilities(townshipCode) {
  const URL = `location_lot?filter=(township_code=${townshipCode})&include_schema=true`;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_FACILITIES_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_FACILITIES_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_FACILITIES_GET_ERROR));
    })
  }
}

export function editTownshipFacilities(data, id) {
  const URL = 'location_lot?ids=' + id;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_FACILITIES_PUT_REQ));
    return AXIOS_INSTANCE.put(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_FACILITIES_PUT_SUCCESS));
      dispatch(reset('township-panel-facilities-edit'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_FACILITIES_PUT_ERROR));
      console.log(response);
    })
  }
}

export function createTownshipFacilities(data) {
  
  const URL = 'location_lot';
  
  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_FACILITIES_POST_REQ));
    return AXIOS_INSTANCE.post(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_FACILITIES_POST_SUCCESS));
      dispatch(reset('township-panel-facilities-edit'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_FACILITIES_POST_ERROR));
    })
  }
}

export function fetchTownshipLocations(townshipCode) {
  const URL = `manage_locations?filter=(township_code=${townshipCode})&include_schema=true`;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_LOCATIONS_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_LOCATIONS_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_LOCATIONS_GET_ERROR));
    })
  }
}

export function editTownshipLocations(data, id) {
  const URL = 'manage_locations?ids=' + id;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_LOCATIONS_PUT_REQ));
    return AXIOS_INSTANCE.put(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_LOCATIONS_PUT_SUCCESS));
      dispatch(reset('township-panel-locations-edit'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_LOCATIONS_PUT_ERROR));
      console.log(response);
    })
  }
}

export function createTownshipLocations(data) {
  
  const URL = 'manage_locations';
  
  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_LOCATIONS_POST_REQ));
    return AXIOS_INSTANCE.post(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_LOCATIONS_POST_SUCCESS));
      dispatch(reset('township-panel-locations-create'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_LOCATIONS_POST_ERROR));
    })
  }
}

export function fetchTownshipPermitRequests(townshipCode) {
  const URL = `permit_subscription?filter=(township_code=${townshipCode})&include_schema=true`;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_PERMIT_REQUESTS_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_PERMIT_REQUESTS_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_PERMIT_REQUESTS_GET_ERROR));
    })
  }
}

export function editTownshipPermitRequests(data, id) {
  const URL = 'permit_subscription?ids=' + id;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_PERMIT_REQUESTS_PUT_REQ));
    return AXIOS_INSTANCE.put(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_PERMIT_REQUESTS_PUT_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_PERMIT_REQUESTS_PUT_ERROR));
      console.log(response);
    })
  }
}

export function fetchTownshipPermitTypes(townshipCode) {
  const URL = `permit_type?filter=(township_code=${townshipCode})&include_schema=true`;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_PERMIT_TYPES_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_PERMIT_TYPES_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_PERMIT_TYPES_GET_ERROR));
    })
  }
}

export function editTownshipPermitTypes(data, id) {
  const URL = 'permit_type?ids=' + id;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_PERMIT_TYPES_PUT_REQ));
    return AXIOS_INSTANCE.put(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_PERMIT_TYPES_PUT_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_PERMIT_TYPES_PUT_ERROR));
    })
  }
}

export function createTownshipPermitTypes(data) {
  
  const URL = 'permit_type';
  
  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_PERMIT_TYPES_POST_REQ));
    return AXIOS_INSTANCE.post(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_PERMIT_TYPES_POST_SUCCESS));
      dispatch(reset('permit-types'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_PERMIT_TYPES_POST_ERROR));
    })
  }
}

export function fetchTownshipParkingPermits(townshipCode) {
  const URL = `parking_permits?filter=(township_code=${townshipCode})&include_schema=true`;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_PARKING_PERMITS_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_PARKING_PERMITS_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_PARKING_PERMITS_GET_ERROR));
    })
  }
}

export function editTownshipParkingPermits(data, id) {
  const URL = 'parking_permits?ids=' + id;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_PARKING_PERMITS_PUT_REQ));
    return AXIOS_INSTANCE.put(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_PARKING_PERMITS_PUT_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_PARKING_PERMITS_PUT_ERROR));
    })
  }
}

export function createTownshipParkingPermits(data) {
  
  const URL = 'parking_permits';
  
  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_PARKING_PERMITS_POST_REQ));
    return AXIOS_INSTANCE.post(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_PARKING_PERMITS_POST_SUCCESS));
      dispatch(reset('parking_permits'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_PARKING_PERMITS_POST_ERROR));
    })
  }
}


export function fetchTownshipPermitsList(townshipCode) {
  const URL = `township_permits?filter=(township_code=${townshipCode})&include_schema=true`;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_PERMITS_LIST_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_PERMITS_LIST_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_PERMITS_LIST_GET_ERROR));
    })
  }
}

export function editTownshipPermitsList(data, id) {
  const URL = 'township_permits?ids=' + id;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_PERMITS_LIST_PUT_REQ));
    return AXIOS_INSTANCE.put(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_PERMITS_LIST_PUT_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_PERMITS_LIST_PUT_ERROR));
    })
  }
}

export function createTownshipPermitsList(data) {
  
  const URL = 'township_permits';
  
  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_PERMITS_LIST_POST_REQ));
    return AXIOS_INSTANCE.post(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_PERMITS_LIST_POST_SUCCESS));
      //dispatch(reset('township-permits'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_PERMITS_LIST_POST_ERROR));
    })
  }
}

export function fetchLocationsRate(townshipCode) {
  const URL = `locations_rate?filter=(township_code=${townshipCode})&include_schema=true`;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_LOCATIONS_RATE_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_LOCATIONS_RATE_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_LOCATIONS_RATE_GET_ERROR));
      console.log(response);
    })
  }
}

export function editLocationsRate(data, id) {
  const URL = 'locations_rate?ids=' + id;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_LOCATIONS_RATE_PUT_REQ));
    return AXIOS_INSTANCE.put(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_LOCATIONS_RATE_PUT_SUCCESS));
      dispatch(reset('permit-requests'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_LOCATIONS_RATE_PUT_ERROR));
      console.log(response);
    })
  }
}

export function createLocationsRate(data) {
  
  const URL = 'locations_rate';
  
  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_LOCATIONS_RATE_POST_REQ));
    return AXIOS_INSTANCE.post(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_LOCATIONS_RATE_POST_SUCCESS));
      dispatch(reset('locations-rate'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_LOCATIONS_RATE_POST_ERROR));
    })
  }
}

export function fetchHearingPlace() {
  const URL = `hearing_place_info?include_schema=true`;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_HEARING_PLACE_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_HEARING_PLACE_GET_SUCCESS));
    })
    .catch(function(response){
      console.log(response);
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_HEARING_PLACE_GET_ERROR));
    })
  }
}

export function editHearingPlace(data, id) {
  const URL = 'hearing_place_info?ids=' + id;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_HEARING_PLACE_PUT_REQ));
    return AXIOS_INSTANCE.put(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_HEARING_PLACE_PUT_SUCCESS));
      dispatch(reset('parking-payment'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_HEARING_PLACE_PUT_ERROR));
      console.log(response);
    })
  }
}

export function createHearingPlace(data) {
  
  const URL = 'hearing_place_info';
  
  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_HEARING_PLACE_POST_REQ));
    return AXIOS_INSTANCE.post(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_HEARING_PLACE_POST_SUCCESS));
      dispatch(reset('parking-payment'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_HEARING_PLACE_POST_ERROR));
      console.log(response);
    })
  }
}


export function fetchViolationCode(townshipCode) {
  const URL = `violation_code?&include_schema=true`;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_VIOLATION_CODE_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_VIOLATION_CODE_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_VIOLATION_CODE_GET_ERROR));
    })
  }
}

export function editViolationCode(data, id) {
  const URL = 'violation_code?ids=' + id;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_VIOLATION_CODE_PUT_REQ));
    return AXIOS_INSTANCE.put(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_VIOLATION_CODE_PUT_SUCCESS));
      dispatch(reset('parking-payment'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_VIOLATION_CODE_PUT_ERROR));
      console.log(response);
    })
  }
}

export function createViolationCode(data) {
  
  const URL = 'violation_code';
  
  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_VIOLATION_CODE_POST_REQ));
    return AXIOS_INSTANCE.post(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_VIOLATION_CODE_POST_SUCCESS));
      dispatch(reset('parking-payment'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_VIOLATION_CODE_POST_ERROR));
    })
  }
}

export function fetchParkingRules(locationCode) {
  const URL = `parking_rules?filter=(location_code=${locationCode})&include_schema=true`;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_PARKING_RULES_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_PARKING_RULES_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_PARKING_RULES_GET_ERROR));
    })
  }
}

export function editParkingRules(data, id) {
  const URL = 'parking_rules?ids=' + id;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_PARKING_RULES_PUT_REQ));
    return AXIOS_INSTANCE.put(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_PARKING_RULES_PUT_SUCCESS));
      dispatch(reset('parking-payment'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_PARKING_RULES_PUT_ERROR));
      console.log(response);
    })
  }
}

export function createParkingRules(data) {
  
  const URL = 'parking_rules';
  
  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_PARKING_RULES_POST_REQ));
    return AXIOS_INSTANCE.post(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_PARKING_RULES_POST_SUCCESS));
      dispatch(reset('parking-payment'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_PARKING_RULES_POST_ERROR));
    })
  }
}


export function resetLoading() {
  return {
    type: types.RESET_LOADING
  };
}

export function resetReduxForm(fields) {
  return (dispatch) => {
    Object.keys(fields).forEach(field => dispatch(change('township-users-form', fields[field], null)));
  }
}