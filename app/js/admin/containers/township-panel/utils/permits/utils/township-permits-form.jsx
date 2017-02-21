import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { reduxForm, change } from 'redux-form'
import moment from 'moment'

import {SimpleSelect} from 'react-selectize'

import {
        fetchTownshipPermitsList, 
        editTownshipPermitsList,
        createTownshipPermitsList,
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
'user_id',
'township_code',
'permit_name',
'name',
'user_name',
]

class TownshipPermitsForm extends React.Component {

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
    this.props.dispatch(change('township-permits-form', 'date_time', moment().format('YYYY-MM-DD HH:mm:ss')));

    switch(this.props.submitType) {
      case "CREATE":
        this.props.createTownshipPermitsList(data);
        break;
      case "EDIT":
        this.props.editTownshipPermitsList(data, data.id);
        break;
      case "DUPLICATE":
        this.props.createTownshipPermitsList(data);
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
    ajaxSelectizeGet('user_profile', 'user_name', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('parking_permits', 'permit_name', this.selectizeOptionsUpdate);

    this.props.dispatch(change('township-permits-form', 'date_time', moment().format('YYYY-MM-DD HH:mm:ss')));
    this.props.dispatch(change('township-permits-form', 'township_code', this.props.townshipCode));
    //ajaxSelectizeGet('townships_manager', 'manager_id', this.selectizeOptionsUpdate);
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
      dispatch(change('township-permits-form', 'date_time', event.target.value)); 
    });
  }

  componentDidUpdate() {
    if (this.props.townshipPermitsListCreated.isLoading) {
      } else if (!this.props.townshipPermitsListCreated.isLoading) {
        this.handleSuccess();
      }

    if (this.props.townshipPermitsListEdited.isLoading) {
      } else if (!this.props.townshipPermitsListEdited.isLoading) {
        this.handleSuccess();
      }

    if (this.props.townshipPermitsListCreated.isLoading) {
      } else if (!this.props.townshipPermitsListEdited.isLoading) {
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
        user_id,
        township_code,
        permit_name,
        name,
        user_name,
      },
      resetForm,
      submitting,
      dispatch
    } = this.props;

    const fields = [
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
                  objectKey={'user_name'} 
                  formName={'township-permits-form'} 
                  fieldName={'user_name'}
                  defaultData={this.props.rowData}
                  dispatch={dispatch} 
                />
                <AdminSelectize 
                  staticOptions={false}
                  fieldData={this.props.fields}
                  options={this.state.selectizeOptions}
                  objectKey={'user_id'} 
                  formName={'township-permits-form'} 
                  fieldName={'user_id'}
                  defaultData={this.props.rowData}
                  dispatch={dispatch} 
                />
                <AdminSelectize 
                  staticOptions={false}
                  fieldData={this.props.fields}
                  options={this.state.selectizeOptions}
                  objectKey={'permit_name'} 
                  formName={'township-permits-form'} 
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
    townshipPermitsListFetched: state.townshipPermitsListFetched,
    townshipPermitsListCreated: state.townshipPermitsListCreated,
    townshipPermitsListEdited: state.townshipPermitsListEdited,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipPermitsList, 
    editTownshipPermitsList, 
    createTownshipPermitsList, 
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'township-permits-form',
  fields,
  overwriteOnInitialValuesChange : true
})(TownshipPermitsForm));