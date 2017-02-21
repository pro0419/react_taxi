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
  fetchBursarTicketRates, 
  editBursarTicketRates, 
  createBursarTicketRates,  
  resetLoading} from '../../../../actions/actions-bursar-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

import { ajaxSelectizeGet, ajaxDelete } from '../../../../common/components/ajax-selectize.js'
import AdminSelectize from '../../../../common/components/admin-selectize.jsx'

export const fields = [ 
  'id',  
  'town_logo', 
  'plate_no',  
  'violation_fee', 
  'violation_detail',  
  'respond_date',  
  'hearing_date',  
  'hearing_time',  
  'tkt_status',  
  'violation_location',  
  'officer_id',  
  'v_user_name', 
  'address', 
  'user_id', 
  'court_id',  
  'signature', 
  'am_pm', 
  'twp_payment', 
  'penalty_adjustment', 
  'hearing_address', 
  'ticket_no', 
  'hearing_location',  
  'email', 
  'date_ticket', 
  'phone', 
  'violation_code',  
  'township_code', 
  'adjustment_reference',  
  'paid_amount', 
  'paid_date', 
  'hearing_hour',  
  'v_user_id', 
  'violation_description', 
  'officer_name',  
  'plead_guilty_no_guilty',
]

class BursarPanelTicketRatesForm extends React.Component {

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
    console.log(data);
    $('#' + this.props.modalName).closeModal();

    switch(this.props.submitType) {
      case "CREATE":
        this.props.createBursarTicketRates(data);
        break;
      case "EDIT":
        this.props.editBursarTicketRates(data, data.id);
        break;
      case "DUPLICATE":
        this.props.createBursarTicketRates(data);
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

    ajaxSelectizeGet('manage_locations', 'location_code', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('scheme_type', 'scheme_type', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('payment_type', 'pay_method', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('user_profile', 'user_id', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('user_profile', 'user_name', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('user_vehicles', 'plate_no', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('locations_rate', 'rate', this.selectizeOptionsUpdate);

  }

  componentDidUpdate() {
    if (this.props.bursarTicketRatesEdited.isLoading) {
      } else if (!this.props.bursarTicketRatesEdited.isLoading) {
        this.handleSuccess();
      }

    if (this.props.bursarTicketRatesCreated.isLoading) {
      } else if (!this.props.bursarTicketRatesEdited.isLoading) {
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
        town_logo, 
        plate_no,  
        violation_fee, 
        violation_detail,  
        respond_date,  
        hearing_date,  
        hearing_time,  
        tkt_status,  
        violation_location,  
        officer_id,  
        v_user_name, 
        address, 
        user_id, 
        court_id,  
        signature, 
        am_pm, 
        twp_payment, 
        penalty_adjustment, 
        hearing_address, 
        ticket_no, 
        hearing_location,  
        email, 
        date_ticket, 
        phone, 
        violation_code,  
        township_code, 
        adjustment_reference,  
        paid_amount, 
        paid_date, 
        hearing_hour,
        v_user_id, 
        violation_description, 
        officer_name,  
        plead_guilty_no_guilty,
      },
      resetForm,
      submitting,
      dispatch
    } = this.props;

    const fields = [ 
      'id',  
      'town_logo', 
      'plate_no',  
      'violation_fee', 
      'violation_detail',  
      'respond_date',  
      'hearing_date',  
      'hearing_time',  
      'tkt_status',  
      'violation_location',  
      'officer_id',  
      'v_user_name', 
      'address', 
      'user_id', 
      'court_id',  
      'signature', 
      'am_pm', 
      'twp_payment', 
      'penalty_adjustment', 
      'hearing_address', 
      'ticket_no', 
      'hearing_location',  
      'email', 
      'date_ticket', 
      'phone', 
      'violation_code',  
      'township_code', 
      'adjustment_reference',  
      'paid_amount', 
      'paid_date', 
      'hearing_hour',  
      'v_user_id', 
      'violation_description', 
      'officer_name',  
      'plead_guilty_no_guilty',
    ]

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
    bursarTicketRatesFetched: state.bursarTicketRatesFetched,
    bursarTicketRatesCreated: state.bursarTicketRatesCreated,
    bursarTicketRatesEdited: state.bursarTicketRatesEdited,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchBursarTicketRates, 
    editBursarTicketRates, 
    createBursarTicketRates, 
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'ticket-rates-form',
  fields,
  overwriteOnInitialValuesChange : true
})(BursarPanelTicketRatesForm));