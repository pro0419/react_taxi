import React from 'react'
import { reduxForm, change } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import datetime from 'node-datetime'
import {SimpleSelect} from "react-selectize"
import { browserHistory } from 'react-router'

import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'
import {optionsSelectize} from '../../../../common/components/options-selectize.js'

import {fetchInspectorPlate, createInspectorPlate, resetLoading} from '../../../../actions/actions-inspector-panel.jsx'
import {fetchTownshipLocations} from '../../../../actions/actions-township-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

import { ajaxSelectizeGet, ajaxDelete } from '../../../../common/components/ajax-selectize.js'

import InspectorPanelSearchPlateForm from './inspector-panel-search-plate-form.jsx'

import _ from 'lodash';

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


class InspectorSearchPlate extends React.Component {

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
    this.props.fetchInspectorPlate();
    this.props.fetchTownshipSchemeTypes();
    this.props.fetchTownshipLocations(this.props.townshipCode);
  }

  componentDidUpdate() {
    if (this.props.inspectorPlateCreated.isLoading) {
    } else if (!this.props.inspectorPlateCreated.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess(){
    this.props.resetLoading();
    $('#modal-inspector-ticket-create').closeModal();
    $('#modal-success').openModal();
    this.props.fetchInspectorPlate();
  }

  handleSubmit(data) {
    this.props.createInspectorPlate(data);
  }

  tempInputs() {
    const {dispatch} = this.props;

    return fields.map((data) => {
      return( 
        <div className="col s12 admin-form-input">
          <div className="form-group">
            <div></div>
            <input type="text" placeholder={data} onChange={(event) => 
              dispatch(change('create-ticket', data, event.target.value))
            }/>
          </div>
        </div>
      );
    });
  }

  renderCreateModal() {
    return(
      <InspectorPanelSearchPlateForm 
        modalName="modal-bursar-payment-create" 
        modalText="Create a Plate" 
        submitType="CREATE"
        initialValues={null}
        editMode={false}
        handleSuccess={this.handleSuccess}
      />
    );
  }

  renderTable() {
    console.log(this.props.inspectorPlateFetched)
    let parkingData = this.props.inspectorPlateFetched.data.resource;
    let filteredData = _.filter(parkingData, {"township_code": this.props.townshipCode});

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
          results={filteredData}
          showFilter={true}
          showSettings={true}
          settingsToggleClassName='btn btn-default'
          useCustomPagerComponent={true}
          customPagerComponent={ BootstrapPager }
          useCustomFilterComponent={true} customFilterComponent={customFilterComponent}
          useCustomFilterer={true} customFilterer={customFilterFunction}
          columnMetadata={columnMeta}
          initialSort={'entry_time'}
          initialSortAscending={false}
          columns={[
                  'id',
                  'township_code',
                  'plate_no',
                  'expiry_time',
                  'parking_status',
                  'ticket_status'
                  ]}
        />

        
      </div>
    );
  }

  renderEditDuplicateButtons(rowData) {
    return (
      <div className="container">

        <a
        style={{marginTop: 20}}
        onClick={() => {
          this.setState({showEditModal: true})
          browserHistory.push(`admin/inspector/vehicle-info/${rowData.plate_no}`);
        }}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">directions_car</i>
          <h4> Vehicle Info - Plate No: {rowData.plate_no} </h4>
        </a>

        <a
        onClick={() => {
          this.setState({showEditModal: true})
          $('#modal-bursar-ticket-duplicate').openModal(); 
        window.scrollTo(0, 0);}}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">content_copy</i>
          <h4> Duplicate - Plate ID: {recordId} </h4>
        </a>

        <a
        onClick={() => $('#modal-delete').openModal() }
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">delete</i>
          <h4> Delete - Plate ID: {recordId} </h4>
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
                  ajaxDelete('user_vehicles', recordId, this.handleSuccess);
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

  renderEditDuplicateButtons(rowData) {
    return (
      <div className="container">
        <a
        style={{marginTop: 20}}
        onClick={() => {
          this.setState({showEditModal: true})
          browserHistory.push(`admin/inspector/vehicle-info/${rowData.plate_no}`);
        }}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">directions_car</i>
          <h4> Vehicle Info - Plate No: {rowData.plate_no} </h4>
        </a>

        <a
        style={{marginTop: 20}}
        onClick={() => {
          this.setState({showEditModal: true})
          $('#modal-bursar-ticket-edit').openModal(); 
        window.scrollTo(0, 0);}}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">edit</i>
          <h4> Edit - Plate ID: {rowData.id} </h4>
        </a>

        <a
        onClick={() => {
          this.setState({showEditModal: true})
          $('#modal-bursar-ticket-duplicate').openModal(); 
        window.scrollTo(0, 0);}}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">content_copy</i>
          <h4> Duplicate - Plate ID: {rowData.id} </h4>
        </a>

        <a
        onClick={() => $('#modal-delete').openModal() }
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">delete</i>
          <h4> Delete - Plate ID: {rowData.id} </h4>
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
                  ajaxDelete('user_vehicles', rowData.id, this.handleSuccess);
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

  render() {
    console.log(this.props.townshipLocationsFetched)
    return (
      <div className="blue-body marginless-row">
        <Body showHeader={true}>
          <div className="row marginless-row" style={{marginTop: 40}}>
            <div className="col s12">
              <nav>
                <div className="nav-wrapper nav-admin z-depth-2">
                  <a className="brand-logo center">Search Plate</a>
                </div>
              </nav>
               <div className="card">
                  <div className="township-userlist-container">
                    { this.props.inspectorPlateFetched.isLoading ||
                      this.props.townshipLocationsFetched.isLoading ? 
                      <div> </div> : this.renderTable()}
                  </div>
               </div>

               {this.state.showEditDuplicateButtons ? 
                this.renderEditDuplicateButtons(this.state.rowData) : <div> </div>}
            </div>
          </div>
        </Body>
        { this.props.inspectorPlateFetched.isLoading ? 
          <div> </div> : this.renderCreateModal()}

        { 
          !this.state.showEditModal ?
          <div></div> : 
          <div>
            <InspectorPanelSearchPlateForm
              initialValues={this.state.rowData} 
              handleSuccess={this.handleSuccess}
              modalName="modal-bursar-ticket-edit" 
              modalText="Edit a Plate" 
              submitType="EDIT"
              initialValues={this.state.rowData} 
              rowData={this.state.rowData}
              handleSuccess={this.handleSuccess}
              />
            <InspectorPanelSearchPlateForm 
              initialValues={this.state.rowData} 
              handleSuccess={this.handleSuccess}
              modalName="modal-bursar-ticket-duplicate" 
              modalText="Duplicate a Plate" 
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
    inspectorPlateFetched: state.inspectorPlateFetched,
    inspectorPlateCreated: state.inspectorPlateCreated,
    townshipLocationsFetched: state.townshipLocationsFetched,
    townshipSchemeTypesFetched: state.townshipSchemeTypesFetched,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchInspectorPlate,
    fetchTownshipLocations,
    resetLoading,
    fetchTownshipSchemeTypes,
    createInspectorPlate
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'search-plate-edit',
  fields
})(InspectorSearchPlate));

/*
<div className="divider"/> 

<div className="center-align">

  <a
    className="modal-trigger waves-effect waves-light btn valign" 
    onClick={() => $('#modal-bursar-payment-create').openModal()}
    style={{margin: 10}}>Add New Plate</a>

</div>
*/