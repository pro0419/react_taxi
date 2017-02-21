import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {reduxForm, change} from 'redux-form'
import {createFilter} from 'react-search-input';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import _ from 'lodash';

import { Link } from 'react-router'
import {countries, states} from '../../../constants/countries.js'
import TownshipImageUpload from '../../township-list/utils/township-image-upload.jsx';
import Spinner from '../../../common/components/spinner.jsx';
import {SimpleSelect} from 'react-selectize'
import {
  editTownship, 
  fetchTownshipList, 
  updateTownshipDetails, 
  resetLoading,
  resetTownshipDetails,
  fetchTownshipDetails
} from '../../../actions/actions-township';

export const fields = [ 
  'manager_id', 
  'manager_type', 
  'lot_manager', 
  'address', 
  'state', 
  'city',
  'country',
  'zip',
  'contact_person',
  'contact_title',
  'contact_number',
  'contact_email'
  ]

const validate = values => {
  const errors = {}
  if (!values.manager_id) {
    errors.manager_id = 'Required'
  } else if (values.manager_id.length > 15) {
    errors.manager_id = 'Must be 15 characters or less'
  }
  return errors
}

class TownshipDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      townshipData: null,
      editMode: false,
      isShowingModal: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  componentWillMount() {
    this.props.fetchTownshipList();
  }

  componentDidUpdate() {
    if (!this.props.townshipListEdited.isLoading || !this.props.uploadedImage.isLoading) {
      this.handleClose();
      this.handleSuccess();
    } 
  };

  handleSubmit(data) {
    const township = _.find(this.props.townshipListFetched.data.resource, {manager_id: this.props.townshipId});
    console.log(township)
    console.log(data)
    this.props.editTownship(data, township.id);
  }

  handleSuccess(){
    this.props.resetLoading();
    this.props.fetchTownshipList();
    this.setState({editMode: false});
    this.props.handleSuccess();
    $('#modal-success').openModal();
  }

  handleClick() {
    this.setState({isShowingModal: true})
  } 
  handleClose() {
    this.setState({isShowingModal: false})
  } 

  renderDetails(dataValid, townshipData) {
    const {
      fields: {
        manager_id,
        manager_type,
        lot_manager,
        address,
        state,
        city,
        country,
        zip,
        contact_person,
        contact_title,
        contact_number,
        contact_email },
      resetForm,
      submitting,
      dispatch
    } = this.props
    let editMode = this.state.editMode;
    const countriesList = countries.map((data) => {
      return {label: data, value: data}
    })
    const statesList = states.map((data) => {
      return {label: data, value: data}
    })
    if(dataValid) {
      if (editMode === false) {
        return (
          <div>
            <div className="card-image" style={{backgroundColor: "#2E2E2E"}}>
              <img src={townshipData.township_logo} 
              className="township-details-image circle responsive-img" />
              <span className="card-title valign-wrapper">{townshipData.city}</span>
              <div className="fixed-action-btn horizontal image-upload-button">
                <a className="btn-floating btn-large btn-green waves-effect waves-light" onClick={() => this.handleClick()}>
                  <i className="large material-icons">file_upload</i>
                </a>
                <ul>
                  <li className="image-upload-text"> Upload Image </li>
                </ul>
              </div>
            </div>
            <div className="card-content township-details-container" style={{overflowX: "hidden"}}>
              <div className="row">
                <div className="center-align">
                  <h4 style={{marginTop: 0}}>View Township</h4>
                  <p className="center-align">Enter edit mode to edit fields.</p>
                </div>
              </div>
              <div className="row">
                <div className="col s12 admin-form-input">
                  <div className="form-group">
                    <label>Country</label>
                    <input value={townshipData.country} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
                <div className="col s12 admin-form-input">
                  <div className="form-group">
                    <label>State</label>
                    <input value={townshipData.state} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
                <div className="col s12 admin-form-input">
                  <div className="form-group">
                    <label>City</label>
                    <input value={townshipData.city} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
                <div className="col s12 admin-form-input">
                  <div className="form-group">
                    <label>Zip</label>
                    <input value={townshipData.zip} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
                  <div className="col s12 admin-form-input">
                    <div className="form-group">
                      <label>Address</label>
                      <input value={townshipData.address} onChange={() => this.setState({townshipData: townshipData})}/>
                    </div>
                  </div>
                  <div className="col s12 admin-form-input">
                    <div className="form-group">
                      <label>Phone</label>
                      <input value={townshipData.contact_number} onChange={() => this.setState({townshipData: townshipData})}/>
                    </div>
                  </div>
                  <div className="col s12 admin-form-input">
                    <div className="form-group">
                      <label>Email</label>
                      <input value={townshipData.contact_email} onChange={() => this.setState({townshipData: townshipData})}/>
                    </div>
                  </div>
                  <div className="col s12 admin-form-input">
                    <div className="form-group">
                      <label>Contact Person</label>
                      <input value={townshipData.contact_person} onChange={() => this.setState({townshipData: townshipData})}/>
                    </div>
                  </div>
                  <div className="col s12 admin-form-input">
                    <div className="form-group">
                      <label>Contact Title</label>
                      <input value={townshipData.contact_title} onChange={() => this.setState({townshipData: townshipData})}/>
                    </div>
                  </div>
                  <div className="col s12 admin-form-input">
                    <div className="form-group">
                      <label>Owner Type</label>
                      <input value={townshipData.manager_type} onChange={() => this.setState({townshipData: townshipData})}/>
                    </div>
                  </div>
                  <div className="col s12 admin-form-input">
                    <div className="form-group">
                      <label>Owner Name</label>
                      <input value={townshipData.lot_manager} onChange={() => this.setState({townshipData: townshipData})}/>
                    </div>
                  </div>
                  <div className="col s12 admin-form-input">
                    <div className="form-group">
                      <label>FacilityMgr Code</label>
                      <input value={townshipData.manager_id} onChange={() => this.setState({townshipData: townshipData})}/>
                    </div>
                  </div>
              </div>
            </div>
            <div className="card-action">
              <div className="row marginless-row">
                  <a className="waves-effect waves-light btn btn-green col s12 m12 l8 offset-l2" onClick={() => this.setState({editMode: true})}>Edit Township</a>
              </div>
            </div>
          </div>
        );
      } else if (editMode === true){
        return (
          <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
            <div>
              <div className="card-image" style={{backgroundColor: "#2E2E2E"}}>
              <img src={townshipData.township_logo} 
              className="township-details-image circle responsive-img" />
              <span className="card-title valign-wrapper">{townshipData.city}</span>
              <div className="fixed-action-btn horizontal image-upload-button">
                <a className="btn-floating btn-large btn-green waves-effect waves-light" onClick={() => this.handleClick()}>
                  <i className="large material-icons">file_upload</i>
                </a>
                <ul>
                  <li className="image-upload-text"> Upload Image </li>
                </ul>
              </div>
            </div>
              <div className="card-content township-edit-container" style={{overflowX: "hidden"}}>
                <div className="row">
                  <div className="center-align">
                    <h4 style={{marginTop: 0}}>Edit Township</h4>
                    <p className="center-align">Edit a township by changing the fields.</p>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col s12" style={{paddingBottom: 15}}>
                  <div className="form-group">
                    <label>Country</label>
                    <div clasName="input-field col s12">
                      <SimpleSelect 
                      style={{marginTop: 5}}
                      options = {countriesList} 
                      placeholder = "Owner Type"
                      theme = "default" 
                      defaultValue = {{label: townshipData.country, value: townshipData.country}}
                      onValueChange = {(value) => {
                        dispatch(change("township-panel-details", "country", value.value)); 
                      }}></SimpleSelect>
                      </div>
                  </div>
                </div>
                <div className="col s12" style={{paddingBottom: 15}}>
                  <div className="form-group">
                    <label>State</label>
                    <div clasName="input-field col s12">
                      <SimpleSelect 
                      style={{marginTop: 5}}
                      options = {statesList} 
                      placeholder = "States"
                      theme = "default" 
                      defaultValue = {{label: townshipData.state, value: townshipData.state}}
                      onValueChange = {(value) => {
                        dispatch(change("township-panel-details", "state", value.value)); 
                      }}></SimpleSelect>
                      </div>
                    </div>
                  </div>
                  <div className="col s12">
                    <div className="form-group">
                      <label>City</label>
                      <input type="text" placeholder="City" {...city}/>
                    </div>
                  </div>
                  <div className="col s12">
                    <div className="form-group">
                      <label>Zip</label>
                      <input type="number" placeholder="Zip" {...zip}/>
                    </div>
                  </div>
                  <div className="col s12">
                    <div className="form-group">
                      <label>Address</label>
                      <input type="text" placeholder="Address" {...address}/>
                    </div>
                  </div>
                  <div className="col s12">
                    <div className="form-group">
                      <label>Phone</label>
                      <input type="text" placeholder="Contact Number" {...contact_number}/>
                    </div>
                  </div>
                  <div className="col s12">
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" placeholder="Contact Email" {...contact_email}/>
                    </div>
                  </div>
                  <div className="col s12">
                    <div className="form-group">
                      <label>Contact Person</label>
                      <input type="text" placeholder="Contact Person" {...contact_person}/>
                    </div>
                  </div>
                  <div className="col s12">
                    <div className="form-group">
                      <label>Contact Title</label>
                      <input type="text" placeholder="Contact Title" {...contact_title}/>
                    </div>
                  </div>
                  <div className="col s12" style={{paddingBottom: 15}}>
                    <div className="form-group">
                      <label>Owner Type</label>
                      <div clasName="input-field col s12">
                        <SimpleSelect 
                        style={{marginTop: 5}}
                        options = {[
                          {label: "Township", value: "TOWNSHIP"},
                          {label: "City", value: "CITY"},
                          {label: "Village", value: "VILLAGE"},
                          {label: "State", value: "STATE"},
                          {label: "Federal", value: "FEDERAL"},
                          {label: "Private", value: "PRIVATE"},
                          {label: "Commercial", value: "COMMERCIAL"},
                        ]} 
                        placeholder = "Owner Type"
                        theme = "default" 
                        defaultValue = {{label: townshipData.manager_type, value: townshipData.manager_type}}
                        onValueChange = {(value) => {
                          dispatch(change("township-panel-details", "manager_type", value.value)); 
                        }}></SimpleSelect>
                      </div>
                    </div>
                  </div>
                  <div className="col s12">
                    <div className="form-group">
                      <label>Owner Name</label>
                      <input type="text" placeholder="Lot Manager" {...lot_manager}/>
                    </div>
                  </div>  
                  <div className="col s12">
                    <div className="form-group">
                      <label>FacilityMgr Code</label>
                      <input type="text" placeholder="Manager ID" {...manager_id}/>
                    </div>
                    {manager_id.touched && manager_id.error && <div className="form-required">{manager_id.error}</div>}
                  </div>          
                </div>
              </div>
              
              <div className="card-action">
                <div className="row marginless-row">
                  <div className="col s12 m12 l6 center-align">
                    <Link to={{pathname: `/admin/township/${townshipData.id}`}} className="waves-effect waves-light btn">Go To Township</Link>
                  </div>
                  <div className="col s12 m12 l6 right">
                    <div className="row marginless-row">
                      <div className="col s12 m12 l6 right center-align">
                        <button 
                        type="submit" 
                        disabled={submitting} 
                        className="waves-effect waves-light btn btn-green">Save Township</button>
                      </div>
                      <div className="col s12 m12 l6 right right-align">
                        <a className="waves-effect waves-light btn btn-yellow" onClick={() => {this.setState({editMode: false}); resetForm();}}>Cancel</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </form>
        );
      }
    } else {
      return (
        <div className="card-content center-align animated fadeIn" style={{overflowX: "hidden"}}>
          <div className="center-align animated fadeIn"> <Spinner /> </div> 
        </div>
      );
    }
  }

  render() {
    let dataValid;
    let townshipData = this.props.townshipData;
    let townshipId = this.props.townshipCode;
    if (townshipData !== null && townshipData !== undefined) {
      dataValid = true;
    } else {
      dataValid = false;
    }

    return (
      <div style={{marginTop: 40}}>
        <nav>
          <div className="nav-wrapper nav-admin z-depth-2">
            <a className="brand-logo center">Township Details</a>
          </div>
        </nav>
        <div className="card">
          { 

          this.state.isShowingModal &&
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose} style={{top: 120}}>
              <TownshipImageUpload townshipId={this.props.townshipCode} />
            </ModalDialog>
          </ModalContainer>
          }

          {this.props.townshipListFetched.isLoading ?  
            <div className="center-align"> 
              <Spinner /> 
              <div> Loading... </div> 
            </div>
          : this.renderDetails(dataValid, townshipData)}
        </div>

        <div id="modal-success" className="modal">
          <div className="modal-content">
            <h4>Success!</h4>
            <p>You've successfuly sent the request!</p>
          </div>
          <div className="modal-footer">
            <button 
            href="#" 
            className=" modal-action modal-close waves-effect waves-green btn-flat"
            onClick={() => this.forceUpdate()}>Close</button>
          </div>
        </div>
      </div>
    );
  }
}


TownshipDetails.propTypes = {
  fields: React.PropTypes.object.isRequired,
  resetForm: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return {
    townshipListEdited: state.townshipListEdited,
    townshipListFetched: state.townshipListFetched,
    townshipDetails: state.townshipDetails,
    townshipDetailsFetched: state.townshipDetailsFetched,
    uploadedImage: state.uploadedImage
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    editTownship,
    fetchTownshipList,
    updateTownshipDetails,
    resetLoading,
    resetTownshipDetails,
    fetchTownshipDetails,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'township-panel-details',
  fields,
  validate
})(TownshipDetails))
