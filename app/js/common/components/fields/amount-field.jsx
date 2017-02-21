import React, { Component, PropTypes } from "react";
import classNames from "classnames";

import { amountRegEx } from "../../constants/regex.js";
import * as Texts from "../../constants/texts.js"

class AmountField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorType: null
    };
  }

  getValue() {
    return this.refs.amount.value;
  }

  validate() {
    const amount = this.getValue();

    if( !amount ) {
      this.setState({
        hasError: true,
        errorType: "EMPTY"
      });
      return false;
    }

    if(!amountRegEx.test(amount)) {
      this.setState({
        hasError: true,
        errorType: "INVALID"
      });
      return false;
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
    const inputStyle = {
      width: '70%'
    };
    let errorText = "";
    if(hasError) {
      errorText = errorType === "EMPTY" ? Texts.EmptyAmount : Texts.InvalidAmount;
    }

    return (
      <div className={parentClassNames}>
        <div>
          <span>$ </span>
          <input
            type="text"
            ref="amount"
            name="amount"
            autosuggest="false"
            placeholder={placeholder}
            style={inputStyle}
            {...otherProps}/>
        </div>
        <div className="error-msg row">
          <i className="material-icons tiny">error</i> {errorText}
        </div>
      </div> 
    );
  }
}

AmountField.PropTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string
};

export default AmountField;