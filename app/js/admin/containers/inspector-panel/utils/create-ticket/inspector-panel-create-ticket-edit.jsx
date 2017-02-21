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
  fetchInspectorTicket, 
  editInspectorTicket, 
  createInspectorTicket, 
  fetchTownshipLocations, 
  resetLoading} from '../../../../actions/actions-inspector-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

export const fields = [   
  'id',
  'town_logo', 
  'plate_no',
  'violation_fee', 
  'violation_detail',  
  'respond_date',  
  'hearing_date',  
  'hearing_location',  
  'date_ticket', 
  'plead_guilty_no_guilty',  
  'v_user_name', 
  'address', 
  'email', 
  'phone', 
  'officer_name',  
  'officer_id',  
  'user_id', 
  'ticket_no', 
  'violation_code',  
  'violation_description', 
  'violation_location',  
  'court_id',  
  'hearing_address',
  'township_code', 
  'v_user_id', 
  'tkt_status',  
  'signature', 
  'penalty_adjustment',  
  'adjustment_reference',  
  'hearing_hour',  
  'hearing_time',  
  'am_pm', 
  'twp_payment', 
  'paid_amount', 
  'paid_date',
]

export default class InspectorPanelCreateTicketEdit extends React.Component {

  constructor(props) {
    super(props);

    this.tempInputsEdit = this.tempInputsEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleDuplicateSubmit = this.handleDuplicateSubmit.bind(this);
  }

  handleSubmit(data) {
    console.log(data.id)
    this.props.editInspectorTicket(data, data.id);
  }

  handleDuplicateSubmit(data) {
    this.props.createInspectorTicket(data);
  }

  componentDidUpdate() {
    if (this.props.inspectorTicketEdited.isLoading) {
      } else if (!this.props.inspectorTicketEdited.isLoading) {
        this.handleSuccess();
      }

    if (this.props.inspectorTicketCreated.isLoading) {
      } else if (!this.props.inspectorTicketEdited.isLoading) {
        this.handleSuccess();
      }
  };

  handleSuccess(){
    this.props.resetLoading();
    $('#modal-inspector-ticket-duplicate').closeModal();
    $('#modal-inspector-ticket-edit').closeModal();
    $('#modal-success').openModal();
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
        hearing_location,  
        date_ticket, 
        plead_guilty_no_guilty,  
        v_user_name, 
        address, 
        email, 
        phone, 
        officer_name,  
        officer_id,  
        user_id, 
        ticket_no, 
        violation_code,  
        violation_description, 
        violation_location,  
        court_id,  
        hearing_address, 
        township_code, 
        v_user_id, 
        tkt_status,  
        signature, 
        penalty_adjustment,  
        adjustment_reference,  
        hearing_hour,  
        hearing_time,  
        am_pm, 
        twp_payment, 
        paid_amount, 
        paid_date,
      },
      resetForm,
      submitting,
      dispatch
    } = this.props;

    
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

  tempInputsDuplicate(initialValues) {
     const {
      fields: {  
        id,
        town_logo, 
        plate_no,
        violation_fee, 
        violation_detail,  
        respond_date,  
        hearing_date,  
        hearing_location,  
        date_ticket, 
        plead_guilty_no_guilty,  
        v_user_name, 
        address, 
        email, 
        phone, 
        officer_name,  
        officer_id,  
        user_id, 
        ticket_no, 
        violation_code,  
        violation_description, 
        violation_location,  
        court_id,  
        hearing_address, 
        township_code, 
        v_user_id, 
        tkt_status,  
        signature, 
        penalty_adjustment,  
        adjustment_reference,  
        hearing_hour,  
        hearing_time,  
        am_pm, 
        twp_payment, 
        paid_amount, 
        paid_date,
      },
      resetForm,
      submitting,
      dispatch
    } = this.props;

    
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
    // onSubmit={this.props.handleSubmit(this.handleSubmit)}
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)} style={{margin: 0}}>
          <div id="modal-inspector-ticket-edit" className="modal modal-fixed-footer">
            <div className="modal-content">

              <div className="row">
                <div className="center-align">
                  <h4>Edit a Ticket</h4>
                  <p className="center-align">Edit a Ticket by filling out the fields.</p>
                </div>
              </div>

              <div className="row">

                {this.tempInputsEdit(this.props.initialValues)}

              </div>
            </div>
            

            <div className="modal-footer">
              <div className="row marginless-row">
                <div className="col s12 center-align">
                  <button fetchTownshipFacilitie
                  type="submit" 
                  disabled={submitting} 
                  className="waves-effect waves-light btn">Edit Ticket</button>
                </div>
              </div>
            </div>
          </div>
        </form>

        <form onSubmit={this.props.handleSubmit(this.handleDuplicateSubmit)} style={{margin: 0}}>
          <div id="modal-inspector-ticket-duplicate" className="modal modal-fixed-footer">
            <div className="modal-content">

              <div className="row">
                <div className="center-align">
                  <h4>Duplicate a Ticket</h4>
                  <p className="center-align">Duplicate a Ticket by filling out the fields.</p>
                </div>
              </div>

              <div className="row">
                {this.tempInputsDuplicate(this.props.initialValues)}
              </div>
            </div>
            

            <div className="modal-footer">
              <div className="row marginless-row">
                <div className="col s12 center-align">
                  <button 
                  type="submit" 
                  disabled={submitting} 
                  className="waves-effect waves-light btn">Duplicate Ticket</button>
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
    inspectorTicketFetched: state.inspectorTicketFetched,
    inspectorTicketCreated: state.inspectorTicketCreated,
    townshipLocationsFetched: state.townshipLocationsFetched,
    townshipSchemeTypesFetched: state.townshipSchemeTypesFetched,
    inspectorTicketEdited: state.inspectorTicketEdited,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchInspectorTicket,
    editInspectorTicket,
    fetchTownshipLocations,
    resetLoading,
    fetchTownshipSchemeTypes,
    createInspectorTicket
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'plate-edit',
  fields,
  overwriteOnInitialValuesChange : true
})(InspectorPanelCreateTicketEdit));