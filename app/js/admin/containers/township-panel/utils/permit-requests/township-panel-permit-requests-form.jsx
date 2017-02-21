import React from 'react';
import { reduxForm, change } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import moment from 'moment'
import {SimpleSelect} from "react-selectize"
import { browserHistory } from 'react-router'
import {createFilter} from 'react-search-input';

import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'
import {optionsSelectize} from '../../../../common/components/options-selectize.js'

import {
  fetchTownshipPermitRequests, 
  editTownshipPermitRequests, 
  fetchTownshipPermitsList,
  createTownshipPermitsList,
  fetchTownshipParkingPermits, 
  createTownshipParkingPermits, 
  resetLoading
} from '../../../../actions/actions-township-panel.jsx';

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

import { ajaxSelectizeGet, ajaxDelete, ajaxPost } from '../../../../common/components/ajax-selectize.js'
import AdminSelectize from '../../../../common/components/admin-selectize.jsx';
import {countries, states} from '../../../../constants/countries.js'

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

class TownshipPanelPermitRequestsForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showEditDuplicateButtons: false,
      parkingLocationCode: null,
      showEditModal: false,
      rowData: null,
      selectizeOptions: {}
    }

    this.tempInputsEdit = this.tempInputsEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.selectizeOptionsUpdate = this.selectizeOptionsUpdate.bind(this);
  }

  handleSubmit(data) {
    
    $('#' + this.props.modalName).closeModal();
    
    console.log(data)

    switch(this.props.submitType) {
      case "CREATE":
        ajaxPost('permit_subscription', data, this.handleSuccess)
        break;
      case "EDIT":
        //this.props.editTownshipLocations(data, data.id);
        break;
      case "DUPLICATE":
        //this.props.createTownshipLocations(data);
        break;
      default:
        console.log("No valid submit type was provided.");
        break;
    }
  }


  selectizeOptionsUpdate(valueName, keyName) {
    var optionsDataObject = {[keyName]: valueName};
    Object.assign(this.state.selectizeOptions, optionsDataObject);
    this.forceUpdate();
  }

  componentWillMount() {
    ajaxSelectizeGet('user_profile', 'user_id', this.selectizeOptionsUpdate);
    //ajaxSelectizeGet('user_profile', 'user_name', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('scheme_type', 'scheme_type', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('permit_type', 'permit_type', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('parking_permits', 'permit_name', this.selectizeOptionsUpdate);

    this.props.dispatch(change('permit-requests-form', 'date_time', moment().format('YYYY-MM-DD HH:mm:ss')));
    this.props.dispatch(change('permit-requests-form', 'date_action', moment().format('YYYY-MM-DD HH:mm:ss')));
    this.props.dispatch(change('permit-requests-form', 'township_code', this.props.townshipCode));
    this.props.dispatch(change('permit-requests-form', 'approved', 'NO'));
    this.props.dispatch(change('permit-requests-form', 'status', 'INACTIVE'));
  }

  componentDidMount() {
    const {
      resetForm,
      submitting,
      dispatch
    } = this.props
  }

  componentDidUpdate() {
    /*
    if (this.props.townshipLocationsCreated.isLoading) {
      } else if (!this.props.townshipLocationsCreated.isLoading) {
        this.handleSuccess();
      }

    if (this.props.townshipLocationsEdited.isLoading) {
      } else if (!this.props.townshipLocationsEdited.isLoading) {
        this.handleSuccess();
      }

    if (this.props.townshipLocationsCreated.isLoading) {
      } else if (!this.props.townshipLocationsEdited.isLoading) {
        this.handleSuccess();
      }
      */
  };

  handleSuccess(){
    this.props.resetLoading();
    this.props.handleSuccess();
  }

  tempInputsEdit(initialValues) {
     const {
      fields: {   
        id,
        date_time,
        user_id,
        township_code,
        township_name,
        permit_type,
        permit_name,
        residency_proof,
        approved,
        date_action,
        status,
        paid,
        user_comments,
        town_comments,
        logo,
        scheme_type,
        first_contact_date,
        permit_status_image,
        rate,
        user_name,
        signature,
      },
      resetForm,
      submitting,
      dispatch
    } = this.props;

    const fields = [     
      'approved',
      'status',
      'paid',
      'user_comments',
      'town_comments',
      'first_contact_date',
      'rate',
    ]

    return fields.map((data) => {
      return( 
        <div className="col s12 admin-form-input">
          <div className="form-group">
            <div></div>
            <input type="text" placeholder={data} {...this.props.fields[data]}/>
          </div>
        </div>
      );
    }); 
  }

  render() {

    const {
      resetForm,
      submitting,
      dispatch
    } = this.props

    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)} style={{margin: 0}}>
          <div id={this.props.modalName} className="modal modal-fixed-footer admin-parking-modal">
            <nav>
							<div className="nav-wrapper nav-admin">
								<a className="brand-logo center">{this.props.modalText}</a>
								<i 
								className="material-icons right right-align clickable" 
								style={{marginRight: 15, lineHeight: "55px"}}
								onClick={() => {
									$('#' + this.props.modalName).closeModal();
								}}>close</i>
							</div>
						</nav>
            <div className="modal-content">

              <div className="row">
                <div className="center-align">
                  <h4>{this.props.modalText}</h4>
                  <p className="center-align">{this.props.modalText} by filling out the fields.</p>
                </div>
              </div>

              <div className="row">  

                <AdminSelectize 
                staticOptions={false}
                fieldData={this.props.fields}
                options={this.state.selectizeOptions}
                objectKey={'user_id'} 
                formName={'permit-requests-form'} 
                fieldName={'user_id'}
                dispatch={dispatch} />

                <AdminSelectize 
                staticOptions={false}
                fieldData={this.props.fields}
                options={this.state.selectizeOptions}
                objectKey={'user_id'} 
                formName={'permit-requests-form'} 
                fieldName={'user_name'}
                dispatch={dispatch} />

                <AdminSelectize 
                staticOptions={false}
                fieldData={this.props.fields}
                options={this.state.selectizeOptions}
                objectKey={'scheme_type'} 
                formName={'permit-requests-form'} 
                fieldName={'scheme_type'}
                dispatch={dispatch} />

                <AdminSelectize 
                staticOptions={false}
                fieldData={this.props.fields}
                options={this.state.selectizeOptions}
                objectKey={'permit_type'} 
                formName={'permit-requests-form'} 
                fieldName={'permit_type'}
                dispatch={dispatch} />

                <AdminSelectize 
                staticOptions={false}
                fieldData={this.props.fields}
                options={this.state.selectizeOptions}
                objectKey={'permit_name'} 
                formName={'permit-requests-form'} 
                fieldName={'permit_name'}
                dispatch={dispatch} />

                {this.tempInputsEdit(this.props.initialValues)}

              </div>
                
            </div>

            <div className="modal-footer">
              <div className="row marginless-row">
                <div className="col s12 center-align">
                  <button 
                  type="submit" 
                  disabled={submitting} 
                  className="waves-effect waves-light btn">{this.props.modalText}</button>
                </div>
              </div>
            </div>
          </div>
        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'permit-requests-form',
  fields,
  overwriteOnInitialValuesChange : true
})(TownshipPanelPermitRequestsForm));