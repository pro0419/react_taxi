import * as PermitsAPI from "../api/permits.js"
import * as Actions from "../constants/actions.js";

const initiateFetch = () => {
  return {
    type: Actions.FETCH_PERMITS_INITIATE
  };
};

const permitsRetrieved = (data) => {
  return {
    type: Actions.FETCH_PERMITS_SUCCESS,
    data
  };
};


const permitsRetrievalFailed = (error) => {
  return {
    type: Actions.FETCH_PERMITS_FAIL,
    error
  };
};

export const getPermits = (user_id) => {
  return dispatch => {
    dispatch(initiateFetch());
    return PermitsAPI.getPermits(user_id)
      .then((response) => {
        const { data } = response;
        dispatch(permitsRetrieved(data.resource));
      })
      .catch((response) => {
        dispatch(permitsRetrievalFailed());
      });
  }
};

const locationsFetched = (locations) => {
  return {
    type: Actions.FETCH_LOCATIONS_SUCCESS,
    locations
  };
};

const locationRetrievalFailed = (error) => {
  return {
    type: Actions.FETCH_LOCATIONS_FAIL,
    error
  };
};

export const getLocations = () => {
  return dispatch => {
    return PermitsAPI.getLocations()
      .then((response) => {
        const { data } = response;
        const { resource } = data;
        let locationObj = {};
        if (resource) {
          resource.map( (location) => {
            locationObj[location.location_code] = location.full_address;
          });
          dispatch(locationsFetched(locationObj));
        }
      })
      .catch((response) => {
        dispatch(locationRetrievalFailed());
      });
  }
};
