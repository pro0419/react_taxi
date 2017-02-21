import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import cookie from "react-cookie";
import moment from "moment";
import {Link } from 'react-router';

import Body from "../../../common/components/body/body.jsx";
import { getLocations } from "../../actions/locations.js";

class MyLocations extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if(!this.checkAuthStatus()) {
      window.location = "/";
    }
    const userId = cookie.load('userId');
    const { dispatch } = this.props;
    dispatch(getLocations(userId));
  }

  checkAuthStatus() {
    const userId = cookie.load('userId');
    if(userId) {
      return true;
    }
  }

  renderNotice() {
    const { errorMessage } = this.props.locations;
    return errorMessage ? (
      <div className="alert alert-danger">
        {errorMessage}
      </div>
    ) : null;
  }

  renderLocation(locationData, index) {
    const { location_name, location_address } = locationData;
    return (
      <div className="col s12" key={index}>
        <div>
          <h5>Location: {location_name}</h5>
          <p>{location_address}</p>
        </div>
      </div>
    )
  }

  renderAddShowButtons() {
    return (
      <div>
        <Link className="toolBtn" to="/new-location">Add</Link>
        <Link className="toolBtn active" to="/my-locations">Show</Link>
      </div>
    );
  }

  renderLocations() {
    const { locationsList } = this.props.locations;
    const notice = this.renderNotice();
    const locations = locationsList.map(this.renderLocation);
    const addShowBtns = this.renderAddShowButtons();
    return (
      <div className="locations-list">
        {notice}
        <h4>My Locations</h4>
        {addShowBtns}
        <div className="row">
          {locations} 
        </div>
      </div>
    );
  }

  render() {
    const authStatus = this.checkAuthStatus();
    const { loading } = this.props.locations;
    const content = this.renderLocations();
    return authStatus ? (
      <Body showHeader={true} loading={loading}>
        <div className="my-locations-root">
          {content}
        </div>
      </Body>
    ) : null;
  }
}

const MapStateToProps = (state) => {
  return {
    locations: state.Locations
  };
};

export default connect(MapStateToProps)(MyLocations);