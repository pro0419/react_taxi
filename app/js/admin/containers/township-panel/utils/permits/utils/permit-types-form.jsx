import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { reduxForm, change } from 'redux-form'

import {SimpleSelect} from 'react-selectize'

import {
        fetchTownshipPermitTypes, 
        editTownshipPermitTypes,
        createTownshipPermitTypes,
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

export const fields = [ 
  'id',
  'permit_type', 
  'date_time'
]



class PermitTypesForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showEditDuplicateButtons: false,
      parkingLocationCode: null,
      showEditModal: false,
      rowData: null,
    }

    this.tempInputsEdit = this.tempInputsEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.selectizeOptionsUpdate = this.selectizeOptionsUpdate.bind(this);
  }

  handleSubmit(data) {
    $('#' + this.props.modalName).closeModal();
    switch(this.props.submitType) {
      case "CREATE":
        this.props.createTownshipPermitTypes(data);
        break;
      case "EDIT":
      console.log(data)
        this.props.editTownshipPermitTypes(data, data.id);
        break;
      case "DUPLICATE":
        this.props.createTownshipPermitTypes(data);
        break;
      default:
        console.log("No valid submit type was provided.");
        break;
    }
  }


  selectizeOptionsUpdate(valueName, keyName) {
    var optionsDataObject = {[keyName]: valueName};
    Object.assign(this.state.selectizeOptions, optionsDataObject);
  }

  componentWillMount() {
    this.props.dispatch(change('permit-types-form', 'date_time', moment().format('YYYY-MM-DD HH:mm:ss')));
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
    if (this.props.townshipPermitTypesCreated.isLoading) {
      } else if (!this.props.townshipPermitTypesCreated.isLoading) {
        this.handleSuccess();
      }

    if (this.props.townshipPermitTypesEdited.isLoading) {
      } else if (!this.props.townshipPermitTypesEdited.isLoading) {
        this.handleSuccess();
      }

    if (this.props.townshipPermitTypesCreated.isLoading) {
      } else if (!this.props.townshipPermitTypesEdited.isLoading) {
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
        dd,  
        location_name, 
        location_type, 
        full_address,  
        intersect_road1, 
        intersect_road2, 
        rows,  
        lots_per_rows, 
        total_lots,  
        parking_rate,  
        show_location, 
        country, 
        ff,  
        location_code, 
        state,
      },
      resetForm,
      submitting,
      dispatch
    } = this.props;

    const fields = [ 
      'permit_type'
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
    townshipPermitTypesFetched: state.townshipPermitTypesFetched,
    townshipPermitTypesCreated: state.townshipPermitTypesCreated,
    townshipPermitTypesEdited: state.townshipPermitTypesEdited,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipPermitTypes, 
    editTownshipPermitTypes, 
    createTownshipPermitTypes, 
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'permit-types-form',
  fields,
  overwriteOnInitialValuesChange : true
})(PermitTypesForm));