import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import cookie from "react-cookie";
import Body from "../../../common/components/body/body.jsx";
import { SimpleSelect } from "react-selectize";
import { DirectionsRenderer, GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";
import { getPlaces, getLocationDetails, setDirectionDestination, setDirectionMode, setDirectionOrigin, setDirectionResult } from "../../actions/direction.js";
import { setPosition, setInitialPosition } from "../../actions/location.js";
import { getLocations } from "../../actions/locations.js";
import { throttle } from "lodash";
import GrayButton from "../../../common/components/button/gray-button.jsx";
import "./styles/direction.scss";

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

class Direction extends Component {
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
      dispatch(getLocationDetails(lat, lon));
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

  getDirection(event) {
    const { dispatch } = this.props;
    const { origin, destination, mode } = this.props.directions;

    const DirectionsService = new google.maps.DirectionsService();

    const tmode = mode || "DRIVING";

    DirectionsService.route({
      origin: origin,
      destination: destination,
      travelMode: tmode
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        dispatch(setDirectionResult(result));
      } else {
        console.error('error fetching directions ${ result }');
      }
    });
  }

  renderGetDirection() {
    return (
      <GrayButton className="green-btn margin-bottom-10" onClick={ e => this.getDirection(e)}>
        Get Directions
      </GrayButton>
    );
  }

  selectOrigin(event) {
    const { dispatch } = this.props;
    const { locationsList } = this.props.LocationsList.Locations;
    if (event.value != 0) {
      const location = locationsList[event.value-1];
      dispatch(setDirectionOrigin(location.lat+","+location.lng));
    }
    else
      dispatch(setDirectionOrigin(this.props.location.lat+","+this.props.location.lon));
  }

  selectDestination(event) {
    const { dispatch } = this.props;
    const { locationsList } = this.props.LocationsList.Locations;
    if (event.value != 0) {
      const location = locationsList[event.value-1];
      dispatch(setDirectionDestination(location.lat+","+location.lng));
    }
    else
      dispatch(setDirectionDestination(this.props.location.lat+","+this.props.location.lon));
  }

  renderLocation(locationData, index) {
    const { location_name, lat,lng } = locationData;
    return (
      <option value={index+1} key={index+1}>{location_name}</option>
    );
  }

  renderLocations(type) {
    const { locationsList } = this.props.LocationsList.Locations;
    let locations = locationsList.map(this.renderLocation);
    let cur_location_name = this.props.directions.location;
    const index = 0;
    const cur_location = (<option value={index} key={index}>{cur_location_name}</option>);
    locations.unshift(cur_location);
    if( type=='destination') {      
      return (
        <div className="margin-bottom-10">
          <SimpleSelect
            onValueChange={e => this.selectDestination(e)}
            placeholder="Select Destination">
            {locations}
          </SimpleSelect>
        </div>
      );
    } else if(type=='origin'){
       return (
         <div className="margin-bottom-10">
          <SimpleSelect
            onValueChange={e => this.selectOrigin(e) }
            placeholder="Select Origin">
            {locations}
          </SimpleSelect>
        </div>
      );
    }
  }

  selectMode(mode){
    const { dispatch } = this.props;
    dispatch(setDirectionMode(mode.value));
  }

  renderMode() {
    return (
        <div className="margin-bottom-10">
          <SimpleSelect
            onValueChange={e => this.selectMode(e)}
            defaultValue= {{label: "Driving",value: "DRIVING"}}
            placeholder="Select Mode">
            <option value="DRIVING">Driving</option>
            <option value="WALKING">Walking</option>
            <option value="BICYCLING">Bicycling</option>
            <option value="TRANSIT">Transit</option>
            <option value="TRANSIT-TRAIN">Train</option>
            <option value="TRANSIT-RAIL">Rail</option>
            <option value="TRANSIT-SUBWAY">Subway</option>
            <option value="TRANSIT-TRAM">Tram</option>
            <option value="TRANSIT-BUS">Bus</option>
          </SimpleSelect>
        </div>
    );
  }

  renderContent() {
    const modes = this.renderMode();
    const origin = this.renderLocations('origin');
    const destination = this.renderLocations('destination');
    const GetDirections = this.renderGetDirection();
    return (
      <div style={{display:"block"}}>
        <div className="direction-content">
          <h4>Directions</h4>
          <div className="direction-confirmation" >
            {modes}
            {origin}
            {destination}
            {GetDirections}
          </div>
        </div>
        <div ref="gmap-panel" className="direction-panel"></div>
      </div>
    );
  }

  

  renderGMap() {

    let directions = this.props.directions.directions;
    let lat = this.props.location.lat || 40.7128;
    let lon = this.props.location.lon || -73.935242;

    if (directions != '') {

      return (
        <section className="direction-map">
          <GoogleMapLoader
            containerElement={
              <div
                style={{
                  height: "100%",
                }}/>
            }
            googleMapElement={
              <GoogleMap
                defaultZoom={15}
                defaultCenter={{ lat: lat, lng: lon }}
              >
                { <DirectionsRenderer directions={directions} panel={this.refs['gmap-panel']} />}
              </GoogleMap>
            }/>
        </section>
      );
      
    } else {
      let lat = this.props.location.lat || 40.7128;
      let lon = this.props.location.lon || -73.935242;
      const position = new google.maps.LatLng({
        lat: parseFloat(lat),
        lng: parseFloat(lon)
      });
      return (
        <section className="direction-map">
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
    
  }


  render() {
    const gMap = this.renderGMap();
    const content = this.renderContent();
    const { loading } = this.props.directions;
    return (
      <Body
        ref="find-parking-body"
        showHeader={true}
        loading={false}>
          {content}
          {gMap}
      </Body>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    directions: state.directions,
    location: state.location,
    LocationsList: state.LocationsList
  };
};

export default connect(MapStateToProps)(Direction);
