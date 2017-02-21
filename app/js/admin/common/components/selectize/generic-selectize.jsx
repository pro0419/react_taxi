import React, {Component} from 'react';
import Formsy from 'formsy-react';
import {SimpleSelect} from 'react-selectize'
import {
  ajaxSelectizeGet, 
  ajaxSelectizeFilteredGet, 
  ajaxDelete, 
  ajaxGet, 
  ajaxPost, 
  ajaxPut
} from '../ajax-selectize'

const GenericSelectize = React.createClass({
  mixins: [Formsy.Mixin],
  getInitialState() {
    return {
        value: this.props.value,
        onValueChange: false
    };
  },
  changeValue(event) {
    this.setValue(event.currentTarget.value);
  },
  render() {
    const className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;
    const errorMessage = this.getErrorMessage();
    return (
      <div className={className}>
        <div className="col s12 admin-form-input">
          <div className="form-group">
            <label>{this.props.placeholder}</label>
            <SimpleSelect 
            options = {this.props.options} 
            value = {(() => {
              if(this.state.valueChanged) {
                return this.state.value
              } else {
                return {label: this.props.value, value: this.props.value}
              }
            })()}
            placeholder = {this.props.placeholder} 
            theme = "default" 
            style={{marginTop: 5}}
            onValueChange = {(data) => {
              this.setState({value: data, valueChanged: true});
              this.setValue(data.value);
            }}
            ></SimpleSelect>
          </div>
        </div>
        <span>{errorMessage}</span>
      </div>
    );
  }
});

export default GenericSelectize;