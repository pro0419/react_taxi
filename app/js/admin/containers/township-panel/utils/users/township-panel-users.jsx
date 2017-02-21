import React, {Component} from 'react';
import GenericPage from '../../../../common/components/pages/generic-page'
import GenericList from '../../../../common/components/lists/generic-list'
import GenericForm from '../../../../common/components/forms/generic-form'
import {countries, states} from '../../../../constants/countries.js'
import moment from 'moment'

class TownshipPanelUsers extends Component {
  render() {
    return (
      <div>
        <GenericPage
          ajaxURI={`township_users?filter=(township_code=${this.props.townshipCode})&include_schema=true`}
          listComponent={(page) => {
              return (
                <GenericList 
                  ajaxURI="township_users"
                  mainFilter="user_id"
                  modalName="township-users"
                  modalTitle="Admin Users"
                  townshipCode={this.props.townshipCode}
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
                township_code: {
                  type: "disabled",
                  value: this.props.townshipCode
                },
                township_name: {
                  type: "disabled",
                  value: this.props.townshipCode
                },
                user_id: {
                  type: "ajax",
                  uri: "user_profile",
                  table: "user_id"
                },
                profile_name: {
                  type: "static",
                  options: [ {label: "SuperAdmin", value: "SuperAdmin"},
                  {label: "TwpAdmin", value: "TwpAdmin"},
                  {label: "TwpBursar", value: "TwpBursar"}, 
                  {label: "TwpInspector", value: "TwpInspector"},	]
                },
                status: {
                  type: "static",
                  options: [{label: "ACTIVE", value: "ACTIVE"}, {label: "INACTIVE", value: "INACTIVE"}]
                },
              }
              return (
                <div>
                  <GenericForm 
                    fields={fields}
                    form="township-users"
                    modalName="modal-township-users-create"
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
                    form="township-users"
                    modalName="modal-township-users-edit"
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
                    form="township-users"
                    modalName="modal-township-users-duplicate"
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

export default TownshipPanelUsers;