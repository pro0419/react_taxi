import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import cookie from 'react-cookie';
import { SimpleSelect } from "react-selectize";
import Body from "../../../common/components/body/body.jsx";
import GrayButton from "../../../common/components/button/gray-button.jsx";
import LicensePlateField from "../../../common/components/fields/license-plate-field.jsx";
import Chooser from "../../../common/components/fields/select.jsx";
import { addPlate, getVehicle, deleteVehicle } from "../../actions/vehicle.js";
import { states } from "../../constants/states.js";
import { statesHash } from "../../constants/states-hash.js";

class NewVehicleForm extends Component {
  constructor(props) {
    super(props);

    this.addVehicle = this.addVehicle.bind(this);
    this.onSkip = this.onSkip.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentWillMount() {
    if(!this.checkAuthStatus()) {
      window.location = "/";
    }
    const { dispatch } = this.props;
    if (this.props.vehicleId) {
      dispatch(getVehicle(this.props.vehicleId));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { plateId } = nextProps.vehicle;
    //const { state } = this.props.vehicle;

    if (this.props.vehicleId) {
      let selectedPlate = nextProps.vehicle.selectedPlate || null;
      let state = nextProps.vehicle.state || null;
      const stateName = statesHash[state];
      this.refs["license-number"].setValue(selectedPlate);
      this.refs["select-state"].setValue({
        "label": stateName,
        "value": state
      });
    }

    if(plateId) {
      window.location = "/my-vehicles";
    }
  }

  checkAuthStatus() {
    const userId = cookie.load('userId');
    if(userId) {
      return true;
    }
  }

  validateVehicle() {
    this.refs["license-number"].invalidate();
    this.refs["select-state"].invalidate();
    const isLicenseValid = this.refs["license-number"].validate();
    const isStateValid = this.refs["select-state"].validate();

    return isLicenseValid && isStateValid;
  }

  addVehicle() {
    const { dispatch, vehicleId } = this.props;
    const isValid = this.validateVehicle();
    if(isValid) {
      const licenseNo = this.refs["license-number"].getValue();
      const state = this.refs["select-state"].getValue();
      const licenseDetails = {
        plate_no: licenseNo,
        registered_state: state,
        user_id: cookie.load('userId'),
        id: vehicleId
      };
      dispatch(addPlate(licenseDetails));
    }
  }

  onSkip() {
    document.getElementsByClassName("hamburger-trigger")[0].click();
  }

  onDelete() {
    const { dispatch, vehicleId } = this.props;
    dispatch(deleteVehicle(vehicleId));
  }

  renderNotice() {
    const { errorMessage } = this.props.vehicle;
    return errorMessage ? (
      <div className="alert alert-danger">
        {errorMessage}
      </div>
    ) : null;
  }

  renderHeading() {
    const headingText = !this.props.vehicleId ?
      "Add a Vehicle" : "My Vehicle";
    return (
      <h1 className="my-vehicle-heading">{headingText}</h1>
    );
  }

  renderNewVehicleForm() {
    const heading = this.renderHeading();

    const stateObj = {
      "label": "STATE",
      "value": ""
    };

    return (
      <div>
        {heading}
        <form className="form-new-vehicle">
          <LicensePlateField
            ref="license-number"
            placeholder="LICENSE PLATE #"
            className="license-no"/>
          <Chooser 
            options={states}
            ref="select-state"
            selectionEntity="a State"
            defaultValue={stateObj}
            onValueChange={() => {}}
            placeholder="Select State" />
        </form>
      </div>
    );
  }

  renderSkipLink() {
    return (
      <div className="skip-link">
        <a href="javascript:void(0)" onClick={this.onSkip}>SKIP THIS</a>
      </div>
    );
  }

  renderDeleteLink() {
    return (
      <div className="skip-link">
        <a href="javascript:void(0)" onClick={this.onDelete}>Delete</a>
      </div>
    );
  }

  renderButtons() {
    const { vehicleId } = this.props;
    const link = vehicleId ? this.renderDeleteLink() : this.renderSkipLink();
    return (
      <div className="row new-vehicle-actions">
        <div className="col s6 left-btn">
          {link}
        </div>
        <div className="col s6 right-btn">
          <GrayButton onClick={this.addVehicle}>
            SAVE
          </GrayButton>
        </div>
      </div>
    );
  }

  renderNewVehicleContent() {
    const notice = this.renderNotice();
    const newVehicleForm = this.renderNewVehicleForm();
    const btns = this.renderButtons();
    return (
      <div className="new-vehicle-content">
        {notice}
        {newVehicleForm}
        {btns}
      </div>
    );
  }

  render() {
    console.log(this.props.vehicle);
    const authStatus = this.checkAuthStatus();
    const { loading } = this.props.vehicle;
    const newVehicleContent = this.renderNewVehicleContent();
    return authStatus ? (
      <Body showHeader={true} loading={loading}>
        <div className="new-vehicle-root">
          {newVehicleContent}
        </div>
      </Body>
    ) : null;
  }
}

const MapStateToProps = (state) => {
  return {
    vehicle: state.Vehicle
  };
};

export default connect(MapStateToProps)(NewVehicleForm);