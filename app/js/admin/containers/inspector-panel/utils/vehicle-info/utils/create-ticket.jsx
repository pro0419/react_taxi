import React from 'react';
import { reduxForm, change } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import datetime from 'node-datetime'
import {SimpleSelect} from "react-selectize"
import { browserHistory } from 'react-router'
import {createFilter} from 'react-search-input';

import Body from "../../../../../../common/components/body/body.jsx";
import Spinner from '../../../../../common/components/spinner.jsx';

import {
  fetchTownshipLocations, 
  fetchHearingPlace, 
  createHearingPlace, 
  fetchViolationCode, 
  createViolationCode,
  resetLoading
} from '../../../../../actions/actions-township-panel.jsx'

import {fetchInspectorTicket, createInspectorTicket} from '../../../../../actions/actions-inspector-panel.jsx'
import { ajaxGet, ajaxDelete } from '../../../../../common/components/ajax-selectize.js';

import { Link } from 'react-router';
import axios from 'axios';

export const fields = [ 
  'id',
  'town_logo', 
  'plate_no',
  'violation_fee', 
  'violation_detail',  
  'respond_date',  
  'hearing_date',  
  'hearing_location',  
  'date_ticket', 
  'plead_guilty_no_guilty',  
  'v_user_name', 
  'address', 
  'email', 
  'phone', 
  'officer_name',  
  'officer_id',  
  'user_id', 
  'ticket_no', 
  'violation_code',  
  'violation_description', 
  'violation_location',  
  'court_id',  
  'hearing_address', 
  'township_code', 
  'v_user_id', 
  'tkt_status',  
  'signature', 
  'penalty_adjustment',  
  'adjustment_reference',  
  'hearing_hour',  
  'hearing_time',  
  'am_pm', 
  'twp_payment', 
  'paid_amount', 
  'paid_date',
]

class CreateTicket extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hearingMenu: false,
      hearingSelected: false,
      violationMenu: false,
      violationSelected: false,
      tableMenu: false,
      parkedCarData: null,
      ticketData: {},
    }

    this.handleHearingData = this.handleHearingData.bind(this)
    this.handleViolationData = this.handleViolationData.bind(this)
    this.renderHearingLocation = this.renderHearingLocation.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.ajaxGet = this.ajaxGet.bind(this);
  }

  componentWillMount() {
    this.props.fetchHearingPlace();
    this.props.fetchViolationCode();
    ajaxGet(`parked_cars/${this.props.vehicleCode}`, this.ajaxGet);
  }

  ajaxGet(parkedCarData) {
    this.setState({parkedCarData: parkedCarData.data});
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
    if (!this.props.inspectorTicketCreated.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess(){
    this.props.resetLoading();
    this.props.fetchHearingPlace();
    this.props.fetchViolationCode();
    $('#modal-success').openModal();
    //this.setState({hearingSelected: false, violationSelected: false})
  }

  handleSubmit(data) {
    let ticketData = _.merge(this.state.parkedCarData, data)
    this.props.createInspectorTicket(_.omit(ticketData, 'id'));

    axios.post('/api/notify-parking-ticket', ticketData)
    .then((response) => {
      console.log(response.data);
    })
    .catch((response) => {
      console.log(response.data);
    })
    
  }

  renderHearingLocation() {
    return (
      <div 
      className="card waves-effect waves-dark row" 
      style={{backgroundColor: "#F6EADF", border: "2px solid black", display: "block", borderBottom: "0px"}}
      onClick={() => this.setState({tableMenu: true, violationMenu: false, hearingMenu: true})}>
        <div style={{backgroundColor: "#F6EADF"}} className="township-userlist-container left-align col s12">
          <div style={{marginTop: 20, fontSize: 50}}> Hearing Location </div>
          {this.state.hearingSelected ?  
          <div className="row">
            <h5>Location: {this.state.ticketData.hearing_location}</h5>
          </div> : 
          <div className="row">
            <h5> Select a Location </h5>
          </div>
        }
        </div>
       </div>
    );
  }

  renderViolationCode() {
    return (
      <div 
      className="card waves-effect waves-dark row" 
      style={{backgroundColor: "#F6EADF", display: "block", border: "2px solid black"}}
      onClick={() => this.setState({tableMenu: true, violationMenu: true, hearingMenu: false})}>
        <div style={{backgroundColor: "#F6EADF"}} className="township-userlist-container left-align col s12">
          <div style={{marginTop: 20, fontSize: 50}}> Violation Type </div>
          {this.state.violationSelected ? 
            <div>
              <div className="row">
                <h5 className="col s6">Violation Code:</h5> 
                <h5 className="col s6">{this.state.ticketData.violation_code}</h5>
                <h5 className="col s6">Violation Fee:</h5> 
                <h5 className="col s6">{this.state.ticketData.violation_fee}</h5>
                <h5 className="col s6">Description:</h5>  
                <h5 className="col s6">{this.state.ticketData.violation_description}</h5>
              </div>
            </div> 
            : 
            <div className="row">
              <h5>Select a Violation Type</h5>
            </div>
            }
        </div>
       </div>
    );
  }

  handleHearingData(data) {
    this.setState({tableMenu: false, hearingSelected: true, ticketData: _.extend(this.state.ticketData, data)})
  }

  renderHearingMenu() {
    let hearingData = this.props.townshipHearingPlaceFetched.data.resource;
    console.log(hearingData)
    return hearingData.map((data) => {
      return (
        <div 
          className="card waves-effect waves-dark" 
          onClick={() => this.handleHearingData(data)}
          style={{backgroundColor: "#F6EADF", border: "2px solid black", display: "block", borderBottom: "0px"}}
          >
            <h5> Location: {data.hearing_location} </h5>
        </div>
      );
    });
  }

  handleViolationData(data) {
    this.setState({tableMenu: false, violationSelected: true, ticketData: _.extend(this.state.ticketData, data)})
  }

  renderViolationMenu() {
    let hearingData = this.props.townshipViolationCodeFetched.data.resource;
    return hearingData.map((data) => {
      return (
        <div 
          className="card waves-effect waves-dark" 
          onClick={() => this.handleViolationData(data)}
          style={{backgroundColor: "#F6EADF", border: "2px solid black", display: "block", borderBottom: "0px"}}
          >
            <div className="row">
              <h5 className="col s6"> Violation Code: {data.violation_code} </h5>
              <h5 className="col s6"> Violation Fee: {data.violation_fee} </h5>
              <h5 className="col s12"> Violation Description: {data.violation_description} </h5>
            </div>
        </div>
      );
    });
  }

  renderSuccessModal() {
    return(
      <div id="modal-success" className="modal">
        <div className="modal-content">
          <h4>Success!</h4>
          <p>You've successfully sent the request!</p>
        </div>
        <div className="modal-footer">
          <button 
          href="#" 
          className=" modal-action modal-close waves-effect waves-green btn-flat">Close</button>
          <button 
          href="#" 
          onClick={() => browserHistory.push('admin/inspector/create-ticket/FDV')}
          className=" modal-action modal-close waves-effect waves-green btn">Go to Ticket List</button>
        </div>
      </div>
    );
  }
  

  render() {
    const {
      resetForm,
      submitting,
      dispatch
    } = this.props
    if (!this.state.tableMenu) {
      return (
        <div className="marginless-row" style={{backgroundColor: "#FBE6CB"}}>
          <Body showHeader={true}>
            <div className="card waves-effect waves-dark" 
              style={{
              backgroundColor: "#F6EADF", 
              border: "2px solid black", 
              display: "block", 
              borderBottom: "0px"}}>
              <div style={{backgroundColor: "#F6EADF"}} className="township-userlist-container center-align">
              {
                this.state.parkedCarData == null ? <div className="center-align"> <Spinner /> </div> : 
                <div>
                  <div style={{marginTop: 20, fontSifze: 50}}> Vehicle Info. </div>
                  {(() => {
                    let currentTime = moment().diff(moment(this.state.parkedCarData.expiry_time), 'hours');
                    if(currentTime > 0 && this.state.greenOff == false) {
                      return <img src={require('../../../../../../../images/car_red@3x.png')} className="animated bounceIn"/>
                    } else if (currentTime < 0 && this.state.redOff == false) {
                      return <img src={require('../../../../../../../images/car_green@3x.png')} className="animated bounceIn"/>
                    } else if (currentTime == 0 && this.state.yellowOff == false) {
                      return <img src={require('../../../../../../../images/car_yellow@3x.png')} className="animated bounceIn"/>
                    } else {
                      return <img src={require('../../../../../../../images/car_green@3x.png')} className="animated bounceIn"/>
                    }
                  })()}

                  <div className="row" style={{marginTop: 30}}>
                    <h5 className="col s12">Plate Number - {this.state.parkedCarData.plate_no}</h5>
                  </div>

                  <div className="row">
                    <h5 className="col s6">State - {this.state.parkedCarData.state}</h5>
                    <h5 className="col s6">Row - {this.state.parkedCarData.lot_row} </h5>
                  </div>
                </div>

              }
              </div>
            </div>
            { this.props.townshipHearingPlaceFetched.isLoading ? 
              <div>Loading... </div> : this.renderHearingLocation()}
            { this.props.townshipViolationCodeFetched.isLoading ? 
              <div>Loading... </div> : this.renderViolationCode()}
            {
                this.state.parkedCarData == null ? <div> Loading... </div> : 
                <div className="card waves-effect waves-light" 
                  onClick={() => this.handleSubmit(this.state.ticketData)} 
                  style={{
                  backgroundColor: "#CC0000", 
                  border: "2px solid black", 
                  display: "block", 
                  marginTop: 150
                  }}>
                  <div 
                  className="township-userlist-container center-align" 
                  style={{backgroundColor: "#CC0000"}}>
                    <i style={{color: "white", fontSize: "80"}} className="material-icons valign">receipt</i>
                    <h4 style={{color: "white"}}> Create Ticket </h4>
                  </div>
                </div>
            }
            
          </Body>
          {this.renderSuccessModal()}
        </div>
      );
    } else if (this.state.tableMenu) {
      if(this.state.hearingMenu) {
        return (
          <div className="blue-body marginless-row" style={{backgroundColor: "#FBE6CB"}}>
            <Body showHeader={true}>
              <h3 style={{
                border: "2px solid black", 
              display: "block", 
              padding: 20, 
              margin: 0, 
              borderBottom: "0px", 
              fontWeight: "bold"}}> Hearing Locations: </h3>
              {this.renderHearingMenu()} 
            </Body>
            {this.renderSuccessModal()}
          </div>
        )
      } else if (this.state.violationMenu) {
          return (
            <div className="blue-body marginless-row" style={{backgroundColor: "#FBE6CB"}}>
              <Body showHeader={true}>
                <h3 style={{
                border: "2px solid black", 
                display: "block", 
                padding: 20, 
                margin: 0, 
                borderBottom: "0px", 
                fontWeight: "bold"}}> Violation Type: </h3>
                {this.renderViolationMenu()} 
              </Body>
              {this.renderSuccessModal()}
            </div>
          )
      }
    }
    
  }
}

function mapStateToProps(state) {
  return {

    townshipHearingPlaceFetched: state.townshipHearingPlaceFetched,
    townshipHearingPlaceCreated: state.townshipHearingPlaceCreated,

    townshipViolationCodeFetched: state.townshipViolationCodeFetched,
    townshipViolationCodeCreated: state.townshipViolationCodeCreated,

    inspectorTicketFetched: state.inspectorTicketFetched,
    inspectorTicketCreated: state.inspectorTicketCreated,

    townshipLocationsFetched: state.townshipLocationsFetched,

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

    fetchTownshipLocations,

    fetchHearingPlace,
    createHearingPlace,
   
    fetchViolationCode,
    createViolationCode,

    fetchInspectorTicket, 
    createInspectorTicket,

    resetLoading,

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTicket);

