import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import cookie from "react-cookie";
import moment from "moment";

import Body from "../../../common/components/body/body.jsx";
import AmountField from "../../../common/components/fields/amount-field.jsx";
import { getWalletTransactions, setLoading } from "../../actions/wallet.js";

class MyWallet extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if(!this.checkAuthStatus()) {
      window.location = "/";
    }
    const userId = cookie.load('userId');
    const { dispatch } = this.props;
    dispatch(getWalletTransactions(userId));
  }

  checkAuthStatus() {
    const userId = cookie.load('userId');
    if(userId) {
      return true;
    }
  }

  openModal(e) {
    e.preventDefault();
    $(this.refs["add-funds-modal"]).openModal();
  }

  closeModal(e) {
    e.preventDefault();
    $(this.refs["add-funds-modal"]).closeModal();
  }

  addPaypalFunds() {
    const { dispatch } = this.props;
    const isValid = this.refs["amount-field"].validate();
    if (isValid) {
      const amount = this.refs["amount-field"].getValue();
      dispatch(setLoading(true));
      this.refs["add-funds-form"].submit();
    }
  }

  renderNotice() {
    const { errorMessage } = this.props.wallet;
    return errorMessage ? (
      <div className="alert alert-danger">
        {errorMessage}
      </div>
    ) : null;
  }

  renderModal() {
    const userId = cookie.load('userId');
    const { transactionsList } = this.props.wallet;
    let current_balance = 0;
    if(transactionsList.length > 0) {
      current_balance = transactionsList[0].new_balance;
    }

    return (
      <div className="modal modal-fixed-footer add-funds-modal" ref="add-funds-modal">
        <form method="post" action="/api/add-funds" ref="add-funds-form">
          <div className="modal-content">
            <div>
              <AmountField
                placeholder="Amount - e.g. 45.00"
                ref="amount-field"/>
            </div>
            <input type="hidden" name="userId" value={userId}/>
            <input type="hidden" name="currentBalance" value={current_balance}/>
          </div>
          <div className="modal-footer">
            <a href="javascript:void(0)"
              onClick={this.addPaypalFunds.bind(this)}
              className="waves-effect waves-green btn btn-flat">
                Add Funds
            </a>

            <a href="javascript:void(0)"
              onClick={this.closeModal.bind(this)}
              className="modal-action modal-close waves-effect waves-green btn-flat">
                Cancel
            </a>
          </div>
        </form>
      </div>
    );
  }

  renderAddFundsButton() {
    return (
      <div className="add-funds">
        <a
          className="waves-effect waves-light  btn-large"
          href=""
          onClick={this.openModal.bind(this)}>
            Add Funds
        </a>
      </div>
    );
  }

  renderTransaction(transactionData, index) {
    const { date_time, last_paid_amt, paid_date, add_amt } = transactionData;
    const paymentDate = paid_date ? paid_date : date_time;
    const paidDate = moment(paymentDate).format("M-DD-YYYY");
    const amt = last_paid_amt || add_amt;
    const amt_tmp = parseFloat(amt).toFixed(2);
    // const amt_tmp = parseFloat(amt).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    const purpose = last_paid_amt ? "Parking Payment" : "Added Funds";
    const sign = last_paid_amt ? "-": "+";
    const zero = amt ? amt_tmp: "0.00";
    return (
      <div className="row" key={index}>
        <div className="col s4">
          {paidDate}
        </div>
        <div className="col s5">
          {purpose}
        </div>
        <div className="col s3">
         {sign} &#36; {zero}
        </div>
      </div>
    );
  }

  renderTransactions() {
    const { transactionsList } = this.props.wallet;
    let current_balance = 0;
    if(transactionsList.length > 0) {
      current_balance = transactionsList[0].new_balance;
    }
    const notice = this.renderNotice();
    const transactions = transactionsList.map(this.renderTransaction);
    return (
      <div className="transactions-list">
        {notice}
        <h4>Wallet Balance</h4>
        <div className="balance-amt">
          &#36; {current_balance} 
        </div>
        <div className="transaction-title">
          Transaction History
        </div>
        <div className="transaction-grid">
          {transactions}
        </div>
      </div>
    );
  }

  render() {
    const authStatus = this.checkAuthStatus();
    const { loading } = this.props.wallet;
    const content = this.renderTransactions();
    const addFundsBtn = this.renderAddFundsButton();
    const modalData = this.renderModal();
    return authStatus ? (
      <Body showHeader={true} loading={loading}>
        <div className="my-wallet-root">
          {content}
        </div>
        {addFundsBtn}
        {modalData}
      </Body>
    ) : null;
  }
}

const MapStateToProps = (state) => {
  return {
    wallet: state.Wallet
  };
};

export default connect(MapStateToProps)(MyWallet);