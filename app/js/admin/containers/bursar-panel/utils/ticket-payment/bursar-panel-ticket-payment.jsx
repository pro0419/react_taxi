import React from 'react'
import { reduxForm, change } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import datetime from 'node-datetime'
import {SimpleSelect} from "react-selectize"

import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'
import {optionsSelectize} from '../../../../common/components/options-selectize.js'

import {fetchBursarTicketPayment, createBursarTicketPayment, resetLoading} from '../../../../actions/actions-bursar-panel.jsx'
import {fetchTownshipLocations} from '../../../../actions/actions-township-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

import BursarPanelTicketPaymentForm from './bursar-panel-ticket-payment-form.jsx'
import BursarPanelTicketCardForm from './bursar-panel-ticket-card-form.jsx'
import BursarPanelTicketCashForm from './bursar-panel-ticket-cash-form.jsx'

import customColumnComponent from '../../../../common/components/custom-column-component.jsx'
import {ajaxSelectizeGet, ajaxDelete} from '../../../../common/components/ajax-selectize.js'

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, agate, zenburn, monokai } from 'react-syntax-highlighter/dist/styles';

import axios from 'axios'

export const fields = [ 
  'ip',
  'ticket_no',
  'plate_num',
  'user_id',
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

const fieldsCard = [ 
  'pmt_options',
  'ipn_txn_id',
  'ipn_payment',
  'ipn_status',
  'paypal_total',
  'ticket_no',
  'plate_num',
  'user_id',
  'address',
  'violation_charge',
  'violation_details',
  'violation_location',
  'pld_guilty',
  'penalty_adjustment',
  'adjust_rfchange',
  'new_amt_due',
  'pmt_status',
  'ticket_status',
  'twp_payment',
  
  'adjust_ref',
  'penalty_change',
  'date_payment',
  'violation_date',
]

export const fieldsCash = [ 
  'ticket_no',
  'plate_num',

  'user_id',
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



class BursarPanelTicketPayment extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showEditDuplicateButtons: false,
      parkingLocationCode: null,
      showEditModal: false,
      rowData: null,
      selectizeOptions: {},
      paymentTypeClicked: false,
      paymentType: null,
      successData: "",
      errorData: "",
      fieldTemplate: fields
    }

    this.renderCreateModal = this.renderCreateModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleSuccessCard = this.handleSuccessCard.bind(this);
    this.handleErrorCard = this.handleErrorCard.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.renderEditModal = this.renderEditModal.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.renderButtonsPage = this.renderButtonsPage.bind(this);
  }

  componentWillMount() {
    this.props.fetchBursarTicketPayment();
    this.props.fetchTownshipSchemeTypes();
    this.props.fetchTownshipLocations(this.props.townshipCode);
  }

  componentDidUpdate() {
    if (!this.props.bursarTicketPaymentCreated.isLoading) {
      this.handleSuccess();
    }

    if(this.state.paymentType === "cash") {
      $("#modal-cash-payment").openModal();
      this.setState({paymentType: null})
    } else if  (this.state.paymentType === "card") {
      $("#modal-card-payment").openModal();
      this.setState({paymentType: null})
    } else if (this.state.paymentType === "record") {
      $("#modal-bursar-payment-create").openModal();
      this.setState({paymentType: null})
    }
  };

  handleSuccess(){
    this.props.resetLoading();
    $('#modal-bursar-payment-create').closeModal();
    this.props.fetchBursarTicketPayment();
    this.setState({rowData: {}, showEditDuplicateButtons: false});
    $('#modal-success').openModal();
  }

  handleSuccessCard(data){
    this.setState({
      rowData: {
        ipn_txn_id: data.id,
        ipn_payment: data.transactions[0].amount.total,
        ipn_status: "Completed",
        pmt_options: "PAYPAL",
      }, 
      showEditDuplicateButtons: false, 
      successData: data,
      fieldTemplate: fieldsCard
    });
    $("#modal-card-payment").closeModal();
    $("#modal-bursar-payment-create").openModal();
    $('#modal-card-success').openModal();
  }

  handleErrorCard(data){
    this.setState({rowData: {}, showEditDuplicateButtons: false, errorData: data});
    $('#modal-card-error').openModal();
  }

  handleSubmit(data) {
    this.props.createBursarTicketPayment(data);
  }

  tempInputs() {
    const {dispatch} = this.props;

    return fields.map((data) => {
      return( 
        <div className="col s12 admin-form-input">
          <div className="form-group">
            <div></div>
            <input type="text" placeholder={data} onChange={(event) => 
              dispatch(change('ticket-payment', data, event.target.value))
            }/>
          </div>
        </div>
      );
    });
  }

  renderCreateModal() {
    const {
      fields: {
        id,
        ip,
        ticket_no,
        plate_num,
        user_id,
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
    } = this.props

    return(

      <BursarPanelTicketPaymentForm 
        modalName="modal-bursar-payment-create" 
        modalText="Create a Ticket Payment" 
        submitType="CREATE"
        initialValues={this.state.rowData}
        rowData={this.state.rowData}
        handleSuccess={this.handleSuccess}
        initialField={this.state.intialField}
        fieldTemplate={this.state.fieldTemplate}
        townshipCode={this.props.townshipCode}
      />
      
    );

  }

  renderTable() {

  let TicketPermitsData = this.props.bursarTicketPaymentFetched.data.resource;

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
        <div className="bursar-payment-container">
          <Griddle
            tableClassName={'table table-bordered table-striped table-hover'}
            filterClassName={''}
            useGriddleStyles={false}
            results={TicketPermitsData}
            showFilter={true}
            showSettings={true}
            settingsToggleClassName='btn btn-default'
            useCustomPagerComponent={true}
            customPagerComponent={ BootstrapPager }
            columns={[
            'id',
            'pmt_options',
            'ticket_no',
            'plate_num',
            'user_id',
            'address',
            'paypal_total',
            'violation_charge',
            'violation_details',
            'violation_location',
            ]}
            useCustomFilterComponent={true} 
            customFilterComponent={customFilterComponent}
            useCustomFilterer={true} 
            customFilterer={customFilterFunction}
            columnMetadata={columnMeta}
          />
        </div>
        <div className="divider"/> 

        <div className="row center-align">
        <button
            className="modal-trigger waves-effect waves-light btn valign" 
            onClick={() => this.setState({paymentTypeClicked: true, paymentType: "cash"})}
            style={{margin: 10}}> Add New Cash Payment</button>
          <button
            className="modal-trigger waves-effect waves-light btn valign" 
            onClick={() => this.setState({paymentTypeClicked: true, paymentType: "card"})}
            style={{margin: 10}}> Add New Card Payment</button>
            {/*
            <a
            className="modal-trigger waves-effect waves-light btn valign" 
            onClick={() => {$('#modal-bursar-payment-create').openModal()}}
            style={{margin: 10}}> Add General Payment Record</a>
            */}
        </div>
      </div>
    );
  }

  renderEditDuplicateButtons(recordId) {
    return (
      <div className="container">
        <a
        style={{marginTop: 20}}
        onClick={() => {
          this.setState({showEditModal: true})
          $('#modal-bursar-ticket-edit').openModal(); 
          window.scrollTo(0, 0);
        }}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">edit</i>
          <h4> Edit - Ticket Payment ID: {recordId} </h4>
        </a>

        <a
        onClick={() => {
          this.setState({showEditModal: true})
          $('#modal-bursar-ticket-duplicate').openModal(); 
          window.scrollTo(0, 0);
        }}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">content_copy</i>
          <h4> Duplicate - Ticket Payment ID: {recordId} </h4>
        </a>

        <a
        onClick={() => $('#modal-delete').openModal() }
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">delete</i>
          <h4> Delete - Ticket Payment ID: {recordId} </h4>
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
                  ajaxDelete('ticket_payments', recordId, this.handleSuccess);
                  this.setState({showEditDuplicateButtons: false});
                  window.scrollTo(0, 0);
                  window.scrollTo(0, 0);
                }}>Yes</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderEditModal(recordId, rowData) {
    window.scrollTo(0, document.body.scrollHeight);
    this.setState({showEditDuplicateButtons: true, rowData: rowData, showEditModal: true, parkingLocationCode: recordId})
  }

  renderPage() {
    return (
      <div className="blue-body marginless-row">
        <Body showHeader={true}>
          <div className="row marginless-row" style={{marginTop: 40}}>
            <div className="col s12">
              <nav>
                <div className="nav-wrapper nav-admin z-depth-2">
                  <a className="brand-logo center">Ticket Payment</a>
                </div>
              </nav>
               <div className="card">
                  <div >
                    { this.props.bursarTicketPaymentFetched.isLoading ||
                      this.props.townshipLocationsFetched.isLoading ? 
                      <div className="center-align"> <Spinner /> </div> : this.renderTable()}
                  </div>
               </div>

               {this.state.showEditDuplicateButtons ? 
                this.renderEditDuplicateButtons(this.state.parkingLocationCode) : <div> </div>}
            </div>
          </div>
        </Body>

        { 
          this.props.bursarTicketPaymentFetched.isLoading ? 
          <div> </div> : this.renderCreateModal()
        }
      </div>
    );
  }

  renderButtonsPage() {
    return (
      <div className="blue-body marginless-row">
        <Body showHeader={true}>
          <div className="row marginless-row" style={{marginTop: 40}}>
            <div className="col s12">
              <button 
              onClick={() => this.setState({paymentTypeClicked: true, paymentType: "card"})}
              className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
                <i className="material-icons valign">payment</i>
                <h4> Credit Card / Paypal </h4>
              </button>
              <button 
              onClick={() => this.setState({paymentTypeClicked: true, paymentType: "cash"})}
              className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
                <i className="material-icons valign">attach_money</i>
                <h4> Cash / Check / Other </h4>
              </button>
              {/*
              <button 
              onClick={() => this.setState({paymentTypeClicked: true, paymentType: "record"})}
              className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
                <i className="material-icons valign">storage</i>
                <h4> General Payment Record </h4>
              </button>
              */}
            </div>
          </div>
        </Body>
      </div>
    );
  }

  renderPaymentModals() {
    return(
      <div>
        <div id="modal-card-success" className="modal bottom-sheet">
          <div className="modal-content">
            <h4>Success!</h4>
            <p>You've successfully sent the request!</p>
            <SyntaxHighlighter language='json' style={docco} customStyle={{fontSize: "0.8em"}}>
              {JSON.stringify(this.state.successData, null, 2)}
            </SyntaxHighlighter>
          </div>
          <div className="modal-footer">
            <button 
            href="#" 
            className=" modal-action modal-close waves-effect waves-green btn-flat">Close</button>
          </div>
        </div>

        <div id="modal-card-error" className="modal">
          <div className="modal-content">
            <h4>Error!</h4>
            <p>There was an error in sending your request!</p>
            <p>
              <SyntaxHighlighter language='json' style={docco} customStyle={{fontSize: "0.8em"}}>
                {JSON.stringify(this.state.errorData, null, 2)}
              </SyntaxHighlighter>
            </p>
          </div>
          <div className="modal-footer">
            <button 
            href="#" 
            className=" modal-action modal-close waves-effect waves-green btn-flat">Close</button>
          </div>
        </div>

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

        <BursarPanelTicketCardForm  
          initialValues={{
            "type": "visa",
            "number": "4417119669820331",
            "expire_month": "11",
            "expire_year": "2018",
            "cvv2": "874",
            "first_name": "Joe",
            "last_name": "Shopper",
            "total": "67"
          }} 
          modalName="modal-card-payment" 
          modalText="Create Card Payment" 
          rowData={this.state.rowData}
          handleSuccess={this.handleSuccessCard}
          handleError={this.handleErrorCard}
        />
        <BursarPanelTicketCashForm  
          modalName="modal-cash-payment" 
          modalText="Create Cash Payment" 
          rowData={this.state.rowData}
          handleSuccess={this.handleSuccess}
        />
      </div>
    );
  }

  render() {
    return(
      <div>
        {this.renderPaymentModals()}
        {this.state.paymentTypeClicked ? this.renderPage() : this.renderButtonsPage()}
        <BursarPanelTicketPaymentForm  
          modalName="modal-bursar-ticket-edit" 
          modalText="Edit a Permit Payment" 
          submitType="EDIT"
          initialValues={this.state.rowData} 
          rowData={this.state.rowData}
          handleSuccess={this.handleSuccess}
          townshipCode={this.props.townshipCode}
          />
        <BursarPanelTicketPaymentForm  
          modalName="modal-bursar-ticket-duplicate" 
          modalText="Duplicate a Permit Payment" 
          submitType="DUPLICATE"
          initialValues={this.state.rowData} 
          rowData={this.state.rowData}
          handleSuccess={this.handleSuccess}
          townshipCode={this.props.townshipCode}
          />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bursarTicketPaymentFetched: state.bursarTicketPaymentFetched,
    townshipLocationsFetched: state.townshipLocationsFetched,
    townshipSchemeTypesFetched: state.townshipSchemeTypesFetched,
    bursarTicketPaymentCreated: state.bursarTicketPaymentCreated
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchBursarTicketPayment,
    fetchTownshipLocations,
    fetchTownshipSchemeTypes,
    createBursarTicketPayment,
    resetLoading,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'ticket-payment',
  fields
})(BursarPanelTicketPayment));

// Visa, American Express(AmEx), MasterCard, Discover

