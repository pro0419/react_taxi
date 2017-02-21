import React from 'react'
import {SimpleSelect} from 'react-selectize'
import { reduxForm, change } from 'redux-form'

export default class AdminSelectize extends React.Component {
  constructor(props) {
    super(props);

    this.renderSelectize = this.renderSelectize.bind(this);
  }

  renderSelectize(){
    const {dispatch} = this.props
    let defaultValue;

    if (this.props.defaultData !== null && this.props.defaultData !== undefined) {
      defaultValue = this.props.defaultData[this.props.objectKey];
    }

    if(this.props.options[this.props.objectKey] !== undefined) {
      return (
        <div className="col s12 admin-form-input">
          <div className="form-group">
            <div clasName="input-field col s12">
              <SimpleSelect 
              options = {this.props.options[this.props.objectKey]} 
              placeholder={this.props.fieldName}
              theme = "default" 
              style={{marginTop: 5}}
              value = {(() => {
                if (defaultValue !== null && defaultValue !== "" && defaultValue !== undefined) {
                  return {label: defaultValue, value: defaultValue}
                } else {
                  return;
                }
              })()}
              onValueChange = {(value) => {
                this.props.updateRowData(value.value, this.props.objectKey);
								this.props.dispatchFunction(value);
                dispatch(change(this.props.formName, this.props.objectKey, value.value)); 
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
              placeholder = "Select Scheme Type" 
              theme = "default" 
              style={{marginTop: 5}}
              value = {(() => {
                if (defaultValue !== null && defaultValue !== "" && defaultValue !== undefined) {
                  return {label: defaultValue, value: defaultValue}
                } else {
                  return;
                }
              })()}
              onValueChange = {(value) => {
                this.props.updateRowData(value.value, this.props.objectKey);
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

  render() {
    return(
      <div>
        {this.renderSelectize()}
      </div>
    );
  }
}


