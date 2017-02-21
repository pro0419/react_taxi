import React from 'react';

import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'
import moment from 'moment'
import { Link, browserHistory } from 'react-router'
import {createFilter} from 'react-search-input';
import { ajaxGet, ajaxDelete } from '../../../../common/components/ajax-selectize.js';
import {updateMapView} from '../../../../actions/actions-inspector-panel.jsx'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class InspectorVehicleInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parkedCarData: null, 
      dataLoading: true,
      color: "green"
    }
    this.ajaxGet = this.ajaxGet.bind(this);
  }

  componentWillMount() {
    ajaxGet(`parked_cars/${this.props.vehicleCode}`, this.ajaxGet);
  }

  ajaxGet(parkedCarData) {
    this.setState({parkedCarData: parkedCarData.data, dataLoading: false});
  }

  render() {
    return (
      <div className="marginless-row" style={{backgroundColor: "#FBE6CB"}}>
        <Body showHeader={true}>

          <div className="row marginless-row">
            <div className="center-align">
              <div className="card" 
              style={{
              backgroundColor: "#F6EADF", 
              display: "block", }}>
                  <div className="township-userlist-container" style={{backgroundColor: "#F6EADF"}}>
                    <div style={{marginTop: 20, fontSize: 50, fontWeight: "100"}}> Vehicle Info. </div>
                      { 
                        this.state.dataLoading ? 
                        <div className="center-align"> <Spinner /> </div>
                        :
                        (() => {
                          let currentTime =moment.utc(new Date()).diff(moment.utc(this.state.parkedCarData.expiry_time), 'minutes');
                          if(currentTime > 0) {
                            return <img src={require('../../../../../../images/car_red@3x.png')} className="animated bounceIn"/>
                          } else if (currentTime < -60) {
                            return <img src={require('../../../../../../images/car_green@3x.png')} className="animated bounceIn"/>
                          } else if (currentTime >= -60 && currentTime <= 0) {
                            return <img src={require('../../../../../../images/car_yellow@3x.png')} className="animated bounceIn"/>
                          } else {
                            {alert("Expiry calc error.")}
                            return <img src={require('../../../../../../images/car_green@3x.png')} className="animated bounceIn"/>
                          }
                        })()
                      }
                    <div className="row" style={{marginTop: 30}}>
                    { 
                      this.state.dataLoading ? 
                      <div> Loading... </div>
                      :
                      <div>
                        <h5 className="col s12">Plate Number - {this.state.parkedCarData.plate_no}</h5>
                      </div>
                    }  
                </div>

                <div className="row">
                { 
                  this.state.dataLoading ? 
                  <div> Loading... </div>
                  :
                  <div>
                  <h5 className="col s6">State - {this.state.parkedCarData.state}</h5>
                  <h5 className="col s6">City - {this.state.parkedCarData.city}</h5>
                  </div>
                }
                </div>
                  </div>
              </div>
            </div>
          </div>

          <div className="card" 
          style={{
          backgroundColor: "#4C4B49", 
          display: "block", }}>
              <div className="township-userlist-container" style={{backgroundColor: "#4C4B49"}}>
                <div className="row marginless-row center-align">
                  { 
                    this.state.dataLoading ? 
                    <div> Loading... </div>
                    :
                    <span className="col s12" style={{color: "white", fontSize: 50, margin: 0, fontWeight: "bold"}}> 
                      {moment(this.state.parkedCarData.expiry_time).format('HH:mm:ss')} 
                    </span>
                  }
                </div>
                <div className="row marginless-row center-align">
                  <span className="col s12" style={{color: "white", margin: 0}}>Hours : Minutes : Seconds </span>
                </div>
              </div>
          </div>

          <div className="card" 
          style={{
          backgroundColor: "#313131", 
          display: "block", }}>
            { 
              this.state.dataLoading ? 
              <div> Loading... </div>
              :
              <div className="township-userlist-container" style={{backgroundColor: "#313131", color: "white",}}>
                <div className="row">
                  <div className="right-align">
                    <h5 className="col s6">Plate #:</h5> 
                  </div>
                  <div className="left-align">
                    <h5 className="col s6">{this.state.parkedCarData.plate_no}</h5>
                  </div>
                  <div className="right-align">
                    <h5 className="col s6">Violation Fee:</h5> 
                  </div>
                  <div className="left-align">
                    <h5 className="col s6">{this.state.parkedCarData.tr_fee}</h5>
                  </div>
                  <div className="right-align">
                    <h5 className="col s6">Row:</h5>  
                  </div>
                  <div className="left-align">
                    <h5 className="col s6">{this.state.parkedCarData.lot_row}</h5>
                  </div>
                </div>
              </div>
            }
              
          </div>

          { 
            this.state.dataLoading ? 
            <div> Loading... </div>
            :
            <div>
              <Link 
                to={{pathname: `/admin/inspector/map-view/${this.state.parkedCarData.township_code}`}}
                onClick={() => {
                  this.props.updateMapView({lat: this.state.parkedCarData.lat, lng: this.state.parkedCarData.lng})
                  console.log({lat: this.state.parkedCarData.lat, lng: this.state.parkedCarData.lng});
                }}
                className="card waves-effect waves-light center-align" 
                style={{
                backgroundColor: "#0d53cf", 
                border: "2px solid black", 
                borderBottom: "0", 
                display: "block", 
                }}>
                <div 
                className="township-userlist-container center-align" 
                style={{backgroundColor: "#0d53cf"}}>
                  <i style={{color: "white", fontSize: "80", marginTop: 10}} className="material-icons valign">search</i>
                  <h4 style={{color: "white", paddingTop: 0, marginTop: 0, marginBottom: 10}}> Find this Vehicle </h4>
                </div>
              </Link>

              <Link  
                to={{pathname: `/admin/inspector/vehicle-info/create-ticket/${this.state.parkedCarData.id}`}} 
                className="card waves-effect waves-light center-align" 
                style={{
                backgroundColor: "#CC0000", 
                border: "2px solid black",
                borderBottom: "0",  
                display: "block", 
                }}>
                <div 
                className="township-userlist-container center-align" 
                style={{backgroundColor: "#CC0000"}}>
                  <i style={{color: "white", fontSize: "80", marginTop: 10}} className="material-icons valign">receipt</i>
                  <h4 style={{color: "white", paddingTop: 0, marginTop: 0, marginBottom: 10}}> Create Ticket </h4>
                </div>
              </Link>
            </div>
          }

          <div 
            onClick={browserHistory.goBack}
            className="card waves-effect waves-light center-align" 
            style={{
            backgroundColor: "#FCFF00", 
            border: "2px solid black", 
            display: "block", 
            }}>
            <div 
            className="township-userlist-container center-align" 
            style={{backgroundColor: "#FCFF00"}}>
              <i style={{color: "black", fontSize: "80", marginTop: 10}} className="material-icons valign">arrow_back</i>
              <h4 style={{color: "black", marginTop: 0, marginBottom: 10}}> Back </h4>
            </div>
          </div>
        </Body>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    mapViewUpdated: state.mapViewUpdated
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateMapView
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InspectorVehicleInfo);