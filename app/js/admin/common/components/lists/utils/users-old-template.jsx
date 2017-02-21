import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Body from "../../../../../common/components/body/body.jsx";
import SearchInput, {createFilter} from 'react-search-input';
import Spinner from '../../../../common/components/spinner.jsx';

import {
  fetchTownshipUsers, 
  editTownshipUsers, 
  createTownshipUsers,  
  resetLoading,
  resetReduxForm
} from '../../../../actions/actions-township-panel.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

import { AutoSizer, InfiniteLoader, List } from 'react-virtualized';
import { Link } from 'react-router';
import TownshipPanelUsersForm from './township-panel-users-form.jsx'
import {ajaxSelectizeGet, ajaxGet, ajaxDelete} from '../../../../common/components/ajax-selectize.js'
import styles from '../../../../common/styles/react-virtualized-list.module.css'
import _ from 'lodash';

const KEYS_TO_FILTERS = [
  'id',
  'user_id',
  'user_name',
  'township_code',
  'township_name',
  'profile_name',
  'status'
]


const fields = [ 
  'id',
  'user_id',
  'user_name',
  'profile_name',
  'status'
]

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

class TownshipPanelUsers extends React.Component {
  constructor(props) {
    super(props);
    // Scroll to the top of the page on construct.
    window.scrollTo(0, 0);

    this.state = {
      rowData: null,
      rowId: null,
      listLoading: true,
      ajaxLoading: true,
      ajaxData: null,
      tableWidth: 500,
      scrollToIndex: 0,
      currentIndex: 0,
      fetchCount: 0,
      searchInput: ""
    }

    this.renderUserTable = this.renderUserTable.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
    this.isRowLoaded = this.isRowLoaded.bind(this);
    this.loadMoreRows = this.loadMoreRows.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.ajaxSearch = this.ajaxSearch.bind(this);
    this.ajaxGet = this.ajaxGet.bind(this);
  }

  componentWillMount() {
    this.debounce = _.debounce(this.ajaxSearch, 500, { 'maxWait': 2000 });
    ajaxGet(`township_users?limit=10&offset=0&filter=(township_code=${this.props.townshipCode})`, (response) => {
      this.setState({ajaxData: response.data.resource, ajaxLoading: false, listLoading: false})
    })
  }
  
  ajaxSearch() {
    if(this.state.searchInput === null || this.state.searchInput === undefined || this.state.searchInput === "") {
      ajaxGet(`township_users?filter=(township_code=${this.props.townshipCode})`, this.ajaxGet);
      this.setState({ajaxLoading: true})
    } else {
      ajaxGet(`township_users?filter=(township_code=${this.props.townshipCode})AND(user_name CONTAINS ${this.state.searchInput})`, this.ajaxGet);
      this.setState({ajaxLoading: true})
    }
  }

  ajaxGet(response) {
    this.setState({ajaxData: response.data.resource, ajaxLoading: false});
  }

  handleSuccess(){
    this.props.resetLoading();
    this.setState({ajaxLoading: true});
    ajaxGet(`township_users?limit=10&offset=0&filter=(township_code=${this.props.townshipCode})`, (response) => {
      this.setState({ajaxData: response.data.resource, ajaxLoading: false, listLoading: false})
    })
    this.setState({showEditDuplicateButtons: false});
    window.scrollTo(0, 0);
    $('#modal-success').openModal();
  }

  renderCreateModal() {
    return(
      <TownshipPanelUsersForm 
        modalName="modal-township-users-create" 
        modalText="Create Admin" 
        submitType="CREATE"
        editMode={false}
        handleSuccess={this.handleSuccess}
        townshipCode={this.props.townshipCode}
      />
    );
  }

  isRowLoaded ({ index }) {
    //console.log(!!this.state.ajaxData[index])
    //console.log(this.state.ajaxData.length);
    //console.log(index < this.state.ajaxData.length)
    let indexCheck = index + 1;
    this.setState({currentIndex: indexCheck});
    return indexCheck < this.state.ajaxData.length;
    //&& indexCheck > this.state.ajaxData.length - 10;
    //return !!this.state.ajaxData[index]
  }

  loadMoreRows ({ startIndex, stopIndex }) {
    //console.log(startIndex);
    //console.log(stopIndex);

    if (!this.state.ajaxLoading && this.state.searchInput.length === 0) {
     
      let loadRows;
      /*
      if(this.state.currentIndex < this.state.ajaxData.length - 10) {
        console.log("Testing backwards")
        loadRows = () => {
          this.setState({listLoading: true});
          ajaxGet(`township_users?limit=20&offset=${this.state.fetchCount}`, (response) => {
              this.setState({ajaxData: response.data.resource, ajaxLoading: false, listLoading: false, scrollToIndex: startIndex, fetchCount: this.state.fetchCount - 10})
          })
        }
      } else {
        console.log("Testing forwards")
        console.log(this.state.ajaxData.length);
        loadRows = () => {
          this.setState({listLoading: true});
          ajaxGet(`township_users?limit=20&offset=${this.state.fetchCount}`, (response) => {
              this.setState({ajaxData: response.data.resource, ajaxLoading: false, listLoading: false, scrollToIndex: startIndex, fetchCount: this.state.fetchCount + 10})
          })
        }
      }
      */

      loadRows = () => {
          this.setState({listLoading: true});
           ajaxGet(`township_users?limit=${stopIndex + 11}&offset=${stopIndex}`, (response) => {
              this.setState({ajaxData: _.concat(this.state.ajaxData, response.data.resource), ajaxLoading: false, listLoading: false})
          })
        }
      return loadRows();
    }
    
  }

  rowRenderer ({ index, isScrolling, key, style }) {
    const {
      showScrollingPlaceholder,
      useDynamicRowHeight,
    } = this.state
    const listData = this.state.ajaxData[index];

    if(this.state.listLoading && index + 1 >= this.state.ajaxData.length) {
    return (
      <div
      key={key}
      style={style}
      onClick={() => {
        this.setState({rowData: listData, rowId: listData.id})
        $('#edit-buttons-modal').openModal();
      }}
      >
        <div className="center-align">
          <div className="center-align"> Loading Data... </div> 
          <Spinner small={true}/> 
        </div> 
      </div>
      )
    } else {
    return (
        <div
        className={styles.row + " clickable waves-effect flex-important"}
        key={key}
        style={style}
        onClick={() => {
          this.setState({rowData: listData, rowId: listData.id})
          $('#edit-buttons-modal').openModal();
        }}
        >
          <div
          className={styles.letter}
          //[Math.floor(Math.random()*colors.length)]
          style={{
            backgroundColor: colors[index % colors.length] 
          }}>
            {listData.user_name ? 
              <div> {listData.user_name.charAt(0).toUpperCase()} </div>
            :
              <div>?</div>
            }
          </div>

          <div>
            <div className={styles.name}>
              {listData.user_name}
            </div>
            {this.state.tableWidth > 600 ? 
              <div className={styles.index}>
                <strong>ID:</strong> {listData.id}
                <strong> Township:</strong> {listData.township_code}
                <strong> Profile Name:</strong> {listData.profile_name}
                <strong> Status:</strong> {listData.status}
              </div>
              :
              <div/>
            }
          </div>
        </div>
      )
    }
  }

  renderUserTable() {
    let listData = this.state.ajaxData;
    var renderEditModal = this.renderEditModal;
    
    return (
      <div className="row">
        <div style={{height: 500}}>
          <AutoSizer 
          disableHeight={true}
          onResize={({width}) => {
            this.setState({tableWidth: width})
          }}>
            {({ width }) => (
              <InfiniteLoader
              isRowLoaded={this.isRowLoaded}
              loadMoreRows={this.loadMoreRows}
              rowCount={listData.length}
              minimumBatchSize={1}
              threshold={9}
              >
              {({ onRowsRendered, registerChild }) => (
                <List
                  className={styles.List}
                  onRowsRendered={onRowsRendered}
                  overscanRowCount={0}
                  ref={registerChild}
                  width={width}
                  height={500}
                  rowHeight={75}
                  rowCount={listData.length}
                  rowRenderer={this.rowRenderer}
                />
              )}
              </InfiniteLoader>
            )}
          </AutoSizer>
        </div>
        <div className="divider"/> 

        <div className="center-align">
          <a
            className="modal-trigger waves-effect waves-light btn valign blue-btn-admin"
            onClick={() => {
              window.scrollTo(0, 0);
              this.props.resetReduxForm(fields);
              this.setState({showEditDuplicateButtons: false})
              $('#modal-township-users-create').openModal()
            }}
            style={{margin: 10}}>Add New Admin</a>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="blue-body marginless-row">
        <Body showHeader={true}>

          <div className="row marginless-row" style={{marginTop: 40}}>
            <div className="col s12">
              <nav>
                <div className="nav-wrapper nav-admin z-depth-2">
                  <a className="brand-logo center">Admin List</a>
                </div>
              </nav>
              <div className="row marginless-row card">
                <div className="search-wrapper card col s6 offset-s3" style={{marginBottom:10, marginTop: 10}}>
                  <div className="filter-container col s12 center-align">
                    <div className="row marginless-row valign-wrapper">
                      <input 
                        type="text"
                        name="search"
                        placeholder="Search..."
                        className="search search-input col s11" 
                        value={this.state.searchInput}
                        onChange={(event) => {
                          this.setState({searchInput: event.target.value});
                          this.debounce();
                        }} 
                        onKeyPress={this.handleEnterPress}
                        />
                        <i 
                        className="material-icons col s1 valign clickable"
                        onClick={() => this.ajaxSearch()}
                        >search</i>
                      </div>
                    </div>
                  </div>
                </div>
              <div className="card">
                <div>
                  {this.state.ajaxLoading ? 
                    <div className="card-content center-align">
                      <div className="center-align"> <Spinner /> </div> 
                    </div>
                    : this.renderUserTable()}
                </div>
              </div>
              {this.state.showEditDuplicateButtons ? 
                this.renderEditDuplicateButtons(this.state.parkingLocationCode) : <div> </div>}
            </div>
          </div>
        </Body>
        <div id="edit-buttons-modal" className="modal modal-fixed-footer admin-parking-modal" style={{height: 350}}>
          <nav>
            <div className="nav-wrapper nav-admin">
              <a className="brand-logo center">Options - User ID: {this.state.rowId}</a>
              <i 
              className="material-icons right right-align clickable" 
              style={{marginRight: 15, lineHeight: "55px"}}
              onClick={() => {
                $("#edit-buttons-modal").closeModal();
              }}>close</i>
            </div>
          </nav>
          <div className="modal-content">
            <div className="row">
              <div className="col s12">
                <a 
                onClick={() => {
                  window.scrollTo(0, 0);
                  $('#modal-township-users-edit').openModal(); 
                  $("#edit-buttons-modal").closeModal();
                }}
                className="waves-effect waves-light btn-large valign-wrapper animated fadeIn blue-btn-admin col s12" 
                style={{marginTop: 20, borderRadius: "25px"}}>
                  <span style={{marginRight: 30}}>Edit</span><i className="material-icons valign left">edit</i>
                </a>
              </div>
              <div className="col s12">
                <a 
                onClick={() => {
                  window.scrollTo(0, 0);
                  $('#modal-township-users-duplicate').openModal(); 
                  $("#edit-buttons-modal").closeModal();
                }}
                className="waves-effect waves-light btn-large valign-wrapper animated fadeIn blue-btn-admin col s12" 
                style={{marginTop: 20, borderRadius: "25px"}}>
                  <span style={{marginRight: 30}}>Duplicate</span><i className="material-icons valign left">content_copy</i>
                </a>
              </div>
              <div className="col s12">
                <a 
                onClick={() => {
                  window.scrollTo(0, 0);
                  $('#modal-delete').openModal(); 
                  $("#edit-buttons-modal").closeModal();
                }}
                className="waves-effect waves-light btn-large valign-wrapper animated fadeIn blue-btn-admin col s12" 
                style={{marginTop: 20,  borderRadius: "25px"}}>
                  <span style={{marginRight: 30}}>Delete</span><i className="material-icons valign left">delete</i>
                </a>
              </div>
            </div>
          </div>
        </div>
        { this.state.ajaxLoading ? 
          <div> </div> : this.renderCreateModal()}

        <div>
          <TownshipPanelUsersForm
            modalName="modal-township-users-edit" 
            modalText="Edit Admin" 
            submitType="EDIT"
            initialValues={this.state.rowData} 
            handleSuccess={this.handleSuccess}
            townshipCode={this.props.townshipCode}
          />
          <TownshipPanelUsersForm 
            modalName="modal-township-users-duplicate" 
            modalText="Duplicate Admin" 
            submitType="DUPLICATE"
            initialValues={this.state.rowData} 
            handleSuccess={this.handleSuccess}
            townshipCode={this.props.townshipCode}
          />
        </div>

        <div id="modal-success" className="modal">
          <div className="modal-content">
            <h4>Success!</h4>
            <p>You've successfully sent the request!</p>
          </div>
          <div className="modal-footer">
            <button 
            href="#" 
            className=" modal-action modal-close waves-effect waves-green btn-flat">Close</button>
          </div>
        </div>
        <div id="modal-delete" className="modal" style={{overflowX: "hidden"}}>
          <div className="modal-content">
            <h4>Delete</h4>
            <p>Are you sure you want to delete this record?</p>
          </div>
          <div className="modal-footer">
            <div className="row marginless-row">
              <div className="col s6 left">
                <button 
                  href="#" 
                  className=" modal-action modal-close waves-effect waves-green btn-flat">Close</button>
              </div>
              <div className="col s3">
                <a className="waves-effect waves-light btn btn-red" 
                onClick={() => {
                  $('#modal-delete').closeModal()
                }}>No</a>
              </div>
              <div className="col s3">
                <a className="waves-effect waves-light btn btn-green" 
                onClick={() => {
                  $('#modal-delete').closeModal()
                  ajaxDelete('township_users', this.state.rowData.id, this.handleSuccess);
                  this.setState({showEditDuplicateButtons: false});
                  window.scrollTo(0, 0);
                }}>Yes</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    townshipUsersFetched: state.townshipUsersFetched
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipUsers,
    resetLoading,
    resetReduxForm
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TownshipPanelUsers);

