import React from 'react';
import ReactDOM from "react-dom";
import { Router, IndexRoute, Route, Link, browserHistory } from "react-router";
import ParkingController from "./components/find-parking/find-parking-controller.jsx";
import ParkingPaymentSuccessful from "./components/find-parking/finalize-parking-payment.jsx";
import SignInController from "./components/sign-in/sign-in-controller.jsx";
import NewVehicleController from "./components/my-vehicles/my-vehicles-controller.jsx";
import EditVehicleController from "./components/my-vehicles/edit-vehicle-controller.jsx";
import VehicleListController from "./components/my-vehicles/my-vehicles-list-controller.jsx";
import FindVehicleController from "./components/find-vehicle/find-vehicle-controller.jsx";
import FindVehicleDetailController from "./components/find-vehicle/find-vehicle-detail-controller.jsx";
import MyPermitsController from "./components/my-permits/my-permits-controller.jsx";
import MyTicketsController from "./components/my-tickets/my-tickets-controller.jsx";
import MyLocationsController from "./components/my-locations/my-locations-controller.jsx";
import NewLocationController from "./components/my-locations/new-location-controller.jsx";
import MyWalletController from "./components/my-wallet/my-wallet-controller.jsx";
import PaymentSuccessful from "./components/payment/payment-successful.jsx";
//import ParkingPaymentSuccessful from "./components/payment/parking-payment-successful.jsx";
import PaymentFailure from "./components/payment/payment-failure.jsx";
import WeatherController from "./components/weather/weather-controller.jsx";
import NearbyController from "./components/nearby/nearby-controller.jsx";
import TrafficController from "./components/traffic/traffic-controller.jsx";
import DirectionController from "./components/direction/direction-controller.jsx";
import TransitController from "./components/transit/transit-controller.jsx";
import Logout from "./components/logout/logout.jsx";

export default function ClientIndex() {
  return (
    <div>
      <Route path="/" component={SignInController}/>
      <Route path="login" component={SignInController}/>
      <Route path="find-parking" component={ParkingController}/>
      <Route path="finalize-parking-payment" component={ParkingPaymentSuccessful}/>
      <Route path="new-vehicle" component={NewVehicleController}/>
      <Route path="my-vehicles" component={VehicleListController}/>
      <Route path="edit-vehicle" component={EditVehicleController}/>
      <Route path="edit-vehicle/:vehicleId" component={EditVehicleController}/>
      <Route path="find-vehicle" component={FindVehicleController}/>
      <Route path="find-vehicle/:parkingId" component={FindVehicleDetailController}/>
      <Route path="my-permits" component={MyPermitsController}/>
      <Route path="my-tickets" component={MyTicketsController}/>
      <Route path="my-locations" component={MyLocationsController}/>
      <Route path="new-location" component={NewLocationController}/>
      <Route path="my-wallet" component={MyWalletController}/>
      <Route path="finalize-payment" component={PaymentSuccessful}/>
      <Route path="finalize-parking" component={ParkingPaymentSuccessful}/>
      <Route path="payment-failure" component={PaymentFailure}/>
      <Route path="weather" component={WeatherController}/>
      <Route path="nearby" component={NearbyController}/>
      <Route path="traffic" component={TrafficController}/>
	  <Route path="transit" component={TransitController}/>
      <Route path="directions" component={DirectionController}/>
      <Route path="logout" component={Logout}/>
    </div>
  );
}