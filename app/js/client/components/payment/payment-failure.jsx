import React, { Component, PropTypes } from "react";
import Body from "../../../common/components/body/body.jsx";

import "./styles/payment-failure.scss";

class PaymentFailure extends Component {
  constructor(props) {
    super(props);
  }

  getErrorMessage() {
    const { query } = this.props.location;
    const { errorcode, paymentId } = query;
    let errMsg = "";
    switch (errorcode) {
      case "1010":
        errMsg = "We had a technical issue while redirecting you to paypal. Please try again after sometime.";
        break;
      case "1011":
        errMsg = "Your payment was successful but we were not able to record it with us. Please contact customer care with Payment Reference Number: "+paymentId;
        break;
      default:
        errMsg = "We had a problem with your payment. Please try again after sometime.";
    }
    return errMsg;
  }

  render() {
    const errMsg = this.getErrorMessage();
    return (
      <Body showHeader={true} loading={false}>
        <div className="payment-failure-root container row">
          <div className="col s12">
            <h4>Sorry!</h4>
            <p>{errMsg}</p>
          </div>
        </div>
      </Body>
    );
  }
}

export default PaymentFailure;