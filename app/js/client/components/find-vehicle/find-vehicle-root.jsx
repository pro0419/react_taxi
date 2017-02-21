import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import cookie from 'react-cookie';

import Body from "../../../common/components/body/body.jsx";

import { getParkedVehicles } from "../../actions/find-vehicle.js";

class FindVehicle extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if(!this.checkAuthStatus()) {
      window.location = "/";
    }
    const userId = cookie.load('userId');
    const { dispatch } = this.props;
    dispatch(getParkedVehicles(userId));
  }

  checkAuthStatus() {
    const userId = cookie.load('userId');
    if(userId) {
      return true;
    }
  }

  renderNotice() {
    const { errorMessage } = this.props.parkedVehicles;
    return errorMessage ? (
      <div className="alert alert-danger">
        {errorMessage}
      </div>
    ) : null;
  }

  renderParkedVehicle(vehicleData, index) {
    const { plate_no, pl_state, id } = vehicleData;
    const url = "/find-vehicle/" + id;
    return (
      <div className="col s12 plate" key={index}>
        <a href={url}>
          <div>License Plate #:{plate_no}</div>
          <div>State: {pl_state}</div>
        </a>
      </div>
    )
  }

  renderParkedVehicles() {
    const { parkedVehicleList } = this.props.parkedVehicles;
    //const parkedVehicleData = parkedVehicleList ? parkedVehicleList : [];
    const notice = this.renderNotice();
    const vehicles = parkedVehicleList.map(this.renderParkedVehicle);
    const noVehicleMessage = parkedVehicleList.length == 0 ? "No vehicles parked." : "";
    return (
      <div className="parked-vehicles-list">
        {notice}
        <h4>Select Vehicle</h4>
        <div className="row">
          {noVehicleMessage}
          {vehicles}
        </div>
      </div>
    );
  }

  render() {
    console.log(this.props);
    const authStatus = this.checkAuthStatus();
    const { loading } = this.props.parkedVehicles;
    const content = this.renderParkedVehicles();

    return authStatus ? (
      <Body showHeader={true} loading={loading}>
        <div className="parked-vehicle-list-root">
          {content}
        </div>
      </Body>
    ) : null;
  }
}

const MapStateToProps = (state) => {
  return {
    parkedVehicles: state.FindVehicle
  };
};

export default connect(MapStateToProps)(FindVehicle);