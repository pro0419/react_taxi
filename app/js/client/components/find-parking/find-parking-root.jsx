import React, { ReactDOM, Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import cookie from 'react-cookie';
import Body from "../../../common/components/body/body.jsx";
import GrayButton from "../../../common/components/button/gray-button.jsx";
import LicensePlateField from "../../../common/components/fields/license-plate-field.jsx";
import Chooser from "../../../common/components/fields/select.jsx";
import ImageCheckbox from "../../../common/components/footer/utils/image-checkbox.jsx";
import ParkingModal from "./parking-modal.jsx";
import { GoogleMapLoader, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps";
import { default as MarkerClusterer } from "react-google-maps/lib/addons/MarkerClusterer";
import { states } from "../../constants/states.js";
import { statesHash } from "../../constants/states-hash.js";
import moment from "moment";
import Timer from "../../../common/components/timer/timer.jsx";
import ParkingOverview from "./parking-overview.jsx";

import {
  updateGeolocation,
  getNearbyParking,
  getAddress,
  setParkingType,
  setParkingOptions,
  setOtherLocations,
  setSelectedLocation,
  setSelectedMarker,
  getParkingRules,
  getSubscriptionStatus,
  setSelectedParking,
  hideSelectedParking,
  getParkingLot,
  selectParkingAndTimeUnit,
  setSelectedPlate,
  updatePlate,
  setBookingStep,
  createBooking,
  getTownship,
  setSelectedHours,
  getBalance,
  setPriceToPay,
  chargeWallet,
  setPaymentMethod,
  checkAndBook,
  exitVehicle,
  setDirections,
  getStreetView,
  showLots,
  checkIfAlreadyParked,
  showStreetView,
  getVehicles,
  getHoursRemaining
} from "../../actions/parking.js";
import { setPosition, setInitialPosition, getLocationCoordinates } from "../../actions/location.js";
//import { getVehicles } from "../../actions/vehicle.js";
import { FREE_MAP_MARKER, PAID_MAP_MARKER, MANAGED_MAP_MARKER } from "./constants/texts.js";
import { SimpleSelect } from "react-selectize";
import { throttle } from "lodash";

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

class FindParking extends Component {
  constructor(props) {
    super(props);
    this.handleCenterChanged = throttle(this.handleCenterChanged.bind(this), 100);
    this.goToInitialLocation = this.goToInitialLocation.bind(this);
    this.showParkingOptions = this.showParkingOptions.bind(this);
    this.hideParkingOptions = this.hideParkingOptions.bind(this);
    this.showOtherLocationOptions = this.showOtherLocationOptions.bind(this);
    this.hideOtherLocationOptions = this.hideOtherLocationOptions.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleParkingSelection = this.handleParkingSelection.bind(this);
    this.hideParkingModal = this.hideParkingModal.bind(this);
    this.selectParkingandFetchVehicles = this.selectParkingandFetchVehicles.bind(this);
    this.selectVehiclePlate = this.selectVehiclePlate.bind(this);
    this.confirmBooking = this.confirmBooking.bind(this);
    this.goToPayment = this.goToPayment.bind(this);
    this.getCharges = this.getCharges.bind(this);
    this.setParkingHours = this.setParkingHours.bind(this);
    this.showWalletBalance = this.showWalletBalance.bind(this);
    this.payFromWallet = this.payFromWallet.bind(this);
    this.payWithPaypal = this.payWithPaypal.bind(this);
    this.closeWalletModal = this.closeWalletModal.bind(this);
    this.calculateAmountToPay = this.calculateAmountToPay.bind(this);
    this.exitVehicleFromParking = this.exitVehicleFromParking.bind(this);
    this.showDirections = this.showDirections.bind(this);
    this.showStreetView = this.showStreetView.bind(this);
    this.showLotsModal = this.showLotsModal.bind(this);
    this.changePlateNo = this.changePlateNo.bind(this);
    this.changeState = this.changeState.bind(this);
    this.hideStreetView = this.hideStreetView.bind(this);
  }

  componentDidMount() {
    this.getGeolocation();
  }

  componentWillReceiveProps(nextProps) {
    const { location } = this.props;
    const { selectedMarker } = nextProps.parking;
    const currentMarker = this.props.parking.selectedMarker;
    if((!currentMarker && selectedMarker) || (currentMarker && (currentMarker.location_code != selectedMarker.location_code))) {

      const { lat, lon } = location;
      const userLocation = new google.maps.LatLng(lat, lon);
      const markerSelected = new google.maps.LatLng(selectedMarker.lat, selectedMarker.lng);

      //Set zoom level
      const map = this.refs["gMap"];
      const currentZoom = map.getZoom();
      console.log("currentZoom", currentZoom);
      let bounds = new google.maps.LatLngBounds();
      bounds.extend(userLocation);
      bounds.extend(markerSelected);
      map.fitBounds(bounds);
    }
  }

  getGeolocation() {
    if (canUseDOM && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.initializePosition.bind(this));
    }
  }

  fetchNearbyParking() {
    const { dispatch, location } = this.props;
    const { lat, lon } = location;
    const pos = {
      lat: lat,
      lng: lon
    };
    dispatch(getNearbyParking(pos));
  }

  initializePosition(position) {
    const { dispatch } = this.props;
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    //const lat = 40.7326;
    //const lng = -73.4454;
    /*const demoPos = {
      lat: 40.7346687317,
      lng: -73.4461441040
    };*/
    dispatch(setInitialPosition(lat, lng));
    dispatch(getAddress(lat, lng));
    this.fetchNearbyParking();
    //dispatch(getParkingRules("New York"));
  }

  toggleParking(type) {
    const { dispatch, parking } = this.props;
    const currentVal = parking[type];
    dispatch(setParkingType(type, !currentVal));
  }
  /* This is probably not required */
  handleCenterChanged() {
    const map = this.refs["gMap"];
    const { dispatch, location } = this.props;
    const { lat, lon } = location;
    const newPos = map.getCenter();
    const initialPos = {
      lat: parseFloat(lat),
      lng: parseFloat(lon)
    };
    const newLat = newPos.lat();
    const newLon = newPos.lng();
    if (newPos.equals(new google.maps.LatLng(initialPos))) {
      return;
    } else {
      dispatch(setPosition(newLat, newLon));
      this.fetchNearbyParking();
    }
  }

  goToInitialLocation() {
    const { dispatch, location } = this.props;
    const { initialLat, initialLon } = location;
    dispatch(setPosition(initialLat, initialLon));
  }

  showParkingOptions() {
    const { dispatch } = this.props;
    dispatch(setParkingOptions(true));
    dispatch(setSelectedLocation(null));
  }

  showOtherLocationOptions() {
    const { dispatch } = this.props;
    dispatch(setOtherLocations(true));
    dispatch(setSelectedLocation(null));
  }

  hideParkingOptions() {
    const { dispatch } = this.props;
    dispatch(setParkingOptions(false));
  }

  hideOtherLocationOptions() {
    const { dispatch } = this.props;
    dispatch(setOtherLocations(false));
  }

  selectLocation(address) {
    const { dispatch } = this.props;
    dispatch(getLocationCoordinates(address.value));
    dispatch(setSelectedLocation(address.value));
    //dispatch(getParkingRules(address.value));
    this.hideOtherLocationOptions();
  }

  selectLocationFromInput() {
    const { dispatch } = this.props;
    const address = this.refs["custom-location"].value;
    dispatch(getLocationCoordinates(address));
    dispatch(setSelectedLocation(address));
    //dispatch(getParkingRules(address.value));
    this.hideOtherLocationOptions();
  }

  handleBack() {
    const { dispatch } = this.props;
    this.goToInitialLocation();
    this.hideParkingOptions();
    this.hideOtherLocationOptions();
    dispatch(setSelectedLocation(null));
  }

  handleParkingSelection(parking_type, marker) {
    const { dispatch } = this.props;

    dispatch(setSelectedParking(parking_type, marker));
    if(parking_type === "MANAGED") {
      const userId = cookie.load('userId');
      dispatch(getParkingLot(marker.location_code));
      if(userId) {
        dispatch(getSubscriptionStatus(userId, marker.location_code));
      }
      
      //dispatch(getSubscriptionStatus(userId, "NY-FDV-L01"));
      //dispatch(getParkingLot("NY-FDV-L01"));
    }
  }

  hideParkingModal() {
    const { dispatch } = this.props;
    dispatch(hideSelectedParking());
  }

  selectParkingandFetchVehicles(location_code, pricing_time_unit = 0) {
    this.getCharges();
    const { dispatch } = this.props;
    const userId = cookie.load('userId');
    let bookingStep = 2;
    if(userId) {
      dispatch(getVehicles(userId, location_code, pricing_time_unit));
    } else {
      bookingStep = 3;
      dispatch(selectParkingAndTimeUnit(location_code, pricing_time_unit, 3));
    }
    dispatch(showLots(false));
    //dispatch(selectParkingAndTimeUnit(location_code, pricing_time_unit, bookingStep));
  }

  selectVehiclePlate(plate) {
    const { dispatch, parking } = this.props;
    const { showPaidParkingModal, showManagedParkingModal, isManagedFree } = parking;
    if(showPaidParkingModal || (showManagedParkingModal && !isManagedFree )) {
      this.calculateAmountToPay();
    }
    dispatch(checkIfAlreadyParked(plate));
    dispatch(setSelectedPlate(plate));
  }

  changePlateNo() {
    const { dispatch } = this.props;
    const { showPaidParkingModal, showManagedParkingModal, selectedMarkerItem } = this.props.parking;
    const { lat, lng } = selectedMarkerItem;
    const plate_no = this.refs["license-number"].getValue();
    const registered_state = this.refs["select-state"].getValue();
    if(plate_no) {
      const plate = {
        plate_no : plate_no,
        registered_state : registered_state ? registered_state.value : null
      };
      dispatch(updatePlate(plate));
      if(plate_no && registered_state) {
        dispatch(checkIfAlreadyParked(plate));
        if(showPaidParkingModal || showManagedParkingModal) {
          dispatch(getHoursRemaining(lat, lng, plate_no, registered_state));
        }
      }
    }
  }

  changeState(state) {
    const { dispatch } = this.props;
    const { showPaidParkingModal, showManagedParkingModal, selectedMarkerItem } = this.props.parking;
    const { lat, lng } = selectedMarkerItem;
    console.log(state);
    const plate_no = this.refs["license-number"].getValue();
    const registered_state = state.value;
    const plate = {
      plate_no : plate_no,
      registered_state : registered_state
    };
    dispatch(updatePlate(plate));
    if(plate_no && registered_state) {
      dispatch(checkIfAlreadyParked(plate));
      if(showPaidParkingModal || showManagedParkingModal) {
        dispatch(getHoursRemaining(lat, lng, plate_no, registered_state));
      }
    }
  }

  getParkingData() {
    const { dispatch, location, parking } = this.props;
    const {
      selectedMarkerItem,
      selectedPlate,
      showFreeParkingModal,
      showPaidParkingModal,
      showManagedParkingModal,
      isManagedFree,
      selectedTownship,
      paymentMethod,
      priceToPay,
      selectedTownshipCharges,
      parkingRules,
      selectedHours
    } = parking;
    const {
      address,
      lat,
      lng,
      title,
      url,
      html,
      location_code,
      marker,
      category
    } = selectedMarkerItem;
    const currentRules = parkingRules[location_code];
    const { max_hours, pricing, pricing_duration, city, state, zip_code } = currentRules;
    let tr_fee = 0, tr_percentage = 0;
    if(selectedTownshipCharges) {
      tr_fee = selectedTownshipCharges.tr_fee;
      tr_percentage = selectedTownshipCharges.tr_percentage;
    }
    console.log(selectedPlate);
    const { plate_no, registered_state } = selectedPlate;
    const userLat = location.lat;
    const userLng = location.lon;
    const userId = cookie.load('userId');
    let parkingType = null;
    if (showFreeParkingModal) {
      parkingType = "free";
    } else if (showPaidParkingModal) {
      parkingType = "paid";
    } else if (showManagedParkingModal) {
      if (isManagedFree) {
        parkingType = "managed";
      } else {
        parkingType = "guest";
      }
    }
    const currentTime = moment.utc().format("YYYY-MM-DD HH:mm");
    const expiryTime = moment.utc().add(max_hours,'h').format("YYYY-MM-DD HH:mm");
    return {
      "parking_type" : parkingType,
      "township_code" : selectedTownship,
      "location_code" : location_code,
      "entry_date_time" : currentTime,
      "exit_date_time" : expiryTime,
      "expiry_time" : expiryTime,
      "max_time" : max_hours,
      "user_id" : userId,
      "permit_id" : "",
      "subscription_id" : "",
      "plate_no" : plate_no,
      "pl_state" : registered_state,
      "lat" : userLat,
      "lng" : userLng,
      "address1" : "",
      "address2" : "",
      "city" : city,
      "state" : state,
      "zip" : zip_code,
      "country" : "USA",
      "lot_row" : "",
      "lot_number" : "",
      "ip" : "",
      "token" : "",
      "parking_status" : "ENTRY",
      "payment_method" : paymentMethod,
      "parking_rate" : pricing,
      "parking_units" : pricing_duration,
      "parking_qty" : selectedHours,
      "parking_subtotal" : selectedHours * pricing,
      "wallet_trx_id" : "",
      "tr_percent" : tr_percentage,
      "tr_fee" : tr_fee,
      "parking_total" : priceToPay,
      "ipn_custom" : "",
      "ipn_txn_id" : "",
      "ipn_payment" : "",
      "ipn_status" : "",
      "ipn_address" : ""
    };
  }

  validateandUpdatePlate() {
    const { dispatch } = this.props;

    this.refs["license-number"].invalidate();
    this.refs["select-state"].invalidate();
    const isLicenseValid = this.refs["license-number"].validate();
    const isStateValid = this.refs["select-state"].validate();

    if(isLicenseValid && isStateValid) {
      const plate_no = this.refs["license-number"].getValue();
      const registered_state = this.refs["select-state"].getValue();

      dispatch(updatePlate({
        plate_no : plate_no,
        registered_state : registered_state.value
      }));

      return true;
    }
    return false;
  }

  confirmBooking() {
    const { dispatch } = this.props;
    // Update Plate No.
    if(this.validateandUpdatePlate()){
      dispatch(checkAndBook(this.getParkingData()));
    }
  }

  goToPayment() {
    const { dispatch } = this.props;
    dispatch(setBookingStep(4));
  }

  selectMarker(marker) {
    const { dispatch } = this.props;
    dispatch(setSelectedMarker(marker));
  }

  getCharges() {
    const { dispatch, parking } = this.props;
    const { selectedMarkerItem } = parking;
    const { location_code } = selectedMarkerItem;

    dispatch(getTownship(location_code));
  }

  setParkingHours(hours) {
    const { dispatch } = this.props;
    dispatch(setSelectedHours(hours.value));
  }

  calculateAmountToPay() {
    const { dispatch, parking } = this.props;
    const { selectedTownshipCharges, selectedHours, parkingRules, selectedMarkerItem } = parking;
    const { tr_fee, tr_percentage } = selectedTownshipCharges;
    const currentRules = parkingRules[selectedMarkerItem.location_code];
    const { pricing, pricing_duration } = currentRules;
    const hourlyPrice = parseFloat(pricing)*selectedHours;
    const totalPrice = hourlyPrice + (hourlyPrice*parseFloat(tr_percentage)) + parseFloat(tr_fee);
    dispatch(setPriceToPay(totalPrice.toFixed(2)));
    return totalPrice.toFixed(2);
  }

  validateFields() {
    const licenseFieldStatus = this.refs["license-number"].validate();
    const selectStateStatus = this.refs["select-state"].validate();
    return licenseFieldStatus && selectStateStatus;
  }

  showWalletBalance() {
    const { dispatch } = this.props;
    const userId = cookie.load('userId');
    this.calculateAmountToPay();

    if(this.validateFields()) {
      dispatch(getBalance(userId));
      $(this.refs["wallet-balance-modal"]).openModal();
    }
  }

  renderMyLocationIcon() {
    return (
      <div className="my-location-marker" onClick={this.goToInitialLocation}>
      </div>
    );
  }

  payFromWallet() {
    const { dispatch, parking } = this.props;
    const { priceToPay, currentBalance } = parking;

    if(priceToPay < currentBalance) {
      const userId = cookie.load('userId');
      const parkingData = this.getParkingData();
      dispatch(checkAndBook(parkingData));
      this.closeWalletModal();
    }
  }

  payWithPaypal() {
    const { dispatch } = this.props;
    if(this.validateFields()) {
      dispatch(setPaymentMethod("paypal"));
      const paymentAmt = this.calculateAmountToPay();
      this.refs["amount-to-pay"].value = paymentAmt;
      this.refs["pay-with-paypal"].submit();
    }
  }

  closeWalletModal() {
    //e.preventDefault();
    $(this.refs["wallet-balance-modal"]).closeModal();
  }

  exitVehicleFromParking() {
    const { dispatch, parking } = this.props;
    const { confirmationId, isAlreadyParked, alreadyParkedId } = parking;
    const dateTimeNow = moment.utc().format("YYYY-MM-DD HH:mm");
    if(!isAlreadyParked) {
      dispatch(exitVehicle("new", confirmationId, dateTimeNow));
    } else {
      dispatch(exitVehicle("existing", alreadyParkedId, dateTimeNow));
    }
  }

  showDirections() {
    const { dispatch, parking, location } = this.props;
    const origin = new google.maps.LatLng(location.lat, location.lon);
    const { selectedMarkerItem } = parking;
    const { lat, lng } = selectedMarkerItem;
    const destination = new google.maps.LatLng(lat, lng);

    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        dispatch(setDirections(origin, destination, result));
        dispatch(hideSelectedParking());
      } else {
        console.error(`error fetching directions ${ result }`);
      }
    });
  }

  showStreetView() {
    const { dispatch, parking } = this.props;
    const { selectedMarkerItem } = parking;
    const { lat, lng } = selectedMarkerItem;
    console.log(lat);
    //dispatch(getStreetView(lat, lng));
    dispatch(showStreetView(true));
    const map = this.refs["gMap"];
    console.log(map);
    var panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), {
        position: { lat: parseFloat(lat), lng: parseFloat(lng) },
        pov: {
          heading: 34,
          pitch: 10
        }
      });
    //map.setStreetView(panorama);
  }

  hideStreetView() {
    const { dispatch } = this.props;
    dispatch(showStreetView(false));
  }

  showLotsModal() {
    const { dispatch } = this.props;
    dispatch(showLots(true));
  }

  renderSearchLocations() {
    const options = [
      {
        label: "Birmingham, AI",
        value: "Birmingham"
      },
      {
        label: "New York, NY",
        value: "New York"
      }
    ];
    return (
      <div className="other-locations">
        <div className="row heading">
          <div className="col s10">
            Search Other Locations
          </div>
          <div className="col s2">
            <span className="close-btn" onClick={this.hideOtherLocationOptions}>
            </span>
          </div>
        </div>
        <div>
          Select a City
        </div>
        <div>
          <SimpleSelect 
            options = {options} 
            placeholder = "Select City from DB" 
            onValueChange={this.selectLocation.bind(this)}/>
        </div>
        <div>
          OR
        </div>
        <div>
          Search By Address
        </div>
        <div>
          <input
            ref="custom-location"
            type="text"
            placeholder="Enter Address Here ...."/>
        </div>
        <div>
          <GrayButton onClick={this.selectLocationFromInput.bind(this)}>
            FIND
          </GrayButton>
        </div>
      </div>
    );
  }

  renderMarker(markerItem, index) {
    const { selectedMarker } = this.props.parking;
    const { lat, lng, marker } = markerItem;
    const parkingType = marker.split("-")[1];
    const parkingTypeVal = this.props.parking[parkingType];
    if ( !parkingTypeVal ) {
      return;
    }
    if (!markerItem.location_code) {
      return;
    }
    const position = new google.maps.LatLng({
      lat: parseFloat(lat),
      lng: parseFloat(lng)
    });
    let scale = 50;
    if(selectedMarker) {
      if(selectedMarker.location_code == markerItem.location_code) {
        scale = 80;
      }
    }
    let iconUrl = "";
    let clickHandler = "";
    switch (marker) {
      case "ez-free": {
        iconUrl = FREE_MAP_MARKER;
        clickHandler = () => {this.handleParkingSelection("FREE", markerItem)};
        break;
      }
      case "ez-paid": {
        iconUrl = PAID_MAP_MARKER;
        clickHandler = () => {this.handleParkingSelection("PAID", markerItem)};
        break;
      }
      case "ez-managed": {
        iconUrl = MANAGED_MAP_MARKER;
        clickHandler = () => {this.handleParkingSelection("MANAGED", markerItem)};
        break;
      }
    }

    const icon = {
      url: iconUrl,
      scaledSize: new google.maps.Size(scale, scale)
    };

    const markerProps = {
      position,
      icon
    };
    return (
      <Marker {...markerProps} key={index} onClick={clickHandler}/>
    );
  }

  renderGMap() {
    const { markers, selectedMarker, directions } = this.props.parking;
    let lat = this.props.location.lat || 40.7128;
    let lon = this.props.location.lon || -73.935242;
    const currentPos =  new google.maps.LatLng({
      lat: parseFloat(lat),
      lng: parseFloat(lon)
    });
    let centerPos = {
      lat: lat,
      lng: lon
    };
    let currentMarker = (<Marker position={currentPos}/>);
    if(selectedMarker) {
      let centerLat = parseFloat(selectedMarker.lat);
      let centerLon = parseFloat(selectedMarker.lng);
      centerPos = {
        lat: parseFloat(centerLat),
        lng: parseFloat(centerLon)
      };
    }
    
    const markersList = markers.map(this.renderMarker.bind(this));
    markersList.push(currentMarker);

    return (
      <section style={{height: "100%"}}>
        <GoogleMapLoader
          containerElement={
            <div
              style={{
                height: "100%",
              }}/>
          }
          googleMapElement={
            <GoogleMap
              ref="gMap"
              defaultZoom={10}
              defaultCenter={centerPos}
              center={centerPos}>
                {markersList}
                {directions ? <DirectionsRenderer directions={directions} /> : null}
            </GoogleMap>
          }/>
      </section>
    );
  }

  renderFooterContent() {
    return (
      <div className="row footer-row">
        <div className="col s4 footer-item">
          <ImageCheckbox
            label="Park and Track"
            iconClass="free-parking"
            onClick={this.toggleParking.bind(this, "free")}/>
        </div>
        <div className="col s4 footer-item">
          <ImageCheckbox
            label="Paid Parking"
            iconClass="paid-parking"
            onClick={this.toggleParking.bind(this, "paid")}/>
        </div>
        <div className="col s4 footer-item">
          <ImageCheckbox
            label="Managed Lots"
            iconClass="managed-parking"
            onClick={this.toggleParking.bind(this, "managed")}/>
        </div>
      </div>
    );
  }

  renderFindNearbyBtn() {
    return (
      <div className="find-nearby-btn action-btn">
        <GrayButton onClick={this.showParkingOptions}>
          FIND NEARBY
        </GrayButton>
      </div>
    );
  }

  renderSearchBtn() {
    return (
      <div className="search-btn action-btn">
        <GrayButton onClick={this.showOtherLocationOptions}>
          SEARCH OTHER LOCATIONS
        </GrayButton>
      </div>
    );
  }

  renderLocationLabel() {
    const { selectedLocation } = this.props.parking;
    return (
      <div className="selected-location">
        {selectedLocation}
      </div>
    )
  }

  renderBackBtn() {
    return (
      <div className="back-btn">
        <a href="javascript:void(0)" onClick={this.handleBack}>Back</a>
      </div>
    )
  }

  renderParkingInfoBtn() {
    return (
      <div className="parking-info-btn">
        <a href="javascript:void(0)" onClick={this.showParkingOptions}>Parking Info</a>
      </div>
    )
  }

  renderBackToParkingList() {
    return (
      <div className="back-btn">
        <a href="javascript:void(0)" onClick={this.showParkingOptions}>Back</a>
      </div>
    )
  }

  renderParkingDetailsBtn() {
    const { selectedMarker } = this.props.parking;
    const { marker } = selectedMarker;
    let clickHandler = "";
    switch (marker) {
      case "ez-free": {
        clickHandler = () => {this.handleParkingSelection("FREE", selectedMarker)};
        break;
      }
      case "ez-paid": {
        clickHandler = () => {this.handleParkingSelection("PAID", selectedMarker)};
        break;
      }
      case "ez-managed": {
        clickHandler = () => {this.handleParkingSelection("MANAGED", selectedMarker)};
        break;
      }
    }
    return (
      <div className="parking-info-btn">
        <a href="javascript:void(0)" onClick={clickHandler}>Parking Info</a>
      </div>
    )
  }

  renderParkingOption(marker) {
    console.log(marker);
    if(!marker || !marker.location_code) {
      return;
    }
    const { parkingRules } = this.props.parking;
    const currentRules = parkingRules[marker.location_code];
    let pricing = "";
    let pricing_duration = "";
    let pricingText ="";

    if(currentRules) {
      pricing = currentRules.pricing;
      pricing_duration = currentRules.pricing_duration;
    }
    if(pricing && pricing_duration && marker.marker!="ez-free" ) {
      pricingText = `$${pricing}/${pricing_duration} min.`;
    }

    const validClass = classNames({
      "col": true,
      "s10": true,
      "free-parking": marker.marker === "ez-free",
      "public-parking": marker.marker == "ez-paid",
      "managed-parking": marker.marker == "ez-managed"
    });
    let parkingTypeText = "";
    switch (marker.marker) {
      case "ez-free":
        parkingTypeText = "FREE Public Parking";
        break;
      case "ez-paid":
        parkingTypeText = "Public Parking";
        break;
      case "ez-managed":
        parkingTypeText = "Managed Parking";
        break;
    }
    const distance = parseFloat(marker.distancea / 5280).toFixed(1);
    return (
      <div className="row parking-type" onClick={this.selectMarker.bind(this, marker)}>
        <div className={validClass}>
          <div>{parkingTypeText}</div>
          <div>{pricingText}</div>
        </div>
        <div className="col s2">
          {distance} Miles
        </div>
      </div>
    );
  }

  renderParkingOptions() {
    const { markers } = this.props.parking;
    const parkingOptions = markers.map(this.renderParkingOption, this);
    return (
      <div className="parking-options">
        <div className="row">
          <div className="col s11">Available Parking</div>
          <div className="col s1">
            <span className="close-btn" onClick={this.hideParkingOptions}>
            </span>
          </div>
        </div>
        {parkingOptions}
      </div>
    );
  }

  /* Booking Step 1 */

  renderLotOccupancyLink() {
    return (
      <div className="col s12 lot-link">
        <a href="javascript:void(0)" onClick={this.showLotsModal}>View Lot Occupancy</a>
      </div>
    );
  }

  renderFreePaidParkingModalContent() {
    const { parkingRules, selectedMarkerItem } = this.props.parking;
    const currentRules = parkingRules[selectedMarkerItem.location_code];
    const pricing = currentRules.pricing == 0 ? "FREE" : "$" + currentRules.pricing + "/" + currentRules.pricing_duration + "min";

    const parkNowAction = () => {this.selectParkingandFetchVehicles(selectedMarkerItem.location_code, currentRules.pricing_duration)};
    const lotOccupancyLink = selectedMarkerItem.marker === "ez-managed" ? this.renderLotOccupancyLink() : null;
    return (
      <div className="row parking-details">
        <div className="col s12 margin-bottom-10">
          <span className="font-bold">Public Parking:</span> {pricing}
        </div>
        <div className="col s12">
          {selectedMarkerItem.title}
        </div>
        <div className="col s12">
          {selectedMarkerItem.address}
        </div>
        <div className="col s12">
          {selectedMarkerItem.html}
        </div>
        <div className="col s12 margin-bottom-10">
          <span className="font-bold">Today:</span> {currentRules.this_day}
        </div>
        <div className="col s12 margin-bottom-10">
          <span className="font-bold">Time:</span> {currentRules.time_rule}
        </div>
        <div className="col s12 margin-bottom-10">
          <span className="font-bold">Max:</span> {currentRules.max_hours} Hours
        </div>
        {lotOccupancyLink}
        <div className="col s6 link">
          <a href="javascript:void(0)" onClick={this.showStreetView}>Street View</a>
        </div>
        <div className="col s6 link">
          <a href="javascript:void(0)" onClick={this.showDirections}>Directions</a>
        </div>
        <div className="col s12">
          <GrayButton onClick={parkNowAction}>
            PARK HERE
          </GrayButton>
        </div>
      </div>
    );
  }

  /* Booking Step 2 */

  renderPlate(plate, index) {
    const { plate_no, registered_state } = plate;
    const clickHandler = () => {this.selectVehiclePlate(plate)};
    const colorClass = index%2 == 0 ? "even" : "odd";
    return (
      <div className={`plate ${colorClass}`}>
        <a href="javascript:void(0)" onClick={clickHandler}>
          <div>
            License Plate #: {plate_no}
          </div>
          <div>
            State: {registered_state}
          </div>
        </a>
      </div>
    );
  }

  renderVehicleList() {
    let vehicles = [];
    if(this.props.vehicle) {
      vehicles = this.props.vehicle.vehicles;
    }
    const plates = vehicles.map(this.renderPlate, this);
    const clickHandler = () => {this.selectVehiclePlate({})};
    return (
      <div>
        <div className="plate-list">
          {plates}
        </div>
        <div>
          <GrayButton onClick={clickHandler}>
            Skip This
          </GrayButton>
        </div>
      </div>
    );
  }

  /* Booking Step 3 */

  renderPlateForm() {
    const { selectedPlate, showPaidParkingModal, showManagedParkingModal, isManagedFree } = this.props.parking;
    const { registered_state, plate_no } = selectedPlate;
    const label = statesHash[registered_state];
    const numHours = showPaidParkingModal || (showManagedParkingModal && !isManagedFree) ? this.renderHoursSelectionForm() : null;
    const selectedState = registered_state ? {label: label, value: registered_state} : null;

    return (
      <form className="select-vehicle">
        <LicensePlateField
          ref="license-number"
          placeholder="LICENSE PLATE #"
          className="license-no"
          defaultValue={plate_no}
          onBlur={this.changePlateNo}/>
		<Chooser 
		  options={states}
		  ref="select-state"
		  selectionEntity="a State"
		  placeholder="Select State" 
		  defaultValue={selectedState}
		  onValueChange={this.changeState}/>
        {numHours}
      </form>
    );
  }

  renderVehicleFormButton() {
    return (
      <div>
        <GrayButton className="green-btn" onClick={this.confirmBooking}>
          Park Now
        </GrayButton>
      </div>
    );
  }

  renderHoursSelectionForm() {
    const { parking } = this.props;
    const { parkingRules, selectedMarkerItem } = parking;
    const currentRules = parkingRules[selectedMarkerItem.location_code];
    const pricingUnitTime = currentRules.pricing_duration;
    const maxHrs = currentRules.max_hours;
    const maxHrsMins = maxHrs * 60;
    const maxTimeDivisions = parseInt(maxHrsMins/pricingUnitTime);
    const hrsArr = [];
    for (let i = 1; i <= maxTimeDivisions; i++) {
      let time = pricingUnitTime * i;
      let hrs = parseInt(time/60);
      let mins = parseFloat((time%60)/60).toFixed(2);
      let timeToDisplay = parseFloat(hrs) + parseFloat(mins);
      let hrsString = hrs > 1.00 ? " Hours" : " Hour";
      hrsArr.push({
        label: timeToDisplay + hrsString,
        value: timeToDisplay
      });
    }
    return (
      <SimpleSelect 
        options = {hrsArr}
        placeholder = "Select Hours" 
        onValueChange={this.setParkingHours} //this.getCharges
        defaultValue={hrsArr[0]}/>
    );
  }

  renderPaypalPaymentForm() {
    const { parking } = this.props;
    const { priceToPay } = parking;
    const parkingData = JSON.stringify(this.getParkingData());
    return (
      <form method="post" action="/api/pay-for-parking" ref="pay-with-paypal">
        <input type="hidden" name="amount" value={priceToPay} ref="amount-to-pay"/>
        <input type="hidden" name="parkingData" value={parkingData} ref="parking-data"/>
      </form>
    );
  }

  renderWalletOption() {
    const { isAlreadyParked } = this.props.parking;
    const walletBtnClasses = classNames({
      "blue-btn": true,
      "disabled": isAlreadyParked
    });
    const clickAction = !isAlreadyParked ? this.showWalletBalance : null;
    return (
      <div className="margin-bottom-10">
        <GrayButton className={walletBtnClasses} disabled={isAlreadyParked} onClick={clickAction}>
          Pay with Wallet
        </GrayButton>
      </div>
    );
  }

  renderPaymentBtns() {
    const { isAlreadyParked } = this.props.parking;
    const userId = cookie.load('userId');
    const walletOption = userId ? this.renderWalletOption() : null;
    const paymentBtnClasses = classNames({
      "green-btn": true,
      "disabled": isAlreadyParked
    });
    const clickAction = !isAlreadyParked ? this.payWithPaypal : null;
    return (
      <div>
        {walletOption}
        <div>
          <GrayButton className={paymentBtnClasses} onClick={clickAction}>
            Make Payment
          </GrayButton>
        </div>
      </div>
    );
  }

  renderAlreadyParkedMsg() {
    return (
      <div className="alert alert-danger">
        This vehicle is already parked. Please <a href="javascript:void(0)" onClick={this.exitVehicleFromParking}> exit this vehicle</a> before proceeding.
      </div>
    );
  }

  renderParkingOverview() {
    const { selectedPlate, parkingRules, selectedMarkerItem, showPaidParkingModal, showManagedParkingModal, isManagedFree, bookingStep, isAlreadyParked } = this.props.parking;
    const { registered_state, plate_no } = selectedPlate;
    console.log(selectedMarkerItem);
console.log(parkingRules);
    const currentRules = parkingRules[selectedMarkerItem.location_code];

    const { parking_times, max_hours, time_rule } = currentRules;
    const rateString = "Rate: $" + currentRules.pricing + "/" + currentRules.pricing_duration + "min";
    const rate = showPaidParkingModal || (showManagedParkingModal && !isManagedFree) ? rateString : null;
    
    const btns = showPaidParkingModal || (showManagedParkingModal && !isManagedFree) ? this.renderPaymentBtns() : this.renderVehicleFormButton();
    const paypalPaymentForm = showPaidParkingModal || (showManagedParkingModal && !isManagedFree) ? this.renderPaypalPaymentForm() : null;
    const alreadyParked = isAlreadyParked ? this.renderAlreadyParkedMsg() : null;

    return (
      <div className="vehicle-form">
        <h4 className="font-bold">Parking</h4>
        <div className="row">
          <div className="col s6">
            {time_rule}
          </div>
          <div className="col s6">
            Max: {max_hours} Hours
          </div>
        </div>
        <h4 className="font-bold">My Vehicle</h4>
        {this.renderPlateForm()}
        <div className="parking-rate">
          {rate}
        </div>
        {alreadyParked}
        {btns}
        {paypalPaymentForm}
      </div>
    );
  }

  renderTopParkingOverview() {
    const { selectedMarker, parkingRules } = this.props.parking;
    const { location_code, address } = selectedMarker;
    const currentMarker = parkingRules[location_code];
    const { marker_type, pricing_duration, pricing, this_day, time_rule } = currentMarker;
    let rate = "";
    if(marker_type == "ez-free") {
      rate = "Free";
    } else {
      rate = `$${pricing}/${pricing_duration}`;
    }
    return (
      <ParkingOverview
        locationCode={location_code}
        address={address}
        rate={rate}
        time={time_rule}
        allowed={this_day} />
    );
  }

  renderFreePaidParkingModal() {
    const { bookingStep, showPaidParkingModal, showFreeParkingModal } = this.props.parking;
    let content = "";
    let heading = "Parking Info";
    if(bookingStep == 1) {
      content = this.renderFreePaidParkingModalContent();
    } else if(bookingStep == 2) {
      content = this.renderVehicleList();
      heading = "Select Vehicle";
    } else if(bookingStep == 3) {
      heading = "Select Vehicle";
      content = this.renderParkingOverview();
    } else if(bookingStep == 4) {
      content = this.renderConfirmationScreen();
      heading = "Parking Confirmation";
    }
    return (
      <ParkingModal
        className="free-parking-modal"
        onHide={this.hideParkingModal}
        heading={heading}>
        {content}
      </ParkingModal>
    );
  }

  /* Booking Step 1 Managed*/

  renderLot(lot) {
    const { lot_row, lot_number, occupied } = lot;
    const carClasses = classNames({
      "car-icon": true,
      "occupied": occupied.toUpperCase() === "YES",
      "available": occupied.toUpperCase() === "NO"
    });
    return (
      <div className="car">
        <div className={carClasses}>
        </div>
        <div className="lot-number">
          Row {lot_row}: {lot_number}
        </div>
      </div>
    );
  }

  renderLots() {
    const { lotsData, parkingRules, selectedMarkerItem } = this.props.parking;

    const currentRules = parkingRules[selectedMarkerItem.location_code];
    console.log(currentRules);
    const parkNowAction = () => {this.selectParkingandFetchVehicles(selectedMarkerItem.location_code, currentRules.pricing_duration)};
    const carList = lotsData.map(this.renderLot, this);
    return (
      <div>
        <div className="car-list">
          {carList}
        </div>
        <div className="park-here-btn">
          <GrayButton onClick={parkNowAction}>
            PARK HERE
          </GrayButton>
        </div>
      </div>
    );
  }

  renderManagedParkingModal() {
    const { bookingStep, isManagedFree, showLots } = this.props.parking;
    let content = "";
    let heading = "";
    if(bookingStep == 1 && !showLots) {
      heading = "Parking Info";
      content = this.renderFreePaidParkingModalContent();
    } else if (bookingStep == 1 && showLots) {
      console.log("here");
      heading = "Current Parking Lot Status";
      content = this.renderLots();
    } else if(bookingStep == 2) {
      heading = "Select Vehicle";
      content = this.renderVehicleList();
    } else if(bookingStep == 3) {
      heading = "Park Now";
      content = this.renderParkingOverview();
    } else if (bookingStep == 4) {
      heading = "Parking Confirmation";
      content = this.renderConfirmationScreen();
    }
    return (
      <ParkingModal
        className="managed-parking-modal"
        onHide={this.hideParkingModal}
        heading={heading}>
        {content}
      </ParkingModal>
    );
  }

  renderNotNowAndYesButtons() {
    return (
      <div className="modal-footer">
        <a href="javascript:void(0)"
          onClick={this.closeWalletModal}
          className="waves-effect waves-green btn btn-flat">
            Not Now
        </a>

        <a href="javascript:void(0)"
          onClick={this.payFromWallet}
          className="modal-action modal-close waves-effect waves-green btn-flat">
            Yes
        </a>
      </div>
    );
  }

  renderCloseBtn() {
    return (
      <div className="modal-footer">
        <a href="javascript:void(0)"
          onClick={this.closeWalletModal}
          className="waves-effect waves-green btn btn-flat">
           Close
        </a>
      </div>
    );
  }


  renderPayWithWalletAlert() {
    const { parking } = this.props;
    const { currentBalance, priceToPay } = parking;
    const messsage = currentBalance < priceToPay ? (
      <div>Your Wallet Balance is low. Required Amount ${priceToPay}.</div>
    ) : (
      <div>Would you like to pay ${priceToPay} from your ParkEZly wallet?</div>
    );
    const btns  = currentBalance == 0 ? this.renderCloseBtn() : this.renderNotNowAndYesButtons();
    return (
      <div className="modal modal-fixed-footer wallet-balance-modal" ref="wallet-balance-modal">
        <div className="modal-content">
          <h3>Wallet Balance: ${currentBalance}</h3>
          {messsage}
        </div>
        {btns}
      </div>
    );
  }

  renderConfirmationScreen() {
    const { parking } = this.props;
    const { bookingData } = parking;
    const { plate_no, max_time, exit_date_time, address1, address2, city, state, zip, country } = bookingData;
    const exitTime = new Date(exit_date_time);
    const dateTimeNow = new Date(moment.utc().format("YYYY-MM-DD HH:mm"));
    const timeRemaining = exitTime - dateTimeNow;
    console.log(timeRemaining);
    return (
      <div className="parking-confirmation">
        <Timer timeLeft={timeRemaining}/>
        <div>
          <div className="row">
            <div className="col s4 header">
              Plate#:
            </div>
            <div className="col s8 field-value">
              {plate_no}
            </div>
          </div>

          <div className="row">
            <div className="col s4 header">
              Parked At:
            </div>
            <div className="col s8 field-value">
              July 17, 2016
            </div>
          </div>

          <div className="row">
            <div className="col s4 header">
              Expires At:
            </div>
            <div className="col s8 field-value">
              July 17, 2016
            </div>
          </div>

          <div className="row">
            <div className="col s4 header">
              Max Time:
            </div>
            <div className="col s8 field-value">
              {max_time} Hours
            </div>
          </div>

          <div className="row">
            <div className="col s4 header">
              Address:
            </div>
            <div className="col s8 field-value">
              <div>{address1}</div>
              <div>{address2}</div>
              <div>{city}, {state}, {zip}, {country}</div>
            </div>
          </div>
        </div>

        <GrayButton className="yellow-btn margin-bottom-10" onClick={this.exitVehicleFromParking}>
          Exit Parking
        </GrayButton>

        <GrayButton className="blue-btn margin-bottom-10" onClick={null}>
          Directions to my vehicle
        </GrayButton>

        <GrayButton onClick={this.hideParkingModal}>
          HIDE
        </GrayButton>
      </div>
    );
  }

  renderStreetView() {
    const { showStreetView } = this.props.parking;
    const panoStyles = {
      width: 500,
      height: 530
    };
    const panoClass = showStreetView ? "active" : "inactive";

    return (
      <div id="pano" style={panoStyles} className={panoClass}></div>
    );
  }

  renderCloseStreetView(){
    const { showStreetView } = this.props.parking;
    return showStreetView ? (
      <a
        href="javascript:void(0)"
        className="close-street-view"
        onClick={this.hideStreetView}>
          Close
      </a>
    ) : null;
  }

  render() {
    console.log(this.props);
    const gMap = this.renderGMap();
    const myLocationIcon = this.renderMyLocationIcon();
    const payWithWalletAlert = this.renderPayWithWalletAlert();
    const {
      loading,
      showParkingOptions,
      showOtherLocations,
      selectedLocation,
      selectedLocationCode,
      showFreeParkingModal,
      showPaidParkingModal,
      showManagedParkingModal,
      showTopOverview,
      lotsData
    } = this.props.parking;
    const parkNowBtn = !showParkingOptions && !showOtherLocations && !selectedLocation ? this.renderFindNearbyBtn() : null;
    const searchBtn = !showParkingOptions && !showOtherLocations && !selectedLocation ? this.renderSearchBtn() : null;
    const footerContent = this.renderFooterContent();
    const parkingOptions = showParkingOptions ? this.renderParkingOptions() : null;
    const otherLocations = showOtherLocations ? this.renderSearchLocations() : null;
    const selectedLocationLabel = selectedLocation ? this.renderLocationLabel() : null;
    const backBtn = selectedLocation ? this.renderBackBtn() : null;
    const parkingInfoBtn = selectedLocation ? this.renderParkingInfoBtn() : null;
    const topParkingOverview = showTopOverview ? this.renderTopParkingOverview() : null;
    const backToParkingListBtn = showTopOverview ? this.renderBackToParkingList() : null;
    const parkingDetailBtn = showTopOverview ? this.renderParkingDetailsBtn() : null;

    //After marker is selected
    const freeParkingModal = showFreeParkingModal || showPaidParkingModal ? this.renderFreePaidParkingModal() : null;
    const managedParkingModal = showManagedParkingModal && lotsData ? this.renderManagedParkingModal() : null;
    const streetView = showStreetView ? this.renderStreetView() : null;
    const closeStreetViewBtn = this.renderCloseStreetView();
    return (
      <Body
        ref="find-parking-body"
        showHeader={true}
        showFooter={true}
        footerContent={footerContent}
        loading={loading}>
          <div className="find-parking-container">
            {parkingOptions}
            {topParkingOverview}
            {backToParkingListBtn}
            {parkingDetailBtn}
            {otherLocations}
            {parkNowBtn}
            {searchBtn}
            {selectedLocationLabel}
            {freeParkingModal}
            {managedParkingModal}
            {gMap}
            {backBtn}
            {parkingInfoBtn}
            {myLocationIcon}
            {payWithWalletAlert}
            {streetView}
            {closeStreetViewBtn}
          </div>
      </Body>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    parking: state.parking,
    location: state.location,
    vehicle: state.vehicle.Vehicle.vehicleList
  };
};

export default connect(MapStateToProps)(FindParking);
