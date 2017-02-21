import React, {Component} from 'react';
import GenericPage from '../../../../common/components/pages/generic-page'
import GenericList from '../../../../common/components/lists/generic-list'
import GenericForm from '../../../../common/components/forms/generic-form'
import {countries, states} from '../../../../constants/countries.js'
import moment from 'moment'

class TownshipUserProfile extends Component {
  render() {
    return (
      <div>
        <GenericPage
          ajaxURI="user_profile?include_schema=true"
          listComponent={(page) => {
              return (
                <GenericList 
                  ajaxURI="user_profile"
                  mainFilter="user_name"
                  modalName="user-profile"
                  modalTitle="Township Users"
                  townshipCode={this.props.townshipCode}
                  skipTownshipFilter={true}
                  setRowData={(rowData) => page.setState({rowData: rowData})}
                  filter=""
                  handleSuccess={page.handleSuccess}
                />
              )
            }  
          }

          formComponent={(page, fields) => {
              const selectizeInputs = {
                id: {
                  type: "disabled",
                },
                date_time: {
                  type: "disabled",
                  value: moment().format('YYYY-MM-DD HH:mm:ss')
                },
                country: {
                  type: "static",
                  options: countries.map((data) => {return {label: data, value: data}})
                },
                state: {
                  type: "static",
                  options: states.map((data) => {return {label: data, value: data}})
                },
                gender: {
                  type: "static",
                  options: [{label: "MALE", value: "MALE"}, {label: "FEMALE", value: "FEMALE"}]
                }
              }
              return (
                <div>
                  <GenericForm 
                    fields={fields}
                    form="user-profile"
                    modalName="modal-user-profile-create"
                    modalText="Create User" 
                    submitType="CREATE"
                    ajaxURI={page.props.ajaxURI}
                    initialValues={null} 
                    townshipCode={this.props.townshipCode}
                    selectizeInputs={selectizeInputs}
                    handleSuccess={() => page.handleSuccess()}
                  />
                  <GenericForm 
                    fields={fields}
                    form="user-profile"
                    modalName="modal-user-profile-edit"
                    modalText="Edit User" 
                    submitType="EDIT"
                    ajaxURI={page.props.ajaxURI}
                    initialValues={page.state.rowData} 
                    townshipCode={this.props.townshipCode}
                    selectizeInputs={selectizeInputs}
                    handleSuccess={() => page.handleSuccess()}
                  />
                  <GenericForm 
                    fields={fields}
                    form="user-profile"
                    modalName="modal-user-profile-duplicate"
                    modalText="Duplicate User" 
                    submitType="DUPLICATE"
                    ajaxURI={page.props.ajaxURI}
                    initialValues={page.state.rowData} 
                    townshipCode={this.props.townshipCode}
                    selectizeInputs={selectizeInputs}
                    handleSuccess={() => page.handleSuccess()}
                  />
                </div>
              )
            }  
          }
        />
      </div>
    );
  }
}

export default TownshipUserProfile;

/*
const selectizeInputs = {
  id: {
    type: "disabled",
  },
  date_time: {
    type: "disabled",
  },
  country: {
    type: "static",
    options: countries.map((data) => {return {label: data, value: data}})
  },
  state: {
    type: "static",
    options: states.map((data) => {return {label: data, value: data}})
  },
  gender: {
    type: "static",
    options: [{label: "MALE", value: "MALE"}, {label: "FEMALE", value: "FEMALE"}]
  },
  lname: {
    type: "ajax",
    uri: "user_profile",
    table: "lname"
  }
}
*/