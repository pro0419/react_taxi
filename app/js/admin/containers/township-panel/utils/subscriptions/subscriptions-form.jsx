import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { reduxForm, change } from 'redux-form'

import {SimpleSelect} from 'react-selectize'

import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'
import {fetchTownshipList} from '../../../../actions/actions-township.js';

import Spinner from '../../../../common/components/spinner.jsx';
import {optionsSelectize} from '../../../../common/components/options-selectize.js';

import Griddle from 'griddle-react'
import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'
import {ajaxSelectizeGet, ajaxSelectizeFilteredGet, ajaxDelete, ajaxGet, ajaxPost, ajaxPut} from '../../../../common/components/ajax-selectize.js'
import AdminSelectize from '../../../../common/components/admin-selectize.jsx'

const fields = [ 
  'id',
  'date_time',
  'user_name',
  'township_name',
  'location_code',
  'location_name',
  'bill_date',
  'expiry_date',
  'permit_name',
  'rate',
  'ipn_custom_element',
  'ipn_custom_value',
  'ipn_txn_id',
  'ipn_payment',
  'ipn_status',
  'ipn_address',
  'user_id',
  'ip',
  'paypal_logo',
  'logo_paypal',
  'township_code',
  'scheme_type',
  'permit_type',
  'duration',
  'duration_period',
  'permit_status',
  'expired',
]

class SubscriptionsForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showEditDuplicateButtons: false,
      parkingLocationCode: null,
      showEditModal: false,
      rowData: null,
      subscriptionData: null,
      subEdited: false,
      subDuplicated: true,
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
        ajaxPost('subscriptions', data, this.handleSuccess)
        break;
      case "EDIT":
        console.log(data)
        ajaxPut('subscriptions', data.id, data, this.handleSuccess)
        break;
      case "DUPLICATE":
        ajaxPost('subscriptions', data, this.handleSuccess)
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
    ajaxSelectizeGet('manage_locations', 'location_name', this.selectizeOptionsUpdate);
    
    this.props.dispatch(change('subscriptions-form', 'date_time', moment().format('YYYY-MM-DD HH:mm:ss')));
    ajaxGet('subscriptions', (table) => {
      this.setState({subscriptionData: table.data.resource});
    });
  }

  componentDidMount() {
    const {
      resetForm,
      submitting,
      dispatch
    } = this.props

    $('.date_time')
    .bootstrapMaterialDatePicker({ time: true, format : 'YYYY-MM-DD HH:mm:ss' })
    .on('change', function(event) {
      dispatch(change('facilities-form', 'date_time', event.target.value)); 
    });
  }


  handleSuccess(){
    this.props.handleSuccess();
  }

  tempInputsEdit(initialValues) {
     const {
      fields: {   
        date_time, 
        township_code, 
        dd,  
        location_name, 
        location_type, 
        full_address,  
        intersect_road1, 
        intersect_road2, 
        rows,  
        lots_per_rows, 
        total_lots,  
        parking_rate,  
        show_location, 
        country, 
        ff,  
        location_code, 
        state,
      },
      resetForm,
      submitting,
      dispatch
    } = this.props;

    const fields = [ 
      'date_time',
      'user_name',
      'township_name',
      'bill_date',
      'expiry_date',
      'permit_name',
      'rate',
      'ipn_custom_element',
      'ipn_custom_value',
      'ipn_txn_id',
      'ipn_payment',
      'ipn_status',
      'ipn_address',
      'user_id',
      'ip',
      'paypal_logo',
      'logo_paypal',
      'township_code',
      'scheme_type',
      'permit_type',
      'duration',
      'duration_period',
      'permit_status',
      'expired',
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
              staticOptions={false}
              fieldData={this.props.fields}
              options={this.state.selectizeOptions}
                  objectKey={'location_code'} 
                  formName={'subscriptions-form'} 
                  fieldName={'location_code'}
                  defaultData={this.props.rowData}
                  dispatch={dispatch} 
                />

                <AdminSelectize 
              staticOptions={false}
              fieldData={this.props.fields}
              options={this.state.selectizeOptions}
                  objectKey={'location_name'} 
                  formName={'subscriptions-form'} 
                  fieldName={'location_name'}
                  defaultData={this.props.rowData}
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
                  className="waves-effect waves-light btn valign">{this.props.modalText}</button>
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
  form: 'subscriptions-form',
  fields,
  overwriteOnInitialValuesChange : true
})(SubscriptionsForm));