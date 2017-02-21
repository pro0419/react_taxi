import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {reduxForm, change} from 'redux-form'
import {createFilter} from 'react-search-input';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import _ from 'lodash';

import { Link } from 'react-router'

import TownshipImageUpload from './township-image-upload.jsx';
import {SimpleSelect} from 'react-selectize'
import {countries, states} from '../../../constants/countries.js'
import {
  editTownship, 
  fetchTownshipList, 
  resetLoading,
} from '../../../actions/actions-township';

export const fields = [ 
	'id',
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
  'contact_email']

const validate = values => {
  const errors = {}
  if (!values.manager_id) {
    errors.manager_id = 'Required'
  } else if (values.manager_id.length > 15) {
    errors.manager_id = 'Must be 15 characters or less'
  }
  return errors
}

export class TownshipDetails extends React.Component {
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
    this.handleModalSuccess = this.handleModalSuccess.bind(this);
  }

  componentDidUpdate() {
    if (!this.props.townshipListEdited.isLoading) {
      this.handleSuccess();
      this.handleClose();
    }
  };

  handleSubmit(data) {
		this.setState({townshipData: data});
    this.props.editTownship(data, this.props.townshipData.id);
  }

  handleSuccess(){
    this.props.resetLoading();
    this.setState({editMode: false});
		this.props.handleSuccess(this.state.townshipData);
    $('#modal-success').openModal();
  }

	handleModalSuccess(townshipImage) {
		const townshipData = _.assignIn({}, this.state.townshipData, {township_logo: townshipImage, official_logo: townshipImage});
		this.props.handleSuccess(townshipData);
    this.setState({isShowingModal: false, editMode: false})
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
            <div className="card-content township-details-container">
              <div className="row">
                <div className="center-align">
                  <h4 style={{marginTop: 0}}>View Township</h4>
                  <p className="center-align">Enter edit mode to edit fields.</p>
                </div>
              </div>
              <div className="col s12">
                <div className="form-group">
                  <label>Country</label>
                  <input value={townshipData.country} />
                </div>
              </div>
              <div className="col s12">
                <div className="form-group">
                  <label>State</label>
                  <input value={townshipData.state} />
                </div>
              </div>
              <div className="col s12">
                <div className="form-group">
                  <label>City</label>
                  <input value={townshipData.city} />
                </div>
              </div>
              <div className="col s12">
                <div className="form-group">
                  <label>Zip</label>
                  <input value={townshipData.zip} />
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <div className="form-group">
                    <label>Address</label>
                    <input value={townshipData.address} />
                  </div>
                </div>
                <div className="col s12">
                  <div className="form-group">
                    <label>Phone</label>
                    <input value={townshipData.contact_number} />
                  </div>
                </div>
                <div className="col s12">
                  <div className="form-group">
                    <label>Email</label>
                    <input value={townshipData.contact_email} />
                  </div>
                </div>
                <div className="col s12">
                  <div className="form-group">
                    <label>Contact Person</label>
                    <input value={townshipData.contact_person} />
                  </div>
                </div>
                <div className="col s12">
                  <div className="form-group">
                    <label>Contact Title</label>
                    <input value={townshipData.contact_title} />
                  </div>
                </div>
                <div className="col s12">
                  <div className="form-group">
                    <label>Owner Type</label>
                    <input value={townshipData.manager_type} />
                  </div>
                </div>
                <div className="col s12">
                  <div className="form-group">
                    <label>Owner Name</label>
                    <input value={townshipData.lot_manager} />
                  </div>
                </div>
                <div className="col s12">
                  <div className="form-group">
                    <label>FacilityMgr Code</label>
                    <input value={townshipData.manager_id} />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-action">
              <div className="row marginless-row">
                <div className="col s12 m12 l6 center-align">
                  <Link to={{pathname: `/admin/township/${townshipData.id}`}} className="waves-effect waves-light btn">Go To Township</Link>
                </div>
                <div className="col s12 m12 l6 right">
                  <div className="center-align">
                    <a className="waves-effect waves-light btn btn-green" onClick={() => this.setState({editMode: true})}>Edit Township</a>
                  </div>
                </div>
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
              <div className="card-content township-edit-container">
                <div className="row">
                  <div className="center-align">
                    <h4 style={{marginTop: 0}}>Edit Township</h4>
                    <p className="center-align">Edit a township by changing the fields.</p>
                  </div>
                </div>            
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
                        dispatch(change("township-details", "country", value.value)); 
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
                        dispatch(change("township-details", "state", value.value)); 
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
                          dispatch(change("township-details", "manager_type", value.value)); 
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
                <div className="row marginless-row" style={{minWidth: 500}}>
                  <div className="col s12 m12 l5 center-align">
                    <Link to={{pathname: `/admin/township/${townshipData.id}`}} className="waves-effect waves-light btn">Go To Township</Link>
                  </div>
                  <div className="col s12 m12 l7 right">
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
          </form>
        );
      }
    } else {
      return (
        <div className="card-content center-align">
          <p>Select a Township</p>
        </div>
      );
    }
  }

  render() {
    const townshipData = this.props.townshipData;
		let dataValid;

    if (townshipData) {
      dataValid = true;
    } else {
      dataValid = false;
    }

    return (
      <div>
        <nav>
          <div className="nav-wrapper nav-admin z-depth-2">
            <a className="brand-logo center" onClick={() => this.handleFetch()}>Create an Account for Facilities Mgmt</a>
          </div>
        </nav>
        <div className="card">
          { 
						this.state.isShowingModal &&
						<ModalContainer onClose={this.handleClose}>
							<ModalDialog onClose={this.handleClose} style={{top: 90}}>
								<TownshipImageUpload townshipId={this.props.townshipData.id} handleModalSuccess={this.handleModalSuccess}/>
							</ModalDialog>
						</ModalContainer>
          }
          {this.renderDetails(dataValid, townshipData)}
        </div>
        <div id="modal-success" className="modal">
          <div className="modal-content">
            <h4>Success!</h4>
            <p>You've successfully sent the request!</p>
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

function mapStateToProps(state) {
  return {
    townshipListEdited: state.townshipListEdited,
    townshipListFetched: state.townshipListFetched,
    townshipDetails: state.townshipDetails,
    townshipDetailsFetched: state.townshipDetailsFetched
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    editTownship,
    resetLoading,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'township-details',
  fields,
  validate
})(TownshipDetails))

//Drop Down: Township, City,Village, State, Federal, Private, Commercial
/*
 {this.props.townshipListEdited.isLoading ?  
    console.log(this.props.townshipListEdited.data) 
    : console.log(this.props.townshipListEdited.isLoading)}
*/

/*
  let townshipDataFetched = this.props.townshipListFetched.data.resource;
  let filteredTownships = _.filter(townshipDataFetched, { 'id': this.props.townshipData.id});
  this.props.updateTownshipDetails(filteredTownships);
  this.props.fetchTownshipList();
  this.setState({townshipData: filteredTownships});
  this.forceUpdate();
*/