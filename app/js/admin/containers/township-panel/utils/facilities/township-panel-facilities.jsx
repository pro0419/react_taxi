import React, {Component} from 'react';
import GenericPage from '../../../../common/components/pages/generic-page'
import GenericList from '../../../../common/components/lists/generic-list'
import GenericForm from '../../../../common/components/forms/generic-form'
import {countries, states} from '../../../../constants/countries.js'
import moment from 'moment'

class TownshipPanelFacilities extends Component {
  render() {
    return (
      <div>
        <GenericPage
          ajaxURI={`manage_locations?filter=(township_code=${this.props.townshipCode})&include_schema=true`}
          listComponent={(page) => {
              return (
                <GenericList 
                  ajaxURI="manage_locations"
                  mainFilter="location_name"
                  modalName="township-locations"
                  modalTitle="Township Facilities"
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
                country: {
                  type: "static",
                  options: countries.map((data) => {return {label: data, value: data}})
                },
                state: {
                  type: "static",
                  options: states.map((data) => {return {label: data, value: data}})
                },
              }
              return (
                <div>
                  <GenericForm 
                    fields={fields}
                    form="township-locations"
                    modalName="modal-township-locations-create"
                    modalText="Create Facility" 
                    submitType="CREATE"
                    ajaxURI={page.props.ajaxURI}
                    initialValues={null} 
                    townshipCode={this.props.townshipCode}
                    selectizeInputs={selectizeInputs}
                    handleSuccess={() => page.handleSuccess()}
                  />
                  <GenericForm 
                    fields={fields}
                    form="township-locations"
                    modalName="modal-township-locations-edit"
                    modalText="Edit Facility" 
                    submitType="EDIT"
                    ajaxURI={page.props.ajaxURI}
                    initialValues={page.state.rowData} 
                    townshipCode={this.props.townshipCode}
                    selectizeInputs={selectizeInputs}
                    handleSuccess={() => page.handleSuccess()}
                  />
                  <GenericForm 
                    fields={fields}
                    form="township-locations"
                    modalName="modal-township-locations-duplicate"
                    modalText="Duplicate Facility" 
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

export default TownshipPanelFacilities;