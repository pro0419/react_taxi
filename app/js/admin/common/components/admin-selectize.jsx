import React from 'react'
import {SimpleSelect} from 'react-selectize'
import { reduxForm, change } from 'redux-form'

export default class AdminSelectize extends React.Component {
  constructor(props) {
    super(props);
    this.renderSelectize = this.renderSelectize.bind(this);
    this.renderSelectizePreset = this.renderSelectizePreset.bind(this);
  }

  renderSelectize(){
    const {dispatch} = this.props;
    let fieldData = this.props.fieldData[this.props.objectKey].value;
    let fieldValue;

    if (fieldData !== "" && fieldData !== null && fieldData !== undefined) {
      fieldValue = {label: fieldData, value: fieldData};
    } else {
      fieldValue = null;
    }

    if(this.props.options[this.props.objectKey] !== undefined) {
      return (
        <div className="col s12 admin-form-input">
          <div className="form-group">
            <div clasName="input-field col s12">
              <SimpleSelect 
              options = {this.props.options[this.props.objectKey]} 
              placeholder = {this.props.fieldName}
              theme = "default" 
              style={{marginTop: 5}}
              value = {fieldValue}
              onValueChange = {(value) => {
                dispatch(change(this.props.formName, this.props.objectKey, value.value)); 
                if(this.props.dispatchFunction) {
                  this.props.dispatchFunction(value);
                }
                if(this.props.onChange !== null && this.props.onChange !== undefined) {
                  this.props.onChange(value.value);
                }
              }}></SimpleSelect>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="col s12 admin-form-input">
          <div className="form-group">
            <div clasName="input-field col s12">
              <SimpleSelect 
              options = {this.props.options} 
              value = {fieldValue}
              placeholder = "Select Scheme Type" 
              theme = "default" 
              style={{marginTop: 5}}
              onValueChange = {(value) => {
                if(this.props.onChange !== null && this.props.onChange !== undefined) {
                  this.props.onChange(value.value);
                }
              }}></SimpleSelect>
            </div>
          </div>
        </div>
      )
    }
  }

  renderSelectizePreset() {
    const {dispatch} = this.props
    let fieldData = this.props.fieldData[this.props.objectKey].value;
    let fieldValue;

    if (fieldData !== "" && fieldData !== null && fieldData !== undefined) {
      fieldValue = {label: fieldData, value: fieldData};
    } else {
      fieldValue = null;
    }

    return(
      <div className="col s12 admin-form-input">
        <div className="form-group">
          <div clasName="input-field col s12">
            <SimpleSelect 
            options = {this.props.options} 
            placeholder = {this.props.fieldName}
            theme = "default" 
            style={{marginTop: 5}}
            value = {fieldValue}
            onValueChange = {(value) => {
              dispatch(change(this.props.formName, this.props.objectKey, value.value)); 
              if(this.props.dispatchFunction) {
                this.props.dispatchFunction(value);
              }
              if(this.props.onChange !== null && this.props.onChange !== undefined) {
                this.props.onChange(value.value);
              }
            }}></SimpleSelect>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return(
      <div>
        {this.props.staticOptions ? this.renderSelectizePreset() : this.renderSelectize()}
      </div>
    );
  }
}

// <label>{this.props.fieldName}</label>