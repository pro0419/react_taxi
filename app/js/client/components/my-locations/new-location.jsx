import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import {Link } from 'react-router';

import cookie from "react-cookie";
import Body from "../../../common/components/body/body.jsx";
import GrayButton from "../../../common/components/button/gray-button.jsx";

import {getLocationDetails, addLocation, deleteLocation, searchNewLocation} from "../../actions/new-location.js";

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

class NewLocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      location: '',
      isInited: false  
    };
    let latitude, longitude;
    this.addNewLocation = this.addNewLocation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.searchNewLocation = this.searchNewLocation.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
  }

  componentWillMount() {
    this.getGeolocation();
  }

  getGeolocation() {
    if (canUseDOM && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.initializePosition.bind(this));
    }
  }

  initializePosition(position) {
    const { dispatch } = this.props;
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;

    dispatch(getLocationDetails(this.latitude, this.longitude));
  }

  renderAddShowButtons() {
    return (
      <div className="addShowBtns">
        <Link className="toolBtn active" to="/new-location">Add</Link>
        <Link className="toolBtn" to="/my-locations">Show</Link>
      </div>
    );
  }

  addNewLocation() {
    const { dispatch } = this.props;
    const new_location = this.state.location;
    const location_name = new_location.split(',', 1);
    let location_address = new_location.replace(location_name[0]+", ", "");
    const locationInfo = {
      lat: this.latitude,
      lng: this.longitude,
      location_address: location_address,
      location_name: location_name[0],
      user_id: cookie.load('userId')
    };
    dispatch(addLocation(locationInfo));
    // dispatch(deleteLocation(984));
  }

  handleChange(event) {
    this.setState({location: event.target.value});
  }

  searchNewLocation() {
    const { dispatch } = this.props;
    if (this.state.location=='')
      return;
    dispatch(searchNewLocation(this.state.location));
  }

  selectLocation(locationData) {
    this.setState({
      location: locationData.formatted_address
    });
    this.latitude = locationData.geometry.location.lat;
    this.longitude = locationData.geometry.location.lng;
  }

  renderLocations() {
    const {locationsList} = this.props.newLocation;
    if(locationsList == undefined || locationsList ==""){
      return;
    }
    const locations = locationsList.results.map((locationData,index)=>{
      const { address_components, formatted_address, geometry } = locationData;
      const location_name = formatted_address.split(',', 1);
      const location_address = formatted_address.replace(location_name+", ", "");

      return (
        <div className="col s12" key={index}>
          <a onClick={()=>this.selectLocation(locationData)}>
            <h5>Location: {location_name}</h5>
            <p>{location_address}</p>
          </a>
        </div>
      )
    });
    return (
      <div className="locations-list">
        <div className="row">
          {locations} 
        </div>
      </div>
    );
  }

  render() {
    const { loading, current_location } = this.props.newLocation;
    const addShowBtns = this.renderAddShowButtons();
    const content = this.renderLocations();

    if(this.state.location=='' && !this.state.isInited){
      if(current_location !='' && !this.state.isInited){
        this.setState({
          location: current_location,
          isInited: true
        });
      }
    }
    
    return(
        <Body showHeader={true} loading={loading}>
          <div className="new-location">
              <h4>My Locations</h4>
              {addShowBtns}
              <div className="row newLocation">
                <div className="search-bar-input col s11">
                  <input type="text" value={this.state.location} onChange={this.handleChange} placeholder="Search"/>
                </div>
                <div className="search-bar-submit col s1">
                    <i className="material-icons valign clickable" onClick={this.searchNewLocation}>search</i>
                </div>
              </div>
              <div className="addBtn">
                <GrayButton onClick={this.addNewLocation}>
                  Add
                </GrayButton>
              </div>
              <div className="my-locations-root">
                {content}
              </div>
          </div>
        </Body>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    newLocation: state.newLocation
  };
};

export default connect(MapStateToProps)(NewLocationForm);