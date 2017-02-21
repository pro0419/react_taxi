import React from 'react';
import { reduxForm, change } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import datetime from 'node-datetime'
import {SimpleSelect} from "react-selectize"
import { browserHistory } from 'react-router'
import {createFilter} from 'react-search-input';

import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'
import {optionsSelectize} from '../../../../common/components/options-selectize.js'

import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

import {ajaxSelectizeGet, ajaxDelete} from '../../../../common/components/ajax-selectize.js'
import AdminSelectize from '../../../../common/components/admin-selectize.jsx'
import axios from 'axios'

export const fields = [ 
  'type',
  'number',
  'expire_month',
  'expire_year',
  'cvv2',
  'first_name',
  'last_name',

  'line1',
  'city',
  'state',
  'postal_code',
  'country_code',

  'total',
  'subtotal',
  'tax',
  'shipping',
]

class BursarPanelTicketCardForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showEditDuplicateButtons: false,
      parkingLocationCode: null,
      showEditModal: false,
      rowData: null,
      selectizeOptions: {},
      ajaxLoading: false
    }

    this.tempInputsEdit = this.tempInputsEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.selectizeOptionsUpdate = this.selectizeOptionsUpdate.bind(this);
  }

  handleSubmit(data) {
    this.setState({ajaxLoading: true})
    
    axios.post('/api/admin/paypal/create-bursar-payment', data)
    .then((res) => {
      this.setState({ajaxLoading: false})
      if(res.data.httpStatusCode === 200) {
        this.props.handleSuccess(res.data);
      } else {
        this.props.handleError(res);
      }
    })
    .catch((res)=>{
      this.setState({ajaxLoading: false})
      this.props.handleError(res);
    })
  }


  selectizeOptionsUpdate(valueName, keyName) {
    var optionsDataObject = {[keyName]: valueName};
    Object.assign(this.state.selectizeOptions, optionsDataObject);
    this.forceUpdate();
  }

  handleSuccess(data){
    this.props.resetLoading();
    this.props.handleSuccess(data);
  }

  tempInputsEdit(initialValues) {
     const {
      fields: {  
        type,
        number,
        expire_month,
        expire_year,
        cvv2,
        first_name,
        last_name,
        line1,
        city,
        state,
        postal_code,
        country_code,
        total,
        subtotal,
        tax,
        shipping,
      },
      resetForm,
      submitting,
      dispatch
    } = this.props;

    const fields = [ 
      'number',
      'expire_month',
      'expire_year',
      'cvv2',
      'first_name',
      'last_name',
      'total'
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

    const cardTypes = [
      'visa',
      'mastercard',
      'amex',
      'jcb',
      'discover'
    ]
    
    const cardTypeList = cardTypes.map((data) => {
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
									options={cardTypeList}
									objectKey={'type'} 
                  fieldName={'Card Type'}
									formName={'card-form'} 
									fieldData={this.props.fields}
									dispatch={dispatch} 
								/>
                {this.tempInputsEdit(this.props.initialValues)}
              </div>
            </div>
            

            <div className="modal-footer">
              <div className="row marginless-row">
                <div className="col s12 center-align">
                {this.state.ajaxLoading ? 
                  <div className="center-align">   
                    <div style={{fontSize: 12}}> Sending request, please wait... </div>
                    <div className="progress">
                      <div className="indeterminate"></div>
                    </div>
                  </div>
                :
                <button 
                  type="submit" 
                  disabled={submitting} 
                  className="waves-effect waves-light btn">{this.props.modalText}</button>
                }  
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}


export default connect()(reduxForm({
  form: 'card-form',
  fields,
  overwriteOnInitialValuesChange : true
})(BursarPanelTicketCardForm));

/*
                <div className="col s12 admin-form-input">
                  <div className="form-group">
                    <label>Card Type</label>
                    <div clasName="input-field col s12">
                    
                      <SimpleSelect 
                        options = {cardTypeList} 
                        placeholder = "Card Type"
                        theme = "material"
                        style = {{marginTop: 5}}
                        transitionEnter = {true} 
                        defaultValue = {{label: this.props.fields.type.initialValue, value: this.props.fields.type.initialValue}}
                        onValueChange = {(object) => {
                          dispatch(change('card-form', 'type', object.value)); 
                          console.log(fields)
                        }}/>
                    </div>
                  </div>
                </div>
                */