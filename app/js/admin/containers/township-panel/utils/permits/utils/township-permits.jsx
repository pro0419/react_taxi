import React from 'react';
import { reduxForm, change } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import datetime from 'node-datetime';
import {SimpleSelect} from "react-selectize"

import {
  fetchTownshipPermitsList,
  createTownshipPermitsList,
  fetchTownshipUsers,
  resetLoading} from '../../../../../actions/actions-township-panel.jsx'

import Spinner from '../../../../../common/components/spinner.jsx';
import {optionsSelectize} from '../../../../../common/components/options-selectize.js';

import Griddle from 'griddle-react'
import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import {customFilterComponent, customFilterFunction} from '../../../../../common/components/griddle-custom-filter.jsx'
import TownshipPermitsForm from './township-permits-form.jsx'
import {ajaxSelectizeGet, ajaxSelectizeFilteredGet, ajaxDelete, ajaxGet, ajaxPost} from '../../../../../common/components/ajax-selectize.js'


const fields = [
  'id',
  'date_time',
  'user_id',
  'township_code',
  'permit_name',
  'name',
  'user_name',
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


class TownshipPermits extends React.Component {

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
    this.props.fetchTownshipPermitsList(this.props.townshipCode);
    this.props.fetchTownshipUsers(this.props.townshipCode);
  }

  componentDidUpdate() {
    if (this.props.townshipPermitsListCreated.isLoading) {
    } else if (!this.props.townshipPermitsListCreated.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess() {
    this.props.resetLoading();
    this.props.fetchTownshipPermitsList(this.props.townshipCode);
    this.setState({rowData: {}, showEditDuplicateButtons: false});
    $('#modal-success2').openModal();
  }

  handleSubmit(data) {
    this.props.createTownshipPermitsList(data);
  }

  renderEditModal(rowData) {
    window.scrollTo(0, document.body.scrollHeight);
    this.setState({ showEditDuplicateButtons: true, rowData: rowData, showEditModal: true })
  }

  renderCreateModal() {

    const {
      fields: {
        user_id,
        township_code,
        permit_name,
        name,
      },
      resetForm,
      submitting,
      dispatch
    } = this.props

    return (
      <TownshipPermitsForm
        modalName="modal-township-permits-create"
        modalText="Create a Township Permit"
        submitType="CREATE"
        rowData={this.state.rowData}
        handleSuccess={this.handleSuccess}
        townshipCode={this.props.townshipCode}
      />
    );

  }

  renderPermitsTable() {
    let filteredPermits = this.props.townshipPermitsListFetched.data.resource;

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
        />
    );
  }

  renderEditDuplicateButtons(locationCode) {
    return (
      <div className="container" style={{ marginTop: 40 }}>
        <a
          onClick={() => {
            this.setState({ showEditModal: true })
            $('#modal-township-permits-edit').openModal();
             window.scrollTo(0, 0)
          } }
          className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">edit</i>
          <h4> Edit Township Permit: {locationCode} </h4>
        </a>
        <a
          onClick={() => {
            this.setState({ showEditModal: true })
             window.scrollTo(0, 0)
            $('#modal-township-permits-duplicate').openModal();
          } }
          className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">content_copy</i>
          <h4> Duplicate Township Permit: {locationCode} </h4>
        </a>

        <a
          onClick={() => $('#modal-delete').openModal() }
          className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">delete </i>
          <h4> Delete Township Permit: {locationCode} </h4>
        </a>
        <div id="modal-delete" className="modal" style={{ overflowX: "hidden" }}>
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
                  } }>No</a>
              </div>
              <div className="col s3">
                <a className="waves-effect waves-light btn btn-green"
                  onClick={() => {
                    $('#modal-delete').closeModal()
                    ajaxDelete('township_permits', this.state.rowData.id, this.handleSuccess);
                    this.setState({ showEditDuplicateButtons: false });
                    window.scrollTo(0, 0);
                  } }>Yes</a>
              </div>
            </div>
          </div>
        </div>

        <TownshipPermitsForm
          initialValues={this.state.rowData}
          handleSuccess={this.handleSuccess}
          modalName="modal-township-permits-edit"
          modalText="Edit a Township Permit"
          submitType="EDIT"
          initialValues={this.state.rowData}
          rowData={this.state.rowData}
          handleSuccess={this.handleSuccess}
          townshipCode={this.props.townshipCode}
          />
        <TownshipPermitsForm
          initialValues={this.state.rowData}
          handleSuccess={this.handleSuccess}
          modalName="modal-township-permits-duplicate"
          modalText="Duplicate a Township Permit"
          submitType="DUPLICATE"
          initialValues={this.state.rowData}
          rowData={this.state.rowData}
          handleSuccess={this.handleSuccess}
          townshipCode={this.props.townshipCode}
          />
      </div>
    );
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper nav-admin z-depth-2">
            <a className="brand-logo center">Township Permits</a>
          </div>
        </nav>
        <div className="card" style={{marginBottom: 40}}>
          {this.props.townshipPermitsListFetched.isLoading ?
            <div className="center-align"> <Spinner /> </div> : this.renderPermitsTable() }

          <div className="divider"/>

          <div className="center-align">
            <a
              className="modal-trigger waves-effect waves-light btn valign"
              onClick={() => {
              window.scrollTo(0, 0);
              $('#modal-township-permits-create').openModal(); 
              }}
              style={{ margin: 10 }}>Add New Township Permit</a>
          </div>
          
        </div>
        {this.renderCreateModal()}
        {this.state.showEditDuplicateButtons ?
          this.renderEditDuplicateButtons(this.state.rowData.id) : <div> </div>}

        <div id="modal-success2" className="modal">
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
    townshipPermitsListFetched: state.townshipPermitsListFetched,
    townshipPermitsListCreated: state.townshipPermitsListCreated,
    townshipUsersFetched: state.townshipUsersFetched
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipPermitsList,
    createTownshipPermitsList,
    resetLoading,
    fetchTownshipUsers
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'township-permits',
  fields
})(TownshipPermits));


/*

<Select
  name={this.props.field.name}
  value={value}
  options={options}
  onChange={::this.onChange}
  onBlur={() => this.props.field.onBlur(this.props.field.value)}
  placeholder={this.props.placeholder}
  noResultsText={this.state.noResultsText}
  disabled={this.props.submitting} />
*/

/*

  <select value='236' onChange={(event) => 
    this.props.dispatch(change('township-permits', 'user_id', event))
  } >
    <option disabled selected>Choose your option</option>
    <option value="Test">Option 1</option>
    <option value="Test2">Option 2</option>
    <option value="Test3">Option 3</option>
  </select>

*/