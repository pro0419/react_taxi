import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { reduxForm, change } from 'redux-form'
import datetime from 'node-datetime';

import {
  fetchTownshipPermitTypes, 
  createTownshipPermitTypes,
  resetLoading
} from '../../../../../actions/actions-township-panel.jsx'

import Spinner from '../../../../../common/components/spinner.jsx';
import Griddle from 'griddle-react'
import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import {customFilterComponent, customFilterFunction} from '../../../../../common/components/griddle-custom-filter.jsx'
import {ajaxSelectizeGet, ajaxSelectizeFilteredGet, ajaxDelete, ajaxGet, ajaxPost} from '../../../../../common/components/ajax-selectize.js'
import PermitTypesForm from './permit-types-form.jsx'

export const fields = [ 
  'id',
  'permit_type', 
  'date_time'
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

class PermitTypes extends React.Component {

  constructor(props) {
    super(props);

    this.renderPermitList = this.renderPermitList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.renderEditModal = this.renderEditModal.bind(this);
    this.renderCreateModal = this.renderCreateModal.bind(this);

    this.state = {
      showEditDuplicateButtons: false,
      parkingLocationCode: null,
      showEditModal: false,
      rowData: null,
      selectizeOptions: {}
    }

    var dt = datetime.create();
    var formattedDate = dt.format('m-d-Y H:M:S');
    this.props.dispatch(change('permit-types', 'date_time', formattedDate));
  }

  renderEditModal(rowData) {
    window.scrollTo(0, document.body.scrollHeight);
    this.setState({showEditDuplicateButtons: true, rowData: rowData, showEditModal: true})
  }

  componentDidMount() {
    this.props.fetchTownshipPermitTypes();
  }

  componentDidUpdate() {
    if (this.props.townshipPermitTypesCreated.isLoading) {
    } else if (!this.props.townshipPermitTypesCreated.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess(){
    this.props.resetLoading();
    this.props.fetchTownshipPermitTypes();
    this.setState({rowData: {}, showEditDuplicateButtons: false});
    $('#modal-success').openModal();
  }

  handleSubmit(data) {
    this.props.createTownshipPermitTypes(data);
  }

  renderCreateModal() {

    const {
      fields: {
        permit_type,
        date_time
      },
      resetForm,
      submitting
    } = this.props
    return(
      <PermitTypesForm
        modalName="modal-permit-types-create" 
        modalText="Create a Permit Type" 
        submitType="CREATE"
        rowData={this.state.rowData}
        handleSuccess={this.handleSuccess}
      />
    );


  }

  renderEditDuplicateButtons(locationCode) {
    return (
      <div className="container">
        <a
        onClick={() => {
          this.setState({showEditModal: true})
          $('#modal-permit-types-edit').openModal(); 
        window.scrollTo(0, 0);}}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">edit</i>
          <h4> Edit Permit Type: {locationCode} </h4>
        </a>
        <a
        onClick={() => {
          this.setState({showEditModal: true})
          $('#modal-permit-types-duplicate').openModal(); 
        window.scrollTo(0, 0);}}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">content_copy</i>
          <h4> Duplicate Permit Type: {locationCode} </h4>
        </a>

        <a
        onClick={() => $('#modal-delete').openModal() }
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">delete</i>
          <h4> Delete Permit Type: {locationCode} </h4>
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
                  ajaxDelete('permit_type', this.state.rowData.id, this.handleSuccess);
                  this.setState({showEditDuplicateButtons: false});
                  window.scrollTo(0, 0);
                }}>Yes</a>
              </div>
            </div>
          </div>
        </div>
        <PermitTypesForm
          initialValues={this.state.rowData} 
          handleSuccess={this.handleSuccess}
          modalName="modal-permit-types-edit" 
          modalText="Edit a Permit Type" 
          submitType="EDIT"
          initialValues={this.state.rowData} 
          rowData={this.state.rowData}
          handleSuccess={this.handleSuccess}
        />
        <PermitTypesForm
          initialValues={this.state.rowData} 
          handleSuccess={this.handleSuccess}
          modalName="modal-permit-types-duplicate" 
          modalText="Duplicate a Permit Type" 
          submitType="DUPLICATE"
          initialValues={this.state.rowData} 
          rowData={this.state.rowData}
          handleSuccess={this.handleSuccess}
        />
      </div>
    );
  }

  renderPermitList() {
    let filteredTypes = this.props.townshipPermitTypesFetched.data.resource;

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
      return( 
        <div>
          <Griddle
          tableClassName={'table table-bordered table-striped table-hover'}
          filterClassName={''}
          useGriddleStyles={false}
          results={filteredTypes}
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
          'permit_type', 
          'date_time']}
          />
        </div>
      );
  }

  render() {
    return (
      <div className="col s12">
        <nav>
          <div className="nav-wrapper nav-admin z-depth-2">
            <a className="brand-logo center">Permit Types</a>
          </div>
        </nav>
        <div className="card" style={{marginBottom: 40}}>

          <div className="township-list-container center-align">
            <ul className="collection z-depth-2">
              {this.props.townshipPermitTypesFetched.isLoading ? 
                <div className="center-align"> <Spinner /> </div> : this.renderPermitList()}
            </ul>
          </div>

          <div className="divider"/>

          <div className="center-align">
            <a
              className="modal-trigger waves-effect waves-light btn valign" 
              onClick={() => $('#modal-permit-types-create').openModal()}
              style={{margin: 10}}>Add New Permit Type</a>
          </div>
        </div>
        {this.renderCreateModal()}
        {this.state.showEditDuplicateButtons ? 
                this.renderEditDuplicateButtons(this.state.rowData.id) : <div> </div>}
                
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
    townshipPermitTypesFetched: state.townshipPermitTypesFetched,
    townshipPermitTypesCreated: state.townshipPermitTypesCreated
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipPermitTypes,
    createTownshipPermitTypes,
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'permit-types',
  fields
})(PermitTypes));
