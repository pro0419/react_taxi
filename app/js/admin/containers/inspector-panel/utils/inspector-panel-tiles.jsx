import React, { Component } from 'react';
import { Link } from 'react-router'


export class InspectorPanelTiles extends Component {
  render() {
    return (
			<div className="row marginless-row">
				<div>
					<div className="col s12 m12 l12 animated fadeInDown">
						<Link to={{pathname: `/admin/inspector/list-view/${this.props.townshipCode}`}} 
						className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
							<i className="material-icons valign">list</i>
							<h4> List View </h4>
						</Link>
					</div>
					<div className="col s12 m12 l12 animated fadeInUp">
						<Link to={{pathname: `/admin/inspector/map-view/${this.props.townshipCode}`}} 
						className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
							<i className="material-icons valign">map</i>
							<h4> Map View </h4>
						</Link>
					</div>
				</div>
			</div>
    );
  }
}