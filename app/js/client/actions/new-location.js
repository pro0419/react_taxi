import * as PlacesAPI from "../api/traffic.js";
import { GenericError } from "../constants/texts.js";
import * as LocationAPI from "../api/locations.js"
import * as Actions from "../constants/actions.js";

import {
    FETCH_LOCATION_DETAILS_INITIATE,
    FETCH_LOCATION_DETAILS_SUCCESS,
    FETCH_LOCATION_DETAILS_FAIL,
} from "../constants/actions.js";

const initiateLocationFetch = () => {
  return {
    type: FETCH_LOCATION_DETAILS_INITIATE
  };
};

const receivedLocation = (data) => {
  return {
    type: FETCH_LOCATION_DETAILS_SUCCESS,
    data
  };
};

const fetchLocationFailed = () => {
  return {
    type: FETCH_LOCATION_DETAILS_FAIL
  };
};

export const getLocationDetails = (lat, lon) => {
  return dispatch => {
    dispatch(initiateLocationFetch());
    return PlacesAPI.getLocationDetails(lat, lon)
      .then((response) => {
        const { status, data } = response;
        if ( status == 200 ) {
          dispatch(receivedLocation(data.results[0].formatted_address));
        }
      })
      .catch((response) => {
        dispatch(fetchLocationFailed());
      });
  };
};

const initiateAddition = () => {
  return {
    type: Actions.LOCATION_ADDITION_INITIATE
  };
};

const locationAdded = (data) => {
  return {
    type: Actions.LOCATION_ADDITION_SUCCESS,
    data
  };
};

const locationAdditionFailed = (error) => {
  return {
    type: Actions.LOCATION_ADDITION_FAIL,
    error
  };
};

export const addLocation = (locationInfo) => {
  return dispatch => {
    dispatch(initiateAddition());
    return LocationAPI.addLocation(locationInfo)
      .then((response) => {
        const data = response.data;
        dispatch(locationAdded({
          id: data.resource[0].id
        }));
        window.location = "/my-locations";
      })
      .catch((response) => {
        dispatch(locationAdditionFailed({
          errorCode: "503",
          errorMessage: GenericError
        }));
      });
  };
};


const deletingLocation = (status) => {
  return {
    type: Actions.DELETING_LOCATION,
    status
  }
};

const LocationDeletionFailure = (error) => {
  return {
    type: Actions.DELETING_FAIL,
    error
  };
};

export const deleteLocation = (id) => {
  return dispatch => {
    dispatch(deletingLocation(true));
    return LocationAPI.deleteLocation(id)
      .then((response) => {
        dispatch(deletingLocation(false));
        window.location = "/my-locations";
      })
      .catch((response) => {
        dispatch(deletingLocation(false));
        dispatch(LocationDeletionFailure({
          errorCode: "503",
          errorMessage: GenericError
        }));
      });
  }
};


const initiateLocationSearch = () => {
  return {
    type: Actions.SEARCH_LOCATION_INITIATE
  };
};

const locationSearched = (data) => {
  return {
    type: Actions.SEARCH_LOCATION_SUCCESS,
    data
  };
};

const locationNotFound = () => {
  return {
    type: Actions.LOCATION_NOT_FOUND
  };
}

const locationSearchFailed = (error) => {
  return {
    type: Actions.SEARCH_LOCATION_FAILS,
    error
  };
};

export const searchNewLocation = (name_keyword) => {
  return dispatch => {
    dispatch(initiateLocationSearch());
    return LocationAPI.searchNewLocation(name_keyword)
      .then((response) => {
        const { data } = response;
        if(data && data.cod == "404") {
          dispatch(locationNotFound());
        } else {
          dispatch(locationSearched(data));
        }
        console.log(response);
      })
      .catch((response) => {
        dispatch(locationSearchFailed());
      });
  };
};