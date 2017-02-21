import React from 'react';
import { reduxForm, change, reset } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import datetime from 'node-datetime';
import {SimpleSelect} from "react-selectize"

import {
  fetchTownshipParkingPermits,
  createTownshipParkingPermits,
  fetchTownshipUsers,
  resetLoading} from '../../../../../actions/actions-township-panel.jsx'

import Spinner from '../../../../../common/components/spinner.jsx';
import {optionsSelectize} from '../../../../../common/components/options-selectize.js';

import Griddle from 'griddle-react'
import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import {customFilterComponent, customFilterFunction} from '../../../../../common/components/griddle-custom-filter.jsx'
import ParkingPermitsForm from './parking-permits-form.jsx'
import {ajaxSelectizeGet, ajaxSelectizeFilteredGet, ajaxDelete, ajaxGet, ajaxPost} from '../../../../../common/components/ajax-selectize.js'


const fields = [
  'id',
  'date_time',
  'township_code',
  'township_name',
  'permit_type',
  'permit_name',
  'covered_locations',
  'cost',
  'year',
  'location_address',
  'active',
  'scheme_type',
]

class customColumnComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div onClick={() => this.props.metadata.customComponentMetadata.renderEditModal(
        this.props.rowData) }>
        {this.props.data}
      </div>
    );
  }
}

customColumnComponent.defaultProps = { "data": {}, "renderEditModal": null };


class ParkingPermits extends React.Component {

  constructor(props) {
    super(props);

    this.renderCreateModal = this.renderCreateModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.renderEditModal = this.renderEditModal.bind(this);

    this.state = {
      showEditDuplicateButtons: false,
      parkingLocationCode: null,
      showEditModal: false,
      rowData: null,
      selectizeOptions: {}
    }

   
  }

  componentWillMount() {
    this.props.fetchTownshipParkingPermits(this.props.townshipCode);
    this.props.dispatch(change('parking-permits-form', 'township_code', this.props.townshipCode));
  }

  componentDidUpdate() {
    if (this.props.townshipParkingPermitsCreated.isLoading) {
    } else if (!this.props.townshipParkingPermitsCreated.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess() {
    this.props.resetLoading();
    this.props.fetchTownshipParkingPermits(this.props.townshipCode);
    this.setState({rowData: {}, showEditDuplicateButtons: false});
    $('#modal-success3').openModal();
  }

  handleSubmit(data) {
    this.props.createTownshipParkingPermits(data);
  }

  renderEditModal(rowData) {
    window.scrollTo(0, document.body.scrollHeight);
    this.setState({ showEditDuplicateButtons: true, rowData: rowData, showEditModal: true })
  }

  renderCreateModal() {
    return (
      <ParkingPermitsForm
        modalName="modal-parking-permits-create"
        modalText="Create a Parking Permit"
        submitType="CREATE"
        rowData={this.state.rowData}
        handleSuccess={this.handleSuccess}
      />
    );
  }

  renderPermitsTable() {
    let filteredPermits = this.props.townshipParkingPermitsFetched.data.resource;

    var renderEditModal = this.renderEditModal;
    var metaDataFunction = () => {
      return fields.map((data) => {
        return (
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
      <Griddle
        tableClassName={'table table-bordered table-striped table-hover'}
          filterClassName={''}
          useGriddleStyles={false}
          results={filteredPermits}
          showFilter={true}
          showSettings={true}
          settingsToggleClassName='btn btn-default'
          useCustomPagerComponent={true}
          customPagerComponent={ BootstrapPager }
          useCustomFilterComponent={true} customFilterComponent={customFilterComponent}
          useCustomFilterer={true} customFilterer={customFilterFunction}
          columnMetadata={columnMeta}
          columns={[
            'id',
            'date_time',
            'township_code',
            'township_name',
            'permit_type',
            'permit_name'
          ]}
        />
    );
  }

  renderEditDuplicateButtons(locationCode) {
    return (
      <div className="container" style={{ marginTop: 40 }}>
        <a
          onClick={() => {
            this.setState({ showEditModal: true })
            $('#modal-parking-permits-edit').openModal();
             window.scrollTo(0, 0);
          } }
          className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">edit</i>
          <h4> Edit Parking Permit: {locationCode} </h4>
        </a>
        <a
          onClick={() => {
            this.setState({ showEditModal: true })
            $('#modal-parking-permits-duplicate').openModal();
             window.scrollTo(0, 0);
          } }
          className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">content_copy</i>
          <h4> Duplicate Parking Permit: {locationCode} </h4>
        </a>

        <a
          onClick={() => $('#modal-delete3').openModal() }
          className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">delete </i>
          <h4> Delete Parking Permit: {locationCode} </h4>
        </a>
        <div id="modal-delete3" className="modal" style={{ overflowX: "hidden" }}>
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
                    $('#modal-delete3').closeModal()
                  } }>No</a>
              </div>
              <div className="col s3">
                <a className="waves-effect waves-light btn btn-green"
                  onClick={() => {
                    $('#modal-delete3').closeModal()
                    ajaxDelete('parking_permits', this.state.rowData.id, this.handleSuccess);
                    this.setState({ showEditDuplicateButtons: false });
                    window.scrollTo(0, 0);
                  } }>Yes</a>
              </div>
            </div>
          </div>
        </div>
        {
          !this.state.showEditModal ?
            <div></div> :
            <div>
              <ParkingPermitsForm
                initialValues={this.state.rowData}
                handleSuccess={this.handleSuccess}
                modalName="modal-parking-permits-edit"
                modalText="Edit a Parking Permit"
                submitType="EDIT"
                rowData={this.state.rowData}
                handleSuccess={this.handleSuccess}
                />
              <ParkingPermitsForm
                initialValues={this.state.rowData}
                handleSuccess={this.handleSuccess}
                modalName="modal-parking-permits-duplicate"
                modalText="Duplicate a Parking Permit"
                submitType="DUPLICATE"
                rowData={this.state.rowData}
                handleSuccess={this.handleSuccess}
                />
            </div>
        }
      </div>
    );
  }

  render() {
    var isFetched = this.props.townshipParkingPermitsFetched.isLoading;
    return (
      <div>
        <nav>
          <div className="nav-wrapper nav-admin z-depth-2">
            <a className="brand-logo center">Parking Permits</a>
          </div>
        </nav>
        <div className="card" style={{marginBottom: 40}}>
          {isFetched ?
            <div className="center-align"> <Spinner /> </div> : this.renderPermitsTable() }

          <div className="divider"/>

          <div className="center-align">
            <a
              className="modal-trigger waves-effect waves-light btn valign"
              onClick={() => {
                  this.setState({showEditDuplicateButtons: false, rowData: null})
                  $('#modal-parking-permits-create').openModal();
                   window.scrollTo(0, 0);
                }
              }
              style={{ margin: 10 }}>Add New Parking Permit</a>
          </div>
        </div>
        
        {this.state.showEditDuplicateButtons ?
          this.renderEditDuplicateButtons(this.state.rowData.id) : <div> </div>}

        <div id="modal-success3" className="modal">
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
        {this.renderCreateModal()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    townshipParkingPermitsFetched: state.townshipParkingPermitsFetched,
    townshipParkingPermitsCreated: state.townshipParkingPermitsCreated
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipParkingPermits,
    createTownshipParkingPermits,
    resetLoading,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'parking-permits',
  fields
})(ParkingPermits));
