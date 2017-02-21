import React from 'react';
import { Link } from 'react-router';

export default class TownshipPanelTiles extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="row center-align marginless-row" style={{marginTop: 30}}>
            <div className="col s12 m12 l6">
              <Link 
                to={{pathname: `/admin/township/users/${this.props.townshipCode}`}} 
                className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
                <i className="material-icons valign" >person</i>
                <h4> Admin List </h4>
              </Link>
            </div>
            <div className="col s12 m12 l6">
              <Link 
                to={{pathname: `/admin/township/user-profiles/${this.props.townshipCode}`}} 
                className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
                <i className="material-icons valign" >person</i>
                <h4> User List </h4>
              </Link>
            </div>
            <div className="col s12 m12 l6">
              <Link 
              to={{pathname: `/admin/township/facilities/${this.props.townshipCode}`}} 
              className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
                <i className="material-icons valign">place</i>
                <h4> Facilities List </h4>
              </Link>
            </div>
            <div className="col s12 m12 l6">
              <Link 
              to={{pathname: `/admin/township/parking-rules/${this.props.townshipCode}`}} 
              className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
                <i className="material-icons valign">report</i>
                <h4> Parking Rules </h4>
              </Link>
            </div>
            <div className="col s12 m12 l12">
              <Link 
              to={{pathname: `/admin/township/subscriptions/${this.props.townshipCode}`}} 
              className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
                <i className="material-icons valign">autorenew</i>
                <h4> Subscriptions </h4>
              </Link>
            </div>
            {/*
          <div className="col s12 m12 l6">
            <Link 
            to={{pathname: `/admin/township/permit/${this.props.townshipCode}`}} 
            className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
              <i className="material-icons valign">event_note</i>
              <h4> Permit List </h4>
            </Link>
          </div>
          <div className="col s12 m12 l6">
            <Link 
            to={{pathname: `/admin/township/permit-requests/${this.props.townshipCode}`}} 
            className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
              <i className="material-icons valign">event_available</i>
              <h4> Permit Request List </h4>
            </Link>
          </div>
          */}
          <div className="col s12 m12 l6">
            <Link 
            to={{pathname: `/admin/township/violation-code/${this.props.townshipCode}`}} 
            className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
              <i className="material-icons valign">warning</i>
              <h4> Violation Code List </h4>
            </Link>
          </div>
          <div className="col s12 m12 l6">
            <Link 
            to={{pathname: `/admin/township/hearing-place/${this.props.townshipCode}`}} 
            className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
              <i className="material-icons valign">account_balance</i>
              <h4> Hearing Place List </h4>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
