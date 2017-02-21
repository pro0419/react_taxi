import React from 'react';
import { reduxForm, change } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import datetime from 'node-datetime'
import {SimpleSelect} from "react-selectize"
import { browserHistory } from 'react-router'
import {createFilter} from 'react-search-input';

import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'
import {optionsSelectize} from '../../../../common/components/options-selectize.js'

import {
  fetchBursarTicketPayment, 
  editBursarTicketPayment, 
  createBursarTicketPayment,  
  resetLoading} from '../../../../actions/actions-bursar-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

import {ajaxSelectizeGet, ajaxDelete} from '../../../../common/components/ajax-selectize.js'
import AdminSelectize from '../../../../common/components/admin-selectize.jsx'
import axios from 'axios'

export const fields = [ 
  'id',
  'ip',
  'ticket_no',
  'plate_num',
  'user_id',
  'address',
  'email',
  'paypal_total',
  'violation_charge',
  'violation_details',
  'violation_location',
  'pld_guilty',
  'penalty_adjustment',
  'adjust_rfchange',
  'new_amt_due',
  'pmt_status',
  'ticket_status',
  'pmt_options',
  'ipn_txn_id',
  'ipn_payment',
  'tr_percentage',
  'ipn_address',
  'wallet_balance',
  'township_code',
  'twp_payment',
  'ipn_status',
  'adjust_ref',
  'phone',
  'paid_date',
  'ipn_custom',
  'penalty_change',
  'date_payment',
  'tr_fee',
  'cheque_details',
  'cheque_date',
  'violation_date',
  'cheque_no',
]

class BursarPanelTicketPaymentForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showEditDuplicateButtons: false,
      parkingLocationCode: null,
      showEditModal: false,
      rowData: null,
      selectizeOptions: {}
    }

    this.tempInputsEdit = this.tempInputsEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.selectizeOptionsUpdate = this.selectizeOptionsUpdate.bind(this);
  }

  handleSubmit(data) {
    
    $('#' + this.props.modalName).closeModal();

    switch(this.props.submitType) {
      case "CREATE":
        this.props.createBursarTicketPayment(data);
        break;
      case "EDIT":
        this.props.editBursarTicketPayment(data, data.id);
        break;
      case "DUPLICATE":
        this.props.createBursarTicketPayment(data);
        break;
      default:
        console.log("No valid submit type was provided.");
        break;
    }
  }


  selectizeOptionsUpdate(valueName, keyName) {
    var optionsDataObject = {[keyName]: valueName};
    Object.assign(this.state.selectizeOptions, optionsDataObject);
    this.forceUpdate();
  }

  componentWillMount() {
    ajaxSelectizeGet('user_profile', 'user_id', this.selectizeOptionsUpdate);
    this.props.dispatch(change('facilities-form', 'township_code', this.props.townshipCode));
  }

  componentDidUpdate() {
    if (this.props.bursarTicketPaymentEdited.isLoading) {
      } else if (!this.props.bursarTicketPaymentEdited.isLoading) {
        this.handleSuccess();
      }

    if (this.props.bursarTicketPaymentCreated.isLoading) {
      } else if (!this.props.bursarTicketPaymentEdited.isLoading) {
        this.handleSuccess();
      }
  };

  handleSuccess(){
    this.props.resetLoading();
    this.props.handleSuccess();
  }

  tempInputsEdit(initialValues) {
     const {
      fields: {  
        id,
        date_expiry,
        user_name,
        permit_approved,
        rate,
        pay_method,
        amount,
        cashier_id,
        user_id,
        twnship_code,
        twnshp_name,
        permit_name,
        permit_type,
        scheme_type,
        loc_code,
        loc_name,
        duration,
        duration_period,
        ip,
        date_payment
      },
      resetForm,
      submitting,
      dispatch
    } = this.props;

    let fields = [ 
      'ip',
      'ticket_no',
      'plate_num',
      'address',
      'email',
      'paypal_total',
      'violation_charge',
      'violation_details',
      'violation_location',
      'pld_guilty',
      'penalty_adjustment',
      'adjust_rfchange',
      'new_amt_due',
      'pmt_status',
      'ticket_status',
      'pmt_options',
      'ipn_txn_id',
      'ipn_payment',
      'tr_percentage',
      'ipn_address',
      'wallet_balance',
      'township_code',
      'twp_payment',
      'ipn_status',
      'adjust_ref',
      'phone',
      'paid_date',
      'ipn_custom',
      'penalty_change',
      'date_payment',
      'tr_fee',
      'cheque_details',
      'cheque_date',
      'violation_date',
      'cheque_no',
    ]

    if (this.props.fieldTemplate !== null && this.props.fieldTemplate !== undefined) {
      fields = this.props.fieldTemplate;
    }

    return fields.map((data) => {
      return( 
        <div className="col s12 admin-form-input">
          <div className="form-group">
            <div></div>
            <input type="text" placeholder={data} {...this.props.fields[data]}/>
          </div>
        </div>
      );
    }); 
  }

  render() {

    const {
      resetForm,
      submitting,
      dispatch
    } = this.props

    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)} style={{margin: 0}}>
          <div id={this.props.modalName} className="modal modal-fixed-footer admin-parking-modal">
            <nav>
							<div className="nav-wrapper nav-admin">
								<a className="brand-logo center">{this.props.modalText}</a>
								<i 
								className="material-icons right right-align clickable" 
								style={{marginRight: 15, lineHeight: "55px"}}
								onClick={() => {
									$('#' + this.props.modalName).closeModal();
								}}>close</i>
							</div>
						</nav>
            <div className="modal-content">

              <div className="row">
                <div className="center-align">
                  <h4>{this.props.modalText}</h4>
                  <p className="center-align">{this.props.modalText} by filling out the fields.</p>
                </div>
              </div>

              <div className="row">
                <AdminSelectize 
                  staticOptions={false}
									options={this.state.selectizeOptions}
									objectKey={'user_id'} 
                  fieldName={'User ID'}
									formName={'ticket-payment-form'} 
									fieldData={this.props.fields}
									dispatch={dispatch} 
								/>
                {this.tempInputsEdit(this.props.initialValues)}

              </div>
            </div>
            

            <div className="modal-footer">
              <div className="row marginless-row">
                <div className="col s12 center-align">
                  <button 
                  type="submit" 
                  disabled={submitting} 
                  className="waves-effect waves-light btn">{this.props.modalText}</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bursarTicketPaymentFetched: state.bursarTicketPaymentFetched,
    bursarTicketPaymentCreated: state.bursarTicketPaymentCreated,
    bursarTicketPaymentEdited: state.bursarTicketPaymentEdited,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchBursarTicketPayment, 
    editBursarTicketPayment, 
    createBursarTicketPayment, 
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'ticket-payment-form',
  fields,
  overwriteOnInitialValuesChange : true
})(BursarPanelTicketPaymentForm));