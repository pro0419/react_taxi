import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { reduxForm, change, reset, Field} from 'redux-form'
import moment from 'moment'

import {SimpleSelect} from 'react-selectize'

import {
        fetchTownshipParkingPermits, 
        editTownshipParkingPermits,
        createTownshipParkingPermits,
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
import AdminSelectize from '../../../../../common/components/admin-selectize.jsx'

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

class ParkingPermitsForm extends React.Component {

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
    this.props.dispatch(change('parking-permits-form', 'date_time', moment().format('YYYY-MM-DD HH:mm:ss')));
    switch(this.props.submitType) {
      case "CREATE":
        this.props.createTownshipParkingPermits(data);
        break;
      case "EDIT":
        this.props.editTownshipParkingPermits(data, data.id);
        break;
      case "DUPLICATE":
        this.props.createTownshipParkingPermits(data);
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
    ajaxSelectizeGet('permit_type', 'permit_type', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('scheme_type', 'scheme_type', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('township_permits', 'permit_name', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('manage_locations', 'location_name', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('manage_locations', 'full_address', this.selectizeOptionsUpdate);
    this.props.dispatch(change('parking-permits-form', 'date_time', moment().format('YYYY-MM-DD HH:mm:ss')));
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
      dispatch(change('parking-permits-form', 'date_time', event.target.value)); 
    });
  }

  componentDidUpdate() {
    if (this.props.townshipParkingPermitsCreated.isLoading) {
      } else if (!this.props.townshipParkingPermitsCreated.isLoading) {
        this.handleSuccess();
      }

    if (this.props.townshipParkingPermitsEdited.isLoading) {
      } else if (!this.props.townshipParkingPermitsEdited.isLoading) {
        this.handleSuccess();
      }

    if (this.props.townshipParkingPermitsCreated.isLoading) {
      } else if (!this.props.townshipParkingPermitsEdited.isLoading) {
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
        township_code,
        township_name,
        permit_type,
        permit_name,
        covered_locations,
        cost,
        year,
        location_address,
        active,
        scheme_type,
      },
      resetForm,
      submitting,
      dispatch
    } = this.props;

    const fields = [
      'covered_locations',
      'cost',
      'year',
      'active',
    ]
    
    return fields.map((data) => {
      return( 
        <div key={data.id} className="col s12 admin-form-input">
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
                  objectKey={'permit_type'} 
                  formName={'parking-permits-form'} 
                  fieldName={'permit_type'}
                  defaultData={this.props.rowData}
                  dispatch={dispatch} 
                />
                <AdminSelectize 
                  staticOptions={false}
                  fieldData={this.props.fields}
                  options={this.state.selectizeOptions}
                  objectKey={'scheme_type'} 
                  formName={'parking-permits-form'} 
                  fieldName={'scheme_type'}
                  defaultData={this.props.rowData}
                  dispatch={dispatch} 
                />
                <AdminSelectize 
                  staticOptions={false}
                  fieldData={this.props.fields}
                  options={this.state.selectizeOptions}
                  objectKey={'permit_name'} 
                  formName={'parking-permits-form'} 
                  fieldName={'permit_name'}
                  defaultData={this.props.rowData}
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
    townshipParkingPermitsFetched: state.townshipParkingPermitsFetched,
    townshipParkingPermitsEdited: state.townshipParkingPermitsEdited,
    townshipParkingPermitsCreated: state.townshipParkingPermitsCreated,

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipParkingPermits, 
    editTownshipParkingPermits, 
    createTownshipParkingPermits, 
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'parking-permits-form',
  fields,
})(ParkingPermitsForm));
//    TownshipParkingPermitsEdited: state.TownshipParkingPermitsEdited,

/*

                <AdminSelectize 
                  staticOptions={false}
                  fieldData={this.props.fields}
                  options={this.state.selectizeOptions}
                  objectKey={'full_address'} 
                  formName={'parking-permits-form'} 
                  fieldName={'location_address'}
                  defaultData={this.props.rowData}
                  dispatch={dispatch} 
                />
                <AdminSelectize 
                  staticOptions={false}
                  fieldData={this.props.fields}
                  options={this.state.selectizeOptions}
                  objectKey={'location_name'} 
                  formName={'parking-permits-form'} 
                  fieldName={'covered_locations'}
                  defaultData={this.props.rowData}
                  dispatch={dispatch} 
                />
                */