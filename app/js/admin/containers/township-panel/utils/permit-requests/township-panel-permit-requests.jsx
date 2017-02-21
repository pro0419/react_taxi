import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

import Body from "../../../../../common/components/body/body.jsx";
import {
  fetchTownshipPermitRequests, 
  editTownshipPermitRequests, 
  fetchTownshipPermitsList,
  createTownshipPermitsList,
  fetchTownshipParkingPermits, 
  createTownshipParkingPermits, 
  resetLoading
} from '../../../../actions/actions-township-panel.jsx';
import TownshipPanelPermitRequestsForm from './township-panel-permit-requests-form'

import {Tabbordion, Panel} from 'react-tabbordion'
import Spinner from '../../../../common/components/spinner.jsx';
import {ajaxSelectizeGet, ajaxDelete, ajaxPut} from '../../../../common/components/ajax-selectize.js'
import Griddle from 'griddle-react'
import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

import _ from "lodash";
import axios from "axios";

var classNames = {
  content: 'traditional-tabs-content',
  panel: 'traditional-tabs-panel',
  title: 'traditional-tabs-title'
}

export const fields = [ 
  'id',  
  'date_time', 
  'user_id', 
  'township_code', 
  'township_name', 
  'permit_type', 
  'permit_name', 
  'residency_proof', 
  'approved',  
  'date_action', 
  'status',  
  'paid',  
  'user_comments', 
  'town_comments', 
  'logo',  
  'scheme_type', 
  'first_contact_date',  
  'permit_status_image', 
  'rate',  
  'user_name', 
  'signature',
]

class customColumnComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    if(this.props.metadata.customComponentMetadata.approveField) {
      if(this.props.data === "YES" && this.props.rowData.status === "ACTIVE") {
        return (
          <div style={{color: "blue"}} onClick={() => this.props.metadata.customComponentMetadata.renderEditModal(this.props.rowData.id, this.props.rowData)}>
            <i className="material-icons valign" style={{color: "#2DB63D"}}>check_box</i>
          </div>
        );
      } else if (this.props.data === "NO" && this.props.rowData.status === "INACTIVE") {
        return (
          <div style={{color: "blue"}} onClick={() => this.props.metadata.customComponentMetadata.renderEditModal(this.props.rowData.id, this.props.rowData)}>
            <i className="material-icons valign" style={{color: "#EAB41C"}}>new_releases</i>
          </div>
        );
      } else if (this.props.data === "NO"  && this.props.rowData.status === "ACTIVE") {
        return (
          <div style={{color: "blue"}} onClick={() => this.props.metadata.customComponentMetadata.renderEditModal(this.props.rowData.id, this.props.rowData)}>
            <i className="material-icons valign" style={{color: "#D9534F"}}>indeterminate_check_box</i>
          </div>
        );
      }
    } else {
      return (
        <div onClick={() => this.props.metadata.customComponentMetadata.renderEditModal(this.props.rowData.id, this.props.rowData)}>
          {this.props.data}
        </div>
      );
    }
  }
}

customColumnComponent.defaultProps = { "data": {}, "renderEditModal": null, "approvedField": false};

class TownshipPanelPermitRequests extends React.Component {

  constructor(props) {
    super(props);
    
    window.scrollTo(0, 0);

    $('.collapsible').collapsible();

    this.state = {
      showEditDuplicateButtons: false,
      parkingLocationCode: null,
      showEditModal: false,
      rowData: null,
      selectizeOptions: {},
      requestId: 'Name Unavailable'
    }

    this.renderApproveModal = this.renderApproveModal.bind(this);
    this.renderCreateModal = this.renderCreateModal.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.renderEditModal = this.renderEditModal.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
  }

  componentWillMount() {
    this.props.fetchTownshipPermitRequests(this.props.townshipCode);
  }

  componentDidUpdate() {
    console.log(!this.props.townshipPermitRequestsEdited.isLoading)
    if (!this.props.townshipPermitRequestsEdited.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess() {
    this.props.resetLoading();

    $('#permit-requests-modal').closeModal();
    $('#modal-township-permit-requests-create').closeModal()
    $('#modal-success').openModal()

    this.props.fetchTownshipPermitRequests(this.props.townshipCode);
  }

  handleAccept() {
    let townshipPermit = {
      "date_time": moment().format('YYYY-MM-DD HH:mm:ss'),
      "user_id": this.state.rowData.user_id,
      "township_code": this.props.townshipCode,
      "permit_name": this.state.rowData.permit_name,
      "name": this.state.rowData.user_id,
      "user_name": this.state.rowData.user_id,
    }

    //this.props.createTownshipPermitsList(townshipPermit)

    axios.post('/api/notify-parking-permit', townshipPermit)
    .then((response) => {
      console.log(response.data);
    })
  }

  renderApproveModal() {
    return(
     <div id="permit-requests-modal" className="modal">
      <div className="modal-content">
        <h4>Approve or Deny Permit Request </h4>
        <p>Request ID: {this.state.requestId}</p>
      </div>
      <div className="modal-footer">
        <div className="row marginless-row">
          <div className="col s6 left">
            <a className="waves-effect waves-light btn btn-yellow left" onClick={() => $('#permit-requests-modal').closeModal()}>Cancel</a>
          </div>
          <div className="col s3">
            <a className="waves-effect waves-light btn btn-red" onClick={
              () => this.props.editTownshipPermitRequests({"approved": "NO", "status": "ACTIVE"}, this.state.requestId)
            }>Reject</a>
          </div>
          <div className="col s3">
            <a className="waves-effect waves-light btn btn-green" onClick={
              () => {
                this.props.editTownshipPermitRequests({"approved": "YES", "status": "ACTIVE"}, this.state.requestId)
                this.handleAccept()
              }
            }>Approve</a>
          </div>
        </div>
      </div>
    </div>
    );
  }

  renderEditModal(requestId, rowData) {
    this.setState({requestId: requestId, rowData: rowData});
    $('#permit-requests-modal').openModal();
  }

  renderPendingTable() {

   var filteredSubscriptions = this.props.townshipPermitRequestsFetched.data;

    var columnMeta = [
      {
        "columnName": "approved",
        "customComponent": customColumnComponent
      },
      {
        "columnName": "permit_type",
        "customComponent": customColumnComponent
      },
    ];

    var renderEditModal = this.renderEditModal;
    var metaDataFunction = () =>  {
      return fields.map((data) => {
        if(data === "approved") {
          return (
            {
              "columnName": "approved",
              "customComponent": customColumnComponent,
              'customComponentMetadata': {
                'approveField': true,
                'renderEditModal': renderEditModal
              }
            }
          );
        } else {
          return (
            {
              "columnName": data,
              "customComponent": customColumnComponent,
              'customComponentMetadata': {
                'approveField': false,
                'renderEditModal': renderEditModal
              }
            }
          );
        }
      });
    }

    const filteredRequests = _.filter(filteredSubscriptions.resource, {'approved': 'NO', status: 'INACTIVE'});

    return(
      <div>
        <Griddle
          tableClassName={'table table-bordered table-striped table-hover'}
          filterClassName={''}
          useGriddleStyles={false}
          results={filteredRequests}
          showFilter={true}
          showSettings={true}
          settingsToggleClassName='btn btn-default'
          useCustomPagerComponent={true}
          customPagerComponent={ BootstrapPager }
          useCustomFilterComponent={true} 
          customFilterComponent={customFilterComponent}
          useCustomFilterer={true} 
          customFilterer={customFilterFunction}
          columnMetadata={metaDataFunction()}
          columns={['id',  
                    'date_time', 
                    'user_id', 
                    'township_code', 
                    'township_name', 
                    'permit_type', 
                    'permit_name', 
                    'residency_proof', 
                    'approved',  ]}
        />
        <div className="divider"/> 
        
        <div className="center-align">

          <a
            className="modal-trigger waves-effect waves-light btn valign" 
            onClick={() => {$('#modal-township-permit-requests-create').openModal(); window.scrollTo(0, 0);}}
            style={{margin: 10}}>Add New Permit Request</a>

        </div>
      </div>
    );
  }
  renderApprovedTable() {
   var filteredSubscriptions = this.props.townshipPermitRequestsFetched.data;

   var columnMeta = [
      {
        "columnName": "approved",
        "customComponent": customColumnComponent
      }
    ];

    const filteredRequests = _.filter(filteredSubscriptions.resource, { 'approved': 'YES'});

    var renderEditModal = this.renderEditModal;
    var metaDataFunction = () =>  {
      return fields.map((data) => {
        if(data === "approved") {
          return (
            {
              "columnName": "approved",
              "customComponent": customColumnComponent,
              'customComponentMetadata': {
                'approveField': true,
                'renderEditModal': renderEditModal
              }
            }
          );
        } else {
          return (
            {
              "columnName": data,
              "customComponent": customColumnComponent,
              'customComponentMetadata': {
                'approveField': false,
                'renderEditModal': renderEditModal
              }
            }
          );
        }
      });
    }

    return(
      <Griddle
        tableClassName={'table table-bordered table-striped table-hover'}
        filterClassName={''}
        useGriddleStyles={false}
        results={filteredRequests}
        showFilter={true}
        showSettings={true}
        settingsToggleClassName='btn btn-default'
        useCustomPagerComponent={true}
        customPagerComponent={ BootstrapPager }
        useCustomFilterComponent={true} 
        customFilterComponent={customFilterComponent}
        useCustomFilterer={true} 
        customFilterer={customFilterFunction}
        columnMetadata={metaDataFunction()}
        columns={['id',  
                  'date_time', 
                  'user_id', 
                  'township_code', 
                  'township_name', 
                  'permit_type', 
                  'permit_name', 
                  'residency_proof', 
                  'approved',  ]}
      />
    );
  }

  renderRejectedTable() {
   var filteredSubscriptions = this.props.townshipPermitRequestsFetched.data;
    var columnMeta = [
      {
        "columnName": "approved",
        "customComponent": customColumnComponent
      }
    ];

    const filteredRequests = _.filter(filteredSubscriptions.resource, { 'approved': 'NO', status: 'ACTIVE'});

    var renderEditModal = this.renderEditModal;
    var metaDataFunction = () =>  {
      return fields.map((data) => {
        if(data === "approved") {
          return (
            {
              "columnName": "approved",
              "customComponent": customColumnComponent,
              'customComponentMetadata': {
                'approveField': true,
                'renderEditModal': renderEditModal
              }
            }
          );
        } else {
          return (
            {
              "columnName": data,
              "customComponent": customColumnComponent,
              'customComponentMetadata': {
                'approveField': false,
                'renderEditModal': renderEditModal
              }
            }
          );
        }
      });
    }

    return(
      <Griddle
        tableClassName={'table table-bordered table-striped table-hover'}
        filterClassName={''}
        useGriddleStyles={false}
        results={filteredRequests}
        showFilter={true}
        showSettings={true}
        settingsToggleClassName='btn btn-default'
        useCustomPagerComponent={true}
        customPagerComponent={ BootstrapPager }
        useCustomFilterComponent={true} 
        customFilterComponent={customFilterComponent}
        useCustomFilterer={true} 
        customFilterer={customFilterFunction}
        columnMetadata={metaDataFunction()}
        columns={['id',  
                  'date_time', 
                  'user_id', 
                  'township_code', 
                  'township_name', 
                  'permit_type', 
                  'permit_name', 
                  'residency_proof', 
                  'approved',  ]}
      />
    );
  }

  renderCreateModal() {
    
    const {
      resetForm,
      submitting,
      dispatch
    } = this.props

    return(
      <TownshipPanelPermitRequestsForm
        handleSuccess={this.handleSuccess}
        modalName="modal-township-permit-requests-create" 
        modalText="Create a Permit Request" 
        submitType="CREATE"
        initialValues={{ "approved": "NO", "status": "INACTIVE" }} 
        rowData={this.state.rowData}
        handleSuccess={this.handleSuccess}
        townshipCode={this.props.townshipCode}
      />
    );
  }

  renderSuccessModal() {
    return (
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
    );
  }

  render() {
    return (
      <div className="blue-body marginless-row">
        <Body showHeader={true}>
          <div style={{marginTop: 40}}>
          {this.renderApproveModal()}
          {this.renderCreateModal()}
          {this.renderSuccessModal()}
            <div className="row marginless-row">
              <Tabbordion className="traditional-tab col s12 z-depth-2" classNames={classNames} initialIndex={0} name="tabs">
                <Panel title={<span>Pending Permit Requests</span>}>
                  <div className="row marginless-row" style={{marginTop: 40, marginBottom: 40}}>
                   <nav style={{marginTop: 40}}>
                      <div className="nav-wrapper nav-admin z-depth-2">
                        <a className="brand-logo center">Pending Permit Requests</a>
                      </div>
                    </nav>
                    <div className="card">
                      {this.props.townshipPermitRequestsFetched.isLoading ? 
                        <div className="center-align"> <Spinner /> </div> : this.renderPendingTable() }
                    </div>
                  </div>  
                </Panel>
                <Panel title={<span>Approved Permit Requests</span>}>
                  <div className="row marginless-row" style={{marginTop: 40, marginBottom: 40}}>
                    <nav style={{marginTop: 40}}>
                      <div className="nav-wrapper nav-admin z-depth-2">
                        <a className="brand-logo center">Approved Permit Requests</a>
                      </div>
                    </nav>
                    <div className="card">
                      {this.props.townshipPermitRequestsFetched.isLoading ? 
                        <div className="center-align"> <Spinner /> </div> : this.renderApprovedTable() }
                    </div>
                  </div>
                </Panel>
                <Panel title={<span>Rejected Permit Requests</span>}>
                  <div className="row marginless-row" style={{marginTop: 40, marginBottom: 40}}>
                    <nav style={{marginTop: 40}}>
                      <div className="nav-wrapper nav-admin z-depth-2">
                        <a className="brand-logo center">Rejected Permit Requests</a>
                      </div>
                    </nav>
                    <div className="card">
                      {this.props.townshipPermitRequestsFetched.isLoading ? 
                        <div className="center-align"> <Spinner /> </div> : this.renderRejectedTable() }
                    </div>
                  </div>
                </Panel>
              </Tabbordion>
            </div>
          </div>
        </Body>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    townshipPermitRequestsFetched: state.townshipPermitRequestsFetched,
    townshipPermitRequestsEdited: state.townshipPermitRequestsEdited,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipPermitRequests,
    editTownshipPermitRequests,
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TownshipPanelPermitRequests);


/*

  if(permitData.scheme_type == "SUBSCRIPTION") {
    if (permitData.active == "YES") {

    }
  }

  this.props.editTownshipPermitRequests(
  {
    "approved": "YES", 
    "status": "ACTIVE", 
    "date_action": currentTime 
  }, this.state.requestId);

*/

    /*
    const filteredPermits = _.filter(
      this.props.townshipParkingPermitsFetched.data.resource, 
      {'permit_name': this.state.rowData.permit_name, 'township_code': this.props.townshipCode}
    );
    const permitData = filteredPermits[0];
    let currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(currentMoment.diff(permitMoment, "years"));

    if (filteredPermits[0] === null || filteredPermits[0] === undefined) {
      let permitMoment = moment(permitData.year);
      let currentMoment = moment(currentTime);

      this.props.createTownshipParkingPermits({
        "township_code": this.props.townshipCode,
        "date_time": currentTime,
        "township_name": this.props.townshipCode,
        "permit_type": this.state.rowData.permit_type,
        "permit_name": this.state.rowData.permit_name,
        "covered_locations": null,
        "cost": this.state.rowData.rate,
        "year": currentTime,
        "location_address": null,
        "active": "NO",
        "scheme_type": this.state.rowData.scheme_type
      });
    } else {
      alert("Error: A permit with that permit name already exists.")
    }
    this.props.fetchTownshipParkingPermits();
    */