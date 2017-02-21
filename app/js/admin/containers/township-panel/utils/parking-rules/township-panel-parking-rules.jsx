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
          ajaxURI='parking_rules?include_schema=true'
          listComponent={(page) => {
              return (
                <GenericList 
                  ajaxURI="parking_rules"
                  mainFilter="location_code"
                  modalName="parking-rules"
                  modalTitle="Parking Rules"
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
                }
              }
              return (
                <div>
                  <GenericForm 
                    fields={fields}
                    form="parking-rules"
                    modalName="modal-parking-rules-create"
                    modalText="Create Parking Rule" 
                    submitType="CREATE"
                    ajaxURI={page.props.ajaxURI}
                    initialValues={null} 
                    townshipCode={this.props.townshipCode}
                    selectizeInputs={selectizeInputs}
                    handleSuccess={() => page.handleSuccess()}
                  />
                  <GenericForm 
                    fields={fields}
                    form="parking-rules"
                    modalName="modal-parking-rules-edit"
                    modalText="Edit Parking Rule" 
                    submitType="EDIT"
                    ajaxURI={page.props.ajaxURI}
                    initialValues={page.state.rowData} 
                    townshipCode={this.props.townshipCode}
                    selectizeInputs={selectizeInputs}
                    handleSuccess={() => page.handleSuccess()}
                  />
                  <GenericForm 
                    fields={fields}
                    form="parking-rules"
                    modalName="modal-parking-rules-duplicate"
                    modalText="Duplicate Parking Rule" 
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