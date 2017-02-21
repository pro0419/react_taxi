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
  fetchInspectorParkingField, 
  editInspectorParkingField, 
  createInspectorParkingField, 
  fetchTownshipLocations, 
  resetLoading} from '../../../../actions/actions-inspector-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

import {ajaxSelectizeGet, ajaxDelete} from '../../../../common/components/ajax-selectize.js'
import AdminSelectize from '../../../../common/components/admin-selectize.jsx'



export const fields = [   
  'id',
  'parking_type',
  'township_code',
  'location_code',
  'entry_date_time',
  'exit_date_time',
  'expiry_time',
  'max_time',
  'user_id',
  'permit_id',
  'subscription_id',
  'plate_no',
  'pl_state',
  'lat',
  'lng',
  'address1',
  'address2',
  'city',
  'state',
  'zip',
  'country',
  'lot_row',
  'lot_number',
  'ip',
  'parking_token',
  'parking_status',
  'payment_method',
  'parking_rate',
  'parking_units',
  'parking_qty',
  'parking_subtotal',
  'wallet_trx_id',
  'tr_percent',
  'tr_fee',
  'parking_total',
  'ipn_custom',
  'ipn_txn_id',
  'ipn_payment',
  'ipn_status',
  'ipn_address',
]

class InspectorPanelParkingFieldEdit extends React.Component {

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
    this.handleDuplicateSubmit = this.handleDuplicateSubmit.bind(this);
    this.selectizeOptionsUpdate = this.selectizeOptionsUpdate.bind(this);
  }

  handleSubmit(data) {

    $('#' + this.props.modalName).closeModal();
    $('#modal-success').openModal();
    switch(this.props.submitType) {
      case "CREATE":
        this.props.createInspectorParkingField(data);
        break;
      case "EDIT":
        this.props.editInspectorParkingField(data, data.id);
        break;
      case "DUPLICATE":
        this.props.createInspectorParkingField(data);
        break;
      default:
        console.log("No valid submit type was provided.")
        break;
    }
  }

  handleDuplicateSubmit(data) {
    
  }

  selectizeOptionsUpdate(valueName, keyName) {
    var optionsDataObject = {[keyName]: valueName};
    Object.assign(this.state.selectizeOptions, optionsDataObject);
    this.forceUpdate();
  }

  componentWillMount() {
    ajaxSelectizeGet('payment_type', 'pay_method', this.selectizeOptionsUpdate);
    this.props.dispatch(change('parking-field-form', 'township_code', this.props.townshipCode));
  }

  componentDidUpdate() {
    if (this.props.inspectorParkingFieldEdited.isLoading) {
      } else if (!this.props.inspectorParkingFieldEdited.isLoading) {
        this.handleSuccess();
      }

    if (this.props.inspectorParkingFieldCreated.isLoading) {
      } else if (!this.props.inspectorParkingFieldEdited.isLoading) {
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
        parking_type,
        township_code,
        location_code,
        entry_date_time,
        exit_date_time,
        expiry_time,
        max_time,
        user_id,
        permit_id,
        subscription_id,
        plate_no,
        pl_state,
        lat,
        lng,
        address1,
        address2,
        city,
        state,
        zip,
        country,
        lot_row,
        lot_number,
        ip,
        parking_token,
        parking_status,
        payment_method,
        parking_rate,
        parking_units,
        parking_qty,
        parking_subtotal,
        wallet_trx_id,
        tr_percent,
        tr_fee,
        parking_total,
        ipn_custom,
        ipn_txn_id,
        ipn_payment,
        ipn_status,
        ipn_address,
      },
      resetForm,
      submitting,
      dispatch
    } = this.props;

    const fields = [   
      'parking_type',
      'location_code',
      'entry_date_time',
      'exit_date_time',
      'expiry_time',
      'max_time',
      'user_id',
      'permit_id',
      'subscription_id',
      'plate_no',
      'pl_state',
      'lat',
      'lng',
      'address1',
      'address2',
      'city',
      'zip',
      'lot_row',
      'lot_number',
      'ip',
      'parking_token',
      'parking_status',
      'payment_method',
      'parking_rate',
      'parking_units',
      'parking_qty',
      'parking_subtotal',
      'wallet_trx_id',
      'tr_percent',
      'tr_fee',
      'parking_total',
      'ipn_custom',
      'ipn_txn_id',
      'ipn_payment',
      'ipn_status',
      'ipn_address',
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

    const countriesList = countries.map((data) => {
      return {label: data, value: data}
    })
    const statesList = states.map((data) => {
      return {label: data, value: data}
    })

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
									options={countriesList}
									objectKey={'country'} 
                  fieldName={'Country'}
									formName={'parking-field-form'} 
									fieldData={this.props.fields}
									dispatch={dispatch}
								/>
                <AdminSelectize 
                  staticOptions={true}
									options={statesList}
									objectKey={'state'} 
                  fieldName={'State'}
									formName={'parking-field-form'} 
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
    inspectorParkingFieldFetched: state.inspectorParkingFieldFetched,
    inspectorParkingFieldCreated: state.inspectorParkingFieldCreated,
    townshipLocationsFetched: state.townshipLocationsFetched,
    townshipSchemeTypesFetched: state.townshipSchemeTypesFetched,
    inspectorParkingFieldEdited: state.inspectorParkingFieldEdited,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchInspectorParkingField,
    editInspectorParkingField,
    fetchTownshipLocations,
    resetLoading,
    fetchTownshipSchemeTypes,
    createInspectorParkingField
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'parking-field-form',
  fields,
  overwriteOnInitialValuesChange : true
})(InspectorPanelParkingFieldEdit));