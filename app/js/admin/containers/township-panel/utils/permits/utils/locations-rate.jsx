import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { reduxForm, change } from 'redux-form'

import {SimpleSelect} from 'react-selectize'

import {
        fetchLocationsRate,
        createLocationsRate,
        resetLoading
      } from '../../../../../actions/actions-township-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../../actions/actions-township-common.jsx'
import {fetchTownshipList} from '../../../../../actions/actions-township.js';

import Spinner from '../../../../../common/components/spinner.jsx';
import {optionsSelectize} from '../../../../../common/components/options-selectize.js';

import Griddle from 'griddle-react'
import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import {customFilterComponent, customFilterFunction} from '../../../../../common/components/griddle-custom-filter.jsx'
import {ajaxSelectizeGet, ajaxSelectizeFilteredGet, ajaxDelete, ajaxGet, ajaxPost} from '../../../../../common/components/ajax-selectize.js'


import LocationsRateForm from './locations-rate-form'


const fields = [ 
'id',
'date_time',
'exact_address',
'township_id',
'township_code',
'location_id',
'location_code',
'scheme',
'rate',
'location_name',
'location_map',
'max_period',
'township_name',
'scheme_type',
'permit_type',
]

class customColumnComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div onClick={() => this.props.metadata.customComponentMetadata.renderEditModal(
        this.props.rowData)}>
        {this.props.data}
      </div>
    );
  }
}

customColumnComponent.defaultProps = { "data": {}, "renderEditModal": null};

class LocationsRate extends React.Component {

  constructor(props) {
    super(props);

     this.state = {
      showEditDuplicateButtons: false,
      parkingLocationCode: null,
      showEditModal: false,
      rowData: null,
      selectizeOptions: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.renderEditModal = this.renderEditModal.bind(this);
    this.renderCreateModal = this.renderCreateModal.bind(this);
  }

  componentWillMount() {
    this.props.fetchLocationsRate(this.props.townshipCode);
  }


  componentDidUpdate() {
    if (this.props.townshipLocationsRateCreated.isLoading) {
    } else if (!this.props.townshipLocationsRateCreated.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess(){
    this.props.resetLoading();
    this.setState({rowData: {}, showEditDuplicateButtons: false});
    this.props.fetchLocationsRate(this.props.townshipCode);
    $('#modal-success3').openModal();
  }

  handleSubmit(data) {
    this.props.createTownshipLocationsRate(data);
  }

  renderCreateModal() {
    return(
      <LocationsRateForm
        modalName="modal-locations-rate-create" 
        modalText="Create a Location Rate" 
        submitType="CREATE"
        rowData={this.state.rowData}
        handleSuccess={this.handleSuccess}
        townshipCode={this.props.townshipCode}
      />
    );
  }

  renderEditModal(rowData) {
    window.scrollTo(0, document.body.scrollHeight);
    this.setState({showEditDuplicateButtons: true, rowData: rowData, showEditModal: true})
  }

  renderPermitsTable() {
    let filteredData = this.props.townshipLocationsRateFetched.data.resource;
    console.log(filteredData)

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
          columns={[
          'id', 
          "rate",
          "scheme_type",
          'township_id',
          'township_code',
          'location_id',
          'location_code',]}
        />
    ); 
    
  }

  renderEditDuplicateButtons(locationCode) {
    return (
      <div className="container" style={{marginTop: 40}}>
        <a
        onClick={() => {
          window.scrollTo(0, 0);
          this.setState({showEditModal: true})
          $('#modal-locations-rate-edit').openModal(); 
        }}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">edit</i>
          <h4> Edit Location Rate: {locationCode} </h4>
        </a>
        <a
        onClick={() => {
          window.scrollTo(0, 0)
          this.setState({showEditModal: true})
          $('#modal-locations-rate-duplicate').openModal(); 
        }}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">content_copy</i>
          <h4> Duplicate Location Rate: {locationCode} </h4>
        </a>

        <a
        onClick={() => $('#modal-delete').openModal() }
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">delete</i>
          <h4> Delete Location Rate: {locationCode} </h4>
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
                  ajaxDelete('locations_rate', this.state.rowData.id, this.handleSuccess);
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
    return (
      <div className="col s12" style={{marginBottom: 40}}>
        <nav>
          <div className="nav-wrapper nav-admin z-depth-2">
            <a className="brand-logo center">Locations Rate</a>
          </div>
        </nav>
        <div className="card">
          {this.props.townshipLocationsRateFetched.isLoading ? 
              <div className="center-align"> <Spinner /> </div> : this.renderPermitsTable()}   

          <div className="divider"/> 

          <div className="center-align">
            <a
              className="modal-trigger waves-effect waves-light btn valign" 
              onClick={() => {$('#modal-locations-rate-create').openModal();  window.scrollTo(0, 0);}}
              style={{margin: 10}}>Add New Location Rate</a>
          </div>
          
        </div>
        {this.state.showEditDuplicateButtons ? 
                this.renderEditDuplicateButtons(this.state.rowData.id) : <div> </div>}
        {
          this.props.townshipLocationsRateFetched.isLoading ?
          <div> </div> : this.renderCreateModal()
        }
        { 
          !this.state.showEditModal ?
          <div></div> : 
          <div>
            <LocationsRateForm
              modalName="modal-locations-rate-edit" 
              modalText="Edit a Location Rate" 
              submitType="EDIT"
              initialValues={this.state.rowData} 
              rowData={this.state.rowData}
              handleSuccess={this.handleSuccess}
              townshipCode={this.props.townshipCode}
            />
            <LocationsRateForm
              modalName="modal-locations-rate-duplicate" 
              modalText="Duplicate a Location Rate" 
              submitType="DUPLICATE"
              initialValues={this.state.rowData} 
              rowData={this.state.rowData}
              handleSuccess={this.handleSuccess}
              townshipCode={this.props.townshipCode}
            />
          </div>
        }

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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    townshipLocationsRateFetched: state.townshipLocationsRateFetched,
    townshipLocationsRateCreated: state.townshipLocationsRateCreated,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchLocationsRate,
    createLocationsRate,
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'locations-rate',
  fields
})(LocationsRate));
