import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { reduxForm, change } from 'redux-form'

import {SimpleSelect} from 'react-selectize'

import {
        fetchLocationsRate,
        createLocationsRate,
        editLocationsRate,
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
  'exact_address',
  'township_id',
  'township_code',
  'location_id',
  'location_code',
  'scheme',
  'rate',
  'location_name',
  'location_map',
  'max_period',
  'township_name',
  'scheme_type',
  'permit_type',
]

class LocationsRateForm extends React.Component {

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
    this.props.dispatch(change('locations-rate-form', 'date_time', moment().format('YYYY-MM-DD HH:mm:ss')));

    switch(this.props.submitType) {
      case "CREATE":
        this.props.createLocationsRate(data);
        break;
      case "EDIT":
        this.props.editLocationsRate(data, data.id);
        break;
      case "DUPLICATE":
        this.props.createLocationsRate(data);
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
    ajaxSelectizeGet('townships_manager', 'manager_id', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('locations_rate', 'rate', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('location_lot', 'location_code', this.selectizeOptionsUpdate);

    this.props.dispatch(change('locations-rate-form', 'date_time', moment().format('YYYY-MM-DD HH:mm:ss')));
    this.props.dispatch(change('locations-rate-form', 'township_code', this.props.townshipCode));
    this.props.dispatch(change('locations-rate-form', 'township_id', this.props.townshipCode));
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
      dispatch(change('locations-rate-form', 'date_time', event.target.value)); 
    });
  }

  componentDidUpdate() {
    if (this.props.townshipLocationsRateCreated.isLoading) {
      } else if (!this.props.townshipLocationsRateCreated.isLoading) {
        this.handleSuccess();
      }

    if (this.props.townshipLocationsRateEdited.isLoading) {
      } else if (!this.props.townshipLocationsRateEdited.isLoading) {
        this.handleSuccess();
      }

    if (this.props.townshipLocationsRateCreated.isLoading) {
      } else if (!this.props.townshipLocationsRateEdited.isLoading) {
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
      'exact_address',
      'location_id',
      'location_code',
      'scheme',
      'rate',
      'location_name',
      'location_map',
      'max_period',
      'township_name',
      'scheme_type',
      'permit_type',
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
    townshipLocationsRateFetched: state.townshipLocationsRateFetched,
    townshipLocationsRateCreated: state.townshipLocationsRateCreated,
    townshipLocationsRateEdited: state.townshipLocationsRateEdited,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchLocationsRate, 
    editLocationsRate, 
    createLocationsRate, 
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'locations-rate-form',
  fields,
  overwriteOnInitialValuesChange : true
})(LocationsRateForm));