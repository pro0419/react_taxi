import React from 'react'
import { reduxForm, change } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import moment from 'moment'
import {SimpleSelect} from "react-selectize"

import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'
import {optionsSelectize} from '../../../../common/components/options-selectize.js'

import {fetchBursarParkingPayment, createBursarParkingPayment, resetLoading} from '../../../../actions/actions-bursar-panel.jsx'
import {fetchTownshipLocations} from '../../../../actions/actions-township-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'
import {ajaxSelectizeGet, ajaxDelete} from '../../../../common/components/ajax-selectize.js'
import AdminSelectize from '../../../../common/components/admin-selectize.jsx'
import BursarPanelParkingPaymentEdit from './bursar-panel-parking-payment-edit.jsx'

export const fields = [ 
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

class BursarPanelParkingPaymentForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit() {

  }

  componentWillMount() {


  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)} style={{margin: 0}}>
        <div id="modal-bursar-payment-create" className="modal modal-fixed-footer">
          <div className="modal-content">

            <div className="row">
              <div className="center-align">
                <h4>Create a Parking Payment</h4>
                <p className="center-align">Create a parking payment by filling out the fields.</p>
              </div>
            </div>

            <div className="row">

              <AdminSelectize 
                staticOptions={false}
                fieldData={this.props.fields}
                options={this.state.selectizeOptions}
                objectKey={'location_code'} 
                formName={'parking-payment'} 
                fieldName={'location_id'}
                dispatch={dispatch} 
              />

              <AdminSelectize 
                staticOptions={false}
                fieldData={this.props.fields}
                options={this.state.selectizeOptions}
                objectKey={'scheme_type'} 
                formName={'parking-payment'} 
                fieldName={'scheme_type'}
                dispatch={dispatch} 
              />

              <AdminSelectize 
                staticOptions={false}
                fieldData={this.props.fields}
                options={this.state.selectizeOptions}
                objectKey={'pay_method'} 
                formName={'parking-payment'} 
                fieldName={'pay_method'}
                dispatch={dispatch} 
              />

              <AdminSelectize 
                staticOptions={false}
                fieldData={this.props.fields}
                options={this.state.selectizeOptions}
                objectKey={'user_id'} 
                formName={'parking-payment'} 
                fieldName={'user_id'}
                dispatch={dispatch} 
              />

              <AdminSelectize 
                staticOptions={false}
                fieldData={this.props.fields}
                options={this.state.selectizeOptions}
                objectKey={'user_name'} 
                formName={'parking-payment'} 
                fieldName={'user_name'}
                dispatch={dispatch} 
              />

              <AdminSelectize 
                staticOptions={false}
                fieldData={this.props.fields}
                options={this.state.selectizeOptions}
                objectKey={'plate_no'} 
                formName={'parking-payment'} 
                fieldName={'vehicle_id'}
                dispatch={dispatch} 
              />

              <AdminSelectize 
                staticOptions={false}
                fieldData={this.props.fields}
                options={this.state.selectizeOptions}
                objectKey={'rate'} 
                formName={'parking-payment'} 
                fieldName={'rate'}
                dispatch={dispatch} 
              />

              {this.tempInputs()}

            </div>
          </div>
          

          <div className="modal-footer">
            <div className="row marginless-row">
              <div className="col s12 center-align">
                <button 
                type="submit" 
                disabled={submitting} 
                className="waves-effect waves-light btn">Create Parking Payment</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    bursarParkingPaymentFetched: state.bursarParkingPaymentFetched,
    bursarParkingPaymentCreated: state.bursarParkingPaymentCreated
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchBursarParkingPayment,
    fetchTownshipLocations,
    resetLoading,
    fetchTownshipSchemeTypes,
    createBursarParkingPayment
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'parking-payment',
  fields
})(BursarPanelParkingPayment));