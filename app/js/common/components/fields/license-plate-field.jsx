import React, { Component, PropTypes } from "react";
import classNames from "classnames";

import * as Texts from "../../constants/texts.js"

class LicensePlateField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorType: null
    };
  }

  setValue(val) {
    this.refs["license-plate"].value = val;
  }

  getValue() {
    return this.refs["license-plate"].value;
  }

  validate() {
    const licenseNumber = this.getValue();

    if(!licenseNumber) {
      this.setState({
        hasError: true,
        errorType: "EMPTY"
      });
      return false;
    }
    this.invalidate();
    return true;
  }

  invalidate() {
    this.setState({
      hasError: false,
      errorType: null
    });
  }

  render() {
    const { placeholder, className, ...otherProps } = this.props;
    const { hasError, errorType } = this.state;
    const parentClassNames = classNames({
      "has-error" : this.state.hasError
      },
      className
    );
    let errorText = "";
    if(hasError) {
      errorText =  Texts.EmptyLicensePlate;
    }

    return (
      <div className={parentClassNames}>
        <input
          type="text"
          ref="license-plate"
          className="form-control"
          placeholder={placeholder}
          {...otherProps}/>
        <div className="error-msg row">
          <i className="material-icons tiny">error</i> {errorText}
        </div>
       </div>
    );
  }
}

LicensePlateField.PropTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string
};

export default LicensePlateField;