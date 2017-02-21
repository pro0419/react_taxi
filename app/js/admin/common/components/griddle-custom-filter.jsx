import React from 'react'
import SearchInput, {createFilter} from 'react-search-input'
import _ from 'underscore'
import squish from 'object-squish'

export const customFilterFunction = function(items, query) {
  return _.filter(items, (item) => {
    var flat = squish(item);

    for (var key in flat) {
      if (String(flat[key]).toLowerCase().indexOf(query.toLowerCase()) >= 0) return true;
    };
    return false;
  });
};

export const customFilterComponent = React.createClass({
  getDefaultProps: function() {
    return {
      "query": ""
    }
  },

  searchChange: function(event) {
    var query = event.target.value;
    this.props.changeFilter(query);
  },

  render: function() {
    return (
      <div className="filter-container">
        <div className="search-wrapper card col s10" style={{marginBottom:10, marginTop: 10}}>
          <div className="row marginless-row valign-wrapper">
            <input 
              type="text"
              name="search"
              placeholder="Search..."
              className="search search-input col s11" 
              onChange={this.searchChange} />
            <i className="material-icons col s1 valign clickable">search</i>
          </div>
        </div>
      </div>
    )
  }
});

export const customColumnComponent = React.createClass({
  getDefaultProps: function(){
    return { "data": {}, "renderEditModal": null};
  },
  render: function(){
    console.log()
    return (
      <div onClick={() => this.props.metadata.customComponentMetadata.renderEditModal()}>
        {this.props.data}
      </div>
    );
  }
});