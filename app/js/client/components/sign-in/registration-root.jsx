import React, { Component, PropTypes } from "react";
import Chooser from "../../../common/components/fields/select.jsx";
import { states } from "../../constants/states.js";

class Registration extends Component {
	constructor(props) {
    super(props);
  }

  validate() {
  	const mobile = this.refs.mobile.value;
  	const address = this.refs.address.value;
  	const city = this.refs.city.value;
  	const state = this.refs.state.getValue() ? this.refs.state.getValue().value : null;
  	const zip = this.refs.zip.value;

  	if(!mobile || !address || !city || !state || !zip) {
  		return false;
  	}

  	return true;
  }

  getUserInfo() {
  	const mobile = this.refs.mobile.value;
  	const address = this.refs.address.value;
  	const city = this.refs.city.value;
  	const state = this.refs.state.getValue().value;
  	const zip = this.refs.zip.value;

  	return {
  		mobile: mobile,
  		address: address,
  		city: city,
  		state: state,
  		zip: zip
  	}
  }

  renderError() {
  	return (
  		<div className="alert alert-danger">
  			Please fill through all fields, in order to continue.
  		</div>
  	);
  }

  render() {
  	const { hasError, onContinue } = this.props;
  	const errorMsg = hasError ? this.renderError() : null;
  	return (
  		<div className="row">
  			<h2>Contact Info</h2>
  			{errorMsg}
  			<div className="col s12">
  				<input type="number" placeholder="Mobile Phone #" ref="mobile" />
  				<div className="help-text">Required for Expiration and Renewal Notifications</div>
  			</div>
  			<div className="col s12">
  				<input type="text" placeholder="Street Address" ref="address" />
  			</div>
  			<div className="col s12">
  				<input type="text" placeholder="City" ref="city" />
  			</div>
  			<div className="col s6">
  				<Chooser 
	          options={states}
	          ref="select-state"
	          selectionEntity="a State"
	          placeholder="Select State" 
	          defaultValue={null}
	          onValueChange={null}
	          ref="state" />
  			</div>
  			<div className="col s6">
  				<input type="number" placeholder="Zip Code" ref="zip" />
  			</div>
  			<div className="col s12 continue-registration">
  				<a href="javascript:void(0)" onClick={onContinue}>Continue</a>
  			</div>
  		</div>
  	);
  }
}

Registration.PropTypes = {
	onContinue: PropTypes.onContinue,
	hasError: PropTypes.hasError
};

export default Registration;