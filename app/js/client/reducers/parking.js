import { combineReducers } from 'redux';
import Location from "./location.js";
import Vehicle from "./vehicle.js";
import { GenericError } from "../constants/texts.js";

const initialState = {
  loading: false,
  markers: [],
  free: true,
  paid: true,
  managed: true,
  locationAddress: null,
  showParkingOptions: false,
  showOtherLocations: false,
  selectedMarker: null,
  showTopOverview: false,
  selectedLocation: null,
  selectedTownship: null,
  selectedTownshipCharges: null,
  parkingRules: null,
  errorMessage: null,
  showFreeParkingModal: false,
  showPaidParkingModal: false,
  showManagedParkingModal: false,
  isManagedFree: false,
  selectedMarkerItem: null,
  managedParkingLoading: false,
  lotsData: null,
  selectedParkingCode: null,
  bookingStep: 0,
  selectedPlate: {},
  error: null,
  selectedHours: 0,
  currentBalance: 0,
  paymentMethod: null,
  priceToPay: 0,
  bookingData: null,
  confirmationId: null,
  origin: null,
  destination: null,
  directions: null,
  isAlreadyParked: false,
  alreadyParkedId : null,
  showLots: false,
  showStreetView: false
};

const Parking = (state = initialState, action) => {
  console.log(action);
  switch(action.type) {
    case "ENABLE_LOADING":
      return {
        ...state,
        loading: true
      };

    case "DISABLE_LOADING":
      return {
        ...state,
        loading: false
      };

    case "FETCH_PARKING_INITIATE":
      return {
        ...state,
        loading: true
      };
    case "FETCH_PARKING_SUCCESS":
      return {
        ...state,
        loading: false,
        markers: action.data
      }
    case "FETCH_PARKING_FAIL":
      return {
        ...state,
        loading: false
      }
    case "TOGGLE_FREE_PARKING":
      return {
        ...state,
        free: action.val
      }
    case "TOGGLE_PAID_PARKING":
      return {
        ...state,
        paid: action.val
      }
    case "TOGGLE_MANAGED_PARKING":
      return {
        ...state,
        managed: action.val
      }
    case "SET_PARKING_OPTIONS":
      return {
        ...state,
        showParkingOptions: action.status,
        showTopOverview: false
      }
    case "SET_OTHER_LOCATIONS":
      return {
        ...state,
        showOtherLocations: action.status
      }
    case "SET_LOCATION_ADDRESS":
      return {
        ...state,
        locationAddress: action.location
      }
    case "SET_SELECTED_MARKER":
      return {
        ...state,
        selectedMarker: action.marker,
        showTopOverview: true,
        showParkingOptions: false
      }
    case "SET_SELECTED_LOCATION":
      return {
        ...state,
        selectedLocation: action.location
      }
    case "FETCH_PARKING_RULES_SUCCESS":
      return {
        ...state,
        parkingRules: action.data
      }
    case "FETCH_PARKING_RULES_FAIL":
      return {
        ...state,
        errorMessage: GenericError
      }
    case "SHOW_FREE_PARKING":
      return {
        ...state,
        showFreeParkingModal: true,
        showPaidParkingModal: false,
        showManagedParkingModal: false,
        bookingStep: 1,
        selectedMarkerItem: action.markerItem,
        showTopOverview: false
      }
    case "SHOW_PAID_PARKING":
      return {
        ...state,
        showFreeParkingModal: false,
        showPaidParkingModal: true,
        showManagedParkingModal: false,
        bookingStep: 1,
        selectedMarkerItem: action.markerItem,
        showTopOverview: false
      }
    case "SHOW_MANAGED_PARKING":
      return {
        ...state,
        showFreeParkingModal: false,
        showPaidParkingModal: false,
        showManagedParkingModal: true,
        bookingStep: 1,
        selectedMarkerItem: action.markerItem,
        showTopOverview: false
      }
    case "HIDE_SELECTED_PARKING":
      return {
        ...state,
        showFreeParkingModal: false,
        showPaidParkingModal: false,
        showManagedParkingModal: false,
        selectedParkingCode: null,
        selectedMarkerItem: null,
        bookingStep: 0,
        selectedPlate: {},
        paymentMethod: null,
        currentBalance: 0,
        selectedHours: 0,
        bookingData: null,
        confirmationId: null
      }
    case "FETCH_PARKING_LOT_INITIATE":
      return {
        ...state,
        managedParkingLoading : true
      };
    case "FETCH_PARKING_LOT_SUCCESS":
      return {
        ...state,
        managedParkingLoading : false,
        lotsData: action.data
      }
    case "FETCH_PARKING_LOT_FAIL":
      return {
        ...state,
        managedParkingLoading: false,
        error: action.error
      }
    case "SELECT_PARKING":
      return {
        ...state,
        selectedParkingCode: action.location,
        selectedHours: action.selectedHours,
        bookingStep: action.bookingStep
      }
    case "SET_SELECTED_PLATE":
      return {
        ...state,
        selectedPlate: action.plate,
        bookingStep: 3
      }
    case "UPDATE_PLATE":
      return {
        ...state,
        selectedPlate: action.plate
      }
    case "SET_BOOKING_STEP":
      return {
        ...state,
        bookingStep: action.step,
        loading: false
      }
    case "INITIATE_GET_CHARGES":
      return {
        ...state,
        loading: true
      }
    case "FETCH_CHARGES_SUCCESS":
      return {
        ...state,
        loading: false,
        selectedTownshipCharges: action.townshipCharges
      }
    case "FETCH_CHARGES_FAIL":
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case "SET_SELECTED_HOURS":
      return {
        ...state,
        selectedHours: action.hours
      }
    case "INITIATE_GET_BALANCE":
      return {
        ...state,
        loading: true,
        paymentMethod: "WALLET"
      }
    case "SET_CURRENT_BALANCE":
      return {
        ...state,
        currentBalance: action.currentBal,
        loading: false
      }
    case "SET_PRICE_TO_PAY":
      return {
        ...state,
        priceToPay: action.price
      }
    case "INITIATE_PAYMENT_WITH_WALLET":
      return {
        ...state,
        loading: true
      }
    case "SET_MANAGED_PARKING_TYPE":
      return {
        ...state,
        isManagedFree: action.parking_type === "free" ? true : false
      }
    case "SET_SELECTED_TOWNSHIP":
      return {
        ...state,
        selectedTownship: action.townshipCode
      }
    case "SET_PAYMENT_METHOD":
      return {
        ...state,
        paymentMethod: action.method
      }
    case "SET_BOOKING_DATA":
      return {
        ...state,
        bookingData: action.bookingData
      }
    case "SET_CONFIRMATION_ID":
      return {
        ...state,
        confirmationId: action.confirmationId
      }
    case "SET_DIRECTIONS":
      return {
        ...state,
        origin: action.origin,
        destination: action.destination,
        directions: action.directions
      }
    case "SET_ALREADY_PARKED":
      return {
        ...state,
        isAlreadyParked: action.status,
        loading: false,
        alreadyParkedId: action.id
      }
    case "SHOW_LOTS":
      return {
        ...state,
        showLots: action.status
      }
    case "SHOW_STREET_VIEW":
      return {
        ...state,
        showStreetView: action.status
      }
    default:
      return state;
  }
};

const ParkingReducers = combineReducers({
  parking: Parking,
  location: Location,
  vehicle: Vehicle
});

export default ParkingReducers;