import React, {Component} from 'react'
import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'
import {SimpleSelect} from 'react-selectize'
import Griddle from 'griddle-react'
import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import { ajaxGet, ajaxDelete } from '../../../../common/components/ajax-selectize.js';
import { Column, Table, AutoSizer } from 'react-virtualized';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import _ from 'lodash';
const DateTimePicker = require('react-widgets').DateTimePicker
const currentDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

class BursarPanelBursarReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTableData: null,
      paymentType: "Ticket Payments",
      paymentOption: `ticket_payments?order=paid_date DESC&filter=((pmt_options=CASH)OR(pmt_options=CHEQUE))AND(township_code=${this.props.townshipCode})`,
      startDate: currentDate,
      endDate: currentDate,
      tableLoading: true
    };
    
    this.ajaxGet = this.ajaxGet.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.renderTicketPayments = this.renderTicketPayments.bind(this);
    this.renderParkingPayments = this.renderParkingPayments.bind(this);
    this.renderPermitPayments = this.renderPermitPayments.bind(this);
    this.renderWalletPayments = this.renderWalletPayments.bind(this);
    momentLocalizer(moment);

		this.paymentOptions = [
			{
				label: `Ticket Payments`, 
				value: `ticket_payments?order=paid_date DESC&filter=((pmt_options=CASH)OR(pmt_options=CHEQUE))AND(township_code=${this.props.townshipCode})`
			},
			{
				label: `Parking Payments`, 
				value: `pay_for_parking?order=date DESC&filter=((pay_method=CASH)OR(pay_method=CHEQUE))AND(location_id CONTAINS ${this.props.townshipCode})`
			},
			{
				label: `Permit Payments`, 
				value: `pay_for_permit?order=date_payment DESC&filter=((pay_method=CASH)OR(pay_method=CHEQUE))AND(twnshp_code=${this.props.townshipCode})`
			},
			{
				label: `Wallet Payments`, 
				value: `pay_for_wallet?order=date_time DESC&filter=((pay_method=CASH)OR(pay_method=CHEQUE))&related=township_users_by_user_id`
			},
		]
  }

  componentWillMount() {
    ajaxGet(this.state.paymentOption, this.ajaxGet);
  }

  ajaxGet(activeTableData) {
    if(this.state.paymentType === "Wallet Payments") {
      let filteredTableData = _.filter(activeTableData.data.resource, {township_users_by_user_id: {township_code: 'FDV'}})
      this.setState({activeTableData: filteredTableData, tableLoading: false});
      console.log(this.state.activeTableData)
    } else {
      this.setState({activeTableData: activeTableData.data.resource, tableLoading: false});
    }
  }

  renderTicketPayments() {
    return(
      <AutoSizer disableHeight={true}>
        {({width}) => (
          <Table 
              style={{marginTop: 20}}
              width={width}
              height={400}
              headerHeight={20}
              rowHeight={30}
              rowCount={this.state.activeTableData.length}
              rowGetter={({ index }) => this.state.activeTableData[index]}
              gridClassName="center-align"
            >
            <Column
              label={"Id"}
              dataKey={"id"}
              minWidth={25}
              flexGrow={1}
              width={25}
            />
            <Column
              label={"Paid Date"}
              dataKey={"paid_date"}
              minWidth={50}
              flexGrow={2}
              width={50}
            />
            <Column
              label={"Payment Method"}
              dataKey={"pmt_options"}
              minWidth={50}
              flexGrow={2}
              width={50}
            />
            <Column
              label={"User Id"}
              dataKey={"user_id"}
              minWidth={25}
              flexGrow={1}
              width={25}
            />
            <Column
              label={"Plate #"}
              dataKey={"plate_num"}
              minWidth={25}
              flexGrow={1}
              width={25}
            />
            <Column
              label={"Amount Paid"}
              dataKey={"twp_payment"}
              minWidth={50}
              flexGrow={1}
              width={50}
            />
            <Column
              label={"Amount Due"}
              dataKey={"new_amt_due"}
              minWidth={50}
              flexGrow={1}
              width={50}
            />
            <Column
              label={"Violation Charge"}
              dataKey={"violation_charge"}
              minWidth={50}
              flexGrow={1}
              width={50}
            />
            <Column
              label={"Payment Status"}
              dataKey={"pmt_status"}
              minWidth={50}
              flexGrow={1}
              width={50}
            />
            <Column
              label={"Ticket Status"}
              dataKey={"ticket_status"}
              minWidth={50}
              flexGrow={1}
              width={50}
            />
          </Table> 
        )}
      </AutoSizer>
    )
  }

  renderParkingPayments() {
    return (
      <AutoSizer disableHeight={true}>
        {({width}) => (
          <Table 
              style={{marginTop: 20}}
              width={width}
              height={400}
              headerHeight={20}
              rowHeight={30}
              rowCount={this.state.activeTableData.length}
              rowGetter={({ index }) => this.state.activeTableData[index]}
              gridClassName="center-align"
            >
            <Column
              label={"Id"}
              dataKey={"id"}
              minWidth={25}
              flexGrow={1}
              width={25}
            />
            <Column
              label={"Paid Date"}
              dataKey={"date"}
              minWidth={50}
              flexGrow={2}
              width={50}
            />
            <Column
              label={"Pay Method"}
              dataKey={"pay_method"}
              minWidth={25}
              flexGrow={1}
              width={25}
            />
            <Column
              label={"User Id"}
              dataKey={"user_id"}
              minWidth={25}
              flexGrow={1}
              width={25}
            />
            <Column
              label={"Plate #"}
              dataKey={"vehicle_id"}
              minWidth={25}
              flexGrow={1}
              width={25}
            />
            <Column
              label={"Amount Paid"}
              dataKey={"amount"}
              minWidth={25}
              flexGrow={1}
              width={25}
            />
          </Table> 
        )}
      </AutoSizer>
    );
  }

  renderPermitPayments() {
    return (
      <AutoSizer disableHeight={true}>
        {({width}) => (
          <Table 
              style={{marginTop: 20}}
              width={width}
              height={400}
              headerHeight={20}
              rowHeight={30}
              rowCount={this.state.activeTableData.length}
              rowGetter={({ index }) => this.state.activeTableData[index]}
              gridClassName="center-align"
            >
            <Column
              label={"Id"}
              dataKey={"id"}
              minWidth={25}
              flexGrow={1}
              width={25}
            />
            <Column
              label={"Paid Date"}
              dataKey={"date_payment"}
              minWidth={50}
              flexGrow={2}
              width={50}
            />
            <Column
              label={"Pay Method"}
              dataKey={"pay_method"}
              minWidth={25}
              flexGrow={1}
              width={25}
            />
            <Column
              label={"User Id"}
              dataKey={"user_id"}
              minWidth={25}
              flexGrow={1}
              width={25}
            />
            <Column
              label={"User Name"}
              dataKey={"user_name"}
              minWidth={25}
              flexGrow={1}
              width={25}
            />
            <Column
              label={"Permit Name"}
              dataKey={"permit_name"}
              minWidth={25}
              flexGrow={1}
              width={25}
            />
            <Column
              label={"Amount Paid"}
              dataKey={"amount"}
              minWidth={25}
              flexGrow={1}
              width={25}
            />
          </Table> 
        )}
      </AutoSizer>
    );
  }

  renderWalletPayments() {
    return (
      <AutoSizer disableHeight={true}>
        {({width}) => (
          <Table 
              style={{marginTop: 20}}
              width={width}
              height={400}
              headerHeight={20}
              rowHeight={30}
              rowCount={this.state.activeTableData.length}
              rowGetter={({ index }) => this.state.activeTableData[index]}
              gridClassName="center-align"
            >
            <Column
              label={"Id"}
              dataKey={"id"}
              minWidth={25}
              flexGrow={1}
              width={25}
            />
            <Column
              label={"Paid Date"}
              dataKey={"date_time"}
              minWidth={50}
              flexGrow={2}
              width={50}
            />
            <Column
              label={"Pay Method"}
              dataKey={"pay_method"}
              minWidth={25}
              flexGrow={1}
              width={25}
            />
            <Column
              label={"User Id"}
              dataKey={"user_id"}
              minWidth={25}
              flexGrow={1}
              width={25}
            />
            <Column
              label={"User Name"}
              dataKey={"user_name"}
              minWidth={25}
              flexGrow={1}
              width={25}
            />
            <Column
              label={"Permit Name"}
              dataKey={"permit_name"}
              minWidth={25}
              flexGrow={1}
              width={25}
            />
            <Column
              label={"Wallet ID"}
              dataKey={"wallet_id"}
              minWidth={25}
              flexGrow={1}
              width={25}
            />
            <Column
              label={"Current balance"}
              dataKey={"current_balance"}
              minWidth={25}
              flexGrow={1}
              width={25}
            />
            <Column
              label={"CBALANCE"}
              dataKey={"cbalance"}
              minWidth={25}
              flexGrow={1}
              width={25}
            />
            <Column
              label={"Amount Paid"}
              dataKey={"amount"}
              minWidth={25}
              flexGrow={1}
              width={25}
            />
          </Table> 
        )}
      </AutoSizer>
    );
  }

  renderTable() {
    switch(this.state.paymentType) {
      case "Ticket Payments":
        return this.renderTicketPayments();
      case "Parking Payments":
        return this.renderParkingPayments();
      case "Permit Payments":
        return this.renderPermitPayments();
      case "Wallet Payments":
        return this.renderWalletPayments();
    }
  }

  render () {
    return (
      <div className="blue-body marginless-row">
        <Body showHeader={true}>
          <div className="center-align white-text valign" style={{marginTop: 20}}>
            <h5> Bursar Desk Payments</h5>
          </div>
          <div className="row marginless-row" style={{marginTop: 20}}>
            <div className="col s3">
              <label style={{color:"white"}}>Payment Type</label>
              <div clasName="input-field col s12">
                <SimpleSelect 
                  options = {this.paymentOptions} 
                  placeholder = {"Payment Options"}
                  theme = "default" 
                  style={{marginTop: 5}}
                  defaultValue = {{label: "Ticket Payments", value: this.state.paymentOption}}
                  onValueChange = {(data) => {
                    this.setState({paymentType: data.label, paymentOption: data.value, tableLoading: true});
                    ajaxGet(data.value, this.ajaxGet);
                  }}
                />
              </div>
            </div>
            <div className="col right">
                <a 
                className="waves-effect waves-light btn" 
                style={{marginTop: 22}}
                onClick={() => {
                  let dateType;
                  console.log(this.state.paymentType);
                  switch(this.state.paymentType) {
                    case "Ticket Payments":
                      dateType = "paid_date";
                      break;
                    case "Parking Payments":
                      dateType = "date";
                      break;
                    case "Permit Payments":
                      dateType = "date_payment";
                      break;
                    case "Wallet Payments":
                      dateType = "date_time";
                      break;
                  }
                  let filterQuery = `${this.state.paymentOption}AND(${dateType}>=${this.state.startDate})AND(${dateType}<=${this.state.endDate})`;
                  ajaxGet(filterQuery, this.ajaxGet);
                }}>
                  <i className="material-icons left">access_time</i>Go
                </a>
            </div>
            <div className="col s3 right">
              <label style={{color:"white"}}>To</label>
              <div clasName="input-field col s12">
                <DateTimePicker 
                style={{border: "none !important"}}
                defaultValue={new Date()} 
                editFormat={"YYYY-MM-DD HH:mm:ss"}
                format={"YYYY-MM-DD HH:mm:ss"}
                onChange={(date, data) => {
                  this.setState({endDate: data})
                }}/>
              </div>  
            </div>
            <div className="col s3 right">
              <label style={{color:"white"}}>From</label>
              <div clasName="input-field col s12">
                <DateTimePicker 
                style={{border: "none !important"}}
                defaultValue={new Date()} 
                editFormat={"YYYY-MM-DD HH:mm:ss"}
                format={"YYYY-MM-DD HH:mm:ss"}
                onChange={(date, data) => {
                  this.setState({startDate: data})
                }}/>
              </div>  
            </div>
          </div>
          <div className="row marginless-row" style={{marginTop: 40}}>
            <div className="col s12 center-align">
              <div className="card z-depth-3" style={{marginBottom: 40}}>
                <div className="card-image waves-effect waves-block waves-light">
                </div>
                <div className="card-content">
                  <span className="activator grey-text text-darken-4">
                    Bursar Desk Payment Reports<i className="material-icons right">more_vert</i>
                  </span>
                  <div className="divider" style={{marginTop: 20}}/>
                  {this.state.activeTableData == null || this.state.tableLoading === true ? 
                    <div className="center-align"> <Spinner /> </div>
                    :
                    this.renderTable()
                  }
                </div>
                <div className="card-reveal center-align">
                  <span className="card-title grey-text text-darken-4">Bursar Desk Payment Reports<i className="material-icons right clickable">close</i></span>
                  <p>Test Info.</p>
                </div>
              </div>
            </div>
          </div>
        </Body>
      </div>
    )
  }
}

export default BursarPanelBursarReports
