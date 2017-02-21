import React, { Component } from 'react';
import { Link } from 'react-router'
import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'

export default class InspectorListView extends Component {
  render() {
    return (
		<div className="blue-body">
			<Body showHeader={true}>
				<div className="content-container">
					<div className="container">
						<div className="row marginless-row"> 
							<div className="col s12 m12 l12 animated fadeInDown">
								<Link to={{pathname: `/admin/inspector/parking-field/${this.props.townshipCode}`}} 
								className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
										<i className="material-icons valign">local_parking</i>
										<h4> Parked Vehicles </h4>
								</Link>
							</div>
							<div className="col s12 m12 l12 animated fadeInUp">
								<Link to={{pathname: `/admin/inspector/create-ticket/${this.props.townshipCode}`}} 
								className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
									<i className="material-icons valign">receipt</i>
									<h4> Manage Tickets </h4>
								</Link>
							</div>
              {/*
							<div className="col s12 m12 l6 animated fadeInLeft">
								<Link to={{pathname: `/admin/inspector/search-location/${this.props.townshipCode}`}} 
								className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
									<i className="material-icons valign">location_on</i>
									<h4> Search By Location </h4>
								</Link>
							</div>
							<div className="col s12 m12 l6 animated fadeInRight">
								<Link to={{pathname: `/admin/inspector/search-category/${this.props.townshipCode}`}} 
								className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
									<i className="material-icons valign">widgets</i>
									<h4> Search By Category </h4>
								</Link>
							</div>
							<div className="col s12 m12 l12 animated fadeInUp">
								<Link to={{pathname: `/admin/inspector/search-plate/${this.props.townshipCode}`}} 
								className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
									<i className="material-icons valign">search</i>
									<h4> Search By Plate </h4>
								</Link>
							</div>
              */}
						</div>
					</div>
				</div>
			</Body>
		</div>
		);
  }
}