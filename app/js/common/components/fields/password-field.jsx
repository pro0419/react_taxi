import React, { Component, PropTypes } from "react";
import classNames from "classnames";

import * as Texts from "../../constants/texts.js"

class PasswordField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorType: null
    };
  }

  getValue() {
    return this.refs.password.value;
  }

  validate() {
    const password = this.getValue();

    if(!password) {
      this.setState({
        hasError: true,
        errorType: "EMPTY"
      });
      return;
    }

    if(password.length < 6) {
      this.setState({
        hasError: true,
        errorType: "SHORT"
      });
      return;
    }
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
        "has-error": hasError,
        "input-field": true
      },
      className
    );
    let errorText = "";
    if(hasError) {
      errorText = errorType === "EMPTY" ? Texts.EmptyPassword : Texts.ShortPassword;
    }

    return (
      <div className={parentClassNames}>
        <input
          type="password"
          ref="password"
          placeholder={placeholder}
          {...otherProps}/>
        <div className="error-msg">
          <i className="material-icons tiny">error</i> {errorText}
        </div>
       </div>
    );
  }
}

PasswordField.PropTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string
};

export default PasswordField;