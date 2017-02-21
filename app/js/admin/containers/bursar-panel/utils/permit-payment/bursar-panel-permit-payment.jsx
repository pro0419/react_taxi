import React from 'react'
import { reduxForm, change, reset } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import datetime from 'node-datetime'
import {SimpleSelect} from 'react-selectize'

import Body from '../../../../../common/components/body/body.jsx'
import Spinner from '../../../../common/components/spinner.jsx'
import {optionsSelectize} from '../../../../common/components/options-selectize.js'

import {fetchBursarPermitPayment, createBursarPermitPayment, resetLoading} from '../../../../actions/actions-bursar-panel.jsx'
import {fetchTownshipLocations} from '../../../../actions/actions-township-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

import BursarPanelPermitPaymentForm from './bursar-panel-permit-payment-form.jsx'
import customColumnComponent from '../../../../common/components/custom-column-component.jsx'
import {ajaxSelectizeGet, ajaxDelete} from '../../../../common/components/ajax-selectize.js'

export const fields = [ 
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


class BursarPanelPermitPayment extends React.Component {

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
  }

  componentWillMount() {
    this.props.fetchBursarPermitPayment();
    this.props.fetchTownshipSchemeTypes();
    this.props.fetchTownshipLocations(this.props.townshipCode);
  }

  componentDidUpdate() {
    if (this.props.bursarPermitPaymentCreated.isLoading) {
    } else if (!this.props.bursarPermitPaymentCreated.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess(){
    this.props.resetLoading();
    $('#modal-bursar-permit-create').closeModal();
    this.props.fetchBursarPermitPayment();
    this.setState({rowData: {}, showEditDuplicateButtons: false});
    $('#modal-success').openModal();
  }

  handleSubmit(data) {
    this.props.createBursarPermitPayment(data);
  }

  tempInputs() {
    const {dispatch} = this.props;

    return fields.map((data) => {
      return( 
        <div className="col s12 admin-form-input">
          <div className="form-group">
            <div></div>
            <input type="text" placeholder={data} onChange={(event) => 
              dispatch(change('permit-payment', data, event.target.value))
            }/>
          </div>
        </div>
      );
    });
  }

  renderCreateModal() {
    
    const {
      fields: {
        date_expiry,
        user_name,
        permit_approved,
        rate,
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
    } = this.props

    return(
      <BursarPanelPermitPaymentForm 
        modalName="modal-bursar-permit-create" 
        modalText="Create a Permit Payment" 
        townshipCode={this.props.townshipCode}
        submitType="CREATE"
        initialValues={null}
        editMode={false}
        handleSuccess={this.handleSuccess}
      />
    );

  }

  renderTable() {
    let permitsData = this.props.bursarPermitPaymentFetched.data.resource;

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
          results={permitsData}
          showFilter={true}
          showSettings={true}
          settingsToggleClassName='btn btn-default'
          useCustomPagerComponent={true}
          customPagerComponent={ BootstrapPager }
          columns={['id',
                    'date_expiry',
                    'user_name',
                    'permit_approved',
                    'rate',
                    'pay_method',
                    'amount',
                    'cashier_id',
                    'user_id']}
          useCustomFilterComponent={true} 
          customFilterComponent={customFilterComponent}
          useCustomFilterer={true} 
          customFilterer={customFilterFunction}
          columnMetadata={columnMeta}
        />
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
          $('#modal-bursar-permit-edit').openModal(); 
        window.scrollTo(0, 0);}}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">edit</i>
          <h4> Edit - Permit Payment ID: {recordId} </h4>
        </a>

        <a
        onClick={() => {
          this.setState({showEditModal: true})
          $('#modal-bursar-permit-duplicate').openModal(); 
        window.scrollTo(0, 0);}}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">content_copy</i>
          <h4> Duplicate - Permit Payment ID: {recordId} </h4>
        </a>

        <a
        onClick={() => $('#modal-delete').openModal() }
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">delete</i>
          <h4> Delete - Permit Payment ID: {recordId} </h4>
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
                  ajaxDelete('pay_for_permit', recordId, this.handleSuccess);
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
                  <a className="brand-logo center">Permit Payment</a>
                </div>
              </nav>
               <div className="card">
                  <div className="township-userlist-container">
                    { this.props.bursarPermitPaymentFetched.isLoading ? 
                      <div className="center-align"> <Spinner /> </div> : this.renderTable()}
                  </div>

                <div className="divider"/> 

                <div className="center-align">
                  <a
                    className="modal-trigger waves-effect waves-light btn valign" 
                    onClick={() => {
                      $('#modal-bursar-permit-create').openModal(); 
                    }}
                    style={{margin: 10}}>Add New Permit Payment</a>
                </div>
               </div>
               {this.state.showEditDuplicateButtons ? 
                this.renderEditDuplicateButtons(this.state.parkingLocationCode) : <div> </div>}
            </div>
          </div>
        </Body>
        { this.props.townshipLocationsFetched.isLoading ||
          this.props.townshipSchemeTypesFetched.isLoading ? 
          <div> </div> : this.renderCreateModal()}

        { 
          !this.state.showEditModal ?
          <div></div> : 
          <div>
            <BursarPanelPermitPaymentForm  
              initialValues={this.state.rowData} 
              handleSuccess={this.handleSuccess}
              modalName="modal-bursar-permit-edit" 
              modalText="Edit a Permit Payment" 
              submitType="EDIT"
              initialValues={this.state.rowData} 
              rowData={this.state.rowData}
              handleSuccess={this.handleSuccess}
              />
            <BursarPanelPermitPaymentForm  
              initialValues={this.state.rowData} 
              handleSuccess={this.handleSuccess}
              modalName="modal-bursar-permit-duplicate" 
              modalText="Duplicate a Permit Payment" 
              submitType="DUPLICATE"
              initialValues={this.state.rowData} 
              rowData={this.state.rowData}
              handleSuccess={this.handleSuccess}
              />
          </div>
        }
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
    bursarPermitPaymentFetched: state.bursarPermitPaymentFetched,
    bursarPermitPaymentCreated: state.bursarPermitPaymentCreated,
    townshipLocationsFetched: state.townshipLocationsFetched,
    townshipSchemeTypesFetched: state.townshipSchemeTypesFetched,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchBursarPermitPayment,
    createBursarPermitPayment,
    resetLoading,
    fetchTownshipLocations,
    fetchTownshipSchemeTypes
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'permit-payment',
  fields
})(BursarPanelPermitPayment));
