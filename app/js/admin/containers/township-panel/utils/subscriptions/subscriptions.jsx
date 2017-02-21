import React, {Component} from 'react';
import GenericPage from '../../../../common/components/pages/generic-page'
import GenericList from '../../../../common/components/lists/generic-list'
import GenericForm from '../../../../common/components/forms/generic-form'
import {countries, states} from '../../../../constants/countries.js'
import moment from 'moment'

class Subscriptions extends Component {
  render() {
    return (
      <div>
        <GenericPage
          ajaxURI={`subscriptions?filter=(township_code=${this.props.townshipCode})&include_schema=true`}
          listComponent={(page) => {
              return (
                <GenericList 
                  ajaxURI="subscriptions"
                  mainFilter="user_name"
                  modalName="subscriptions"
                  modalTitle="Subscriptions"
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
                logo_paypal: {
                  type: "disabled",
                },
                paypal_logo: {
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
                user_name: {
                  type: "ajax",
                  uri: "user_profile",
                  table: "user_name"
                },
                scheme_type: {
                  type: "ajax",
                  uri: "scheme_type",
                  table: "scheme_type"
                },
                permit_type: {
                  type: "ajax",
                  uri: "parking_permits",
                  table: "permit_type"
                },
                permit_name: {
                  type: "ajax",
                  uri: "parking_permits",
                  table: "permit_name"
                },
                location_code: {
                  type: "ajax",
                  uri: "manage_locations",
                  table: "location_code"
                },
                location_name: {
                  type: "ajax",
                  uri: "manage_locations",
                  table: "location_name"
                },
                permit_status: {
                  type: "static",
                  options: [{label: "YES", value: "YES"}, {label: "NO", value: "NO"}]
                },
                expired: {
                  type: "static",
                  options: [{label: "true", value: true}, {label: "false", value: false}]
                },
              }
              return (
                <div>
                  <GenericForm 
                    fields={fields}
                    form="subscriptions"
                    modalName="modal-subscriptions-create"
                    modalText="Create Subscription" 
                    submitType="CREATE"
                    ajaxURI={page.props.ajaxURI}
                    initialValues={null} 
                    townshipCode={this.props.townshipCode}
                    selectizeInputs={selectizeInputs}
                    handleSuccess={() => page.handleSuccess()}
                  />
                  <GenericForm 
                    fields={fields}
                    form="subscriptions"
                    modalName="modal-subscriptions-edit"
                    modalText="Edit Subscription" 
                    submitType="EDIT"
                    ajaxURI={page.props.ajaxURI}
                    initialValues={page.state.rowData} 
                    townshipCode={this.props.townshipCode}
                    selectizeInputs={selectizeInputs}
                    handleSuccess={() => page.handleSuccess()}
                  />
                  <GenericForm 
                    fields={fields}
                    form="subscriptions"
                    modalName="modal-subscriptions-duplicate"
                    modalText="Duplicate Subscription" 
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

export default Subscriptions;