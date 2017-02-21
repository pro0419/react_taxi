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

import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

import {ajaxSelectizeGet, ajaxDelete} from '../../../../common/components/ajax-selectize.js'
import AdminSelectize from '../../../../common/components/admin-selectize.jsx'
import moment from 'moment'
import axios from 'axios'

export const fields = [ 
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

const inputsCheck = [ 
      'twp_payment',
      'cheque_details',
      'cheque_date',
      'cheque_no',
      'new_amt_due',

      'township_code',
      'plate_num',
      'address',
      'phone',
      'email',

      'ticket_no',
      'violation_charge',
      'violation_details',
      'violation_location',
      'violation_date',
      'pld_guilty',
      'penalty_change',
      'penalty_adjustment',
      'adjust_rfchange',
      'adjust_ref',
]

const inputsCash = [ 
      'twp_payment',
      'new_amt_due',

      'township_code',
      'plate_num',
      'address',
      'phone',
      'email',

      'ticket_no',
      'violation_charge',
      'violation_details',
      'violation_location',
      'violation_date',
      'pld_guilty',
      'penalty_change',
      'penalty_adjustment',
      'adjust_rfchange',
      'adjust_ref',
]

class BursarPanelTicketCashForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showEditDuplicateButtons: false,
      parkingLocationCode: null,
      showEditModal: false,
      rowData: null,
      selectizeOptions: {},
      inputs: []
    }

    this.tempInputsEdit = this.tempInputsEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.selectizeOptionsUpdate = this.selectizeOptionsUpdate.bind(this);
  }

  handleSubmit(data) {
    console.log(data)
  }
  componentWillMount() {
    this.props.dispatch(change('ticket-cash-form', 'paid_date', moment().format('YYYY-MM-DD HH:mm:ss')));
  }

  selectizeOptionsUpdate(valueName, keyName) {
    var optionsDataObject = {[keyName]: valueName};
    Object.assign(this.state.selectizeOptions, optionsDataObject);
    this.forceUpdate();
  }

  handleSuccess(){
    this.props.resetLoading();
    this.props.handleSuccess();
  }

  tempInputsEdit(initialValues) {
     const {
      fields: {  
        ip,
        ticket_no,
        plate_num,
        address,
        email,
        paypal_total,
        violation_charge,
        violation_details,
        violation_location,
        pld_guilty,
        penalty_adjustment,
        adjust_rfchange,
        new_amt_due,
        pmt_status,
        ticket_status,
        pmt_options,
        ipn_txn_id,
        ipn_payment,
        tr_percentage,
        ipn_address,
        wallet_balance,
        township_code,
        twp_payment,
        ipn_status,
        adjust_ref,
        phone,
        paid_date,
        ipn_custom,
        penalty_change,
        date_payment,
        tr_fee,
        cheque_details,
        cheque_date,
        violation_date,
        cheque_no,
      },
      resetForm,
      submitting,
      dispatch
    } = this.props;

    return this.state.inputs.map((data) => {
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
                  staticOptions={true}
									options={[
                    {label: "Cash", value: "CASH"},		
                    {label: "Check", value: "CHECK"},	
                  ]}
									objectKey={'pmt_options'} 
                  fieldName={'Payment Options'}
									formName={'ticket-cash-form'} 
									fieldData={this.props.fields}
									dispatch={dispatch}
                  dispatchFunction={(data) => {
                    if(data.value === "CASH") {
                      this.setState({inputs: inputsCash})
                    } else if (data.value == "CHECK") {
                      this.setState({inputs: inputsCheck})
                    }
									}}
								/>
                {this.tempInputsEdit(this.props.initialValues)}
                {this.state.inputs.length > 0 ? 
                  <div>
                    <AdminSelectize 
                      staticOptions={true}
                      options={[
                        {label: "Paid", value: "PAID"},		
                        {label: "Unpaid", value: "UNPAID"},	
                      ]}
                      objectKey={'pmt_status'} 
                      fieldName={'Payment Status'}
                      formName={'ticket-cash-form'} 
                      fieldData={this.props.fields}
                      dispatch={dispatch}
                    />

                    <AdminSelectize 
                      staticOptions={true}
                      options={[
                        {label: "Open", value: "OPEN"},		
                        {label: "Closed", value: "CLOSED"},	
                      ]}
                      objectKey={'ticket_status'} 
                      fieldName={'Ticket Status'}
                      formName={'ticket-cash-form'} 
                      fieldData={this.props.fields}
                      dispatch={dispatch}
                    />
                  </div>
                      :
                  <div></div>
                }

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


export default connect()(reduxForm({
  form: 'ticket-cash-form',
  fields,
  overwriteOnInitialValuesChange : true
})(BursarPanelTicketCashForm));