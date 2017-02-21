import React from 'react';
import { reduxForm, change, reset } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import datetime from 'node-datetime'
import {SimpleSelect} from "react-selectize"
import { browserHistory } from 'react-router'
import {createFilter} from 'react-search-input';
import _ from 'lodash'

import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'
import {optionsSelectize} from '../../../../common/components/options-selectize.js'

import {
  fetchBursarPermitPayment, 
  editBursarPermitPayment, 
  createBursarPermitPayment,  
  resetLoading} from '../../../../actions/actions-bursar-panel.jsx'

import {
  fetchTownshipParkingPermits,
  createTownshipParkingPermits,
  fetchTownshipPermitRequests, 
  editTownshipPermitRequests,
} from '../../../../actions/actions-township-panel.jsx'

import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

import {ajaxSelectizeGet, ajaxSelectizeFilteredGet, ajaxDelete, ajaxGet, ajaxPost} from '../../../../common/components/ajax-selectize.js'
import AdminSelectize from '../../../../common/components/admin-selectize.jsx'

export const fields = [ 
  'id',
  'date_expiry',
  'user_name',
  'permit_approved',
  'rate',
  'pay_method',
  'amount',
  'cashier_id',
  'user_id',
  'twnship_code',
  'twnshp_name',
  'permit_name',
  'permit_type',
  'scheme_type',
  'loc_code',
  'loc_name',
  'duration',
  'duration_period',
  'ip',
  'date_payment'
]

class BursarPanelPermitPaymentForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showEditDuplicateButtons: false,
      parkingLocationCode: null,
      showEditModal: false,
      rowData: null,
      permitData: null,
      permitRequestData: null,
      userData: null,
      selectizeOptions: {}
    }

    this.tempInputsEdit = this.tempInputsEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.selectizeOptionsUpdate = this.selectizeOptionsUpdate.bind(this);
  }

  handleSubmit(data) {
    
    $('#' + this.props.modalName).closeModal();
    $('#modal-success').openModal();
    ajaxPost('subscriptions', data);

    switch(this.props.submitType) {
      case "CREATE":
        this.props.createBursarPermitPayment(data);
        break;
      case "EDIT":
        this.props.editBursarPermitPayment(data, data.id);
        break;
      case "DUPLICATE":
        this.props.createBursarPermitPayment(data);
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
    ajaxSelectizeGet('permit_type', 'permit_type', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('user_profile', 'user_id', this.selectizeOptionsUpdate);
    ajaxSelectizeFilteredGet('parking_permits', 'permit_name', {'township_code': this.props.townshipCode}, this.selectizeOptionsUpdate);

    ajaxGet('parking_permits', (table) => {
      this.setState({permitData: table.data.resource});
    });
    ajaxGet('permit_subscription', (table) => {
      this.setState({permitRequestData: table.data.resource});
    });
    ajaxGet('user_profile', (table) => {
      this.setState({userData: table.data.resource});
    });
  }

  componentDidMount() {
    const {
      resetForm,
      submitting,
      dispatch
    } = this.props

    $('.date_expiry')
    .bootstrapMaterialDatePicker({ time: false, format : 'YYYY-MM-DD HH:mm:ss' })
    .on('change', function(event) {
      console.log(event.target.value);
      dispatch(change('permit-payment-form', 'date_expiry', event.target.value)); 
    });

    $('.date_payment')
    .bootstrapMaterialDatePicker({ time: false, format : 'YYYY-MM-DD HH:mm:ss' })
    .on('change', function(event) {
      console.log(event.target.value);
      dispatch(change('permit-payment-form', 'date_payment', event.target.value)); 
    });
  }

  componentDidUpdate() {
    if (this.props.bursarPermitPaymentEdited.isLoading) {
    } else if (!this.props.bursarPermitPaymentEdited.isLoading) {
      this.handleSuccess();
    }

    if (this.props.bursarPermitPaymentCreated.isLoading) {
    } else if (!this.props.bursarPermitPaymentEdited.isLoading) {
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

    const fields = [ 
        'user_name',
        'permit_approved',
        'rate',
        'pay_method',
        'user_id',
        'twnship_code',
        'twnshp_name',
        'permit_type',
        'scheme_type',
        'loc_code',
        'loc_name',
        'ip',
        'amount',
        'cashier_id',
        'duration',
        'duration_period',
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
                <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'permit_name'} 
                formName={'permit-payment-form'} 
                fieldName={'permit_name'}
                defaultData={this.props.rowData}
                dispatch={dispatch} 
                onChange={
                  (value) => {
                    let permitObject = _.filter(this.state.permitData, {
                      'permit_name': value, 
                      'township_code': this.props.townshipCode 
                    });
                    console.log(permitObject);
                    this.props.dispatch(change('permit-payment-form', 'permit_type', permitObject[0].permit_type));
                    this.props.dispatch(change('permit-payment-form', 'scheme_type', permitObject[0].scheme_type));
                    this.props.dispatch(change('permit-payment-form', 'twnship_code', permitObject[0].township_code));
                    this.props.dispatch(change('permit-payment-form', 'twnshp_name', permitObject[0].township_name));
                    this.props.dispatch(change('permit-payment-form', 'rate', permitObject[0].cost));
                  }
                }
                />

                <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'user_id'} 
                formName={'permit-payment-form'} 
                fieldName={'user_id'}
                defaultData={this.props.rowData}
                dispatch={dispatch} 
                onChange={
                  (value) => {
                    let permitRequestObject = _.filter(this.state.permitRequestData, {
                      'user_id': parseInt(value), 
                      'township_code': this.props.townshipCode 
                    });
                    let userObject = _.filter(this.state.userData, {
                      'user_id': parseInt(value)
                    });
                    if(permitRequestObject.length === 0) {
                      alert("Permit Subscription for this user doesn't exist.")
                    }

                    this.props.dispatch(change('permit-payment-form', 'ip', userObject[0].ip));
                    this.props.dispatch(change('permit-payment-form', 'user_name', parseInt(userObject[0].user_name)));
                    this.props.dispatch(change('permit-payment-form', 'permit_approved', permitRequestObject[0].approved));
                  }
                }
                />

                <div className="col s12 admin-form-input">
                  <div className="form-group">
                    <label htmlFor="date_expiry">date_expiry</label>
                    <input id="date_expiry" className="date_expiry" type="text"/>
                  </div>
                </div>
                <div className="col s12 admin-form-input">
                  <div className="form-group">
                    <label htmlFor="date_payment">date_payment</label>
                    <input id="date_payment" className="date_payment" type="text"/>
                  </div>
                </div>

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
    bursarPermitPaymentFetched: state.bursarPermitPaymentFetched,
    bursarPermitPaymentCreated: state.bursarPermitPaymentCreated,
    bursarPermitPaymentEdited: state.bursarPermitPaymentEdited,
    townshipParkingPermitsFetched: state.townshipParkingPermitsFetched,
    townshipParkingPermitsCreated: state.townshipParkingPermitsCreated,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchBursarPermitPayment, 
    editBursarPermitPayment, 
    createBursarPermitPayment, 

    fetchTownshipParkingPermits,
    createTownshipParkingPermits,
    fetchTownshipPermitRequests,
    editTownshipPermitRequests,

    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'permit-payment-form',
  fields,
  overwriteOnInitialValuesChange : true
})(BursarPanelPermitPaymentForm));