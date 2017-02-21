import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { reduxForm, change } from 'redux-form'
import Formsy from 'formsy-react';
import AdminSelectize from '../admin-selectize.jsx'
import {
  ajaxSelectizeGet, 
  ajaxSelectizeFilteredGet, 
  ajaxDelete, 
  ajaxGet, 
  ajaxPost, 
  ajaxPut
} from '../ajax-selectize'
import {SimpleSelect} from 'react-selectize'
import GenericInput from '../inputs/generic-input'
import DisabledInput from '../inputs/disabled-input'
import GenericSelectize from '../selectize/generic-selectize'
import {fetchData, editData, createData, resetLoading} from '../../../actions/actions-township-common'
import _ from 'lodash';

class GenericForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      selectizeOptions: {}
    }
    this.renderSelectizeComponents = this.renderSelectizeComponents.bind(this);
    this.renderInputComponents = this.renderInputComponents.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.selectizeOptionsUpdate = this.selectizeOptionsUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    let object = this.props.selectizeInputs;
    for (let key in object) {
      if(object[key].type == "ajax") {
        ajaxSelectizeGet(object[key].uri, object[key].table, this.selectizeOptionsUpdate);
      }
    }
  }
  
  selectizeOptionsUpdate(valueName, keyName) {
    var optionsDataObject = {[keyName]: valueName};
    this.setState({selectizeOptions: _.assign(this.state.selectizeOptions, optionsDataObject)});
  }

  enableButton() {
    this.setState({
      canSubmit: true
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false
    });
  }

  handleSubmit(data) {
    $('#' + this.props.modalName).closeModal();
    switch(this.props.submitType) {
      case "CREATE":
        this.props.createData(this.props.ajaxURI, data, this.handleSuccess)
        break;
      case "EDIT":
        this.props.editData(this.props.ajaxURI, data.id, data, this.handleSuccess)
        break;
      case "DUPLICATE":
        this.props.createData(this.props.ajaxURI, data, this.handleSuccess)
        break;
      default:
        console.log("No valid submit type was provided.");
        break;
    }
  }

  renderSelectizeComponents() {
    let components = [];
    let object = this.props.selectizeInputs;
    for (let key in object) {
      switch(object[key].type) {
        case "static":
          components.push(
            <GenericSelectize 
              name={key}
              options = {object[key].options} 
              placeholder = {(() => {
                if(this.props.fields) {
                  let schemaObject = _.find(this.props.fields, {name: key});
                  if (schemaObject) {
                    return schemaObject.label;
                  } else {
                    return key;
                  }
                } else {
                  return key;
                }
              })()}
              value={(() => {
                return this.props.initialValues == null ? 
                null : this.props.initialValues[key]
              })()}
            />
          )
          break;
        case "ajax":
          if(this.state.selectizeOptions[key]) {
            components.push(
              <GenericSelectize 
                name={key}
                options = {this.state.selectizeOptions[key]} 
                placeholder = {(() => {
                if(this.props.fields) {
                    let schemaObject = _.find(this.props.fields, {name: key});
                    if (schemaObject) {
                      return schemaObject.label;
                    } else {
                      return key;
                    }
                  } else {
                    return key;
                  }
                })()}
                value={(() => {
                  return this.props.initialValues == null ? 
                  null : this.props.initialValues[key]
                })()}
              />
            )
          }
          break;
        case "disabled":
          components.push(
           <DisabledInput
              name={key} 
              value={(() => {
                if(object[key].value) {
                  return object[key].value;
                } else {
                  return this.props.initialValues == null ? null : this.props.initialValues[key]
                }
              })()}
            />
          )
          break;
      }
    }
    return components;
  }

  renderInputComponents() {
    const fields = this.props.fields;
    return fields.map((data) => {
      if(!_.has(this.props.selectizeInputs, data.name)) {
        return( 
          <div className="col s12 admin-form-input">
            <div className="form-group">
              <div></div>
              <GenericInput
                name={data.name} 
                value={(() => {
                  return this.props.initialValues == null ? null : this.props.initialValues[data.name]
                })()}
                placeholder={data.label} 
              />
            </div>
          </div>
        );
      }
    }, this); 
  }

  render() {
    return (
      <div>
        <Formsy.Form onValidSubmit={this.handleSubmit} onValid={this.enableButton} onInvalid={this.disableButton}>
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
                {this.renderSelectizeComponents()}
                {this.renderInputComponents()}
              </div>
            </div>

            <div className="modal-footer">
              <div className="row marginless-row">
                <div className="col s12 center-align">
                  <button 
                  type="submit" 
                  disabled={this.props.canSubmit} 
                  className="waves-effect waves-light btn valign">{this.props.modalText}</button>
                </div>
              </div>
            </div>
          </div>
        </Formsy.Form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchData,
    createData,
    editData,
    resetLoading
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(GenericForm);
