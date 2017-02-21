import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import cookie from 'react-cookie';

import Body from "../../../common/components/body/body.jsx";
import Plate from "./plate.jsx";
import { getVehicles } from "../../actions/vehicle.js";

class VehicleList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if(!this.checkAuthStatus()) {
      window.location = "/";
    }
    const userId = cookie.load('userId');
    const { dispatch } = this.props;
    dispatch(getVehicles(userId));
  }

  checkAuthStatus() {
    const userId = cookie.load('userId');
    if(userId) {
      return true;
    }
  }

  renderNotice() {
    const { errorMessage } = this.props.vehicles;
    return errorMessage ? (
      <div className="alert alert-danger">
        {errorMessage}
      </div>
    ) : null;
  }

  renderAddNewButton() {
    return (
      <div className="add-new-plate">
        <a className="waves-effect waves-light  btn-large" href="/new-vehicle">Add a Vehicle</a>
      </div>
    );
  }

  renderPlate(plateData, index) {
    const { plate_no, registered_state, id } = plateData;
    const url = "/edit-vehicle/" + id;
    return (
      <div className="col s12" key={index}>
        <a href={url}>
          <Plate number={plate_no} state={registered_state}/>
        </a>
      </div>
    )
  }

  renderPlates() {
    const { vehicleList } = this.props.vehicles;
    const platesData = vehicleList ? vehicleList.vehicles : [];
    const notice = this.renderNotice();
    const platesList = platesData.map(this.renderPlate);
    return (
      <div className="vehicles-list">
        {notice}
        <h4>My Vehicles</h4>
        <div className="row">
          {platesList} 
        </div>
      </div>
    );
  }

  render() {
    const authStatus = this.checkAuthStatus();
    const { loading } = this.props.vehicles;
    const content = this.renderPlates();
    const addNewBtn = this.renderAddNewButton();
    return authStatus ? (
      <Body showHeader={true} loading={loading}>
        <div className="vehicle-list-root">
          {content}
        </div>
        {addNewBtn}
      </Body>
    ) : null;
  }
}

const MapStateToProps = (state) => {
  return {
    vehicles: state.Vehicle
  };
};

export default connect(MapStateToProps)(VehicleList);