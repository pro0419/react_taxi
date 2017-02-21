import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import cookie from "react-cookie";
import Body from "../../../common/components/body/body.jsx";
import { SimpleSelect } from "react-selectize";
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";
import { getPlaces, getLocationDetails } from "../../actions/nearby.js";
import { setPosition, setInitialPosition } from "../../actions/location.js";
import { getLocations } from "../../actions/locations.js";
import { throttle } from "lodash";
import "./styles/nearby.scss";

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

class Nearby extends Component {
  constructor(props) {
    super(props);
    this.handleCenterChanged = throttle(this.handleCenterChanged.bind(this), 100);
    this.goToInitialLocation = this.goToInitialLocation.bind(this);
  }

  componentWillMount() {

    const { dispatch } = this.props;
    const userId = cookie.load('userId');
    dispatch(getLocations(userId));

    const { lat, lon } = this.props.location;
    if(!lat) {
      this.getGeolocation();
    } else {
      this.getLocationDetails();
    }
  }

  getGeolocation() {
    if (canUseDOM && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.initializePosition.bind(this));
    }
  }

  initializePosition(position) {
    const { dispatch } = this.props;
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    
    dispatch(setInitialPosition(lat, lon));
    dispatch(getLocationDetails(lat, lon));
  }

  goToInitialLocation() {
    const { dispatch, location } = this.props;
    const { initialLat, initialLon } = location;
    dispatch(setPosition(initialLat, initialLon));
  }

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
      dispatch(getLocationDetails(newLat, newLon));
    }
  }

  renderMarker(markerItem, index) {
    const { geometry } = markerItem;
    const { location } = geometry;
    const { lat, lng } = location;
    const position = new google.maps.LatLng({
      lat: parseFloat(lat),
      lng: parseFloat(lng)
    });

    const markerProps = {
      position
    };
    return (
      <Marker {...markerProps} key={index}/>
    );
  }

  renderContent() {
    const { location } = this.props.nearby;
    return (
      <div className="nearby-content">
        <h4>Get Nearby</h4>
        <div>
          {location}
        </div>
      </div>
    );
  }

  renderMyLocationIcon() {
    return (
      <div className="my-location-marker-nearby" onClick={this.goToInitialLocation}>
      </div>
    );
  }

  renderGMap() {
    let lat = this.props.location.lat || 40.7128;
    let lon = this.props.location.lon || -73.935242;
    const position = new google.maps.LatLng({
      lat: parseFloat(lat),
      lng: parseFloat(lon)
    });
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
              defaultZoom={15}
              defaultCenter={{ lat: lat, lng: lon }}
              onClick={null}
              onCenterChanged={this.handleCenterChanged}
              center={{ lat: lat, lng: lon }}>
                <Marker position={position}/>
            </GoogleMap>
          }/>
      </section>
    );
  }

  selectLocation(event) {   
    const { dispatch } = this.props;
    const { locationsList } = this.props.LocationsList.Locations;
    const location = locationsList[event.value];
    dispatch(setInitialPosition(parseFloat(location.lat), parseFloat(location.lng)));
    dispatch(getLocationDetails(parseFloat(location.lat), parseFloat(location.lng)));
  }

  renderLocation(locationData, index) {
    const { location_name, lat,lng } = locationData;
    return (
      <option value={index}>{location_name}</option>
    );
  }

  renderLocations() {
    const { locationsList } = this.props.LocationsList.Locations;
    const locations = locationsList.map(this.renderLocation);
    return (
      <div className="locations-select-list">
        <SimpleSelect
          onValueChange={e => this.selectLocation(e)}
          placeholder="Select Location">
          {locations}
        </SimpleSelect>
      </div>
    );
  }

  selectCategory(event){
    console.log(event);
  }

  renderCategories() {
    return (
        <SimpleSelect
          onValueChange={e => this.selectCategory(e)}
          placeholder="Select Category">
          <option value="Restaurant">Restaurant</option>
          <option value="Airport">Airport</option>
          <option value="Atm">Atm</option>
          <option value="Bank">Bank</option>
          <option value="Church">Church</option>
          <option value="Hospital">Hospital</option>
          <option value="Mosque">Mosque</option>
          <option value="Cinema">Movie_theater</option>
        </SimpleSelect>
    );
  }

  render() {
    const gMap = this.renderGMap();
    const content = this.renderContent();
    const myLocationIcon = this.renderMyLocationIcon();
    const location = this.renderLocations();
    const category = this.renderCategories();
    const { loading } = this.props.nearby;

    return (
      <Body
        ref="find-parking-body"
        showHeader={true}
        loading={false}>
          {content}
          {location}
          {gMap}
          {myLocationIcon}
      </Body>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    nearby: state.nearbyPlaces,
    location: state.location,
    LocationsList: state.LocationsList
  };
};

export default connect(MapStateToProps)(Nearby);
