import React from 'react'
import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'

import { ajaxGet, ajaxDelete } from '../../../../common/components/ajax-selectize.js';
import { SimpleSelect } from "react-selectize"
import { browserHistory } from 'react-router'

import { AutoSizer, List } from 'react-virtualized';
import styles from '../../../../common/styles/react-virtualized-list.module.css'
import _ from 'lodash'

const colors =
	[
		'#f44336',
		'#3f51b5',
		'#4caf50',
		'#ff9800',
		'#2196f3',
		'#374046',
		'#cddc39',
		'#2196f3',
		'#9c27b0',
		'#ffc107',
		'#009688',
		'#673ab7',
		'#ffeb3b',
		'#cddc39',
		'#795548'
	]

export default class InspectorPanelSearchCategory extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			parkingData: null,
			locationData: null,
			searchInput: null,
			listLoading: true,

			listHeight: 300,
			listRowHeight: 50,
			overscanRowCount: 10,
			rowCount: 10,
			scrollToIndex: undefined,
			showScrollingPlaceholder: false,
			useDynamicRowHeight: false
		}

		this.ajaxGet = this.ajaxGet.bind(this);
		this.ajaxSelect = this.ajaxSelect.bind(this);
		this.ajaxSearch = this.ajaxSearch.bind(this);
		this.locationGet = this.locationGet.bind(this);
		this.handleEnterPress = this.handleEnterPress.bind(this);
		this.rowRenderer = this.rowRenderer.bind(this);
	}

	componentWillMount() {
		this.debounce = _.debounce(this.ajaxSearch, 500, { 'maxWait': 2000 });
		ajaxGet(`parked_cars?filter=(township_code=${this.props.townshipCode})`, this.ajaxGet);
		ajaxGet(`manage_locations?filter=(township_code=${this.props.townshipCode})`, this.locationGet);
	}

	locationGet(locationData) {
		let locationArray = locationData.data.resource.map((data) => {
			if(data.location_code) {
				return {label: data.location_code, value: data.location_code};
			}
			
		});
		this.setState({ locationData: locationArray })
	}

	ajaxGet(parkingData) {
		this.setState({ parkingData: parkingData.data.resource, listLoading: false });
	}

	ajaxSearch() {
		if (this.state.searchInput === null || this.state.searchInput === undefined || this.state.searchInput === "") {
			ajaxGet(`parked_cars?filter=(township_code=${this.props.townshipCode})AND(location_code CONTAINS ${this.props.townshipCode})`, this.ajaxGet);
			this.setState({ listLoading: true })
		} else {
			ajaxGet(`parked_cars?` +
				`filter=(township_code=${this.props.townshipCode})AND(location_code CONTAINS ${this.props.townshipCode})AND` +
				`((location_code like ${this.state.searchInput}%)OR(location_code like %${this.state.searchInput})OR(location_code like %${this.state.searchInput}%))`, this.ajaxGet);
			this.setState({ listLoading: true })
		}
	}

	ajaxSelect(expiryStatus) {
		ajaxGet(`parked_cars?filter=(township_code=${this.props.townshipCode})AND(expiry_status=${expiryStatus})`, this.ajaxGet);
	}

	handleEnterPress(target) {
		if (target.charCode == 13) {
			this.ajaxSearch();
		}
	}

	rowRenderer({ index, isScrolling, key, style }) {
		const {
			showScrollingPlaceholder,
			useDynamicRowHeight,
		} = this.state
		const parkingData = this.state.parkingData[index]

		if (
			showScrollingPlaceholder &&
			isScrolling
		) {
			return (
				<div
					className={cn(styles.row, styles.isScrollingPlaceholder)}
					key={key}
					style={style}>
					Scrolling...
        </div>
			)
		}

		return (
			<div
				className={styles.row + " clickable waves-effect flex-important"}
				key={key}
				style={style}
				onClick={
					() => browserHistory.push(`admin/inspector/vehicle-info/${parkingData.id}`)
				}>
				<div
					className={styles.letter}
					style={{
						backgroundColor: colors[index % colors.length] 
					}}>
					{parkingData.plate_no ?
						<div> {parkingData.plate_no.charAt(0)} </div>
						:
						<div>?</div>
					}
				</div>

				<div>
					<div className={styles.name}>
						{parkingData.plate_no}
					</div>
					<div className={styles.index}>
						<strong>ID:</strong> {parkingData.id},
						<strong> Expiry Status:</strong> {parkingData.expiry_status},
						<strong> Ticket Status:</strong> {parkingData.ticket_status},
						<strong> Location:</strong> {parkingData.location_code}
					</div>
				</div>
			</div>
		)
	}

	render() {
		let parkingData = this.state.parkingData;
		let locationData;
		if (this.state.locationData !== null) {
			locationData = this.state.locationData;
		}
		return (
			<div className="blue-body marginless-row" style={{ minHeight: "120%" }}>
				<Body showHeader={true}>
					<div className="row marginless-row animated fadeInUp center-align" style={{ marginTop: 20 }}>
						<h4 style={{ color: "#FFF", fontWeight: "bold", marginTop: 10, marginBottom: 20 }}> Search Category </h4>
						<div className="filter-container col s12 center-align">
							{this.state.locationData !== null ?
								<div className="col s6 offset-s3 center-align" style={{minWidth: 300}}>
									<label style={{ color: "white" }}>Select Category</label>
									<div clasName="input-field search-wrapper card">
										<SimpleSelect
											options={[
                        {label: 'Non-Validated', value: "NONVALIDATED"},
                        {label: 'Valid', value: "VALID"},
                        {label: 'Expiring', value: "EXPIRING"},
                        {label: 'Expired', value: "EXPIRED"},    
                      ]}
											placeholder={"Select Category"}
											theme="default"
											style={{ marginTop: 5 }}
											onValueChange={(data) => {
												this.setState({listLoading: true});
												this.ajaxSelect(data.value);
											}}
											/>
									</div>
								</div>
								:
								<div className="col s6 offset-s3">
									<div style={{fontSize: 12, color: "#FFF"}}> Loading drop-down menu... </div>
									<div className="progress">
										<div className="indeterminate"></div>
									</div>
								</div>
							}



							{
								this.state.listLoading === true ?
									<div className="col s12" style={{ marginBottom: 10, marginTop: 10 }}>
										<div className={styles.List}>
											<div className="center-align ">
												<Spinner />
											</div>
										</div>
									</div>
									:
									(() => {
										if (this.state.parkingData === null || this.state.parkingData === undefined || this.state.parkingData.length === 0) {
											return (
												<div className="col s12" style={{ marginBottom: 10, marginTop: 10 }}>
													<div className={styles.List}>
														No results match this search...
                        </div>
												</div>
											);
										} else {
											return (
												<div className="col s12" style={{ marginBottom: 10, marginTop: 10 }}>
													<AutoSizer >
														{({ width }) => (
															<List
																className={styles.List}
																width={width}
																height={500}
																rowCount={this.state.parkingData.length}
																rowHeight={75}
																rowRenderer={this.rowRenderer}
																/>
														)}
													</AutoSizer>
												</div>
											);
										}
									})()

							}
						</div>
					</div>
				</Body>
			</div>
		);
	}
}
