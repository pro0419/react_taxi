import React, { Component, PropTypes } from "react";
import classNames from "classnames";

import { emailRegEx } from "../../constants/regex.js";
import * as Texts from "../../constants/texts.js"

class EmailField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorType: null
    };
  }

  getValue() {
    return this.refs.email.value;
  }

  validate() {
    const email = this.getValue();

    if(!email) {
      this.setState({
        hasError: true,
        errorType: "EMPTY"
      });
      return;
    }

    if(!emailRegEx.test(email)) {
      this.setState({
        hasError: true,
        errorType: "INVALID"
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
        "input-field": true,
      },
      className
    );
    let errorText = "";
    if(hasError) {
      errorText = errorType === "EMPTY" ? Texts.EmptyEmail : Texts.InvalidEmail;
    }

    return (
      <div className={parentClassNames}>
        <input
          type="email"
          ref="email"
          placeholder={placeholder}
          {...otherProps}/>
        <div className="error-msg row">
          <i className="material-icons tiny">error</i> {errorText}
        </div>
      </div> 
    );
  }
}

EmailField.PropTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string
};

export default EmailField;