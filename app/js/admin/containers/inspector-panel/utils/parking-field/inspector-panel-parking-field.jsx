import React, {Component} from 'react';
import GenericPage from '../../../../common/components/pages/generic-page'
import GenericList from '../../../../common/components/lists/generic-list'
import GenericForm from '../../../../common/components/forms/generic-form'
import {countries, states} from '../../../../constants/countries.js'
import moment from 'moment'

class InspectorParkingField extends Component {
  render() {
    return (
      <div>
        <GenericPage
          ajaxURI={`parked_cars?filter=(township_code=${this.props.townshipCode})&include_schema=true`}
          listComponent={(page) => {
              return (
                <GenericList 
                  ajaxURI="parked_cars"
                  mainFilter="plate_no"
                  modalName="parking-field"
                  modalTitle="Parked Vehicles"
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
                notified_status: {
                  type: "disabled",
                },
                expiry_status: {
                  type: "disabled",
                },
                marker_country: {
                  type: "disabled",
                },
                marker_state: {
                  type: "disabled",
                },
                marker_zip: {
                  type: "disabled",
                },
                marker_city: {
                  type: "disabled",
                },
                township_code: {
                  type: "disabled",
                  value: this.props.townshipCode
                },
                country: {
                  type: "static",
                  options: countries.map((data) => {return {label: data, value: data}})
                },
                state: {
                  type: "static",
                  options: states.map((data) => {return {label: data, value: data}})
                },
                user_id: {
                  type: "ajax",
                  uri: "user_profile",
                  table: "user_id"
                },
                location_code: {
                  type: "ajax",
                  uri: "manage_locations",
                  table: "location_code"
                },
                parking_type: {
                  type: "static",
                  options: [{label: "free", value: "free"}, {label: "paid", value: "paid"}]
                },
                payment_method: {
                  type: "static",
                  options: [
                    {label: "WALLET", value: "WALLET"}, 
                    {label: "PAYPAL", value: "PAYPAL"},
                    {label: "CASH", value: "CASH"},
                  ]
                },
              }
              return (
                <div>
                  <GenericForm 
                    fields={fields}
                    form="parking-field"
                    modalName="modal-parking-field-create"
                    modalText="Create Parked Car" 
                    submitType="CREATE"
                    ajaxURI={page.props.ajaxURI}
                    initialValues={null} 
                    townshipCode={this.props.townshipCode}
                    selectizeInputs={selectizeInputs}
                    handleSuccess={() => page.handleSuccess()}
                  />
                  <GenericForm 
                    fields={fields}
                    form="parking-field"
                    modalName="modal-parking-field-edit"
                    modalText="Edit Parked Car" 
                    submitType="EDIT"
                    ajaxURI={page.props.ajaxURI}
                    initialValues={page.state.rowData} 
                    townshipCode={this.props.townshipCode}
                    selectizeInputs={selectizeInputs}
                    handleSuccess={() => page.handleSuccess()}
                  />
                  <GenericForm 
                    fields={fields}
                    form="parking-field"
                    modalName="modal-parking-field-duplicate"
                    modalText="Duplicate Parked Car" 
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

export default InspectorParkingField;