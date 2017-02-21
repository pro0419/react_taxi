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
  fetchParkingRules, 
  editParkingRules, 
  createParkingRules,  
  resetLoading} from '../../../../actions/actions-township-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

import { ajaxSelectizeGet, ajaxDelete } from '../../../../common/components/ajax-selectize.js'
import AdminSelectize from '../../../../common/components/admin-selectize.jsx'
import {countries, states} from '../../../../constants/countries.js'

export const fields = [ 
  'date_time', 
  'location_code', 
  'location_name', 
  'time_rule', 
  'day_rule',  
  'max_time',  
  'enforced',  
  'date_special_enforce',  
  'custom_notice', 
  'active',
  'date',  
  'city',  
  'state', 
  'pricing', 
  'pricing_duration', 
  'zip_code',  
  'start_time',  
  'end_time',  
  'this_day',  
  'parking_times', 
  'no_parking_times',  
  'start_end_rule',  
  'this_hour', 
  'max_hours', 
  'start_hour',  
  'end_hour',
]

class TownshipPanelParkingRulesForm extends React.Component {

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
    this.props.dispatch(change('parking-rules-form', 'date_time', moment().format('YYYY-MM-DD HH:mm:ss')));

    switch(this.props.submitType) {
      case "CREATE":
        this.props.createParkingRules(data);
        break;
      case "EDIT":
        this.props.editParkingRules(data, data.id);
        break;
      case "DUPLICATE":
        this.props.createParkingRules(data);
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
    ajaxSelectizeGet('locations_rate', 'rate', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('manage_locations', 'location_code', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('manage_locations', 'location_name', this.selectizeOptionsUpdate);
  }

  componentDidMount() {
    const {
      resetForm,
      submitting,
      dispatch
    } = this.props

    $('.start_time')
    .bootstrapMaterialDatePicker({ date: false, format : 'HH:mm:ss' })
    .on('change', function(event) {
      dispatch(change('parking-rules-form', 'start_time', event.target.value)); 
    });

    $('.end_time')
    .bootstrapMaterialDatePicker({ date: false, format : 'HH:mm:ss' })
    .on('change', function(event) {
      dispatch(change('parking-rules-form', 'end_time', event.target.value)); 
    });

    $('.date')
    .bootstrapMaterialDatePicker({ time: false, format : 'YYYY-MM-DD' })
    .on('change', function(event) {
      dispatch(change('parking-rules-form', 'date', event.target.value)); 
    });

    $('.date_time')
    .bootstrapMaterialDatePicker({ time: true, format : 'YYYY-MM-DD HH:mm:ss' })
    .on('change', function(event) {
      dispatch(change('parking-rules-form', 'date_time', event.target.value)); 
    });
  }

  componentDidUpdate() {
    if (this.props.townshipParkingRulesCreated.isLoading) {
      } else if (!this.props.townshipParkingRulesCreated.isLoading) {
        this.handleSuccess();
      }

    if (this.props.townshipParkingRulesEdited.isLoading) {
      } else if (!this.props.townshipParkingRulesEdited.isLoading) {
        this.handleSuccess();
      }

    if (this.props.townshipParkingRulesCreated.isLoading) {
      } else if (!this.props.townshipParkingRulesEdited.isLoading) {
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
        date_time, 
        location_code, 
        location_name, 
        time_rule, 
        day_rule,  
        max_time,  
        enforced,  
        date_special_enforce,  
        custom_notice, 
        active,
        date,  
        city,  
        state, 
        pricing, 
        pricing_duration, 
        zip_code,  
        start_time,  
        end_time,  
        this_day,  
        parking_times, 
        no_parking_times,  
        start_end_rule,  
        this_hour, 
        max_hours, 
        start_hour,  
        end_hour,
      },
      resetForm,
      submitting,
      dispatch
    } = this.props;

    const fields = [ 
    'time_rule', 
    'day_rule',  
    'max_time',  
    'enforced',  
    'date_special_enforce',  
    'custom_notice', 
    'active',
    'date',  
    'city',   
    'pricing', 
    'pricing_duration', 
    'zip_code',   
    'this_day',  
    'parking_times', 
    'no_parking_times',  
    'start_end_rule',  
    'this_hour', 
    'max_hours', 
    'start_hour',  
    'end_hour',
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

    const countriesList = countries.map((data) => {
      return {label: data, value: data}
    })
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
                formName={'parking-rules-form'} 
                fieldData={this.props.fields}
                dispatch={dispatch}
              />

              <div className="col s12 admin-form-input">
                <div className="form-group">
                  <input id="date" className="date" placeholder="Date" type="text"/>
                </div>
              </div>

              {this.tempInputsEdit(this.props.initialValues)}

              <div className="col s12 admin-form-input">
                <div className="form-group">
                  <input id="start_time" className="start_time" placeholder="Start Time" type="text"/>
                </div>
              </div>

              <div className="col s12 admin-form-input">
                <div className="form-group">
                  <input id="end_time" className="end_time" placeholder="End Time" type="text"/>
                </div>
              </div>

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
    townshipParkingRulesFetched: state.townshipParkingRulesFetched,
    townshipParkingRulesCreated: state.townshipParkingRulesCreated,
    townshipParkingRulesEdited: state.townshipParkingRulesEdited,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchParkingRules, 
    editParkingRules, 
    createParkingRules, 
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'parking-rules-form',
  fields,
  overwriteOnInitialValuesChange : true
})(TownshipPanelParkingRulesForm));

    //this.props.dispatch(change('parking-rules-form', 'date_time', moment().format('YYYY-MM-DD HH:mm:ss')));
    //this.props.dispatch(change('parking-rules-form', 'date_time', this.props.locationCode);