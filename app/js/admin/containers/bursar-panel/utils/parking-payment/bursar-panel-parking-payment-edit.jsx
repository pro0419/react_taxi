import React from 'react'
import { reduxForm, change } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import moment from 'moment'
import {SimpleSelect} from "react-selectize"

import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'
import {optionsSelectize} from '../../../../common/components/options-selectize.js'

import {fetchBursarParkingPayment, createBursarParkingPayment, editBursarParkingPayment, resetLoading} from '../../../../actions/actions-bursar-panel.jsx'
import {fetchTownshipLocations} from '../../../../actions/actions-township-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'
import {ajaxSelectizeGet, ajaxDelete} from '../../../../common/components/ajax-selectize.js'
import AdminSelectize from '../../../../common/components/admin-selectize.jsx'

export const fields = [ 
  'id',
  'vehicle_id',
  'user_name',
  'date',
  'location_id',
  'scheme_type',
  'rate',
  'pay_method',
  'amount',
  'cashier_id',
  'user_id',
]


class BursarPanelParkingPaymentEdit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showEditDuplicateButtons: false,
      parkingLocationCode: null,
      showEditModal: false,
      rowData: null,
      selectizeOptions: {}
    }

    this.tempInputs = this.tempInputs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleDuplicateSubmit = this.handleDuplicateSubmit.bind(this);
    this.selectizeOptionsUpdate = this.selectizeOptionsUpdate.bind(this);
  }

  componentWillMount() {
    console.log(this.props.rowData)
    ajaxSelectizeGet('manage_locations', 'location_code', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('scheme_type', 'scheme_type', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('payment_type', 'pay_method', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('user_profile', 'user_id', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('user_profile', 'user_name', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('user_vehicles', 'plate_no', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('locations_rate', 'rate', this.selectizeOptionsUpdate);
    this.props.dispatch(change('parking-payment', 'date', moment().format('YYYY-MM-DD HH:mm:ss')));
  }

  selectizeOptionsUpdate(valueName, keyName) {
    var optionsDataObject = {[keyName]: valueName};
    Object.assign(this.state.selectizeOptions, optionsDataObject);
    this.forceUpdate();
  }


  handleSubmit(data) {
    console.log(data)
    this.props.editBursarParkingPayment(data, data.id);
  }

  handleDuplicateSubmit(data) {
    this.props.createBursarParkingPayment(data);
  }

  componentDidUpdate() {
    if (this.props.bursarParkingPaymentEdited.isLoading) {
      } else if (!this.props.bursarParkingPaymentEdited.isLoading) {
        this.handleSuccess();
      }

    if (this.props.bursarParkingPaymentCreated.isLoading) {
      } else if (!this.props.bursarParkingPaymentEdited.isLoading) {
        this.handleSuccess();
      }
  };

  handleSuccess(){
    this.props.resetLoading();
    $('#modal-bursar-parking-payment-duplicate').closeModal();
    $('#modal-bursar-parking-payment-edit').closeModal();
    $('#modal-success').openModal();
    this.props.handleSuccess();
  }

  tempInputs() {

    const {
      fields: {
        id,
        vehicle_id,
        user_name,
        date,
        location_id,
        scheme_type,
        rate,
        pay_method,
        amount,
        cashier_id,
        user_id,
      },
      resetForm,
      submitting,
      dispatch
    } = this.props


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
          <div id="modal-bursar-parking-payment-edit" className="modal modal-fixed-footer">
            <div className="modal-content">

              <div className="row">
                <div className="center-align">
                  <h4>Edit a Parking Payment</h4>
                  <p className="center-align">Edit a Parking Payment by filling out the fields.</p>
                </div>
              </div>

              <div className="row">

                <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'location_code'} 
                formName={'parking-payment'} 
                fieldName={'location_id'}
                defaultData={this.props.rowData}
                dispatch={dispatch} />

                <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'scheme_type'} 
                formName={'parking-payment'} 
                fieldName={'scheme_type'}
                defaultData={this.props.rowData}
                dispatch={dispatch} />

                <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'pay_method'} 
                formName={'parking-payment'} 
                fieldName={'pay_method'}
                defaultData={this.props.rowData}
                dispatch={dispatch} />

                <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'user_id'} 
                formName={'parking-payment'} 
                fieldName={'user_id'}
                defaultData={this.props.rowData}
                dispatch={dispatch} />

                <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'user_name'} 
                formName={'parking-payment'} 
                fieldName={'user_name'}
                defaultData={this.props.rowData}
                dispatch={dispatch} />

                <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'plate_no'} 
                formName={'parking-payment'} 
                fieldName={'vehicle_id'}
                defaultData={this.props.rowData}
                dispatch={dispatch} />

                <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'rate'} 
                formName={'parking-payment'} 
                fieldName={'rate'}
                defaultData={this.props.rowData}
                dispatch={dispatch} />

                {this.tempInputs(this.props.initialValues)}


              </div>
            </div>
            

            <div className="modal-footer">
              <div className="row marginless-row">
                <div className="col s12 center-align">
                  <button fetchTownshipFacilitie
                  type="submit" 
                  disabled={submitting} 
                  className="waves-effect waves-light btn">Edit Payment</button>
                </div>
              </div>
            </div>
          </div>
        </form>

        <form onSubmit={this.props.handleSubmit(this.handleDuplicateSubmit)} style={{margin: 0}}>
          <div id="modal-bursar-parking-payment-duplicate" className="modal modal-fixed-footer">
            <div className="modal-content">

              <div className="row">
                <div className="center-align">
                  <h4>Duplicate a Payment</h4>
                  <p className="center-align">Duplicate a Payment by filling out the fields.</p>
                </div>
              </div>

              <div className="row">
                <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'location_code'} 
                formName={'parking-payment'} 
                fieldName={'location_id'}
                defaultData={this.props.rowData}
                dispatch={dispatch} />

                <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'scheme_type'} 
                formName={'parking-payment'} 
                fieldName={'scheme_type'}
                defaultData={this.props.rowData}
                dispatch={dispatch} />

                <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'pay_method'} 
                formName={'parking-payment'} 
                fieldName={'pay_method'}
                defaultData={this.props.rowData}
                dispatch={dispatch} />

                <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'user_id'} 
                formName={'parking-payment'} 
                fieldName={'user_id'}
                defaultData={this.props.rowData}
                dispatch={dispatch} />

                <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'user_name'} 
                formName={'parking-payment'} 
                fieldName={'user_name'}
                defaultData={this.props.rowData}
                dispatch={dispatch} />

                <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'plate_no'} 
                formName={'parking-payment'} 
                fieldName={'vehicle_id'}
                defaultData={this.props.rowData}
                dispatch={dispatch} />

                <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'rate'} 
                formName={'parking-payment'} 
                fieldName={'rate'}
                defaultData={this.props.rowData}
                dispatch={dispatch} />
                {this.tempInputs(this.props.initialValues)}
              </div>
            </div>
            

            <div className="modal-footer">
              <div className="row marginless-row">
                <div className="col s12 center-align">
                  <button 
                  type="submit" 
                  disabled={submitting} 
                  className="waves-effect waves-light btn">Duplicate Payment</button>
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
    bursarParkingPaymentFetched: state.bursarParkingPaymentFetched,
    bursarParkingPaymentCreated: state.bursarParkingPaymentCreated,
    townshipLocationsFetched: state.townshipLocationsFetched,
    townshipSchemeTypesFetched: state.townshipSchemeTypesFetched,
    bursarParkingPaymentEdited: state.bursarParkingPaymentEdited,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    editBursarParkingPayment,
    createBursarParkingPayment,
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'parking-payment-edit',
  fields,
  overwriteOnInitialValuesChange : true
})(BursarPanelParkingPaymentEdit));


//{this.tempInputsEdit(this.props.initialValues)}