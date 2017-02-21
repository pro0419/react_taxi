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

class customColumnComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div onClick={() => this.props.metadata.customComponentMetadata.renderEditModal(
        this.props.rowData.id, 
        this.props.rowData)}>
        {this.props.data}
      </div>
    );
  }
}

customColumnComponent.defaultProps = { "data": {}, "renderEditModal": null};

class BursarPanelParkingPayment extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showEditDuplicateButtons: false,
      parkingLocationCode: null,
      showEditModal: false,
      rowData: null,
      selectizeOptions: {}
    }

    this.renderCreateModal = this.renderCreateModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.renderEditModal = this.renderEditModal.bind(this);
    this.selectizeOptionsUpdate = this.selectizeOptionsUpdate.bind(this);
  }

  selectizeOptionsUpdate(valueName, keyName) {
    var optionsDataObject = {[keyName]: valueName};
    Object.assign(this.state.selectizeOptions, optionsDataObject);
    this.forceUpdate();
  }

  componentWillMount() {

    this.props.fetchBursarParkingPayment();
    this.props.fetchTownshipSchemeTypes();
    this.props.fetchTownshipLocations(this.props.townshipCode);

    ajaxSelectizeGet('manage_locations', 'location_code', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('scheme_type', 'scheme_type', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('payment_type', 'pay_method', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('user_profile', 'user_id', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('user_profile', 'user_name', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('user_vehicles', 'plate_no', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('locations_rate', 'rate', this.selectizeOptionsUpdate);

    this.props.dispatch(change('parking-payment', 'date', moment().format('YYYY-MM-DD HH:mm:ss')));
  }

  componentDidUpdate() {
    if (this.props.bursarParkingPaymentCreated.isLoading) {
    } else if (!this.props.bursarParkingPaymentCreated.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess() {
    this.props.resetLoading();
    $('#modal-bursar-payment-create').closeModal();
    this.props.fetchBursarParkingPayment();
    this.setState({rowData: {}, showEditDuplicateButtons: false});
  }

  handleSubmit(data) {
    this.props.createBursarParkingPayment(data);
  }

  tempInputs() {

    const fields = [ 
      'amount',
      'cashier_id',
    ]
    const {dispatch} = this.props;

    return fields.map((data) => {
      return( 
        <div className="col s12 admin-form-input">
          <div className="form-group">
            <div></div>
            <input type="text" placeholder={data} onChange={(event) => 
              dispatch(change('parking-payment', data, event.target.value))
            }/>
          </div>
        </div>
      );
    });

  }


  renderCreateModal() {
    
    const {
      fields: {
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

    return(
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
                options={this.state.selectizeOptions}
                objectKey={'location_code'} 
                formName={'parking-payment'} 
                fieldName={'location_id'}
                dispatch={dispatch} 
              />
              <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'scheme_type'} 
                formName={'parking-payment'} 
                fieldName={'scheme_type'}
                dispatch={dispatch} 
              />
              <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'pay_method'} 
                formName={'parking-payment'} 
                fieldName={'pay_method'}
                dispatch={dispatch} 
              />
              <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'user_id'} 
                formName={'parking-payment'} 
                fieldName={'user_id'}
                dispatch={dispatch} 
              />
              <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'user_name'} 
                formName={'parking-payment'} 
                fieldName={'user_name'}
                dispatch={dispatch} 
              />
              <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'plate_no'} 
                formName={'parking-payment'} 
                fieldName={'vehicle_id'}
                dispatch={dispatch} 
              />
              <AdminSelectize 
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

  renderTable() {

    let parkingData = this.props.bursarParkingPaymentFetched.data.resource;
    var renderEditModal = this.renderEditModal;

    var metaDataFunction = () =>  {
      return fields.map((data) => {
        return(
          {
            "columnName": data,
            "customComponent": customColumnComponent,
            'customComponentMetadata': {
                'renderEditModal': renderEditModal
            }
          }
        );
      });
    }

    var columnMeta = metaDataFunction()

    return (
      <div>
        <Griddle
          tableClassName={'table table-bordered table-striped table-hover'}
          filterClassName={''}
          useGriddleStyles={false}
          results={parkingData}
          showFilter={true}
          showSettings={true}
          settingsToggleClassName='btn btn-default'
          useCustomPagerComponent={true}
          customPagerComponent={ BootstrapPager }
          useCustomFilterComponent={true} customFilterComponent={customFilterComponent}
          useCustomFilterer={true} customFilterer={customFilterFunction}
          columnMetadata={columnMeta}
        />

        <div className="divider"/> 

        <div className="center-align">
          <a
            className="modal-trigger waves-effect waves-light btn valign" 
            onClick={() => {$('#modal-bursar-payment-create').openModal() }}
            style={{margin: 10}}>Add New Parking Payment</a>
        </div>

      </div>
    );
  }

  renderEditModal(recordId, rowData) {
    window.scrollTo(0, document.body.scrollHeight);
    this.setState({showEditDuplicateButtons: true, rowData: rowData, showEditModal: true, parkingLocationCode: recordId})
  }

  renderEditDuplicateButtons(recordId) {

    return (
      <div className="container">
        <a
        style={{marginTop: 20}}
        onClick={() => {
          this.setState({showEditModal: true})
          $('#modal-bursar-parking-payment-edit').openModal(); 
        window.scrollTo(0, 0);}}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">edit</i>
          <h4> Edit - Parking Payment ID: {recordId} </h4>
        </a>
        <a
        onClick={() => {
          this.setState({showEditModal: true})
          $('#modal-bursar-parking-payment-duplicate').openModal(); 
        window.scrollTo(0, 0);}}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">content_copy</i>
          <h4> Duplicate - Parking Payment ID: {recordId} </h4>
        </a>
        <a
        onClick={() => $('#modal-delete').openModal() }
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">delete</i>
          <h4> Delete - Parking Payment ID: {recordId} </h4>
        </a>
        <div id="modal-delete" className="modal" style={{overflowX: "hidden"}}>
          <div className="modal-content">
            <h4>Delete</h4>
            <p>Are you sure you want to delete this record?</p>
          </div>
          <div className="modal-footer">
            <div className="row marginless-row">
              <div className="col s6 left">
                <button 
                  href="#" 
                  className=" modal-action modal-close waves-effect waves-green btn-flat">Close</button>
              </div>
              <div className="col s3">
                <a className="waves-effect waves-light btn btn-red" 
                onClick={() => {
                  $('#modal-delete').closeModal()
                }}>No</a>
              </div>
              <div className="col s3">
                <a className="waves-effect waves-light btn btn-green" 
                onClick={() => {
                  $('#modal-delete').closeModal()
                  ajaxDelete('pay_for_parking', recordId, this.handleSuccess);
                  this.setState({showEditDuplicateButtons: false});
                  window.scrollTo(0, 0);
                }}>Yes</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="blue-body marginless-row">
        <Body showHeader={true}>
          <div className="row marginless-row" style={{marginTop: 40}}>
            <div className="col s12">
              <nav>
                <div className="nav-wrapper nav-admin z-depth-2">
                  <a className="brand-logo center">Parking Payment</a>
                </div>
              </nav>
               <div className="card">
                  <div className="township-userlist-container">
                    { this.props.bursarParkingPaymentFetched.isLoading ? 
                      <div className="center-align"> <Spinner /> </div> : this.renderTable()}
                  </div>
               </div>
            </div>
          </div>
        </Body>
        <div id="modal-success" className="modal">
          <div className="modal-content">
            <h4>Success!</h4>
            <p>You've successfully sent the request!</p>
          </div>
          <div className="modal-footer">
            <button 
            href="#" 
            className=" modal-action modal-close waves-effect waves-green btn-flat">Close</button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bursarParkingPaymentFetched: state.bursarParkingPaymentFetched,
    bursarParkingPaymentCreated: state.bursarParkingPaymentCreated,
    mapViewUpdated: state.mapViewUpdated
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchBursarParkingPayment,
    fetchTownshipLocations,
    resetLoading,
    fetchTownshipSchemeTypes,
    createBursarParkingPayment,
    
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'parking-payment',
  fields
})(BursarPanelParkingPayment));
