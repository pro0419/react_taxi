import React, {PropTypes, Component}  from 'react';
import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'
import { browserHistory, Link } from 'react-router'
import moment from 'moment'

import { ajaxGet, ajaxDelete } from '../../../../common/components/ajax-selectize.js';
import ImageCheckbox from '../../../../../common/components/footer/utils/image-checkbox.jsx';

import GoogleMap from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';
import MapMarker from './utils/marker'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {updateMapView} from '../../../../actions/actions-inspector-panel.jsx'

class InspectorMapView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      markerData: null,
      showMarkers: false,
      showInfo: false,
      yellowOff: false,
      redOff: false,
      greenOff: false,
      zoom: 10,
			lat: 40.7128,
			lng: -73.935242,
      zoom: 10,
			lat: 40.7128,
			lng: -73.935242,
    }

    this.ajaxGet = this.ajaxGet.bind(this);
    this.renderFooterIcons = this.renderFooterIcons.bind(this);
  }

  componentWillMount() {
    if(this.props.mapViewUpdated.isLoading == false) {
      this.setState({zoom: 15, lat: parseFloat(this.props.mapViewUpdated.data.lat), lng: parseFloat(this.props.mapViewUpdated.data.lng)})
    } else {
      //ajaxGet()
    }
    ajaxGet(`parked_cars?filter=(township_code=${this.props.townshipCode})`, this.ajaxGet);
  }

  ajaxGet(markerData) {
    this.setState({markerData: markerData, showMarkers: true})
  }

  handleMarkerClick(marker) {
    this.setState(this.state);
  }
  
  handleMarkerClose(marker) {
    this.setState({showInfo: false});
  }

  renderInfoWindow(ref, marker, plate_no, plate_id) {
    var plateNull = false;
    if (plate_no == null) {
      plateNull = true;
    }

    return (
      <InfoWindow 
      key={`${ref}_info_window`}
      onCloseclick={this.handleMarkerClose.bind(this, marker)}
      className="center-align"
      >
        <Link 
        to={`admin/inspector/vehicle-info/${plate_id}`} 
        className="center-align">
          {plateNull ? "Plate # N/A" : plate_no} 
          <div> - Click Here - </div>
        </Link>
      </InfoWindow>
    );
  }

  handleMarkerClick(marker) {
    marker.showInfo = true;
    this.setState(this.state);
  }

  handleMarkerClose(marker) {
    marker.showInfo = false;
    this.setState(this.state);
  }
  
  renderMarkers() {
    let markerData = this.state.markerData.data.resource;
    
    return markerData.map((data, index) => {
      const ref = `marker_${index}`;
      let iconUrl;
      let renderMarker = true;
      let currentTime = moment.utc(new Date()).diff(moment.utc(data.expiry_time), 'minutes');
      if(currentTime < -60 && this.state.greenOff == false) {
        iconUrl = require('../../../../../../images/car_green@3x.png')
      } else if (currentTime > 0 && this.state.redOff == false) {
        iconUrl = require('../../../../../../images/car_red@3x.png')
      } else if (currentTime >= -60 && currentTime <= 0 && this.state.yellowOff == false) {
        iconUrl = require('../../../../../../images/car_yellow@3x.png')
      } else {
        renderMarker = false;
      }
      
      if (renderMarker) {
        let lat = parseFloat(data.lat);
        let lng = parseFloat(data.lng);

        let width = Math.round(63*Math.pow(2, this.state.zoom)) / 20000;
        let height =  Math.round(50*Math.pow(2, this.state.zoom)) / 20000;

        //restrict the maximum size of the icon
        if(width > 126)  {
          width = 126;
        }
        if(height > 93)  {
          height = 93;
        }
        if(width < 32)  {
          width = 32;
        }
        if(height < 25)  {
          height = 25;
        }
        
        if (lat && lng) {
          return (
            <MapMarker 
            handleCarClick={() => browserHistory.push(`admin/inspector/vehicle-info/${data.id}`)}
            iconUrl={iconUrl}
            lat={lat} 
            lng={lng}
            height={height}
            width={width}
            plateNo={data.plate_no}
            carId={data.id}
            />
          );
        }
      }
    });

  }

  renderFooterIcons() {
    const { greenOff, yellowOff, redOff } = this.state;

    let greenStyle = null;
    let redStyle = null;
    let yellowStyle = null;

    if (this.state.greenOff == true) {
      greenStyle = {opacity: "0.5"};
    } 
    if (this.state.redOff) {
      redStyle = {opacity: "0.5"};
    } 
    if (this.state.yellowOff) {
      yellowStyle = {opacity: "0.5"};
    }

    return (
      <div className="footer row marginless-row">
        <div className="col s4 footer-item">
          <div className="img-checkbox-icon" style={{paddingBottom: 0, marginBottom: 0}}>
            <img 
            src={require('../../../../../../images/car_green@3x.png')} 
            style={greenStyle}
            onClick={() => this.setState({greenOff: !greenOff})} 
            className="responsive-img"/>
          </div>
          <div className="img-checkbox-label">
            Valid
          </div>
        </div>
        <div className="col s4 footer-item">
          <div className="img-checkbox-icon">
            <img 
            style={redStyle}
            src={require('../../../../../../images/car_red@3x.png')} 
            onClick={() => this.setState({redOff: !redOff})} 
            className="responsive-img"/>
          </div>
          <div className="img-checkbox-label">
            Expired
          </div>
        </div>
        <div className="col s4 footer-item">
          <div className="img-checkbox-icon">
            <img 
            style={yellowStyle}
            src={require('../../../../../../images/car_yellow@3x.png')} 
            onClick={() => this.setState({yellowOff: !yellowOff})} 
            className="responsive-img"/>
          </div>
          <div className="img-checkbox-label">
            Expiring
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="marginless-row">
        <Body showHeader={true}>
            <div>
              <section style={{height: "calc(100% - 165px)"}}>
                <GoogleMap
                  onClick={null}
                  zoom={this.state.zoom}
                  center={{ lat: this.state.lat, lng: this.state.lng }}
                  bootstrapURLKeys={{
                    key: "AIzaSyDysQZjtU9j2dMZ5D2drY40hH-KKRR-x3k",
                    language: 'en',
                  }}
                  onBoundsChange={(center, zoom, bounds, marginBounds) => { 
                    this.setState({zoom: zoom});
                  }}
                  >
                  {this.state.showMarkers ?  this.renderMarkers() : <div/>}
                  <MapMarker lat={this.state.lat} lng={this.state.lng}/>
                </GoogleMap>
              </section>
              {this.renderFooterIcons()}
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

export default connect(mapStateToProps, mapDispatchToProps)(InspectorMapView);