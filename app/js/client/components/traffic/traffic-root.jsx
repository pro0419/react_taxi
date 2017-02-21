import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import cookie from "react-cookie";
import Body from "../../../common/components/body/body.jsx";
import { SimpleSelect } from "react-selectize";
import { DirectionsRenderer, GoogleMapLoader, GoogleMap, Marker, OverlayView} from "react-google-maps";
import { getPlaces, getLocationDetails,setTrafficResult, setTrafficDestination, setTrafficOrigin } from "../../actions/traffic.js";
import { setPosition, setInitialPosition } from "../../actions/location.js";
import { getLocations } from "../../actions/locations.js";
import GrayButton from "../../../common/components/button/gray-button.jsx";
import { throttle } from "lodash";
import "./styles/traffic.scss";

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

class Traffic extends Component {
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
    this.getGeolocation();
    /*
    if(!lat) {
      
    } else {
      this.getLocationDetails();
    }*/
  }

  componentDidUpdate() {
     let traffic = this.props.traffic.traffic;
     if (traffic =='CURRENT') {

        var lat = this.props.location.lat;
        var lng = this.props.location.lon;
        //var directionsDisplay = new google.maps.DirectionsRenderer();
        var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: {lat: lat, lng: lng}
        });
        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);

     } else if (traffic !='') {
        var origin = this.props.traffic.origin;
        var dest = this.props.traffic.destination;
        var origins = origin.split(",");
        var dests = dest.split(",");
        var lat = (parseFloat(origins[0]) + parseFloat(dests[0])) / 2;
        var lng = (parseFloat(origins[1]) + parseFloat(dests[1])) / 2;
        //var directionsDisplay = new google.maps.DirectionsRenderer();
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16,
          center: {lat: lat, lng: lng}
        });
        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
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
    const { location } = this.props.traffic;
    return (
      <div className="nearby-content">
        <h4>Get Traffic</h4>
        <div>
          {location}
        </div>
      </div>
    );
  }

  renderMyLocationIcon() {
    return (
      <div className="my-location-marker" onClick={this.goToInitialLocation}>
      </div>
    );
  }

  renderGMap() {

    let traffic = this.props.traffic.traffic;
    let lat = this.props.location.lat || 40.7128;
    let lon = this.props.location.lon || -73.935242;

    if (traffic != '') {
      return (
        <section className="direction-map">
          <div id="map"
            style={{
              height: "100%",
            }}/>
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
              <div id="map"
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

  selectOrigin(event) {
    const { dispatch } = this.props;
    const { locationsList } = this.props.LocationsList.Locations;
    const location = locationsList[event.value];
    dispatch(setTrafficOrigin(location.lat+","+location.lng));
  }

  selectDestination(event) {
    const { dispatch } = this.props;
    const { locationsList } = this.props.LocationsList.Locations;
    const location = locationsList[event.value];
    dispatch(setTrafficDestination(location.lat+","+location.lng));
  }

  renderLocations(type) {
    const { locationsList } = this.props.LocationsList.Locations;
    const locations = locationsList.map(this.renderLocation);
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


  getTrafficData(event) {
    const { dispatch } = this.props;
    const { origin, destination } = this.props.traffic;

    const DirectionsService = new google.maps.DirectionsService();
    const TrafficLayer = new google.maps.TrafficLayer();
    console.log(TrafficLayer);

    const tmode = "DRIVING";

    DirectionsService.route({
      origin: origin,
      destination: destination,
      travelMode: tmode
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        dispatch(setTrafficResult(result));
      } else {
        console.log(result);
      }
    });
  }

  renderGetTraffic() {
    return (
      <GrayButton className="green-btn margin-bottom-10" onClick={ e => this.getTrafficData(e)}>
        Get Traffic Data
      </GrayButton>
    );
  }

  render() {
    const gMap = this.renderGMap();
    const content = this.renderContent();
    const myLocationIcon = this.renderMyLocationIcon();
    
    const origin = this.renderLocations('origin');
    const destination = this.renderLocations('destination');
    const gettrafficdata = this.renderGetTraffic();

    const location = this.renderLocations();
    const { loading } = this.props.traffic;

    return (
      <Body
        ref="find-parking-body"
        showHeader={true}
        loading={false}>
          {content}
          {origin}
          {destination}
          {gettrafficdata}
          {gMap}
          {myLocationIcon}
      </Body>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    traffic: state.traffic,
    location: state.location,
    LocationsList: state.LocationsList
  };
};

export default connect(MapStateToProps)(Traffic);
