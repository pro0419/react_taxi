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
  fetchViolationCode, 
  editViolationCode, 
  createViolationCode,  
  resetLoading} from '../../../../actions/actions-township-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

import { ajaxSelectizeGet, ajaxDelete } from '../../../../common/components/ajax-selectize.js'
import AdminSelectize from '../../../../common/components/admin-selectize.jsx'

import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";
import {states} from '../../../../constants/countries.js'

import _ from 'lodash';

export const fields = [ 
  'id',
  'date_time', 
  'violation_code',  
  'violation_description', 
  'violation_fee', 
  'township_code', 
  'violation_detail',  
  'section_law', 
  'section_num', 
  'state',
]

class InspectorSearchTicketForm extends React.Component {

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
    $('#modal-success').openModal();

    switch(this.props.submitType) {
      case "CREATE":
        this.props.createViolationCode(data);
        break;
      case "EDIT":
        this.props.editViolationCode(data, data.id);
        break;
      case "DUPLICATE":
        this.props.createViolationCode(data);
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
    this.props.dispatch(change('violation-code-form', 'township_code', this.props.townshipCode));
    this.props.dispatch(change('violation-code-form', 'date_time', moment().format('YYYY-MM-DD HH:mm:ss')));
  }

  componentDidMount() {
    const {
      resetForm,
      submitting,
      dispatch
    } = this.props

    $('.date_time')
    .bootstrapMaterialDatePicker({ time: true, format : 'YYYY-MM-DD HH:mm:ss' })
    .on('change', function(event) {
      dispatch(change('facilities-form', 'date_time', event.target.value)); 
    });
  }

  componentDidUpdate() {
    if (this.props.townshipViolationCodeEdited.isLoading) {
      } else if (!this.props.townshipViolationCodeEdited.isLoading) {
        this.handleSuccess();
      }

    if (this.props.townshipViolationCodeCreated.isLoading) {
      } else if (!this.props.townshipViolationCodeEdited.isLoading) {
        this.handleSuccess();
      }
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
        violation_code,  
        violation_description, 
        violation_fee, 
        township_code, 
        violation_detail,  
        section_law, 
        section_num, 
        state,
      },
      resetForm,
      submitting,
      dispatch
    } = this.props;

    const fields = [ 
      'violation_code',  
      'violation_description', 
      'violation_fee', 
      'violation_detail',  
      'section_law', 
      'section_num', 
    ]

    return fields.map((data) => {
      let placeHolder = _.find(this.props.townshipViolationCodeFetched.data.meta.schema.field, {'name': data});
      return( 
        <div className="col s12 admin-form-input">
          <div className="form-group">
            <div></div>
            <input type="text" placeholder={placeHolder.label} {...this.props.fields[data]}/>
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

    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });


    const statesList = states.map((data) => {
      return {label: data, value: data}
    })

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
                  staticOptions={true}
									options={statesList}
									objectKey={'state'} 
                  fieldName={'State'}
									formName={'violation-code-form'} 
									fieldData={this.props.fields}
									dispatch={dispatch}
								/>

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
    townshipViolationCodeFetched: state.townshipViolationCodeFetched,
    townshipViolationCodeCreated: state.townshipViolationCodeCreated,
    townshipViolationCodeEdited: state.townshipViolationCodeEdited,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchViolationCode, 
    editViolationCode, 
    createViolationCode, 
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'violation-code-form',
  fields,
  overwriteOnInitialValuesChange : true
})(InspectorSearchTicketForm));
