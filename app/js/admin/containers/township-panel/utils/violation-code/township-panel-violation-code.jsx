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
          ajaxURI={`violation_code?filter=(township_code=${this.props.townshipCode})&include_schema=true`}
          listComponent={(page) => {
              return (
                <GenericList 
                  ajaxURI="violation_code"
                  mainFilter="violation_code"
                  modalName="violation-code"
                  modalTitle="Violation Code"
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
                state: {
                  type: "static",
                  options: states.map((data) => {return {label: data, value: data}})
                },
              }
              return (
                <div>
                  <GenericForm 
                    fields={fields}
                    form="violation-code"
                    modalName="modal-violation-code-create"
                    modalText="Create Violation Code" 
                    submitType="CREATE"
                    ajaxURI={page.props.ajaxURI}
                    initialValues={null} 
                    townshipCode={this.props.townshipCode}
                    selectizeInputs={selectizeInputs}
                    handleSuccess={() => page.handleSuccess()}
                  />
                  <GenericForm 
                    fields={fields}
                    form="violation-code"
                    modalName="modal-violation-code-edit"
                    modalText="Edit Violation Code" 
                    submitType="EDIT"
                    ajaxURI={page.props.ajaxURI}
                    initialValues={page.state.rowData} 
                    townshipCode={this.props.townshipCode}
                    selectizeInputs={selectizeInputs}
                    handleSuccess={() => page.handleSuccess()}
                  />
                  <GenericForm 
                    fields={fields}
                    form="violation-code"
                    modalName="modal-violation-code-duplicate"
                    modalText="Duplicate Violation Code" 
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
