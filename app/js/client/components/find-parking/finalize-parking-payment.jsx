import React, { Component, PropTypes } from "react";
import Body from "../../../common/components/body/body.jsx";

class ParkingPaymentSuccessful extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.refs["save-transaction-form"].submit();
  }

  renderForm() {
    const { query } = this.props.location;
    const { paymentId, token } = query;
    return (
      <form method="post" action="/api/confirm-parking" ref="save-transaction-form">
        <input type="hidden" name="paymentId" value={paymentId}/>
        <input type="hidden" name="token" value={token}/>
      </form>
    );
  }

  render() {
    const transactionForm = this.renderForm();
    return (
      <Body showHeader={false} loading={true}>
        <div className="payment-successful-root">
          {transactionForm}
        </div>
      </Body>
    );
  }
}

export default ParkingPaymentSuccessful;