import * as ParkingAPI from "../api/parking.js";
import { getWalletBalance, makePayment } from "../api/wallet.js";
import { getLocationDetails } from "../api/nearby.js";
import * as VehicleAPI from "../api/vehicle.js"
import * as Actions from "../constants/actions.js";
import { GenericError } from "../constants/texts.js";
import moment from "moment";


const enableLoading = () => {
  return {
    type: Actions.ENABLE_LOADING
  };
};

const disableLoading = () => {
  return {
    type: Actions.DISABLE_LOADING
  };
};

const initiateParkingFetch = () => {
  return {
    type: Actions.FETCH_PARKING_INITIATE
  };
};

const receivedNearbyParking = (data) => {
  return {
    type: Actions.FETCH_PARKING_SUCCESS,
    data
  };
};

const fetchNearbyParkingFailed = (error) => {
  return {
    type: Actions.FETCH_PARKING_FAIL,
    error
  };
};

export const getNearbyParking = (position) => {
  return dispatch => {
    dispatch(initiateParkingFetch());
    return ParkingAPI.getNearByParking(position)
      .then((response) => {
        dispatch(receivedNearbyParking(response.data));
      })
      .catch((response) => {
        dispatch(fetchNearbyParkingFailed(response));
      });
  };
};

export const getLocation = (addressComponents) => {
  let city = null, state = null, country = null, zip = null;
  const length = addressComponents.length;

  for (let i = 0; i < length; i++) {
    if(addressComponents[i].types.indexOf("locality") !== -1 && !city) {
      city = addressComponents[i].long_name;
    }
    if(addressComponents[i].types.indexOf("administrative_area_level_1") !== -1 && !state) {
      state = addressComponents[i].long_name;
    }
    if(addressComponents[i].types.indexOf("country") !== -1 && !country) {
      country = addressComponents[i].long_name;
    }
    if(addressComponents[i].types.indexOf("postal_code") !== -1 && !zip) {
      zip = addressComponents[i].long_name;
    }
  }
  return {
    city: city,
    state: state,
    country: country,
    zip: zip
  };
};

export const setLocationAddress = (location) => {
  return {
    type: Actions.SET_LOCATION_ADDRESS,
    location
  };
};

export const getAddress = (lat, lng) => {
  return dispatch => {
    dispatch(initiateParkingFetch());
    return getLocationDetails(lat, lng)
      .then((response) => {
        console.log(response.data);
        const location = getLocation(response.data.results[0].address_components);
        dispatch(setLocationAddress(location));
        dispatch(getParkingRules(location.city, location.state));
      })
      .catch((response) => {
        console.log("failed");
        //dispatch(fetchNearbyParkingFailed(response));
      });
  };
};

export const updateGeolocation = (position) => {
  return {
    type: Actions.UPDATE_GEOLOCATION,
    position
  };
};

const toggleFreeParking = (val) => {
  return {
    type: Actions.TOGGLE_FREE_PARKING,
    val
  };
};

const togglePaidParking = (val) => {
  return {
    type: Actions.TOGGLE_PAID_PARKING,
    val
  };
};

const toggleManagedParking = (val) => {
  return {
    type: Actions.TOGGLE_MANAGED_PARKING,
    val
  };
};

export const setParkingType = (type, val) => {
  return dispatch => {
    switch (type) {
      case "free":
        dispatch(toggleFreeParking(val));
        break;
      case "paid":
        dispatch(togglePaidParking(val));
        break;
      case "managed":
        dispatch(toggleManagedParking(val));
        break;
    }
  }
};

export const setParkingOptions = (status) => {
  return {
    type: Actions.SET_PARKING_OPTIONS,
    status
  };
};

export const setOtherLocations = (status) => {
  return {
    type: Actions.SET_OTHER_LOCATIONS,
    status
  };
};

export const setSelectedMarker = (marker) => {
  return {
    type: Actions.SET_SELECTED_MARKER,
    marker
  };
};

export const setSelectedLocation = (location) => {
  return {
    type: Actions.SET_SELECTED_LOCATION,
    location
  }
}

const receivedParkingRules = (data) => {
  console.log(data);
  return {
    type: Actions.FETCH_PARKING_RULES_SUCCESS,
    data
  };
};

const fetchParkingRulesFailed = (error) => {
  return {
    type: Actions.FETCH_PARKING_RULES_FAIL,
    error
  };
};

export const getParkingRules = (city, state) => {
  return dispatch => {
    return ParkingAPI.getParkingRules(city, state)
      .then((response) => {
        const respArr = response.data.resource;
        const formattedArr = {};
        for (var i = 0; i < respArr.length; i++ ) {
          if(respArr[i].location_code) {
            formattedArr[respArr[i].location_code] = respArr[i];
          }
        }
        dispatch(receivedParkingRules(formattedArr));
      })
      .catch((response) => {
        dispatch(fetchParkingRulesFailed(response));
      });
  };
};

const showFreeParkingModal = (markerItem) => {
  return {
    type: Actions.SHOW_FREE_PARKING,
    markerItem
  };
};

const showPaidParkingModal = (markerItem) => {
  return {
    type: Actions.SHOW_PAID_PARKING,
    markerItem
  };
};

const showManagedParkingModal = (markerItem) => {
  return {
    type: Actions.SHOW_MANAGED_PARKING,
    markerItem
  };
};

export const setSelectedParking = (parkingType, markerItem) => {
  return dispatch => {
    switch (parkingType) {
      case "FREE":
        dispatch(showFreeParkingModal(markerItem));
        break;
      case "PAID":
        dispatch(showPaidParkingModal(markerItem));
        break;
      case "MANAGED":
        dispatch(showManagedParkingModal(markerItem));
        break;
    }
  }
};

export const hideSelectedParking = () => {
  return {
    type: Actions.HIDE_SELECTED_PARKING
  }
}

const initiateParkingLotFetch = () => {
  return {
    type: Actions.FETCH_PARKING_LOT_INITIATE
  };
};

const receivedParkingLot = (data) => {
  return {
    type: Actions.FETCH_PARKING_LOT_SUCCESS,
    data
  };
};

const fetchNearParkingLotFailed = (error) => {
  return {
    type: Actions.FETCH_PARKING_LOT_FAIL,
    error
  };
};

export const getParkingLot = (locationCode) => {
  console.log(locationCode);
  return dispatch => {
    dispatch(initiateParkingLotFetch());
    return ParkingAPI.getParkingLot(locationCode)
      .then((response) => {
        dispatch(receivedParkingLot(response.data));
      })
      .catch((response) => {
        dispatch(fetchNearParkingLotFailed(response));
      });
  };
};

export const selectParkingAndTimeUnit = (locationCode, pricingTimeUnit, bookingStep) => {
  return {
    type: Actions.SELECT_PARKING,
    location: locationCode,
    selectedHours: parseFloat(pricingTimeUnit/60).toFixed(2),
    bookingStep
  };
};

export const setSelectedPlate = (plate) => {
  return {
    type: Actions.SET_SELECTED_PLATE,
    plate
  };
};

export const updatePlate = (plate) => {
  return {
    type: Actions.UPDATE_PLATE,
    plate
  };
};

export const setBookingStep = (step) => {
  return {
    type: Actions.SET_BOOKING_STEP,
    step
  };
};

const initiateBooking = () => {
  return {
    type: Actions.MAKE_BOOKING
  };
};

const poivRequest = (poivData) => {
  return dispatch => {
    return ParkingAPI.makePoivRequest(poivData)
      .then((response) => {
        dispatch(setBookingStep(4));
      })
      .catch((response) => {
        //dispatch(fetchNearParkingLotFailed(response));
      });
  };
};

/*
export const createBooking = (wayPointData, poivData) => {
  return dispatch => {
    dispatch(initiateBooking());
    return ParkingAPI.parkingWayPointUpdate(wayPointData)
      .then((response) => {
        dispatch(poivRequest(poivData));
      })
      .catch((response) => {
        //dispatch(fetchNearParkingLotFailed(response));
      });
  };
};
*/

const initiateGetCharges = () => {
  return {
    type: Actions.INITIATE_GET_CHARGES
  };
};

const fetchChargesSuccess = (townshipCharges) => {
  return {
    type: Actions.FETCH_CHARGES_SUCCESS,
    townshipCharges
  };
};

const fetchChargesFailed = (error) => {
  return {
    type: Actions.FETCH_CHARGES_FAIL,
    error
  };
};

const setSelectedTownship = (townshipCode) => {
  return {
    type: Actions.SET_SELECTED_TOWNSHIP,
    townshipCode
  };
};

const getCharges = (townshipCode) => {
  return dispatch => {
    return ParkingAPI.getExtraFees(townshipCode)
      .then((response) => {
        console.log(response);
        const { data } = response;
        dispatch(fetchChargesSuccess(data.resource[0], townshipCode));
      })
      .catch((response) => {
        dispatch(fetchChargesFailed());
      });
  };
};

export const getTownship = (locationCode) => {
  return dispatch => {
    dispatch(initiateGetCharges());
    return ParkingAPI.getTownshipCode(locationCode)
      .then((response) => {
        const { data } = response;
        dispatch(getCharges(data.resource[0].township_code));
        dispatch(setSelectedTownship(data.resource[0].township_code));
      })
      .catch((response) => {
        dispatch(fetchChargesFailed());
      });
  };
};

export const setSelectedHours = (hours) => {
  return {
    type: Actions.SET_SELECTED_HOURS,
    hours
  };
};

const initiateGetWalletBalance = () => {
  return {
    type: Actions.INITIATE_GET_BALANCE
  };
};

const updateWalletBalance = (currentBal) => {
  return {
    type: Actions.SET_CURRENT_BALANCE,
    currentBal
  };
};

export const getBalance = (user_id) => {
  return dispatch => {
    dispatch(initiateGetWalletBalance());
    return getWalletBalance(user_id)
      .then((response) => {
        const { data } = response;
        const { resource } = data;
        if(resource.length == 0) {
          dispatch(updateWalletBalance(0));
        } else {
          dispatch(updateWalletBalance(data.resource[0].new_balance));
        }
      })
      .catch((response) => {
        //dispatch(fetchChargesFailed());
      });
  };
};

export const setPriceToPay = (price) => {
  return {
    type: Actions.SET_PRICE_TO_PAY,
    price
  };
};

const initiatePaymentWithWallet = () => {
  return {
    type: Actions.INITIATE_PAYMENT_WITH_WALLET
  };
};

const setConfirmationId = (confirmationId) => {
  return {
    type: Actions.SET_CONFIRMATION_ID,
    confirmationId
  };
};

const setBookingData = (bookingData) => {
  return {
    type: Actions.SET_BOOKING_DATA,
    bookingData
  };
};

export const setAlreadyParked = (status, id) => {
  return {
    type: Actions.SET_ALREADY_PARKED,
    status,
    id
  };
};

export const checkAndBook = (parkingData) => {
  const { plate_no, pl_state } = parkingData;
  return dispatch => {
    dispatch(enableLoading());
    return ParkingAPI.checkIfAlreadyParked(plate_no, pl_state)
      .then((response) => {
        const { data } = response;
        const { resource } = data;
        if(resource.length > 0) {
          const { id, exit_date_time, parking_status } = resource[0];
          //const exitTime = new Date(exit_date_time);
          //const dateTimeNow = new Date(moment.utc().format("YYYY-MM-DD HH:mm"));

          //if(exitTime > dateTimeNow) {
            console.log("parking_status", parking_status);
          if(parking_status === "ENTRY") {
            dispatch(setAlreadyParked(true, id));
          } else {
            dispatch(createBooking(parkingData));
          }
        } else {
          dispatch(createBooking(parkingData));
        }
        dispatch(disableLoading());
      })
      .catch((response) => {
        //dispatch(fetchNearParkingLotFailed(response));
      });
  };
};

export const createBooking = (parkingData) => {
  return dispatch => {
    return ParkingAPI.confirmBooking(parkingData)
      .then((response) => {
        const { data } = response;
        const { resource } = data;
        dispatch(setBookingData(parkingData));
        dispatch(setConfirmationId(resource[0].id));
        dispatch(setBookingStep(4));
      })
      .catch((response) => {
        //dispatch(fetchNearParkingLotFailed(response));
      });
  };
};

export const chargeWallet = (paymentObj, parkingData) => {
  return dispatch => {
    dispatch(initiatePaymentWithWallet());
    return makePayment(paymentObj)
      .then((response) => {
        //dispatch(ppWaypointUpdate(waypointData, poivData));
        dispatch(confirmBooking(parkingData));
      })
      .catch((response) => {
        //dispatch(fetchChargesFailed());
      });
  };
};

const setManagedParkingType = (parking_type) => {
  return {
    type: Actions.SET_MANAGED_PARKING_TYPE,
    parking_type: parking_type
  };
};

export const getSubscriptionStatus = (user_id, location_code) => {
  return dispatch => {
    dispatch(enableLoading());
    return ParkingAPI.getSubscriptionStatus(user_id, location_code)
      .then((response) => {

        let parking_type = null; //managed
        const { data } = response;

        const { resource } = data;
        console.log(resource.length);
        const isEmpty = resource.length === 0;
        if (isEmpty) {
          parking_type == "paid"; //guest managed
        } else {
          const expiryTime = new Date(resource[0].expiry_time);
          const timeNow = new Date(moment.utc().format("YYYY-MM-DD HH:mm"));

          if(expiryTime > timeNow) {
            parking_type == "free";
          } else {
            parking_type == "paid";
          }
        }
        dispatch(setManagedParkingType(parking_type));
        dispatch(disableLoading());
      })
      .catch((response) => {
        //dispatch(fetchChargesFailed());
      });
  };
};

export const setPaymentMethod = (method) => {
  return {
    type: Actions.SET_PAYMENT_METHOD,
    method
  };
};

const exitParkingFlow = () => {
  return {
    type: Actions.HIDE_SELECTED_PARKING
  };
};

export const exitVehicle = (type, confirmationId, exit_date_time) => {
  return dispatch => {
    dispatch(enableLoading());
    return ParkingAPI.exitVehicle(confirmationId, exit_date_time)
      .then((response) => {
        const { data } = response;
        const { resource } = data;
        console.log("Vehicle Exited");
        dispatch(disableLoading());
        
        if(type == "existing") {
          dispatch(setAlreadyParked(false, null));
        } else {
          dispatch(exitParkingFlow());
        }
      })
      .catch((response) => {
        //dispatch(fetchChargesFailed());
      });
  };
};

export const setDirections = (origin, destination, directions) => {
  return {
    type: Actions.SET_DIRECTIONS,
    origin,
    destination,
    directions
  };
};

export const getStreetView = (lat, lng) => {
  return dispatch => {
    dispatch(enableLoading());
    return ParkingAPI.getStreetView(lat, lng)
      .then((response) => {
        console.log("Here");
        dispatch(disableLoading());
        //dispatch(exitParkingFlow());
      })
      .catch((response) => {
        //dispatch(fetchChargesFailed());
      });
  };
};

export const showLots = (status) => {
  return {
    type: Actions.SHOW_LOTS,
    status
  };
};


export const checkIfAlreadyParked = (plate) => {
  const { plate_no, registered_state } = plate;
  return dispatch => {
    dispatch(enableLoading());
    return ParkingAPI.checkIfAlreadyParked(plate_no, registered_state)
      .then((response) => {
        const { data } = response;
        const { resource } = data;
        if(resource.length > 0) {
          const { id, exit_date_time, parking_status } = resource[0];
          //const exitTime = new Date(exit_date_time);
          //const dateTimeNow = new Date(moment.utc().format("YYYY-MM-DD HH:mm"));

          //if(exitTime > dateTimeNow) {
          if(parking_status === "ENTRY") {
            dispatch(setAlreadyParked(true, id));
          } else {
            dispatch(setAlreadyParked(false, null));
          }
        } else {
          dispatch(setAlreadyParked(false, null));
        }
        dispatch(disableLoading());
      })
      .catch((response) => {
        //dispatch(fetchNearParkingLotFaileexitd(response));
      });
  };
};

export const showStreetView = (status) => {
  return {
    type: Actions.SHOW_STREET_VIEW,
    status
  };
};

const retrievedVehicles = (data) => {
  return {
    type: Actions.FETCH_VEHICLES_SUCCESS,
    data
  }
};

const retrievalFailure = (error) => {
  return {
    type: Actions.FETCH_VEHICLES_FAIL,
    error
  }
};

export const getVehicles = (user_id, location_code, pricing_time_unit) => {
  return dispatch => {
    dispatch(enableLoading());
    return VehicleAPI.getVehicles(user_id)
      .then((response) => {
        console.log(response);
        const { resource } = response.data;
        if(resource.length == 0) {
          dispatch(selectParkingAndTimeUnit(location_code, pricing_time_unit, 3));
        } else if(resource.length == 1) {
          dispatch(setSelectedPlate(resource[0]));
          dispatch(selectParkingAndTimeUnit(location_code, pricing_time_unit, 3));
        } else if (resource.length > 1) {
          dispatch(retrievedVehicles({
            vehicles: resource
          }));
          dispatch(selectParkingAndTimeUnit(location_code, pricing_time_unit, 2));
        }
        
        dispatch(disableLoading());
      })
      .catch((response) => {
        dispatch(retrievalFailure({
          errorCode: "503",
          errorMessage: GenericError
        }));
      });
  }
};

const registrationSucceded = (data) => {
  return {
    type: Actions.REG_SUCCESS,
    data
  };
};

const registrationFailed = (error) => {
  return {
    type: Actions.REG_FAIL,
    error
  };
};

export const getHoursRemaining = (lat, lng, plate_no, pl_state) => {
  return dispatch => {
    //dispatch(initiateRegistration());
    return ParkingAPI.getTotalHoursParkedToday(lat, lng, plate_no, pl_state)
      .then((response) => {
        console.log(response);
        //const userId = response.data.resource[0].id;
        //dispatch(registrationSucceded(userId));
      })
      .catch((response) => {
        //dispatch(registrationFailed());
        console.log(response);
      });
  }
};