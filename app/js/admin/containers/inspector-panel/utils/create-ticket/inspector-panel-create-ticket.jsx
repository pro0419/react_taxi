import React, {Component} from 'react';
import GenericPage from '../../../../common/components/pages/generic-page'
import GenericList from '../../../../common/components/lists/generic-list'
import GenericForm from '../../../../common/components/forms/generic-form'
import {countries, states} from '../../../../constants/countries.js'
import moment from 'moment'

class InspectorCreateTicket extends Component {
  render() {
    return (
      <div>
        <GenericPage
          ajaxURI={`parking_violations?filter=(township_code=${this.props.townshipCode})&include_schema=true`}
          listComponent={(page) => {
              return (
                <GenericList 
                  ajaxURI="parking_violations"
                  mainFilter="user_id"
                  modalName="plate-no"
                  modalTitle="Parking Tickets"
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
                town_logo: {
                  type: "disabled",
                },
                township_code: {
                  type: "disabled",
                  value: this.props.townshipCode
                },
                user_id: {
                  type: "ajax",
                  uri: "user_profile",
                  table: "user_id"
                },
                plate_no: {
                  type: "ajax",
                  uri: `parked_cars?filter=(township_code=${this.props.townshipCode})`,
                  table: "plate_no"
                },
                tkt_status: {
                  type: "static",
                  options: [{label: "OPEN", value: "OPEN"}, {label: "CLOSED", value: "CLOSED"}]
                },
              }
              return (
                <div>
                  <GenericForm 
                    fields={fields}
                    form="plate-no"
                    modalName="modal-plate-no-create"
                    modalText="Create Ticket" 
                    submitType="CREATE"
                    ajaxURI={page.props.ajaxURI}
                    initialValues={null} 
                    townshipCode={this.props.townshipCode}
                    selectizeInputs={selectizeInputs}
                    handleSuccess={() => page.handleSuccess()}
                  />
                  <GenericForm 
                    fields={fields}
                    form="plate-no"
                    modalName="modal-plate-no-edit"
                    modalText="Edit Ticket" 
                    submitType="EDIT"
                    ajaxURI={page.props.ajaxURI}
                    initialValues={page.state.rowData} 
                    townshipCode={this.props.townshipCode}
                    selectizeInputs={selectizeInputs}
                    handleSuccess={() => page.handleSuccess()}
                  />
                  <GenericForm 
                    fields={fields}
                    form="plate-no"
                    modalName="modal-plate-no-duplicate"
                    modalText="Duplicate Ticket" 
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

export default InspectorCreateTicket;