import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ReactTooltip from 'react-tooltip'

import _ from 'lodash';
import { AutoSizer, InfiniteLoader, List } from 'react-virtualized';

import styles from '../../styles/react-virtualized-list.module.css'
import {ajaxSelectizeGet, ajaxDelete, ajaxGet} from '../ajax-selectize.js'
import Spinner from '../spinner';

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

class GenericList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rowData: null,
      rowId: null,
      listLoading: true,
      ajaxLoading: true,
      ajaxData: null,
      ajaxMeta: null,
      ajaxURI: "",
      filterLabel: "",
      tableWidth: 500,
      scrollToIndex: 0,
      currentIndex: 0,
      fetchCount: 0,
      searchInput: "",
      searchKey: null,
      tooltipShow: false
    }

    this.rowRenderer = this.rowRenderer.bind(this);
    this.isRowLoaded = this.isRowLoaded.bind(this);
    this.loadMoreRows = this.loadMoreRows.bind(this);
    this.renderRadioButtons = this.renderRadioButtons.bind(this);
    this.ajaxSearch = this.ajaxSearch.bind(this);
    this.ajaxGet = this.ajaxGet.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  componentWillMount() {
    this.setState({radioSearch: this.props.mainFilter})
    this.debounce = _.debounce(this.ajaxSearch, 500, { 'maxWait': 2000 });

    if(this.props.skipTownshipFilter === true) {
      this.townshipCodeFilter = ''
      this.townshipCodeSearchFilter = ''
    } else if (this.props.skipTownshipFilter === false || this.props.skipTownshipFilter === undefined) {
      this.townshipCodeFilter = `&filter=(township_code=${this.props.townshipCode})`
      this.townshipCodeSearchFilter = `(township_code=${this.props.townshipCode})AND`
    }

    let ajaxURI = `${this.props.ajaxURI}?limit=10&offset=0${this.townshipCodeFilter}${this.props.filter}&include_schema=true`;
    ajaxGet(ajaxURI , (response) => {
      this.setState({
        ajaxData: response.data.resource, 
        ajaxMeta: response.data.meta,
        ajaxLoading: false, 
        listLoading: false,
        ajaxURI: ajaxURI,
        filterLabel: _.find(response.data.meta.schema.field, {'name': this.props.mainFilter})
      })
    })
  }

  componentDidUpdate() {
    if (!this.props.dataCreated.isLoading) {
        this.handleSuccess();
    }
    if (!this.props.dataEdited.isLoading) {
        this.handleSuccess();
    }
  };

  handleSuccess() {
    this.props.handleSuccess();
    this.setState({ajaxLoading: true});
    ajaxGet(this.state.ajaxURI, this.ajaxGet);
  }

  ajaxGet(response) {
    this.setState({
      ajaxData: response.data.resource, 
      ajaxMeta: response.data.meta,
      ajaxLoading: false,
      listLoading: false
    });
  }

  ajaxSearch() {
    let filterKey;
    if(this.state.searchKey !== null) {
      filterKey = this.state.searchKey;
    } else {
      filterKey = this.props.mainFilter;
    }
    if(this.state.searchInput === null || this.state.searchInput === undefined || this.state.searchInput === "") {
      this.setState({
        ajaxLoading: true,
        ajaxURI: `${this.props.ajaxURI}?limit=10&offset=0${this.townshipCodeFilter}${this.props.filter}&include_schema=true`
      })
      ajaxGet(`${this.props.ajaxURI}?limit=10&offset=0${this.townshipCodeFilter}${this.props.filter}&include_schema=true`, this.ajaxGet);
    } else {
      this.setState({
        ajaxLoading: true,
        ajaxURI: `${this.props.ajaxURI}?filter=${this.townshipCodeSearchFilter}(${filterKey} CONTAINS ${this.state.searchInput})AND${this.props.filter}&include_schema=true`
      })
      ajaxGet(`${this.props.ajaxURI}?filter=${this.townshipCodeSearchFilter}(${filterKey} CONTAINS ${this.state.searchInput})${this.props.filter}&include_schema=true`, this.ajaxGet);
    }
  }

  isRowLoaded ({ index }) {
    console.log(index)
    let indexCheck = index + 1;
    this.setState({currentIndex: indexCheck});
    return indexCheck < this.state.ajaxData.length;
  }

  loadMoreRows ({ startIndex, stopIndex }) {
    console.log(startIndex)
    console.log(stopIndex)
    if (!this.state.ajaxLoading && this.state.searchInput.length === 0 && stopIndex >= 9) {
      let loadRows;
      loadRows = () => {
        this.setState({listLoading: true});
          ajaxGet(`${this.props.ajaxURI}?limit=${stopIndex + 11}&offset=${stopIndex}`, (response) => {
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
        this.props.setRowData(listData);
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
          this.props.setRowData(listData);
          this.setState({rowData: listData, rowId: listData.id})
          $('#edit-buttons-modal').openModal();
        }}
        >
          <div
          className={styles.letter}
          style={{
            backgroundColor: colors[index % colors.length] 
          }}>
            {listData[this.props.mainFilter] ? 
              <div> {(() => {
                if(isNaN(listData[this.props.mainFilter])) {
                  return listData[this.props.mainFilter].charAt(0).toUpperCase()
                } else {
                  let parsedInt = String(listData[this.props.mainFilter]);
                  return parsedInt.charAt(0)
                }
              })()} </div>
            :
              <div>?</div>
            }
          </div>

          <div>
            <div className={styles.name}>
              {listData[this.props.mainFilter]}
            </div>
            {this.state.tableWidth > 600 ? 
              <div className={styles.index}>
                <strong>{this.state.filterLabel.label}: </strong> {listData[this.props.mainFilter]}
              </div>
              :
              <div/>
            }
          </div>
        </div>
      );
    }
  }

  handleRadioChange(event) {
    console.log(event.target.value);
    this.setState({searchKey: event.target.value});
  }

  renderRadioButtons() {
    return (
      <div>
        <div className="col s12 center-align" 
        style={{fontSize: 14, marginBottom: 10}}
        onClick={() => {
          if(this.state.tooltipShow) {
            this.setState({tooltipShow: false})
          } else {
            this.setState({tooltipShow: true})
          } 
        }}>
          Search Options <i 
          className="material-icons waves-effect waves-dark" 
          data-tip="Show/Hide Options">arrow_drop_down</i>
          <ReactTooltip />
        </div>
        {this.state.tooltipShow ? 
          <div className="col s12 center-align" style={{marginBottom: 10, marginTop: 0}}>
            <div className="marginless-row center-align">
              {(() => {
                return this.state.ajaxMeta.schema.field.map((data)=>{
                  let defaultChecked = false;
                  if(this.state.searchKey == data.name) {
                    defaultChecked = true;
                  }
                  return (
                    <div className="col s3">
                      <input 
                      type="radio" 
                      id={data.name} 
                      name="search-key-radio" 
                      value={data.name} 
                      onChange={this.handleRadioChange} 
                      defaultChecked={defaultChecked}
                      className = "left"/>
                      <label 
                      htmlFor={data.name} 
                      style={{paddingLeft: 30, paddingRight: 10}}
                      className = "left">
                        {data.label}
                      </label>
                    </div>
                  )
                })
              })()}
            </div>
          </div>
          :
          <div>
          </div>
        }
        

      </div>
    );
  }

  render() {
    return (
      <div className="row marginless-row" style={{marginTop: 40}}>
        <div className="col s12">
          <nav>
            <div className="nav-wrapper nav-admin z-depth-2">
              <a className="brand-logo center">{this.props.modalTitle}</a>
            </div>
          </nav>
          <div className="card">
            <div className="township-userlist-container">
              
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
                {this.state.ajaxData === null ?  
                <div className="card-content center-align col s12">
                  <div className="center-align"> <Spinner small={true}/> </div> 
                </div> : this.renderRadioButtons()}
              </div>
              {this.state.ajaxData === null || this.state.ajaxLoading ? 
                <div className="card-content center-align">
                  <div className="center-align"> <Spinner /> </div> 
                </div>
                  :
                (() => {
                  if(this.state.ajaxData.length > 0) {
                    return(
                      <AutoSizer 
                        disableHeight={true}
                        onResize={({width}) => {
                          this.setState({tableWidth: width})
                      }}>
                        {({ width }) => (
                          <InfiniteLoader
                          isRowLoaded={this.isRowLoaded}
                          loadMoreRows={this.loadMoreRows}
                          rowCount={this.state.ajaxData.length}
                          minimumBatchSize={1}
                          threshold={10}
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
                              rowCount={this.state.ajaxData.length}
                              rowRenderer={this.rowRenderer}
                            />
                          )}
                        </InfiniteLoader>
                        )}
                      </AutoSizer>
                    )
                  } else {
                    return (
                      <div className="card-content center-align">
                        <div className="center-align"> No results match your search. </div> 
                      </div>
                    );
                  }
                })()
              }

            <div className="divider"/> 

            <div className="center-align">
                <a
                  className="modal-trigger waves-effect waves-light btn valign blue-btn-admin"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    this.setState({showEditDuplicateButtons: false})
                    this.props.setRowData(null);
                    $(`#modal-${this.props.modalName}-create`).openModal()
                  }}
                  style={{margin: 10}}>Add New {this.props.modalTitle}</a>
              </div>
              <div id="edit-buttons-modal" className="modal modal-fixed-footer admin-parking-modal" style={{height: 350}}>
                  <nav>
                    <div className="nav-wrapper nav-admin">
                      <a className="brand-logo center">Options - {this.props.modalTitle}: {this.state.rowId}</a>
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
                          $(`#modal-${this.props.modalName}-edit`).openModal(); 
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
                          $(`#modal-${this.props.modalName}-duplicate`).openModal(); 
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
                          this.setState({ajaxLoading: true, listLoading: true});
                          ajaxDelete(this.props.ajaxURI, this.state.rowData.id, () => {
                            ajaxGet(this.state.ajaxURI, this.ajaxGet);
                          });
                          window.scrollTo(0, 0);
                        }}>Yes</a>
                      </div>
                    </div>
                  </div>
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
    dataFetched: state.dataFetched,
    dataCreated: state.dataCreated,
    dataEdited: state.dataEdited
  }
}

export default connect(mapStateToProps, null)(GenericList);