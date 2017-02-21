import React, {Component} from 'react';
import GenericPage from '../../../../common/components/pages/generic-page'
import GenericList from '../../../../common/components/lists/generic-list'
import GenericForm from '../../../../common/components/forms/generic-form'
import {countries, states} from '../../../../constants/countries.js'
import moment from 'moment'

class TownshipPanelHearingPlace extends Component {
  render() {
    return (
      <div>
        <GenericPage
          ajaxURI={`hearing_place_info?filter=(township_code=${this.props.townshipCode})&include_schema=true`}
          listComponent={(page) => {
              return (
                <GenericList 
                  ajaxURI="hearing_place_info"
                  mainFilter="hearing_location"
                  modalName="hearing-place"
                  modalTitle="Hearing Place"
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
                }
              }
              return (
                <div>
                  <GenericForm 
                    fields={fields}
                    form="hearing-place"
                    modalName="modal-hearing-place-create"
                    modalText="Create Hearing Place" 
                    submitType="CREATE"
                    ajaxURI={page.props.ajaxURI}
                    initialValues={null} 
                    townshipCode={this.props.townshipCode}
                    selectizeInputs={selectizeInputs}
                    handleSuccess={() => page.handleSuccess()}
                  />
                  <GenericForm 
                    fields={fields}
                    form="hearing-place"
                    modalName="modal-hearing-place-edit"
                    modalText="Edit Hearing Place" 
                    submitType="EDIT"
                    ajaxURI={page.props.ajaxURI}
                    initialValues={page.state.rowData} 
                    townshipCode={this.props.townshipCode}
                    selectizeInputs={selectizeInputs}
                    handleSuccess={() => page.handleSuccess()}
                  />
                  <GenericForm 
                    fields={fields}
                    form="hearing-place"
                    modalName="modal-hearing-place-duplicate"
                    modalText="Duplicate Hearing Place" 
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

export default TownshipPanelHearingPlace;
