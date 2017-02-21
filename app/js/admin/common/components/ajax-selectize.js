import React from 'react';
import axios from 'axios';
import {reset} from 'redux-form';

import * as apiTownship from '../../api/api-township.js';
import {createFilter} from 'react-search-input';
import {API_CONFIG} from '../../config/api.js';
import _ from 'lodash';

const AXIOS_INSTANCE = axios.create(API_CONFIG);

export const ajaxSelectizeGet = function(tableName, dataField, componentFunction) {
  AXIOS_INSTANCE.get(tableName).then((response) => {
    var optionsArray = []
    response.data.resource.map(function(data){
      if (data[dataField] === null || data[dataField] === undefined) {
        optionsArray.push({id: data.id, label: 'n/a - submitted blank', value: 'n/a - submitted blank'});
      } else if (typeof data[dataField] !== 'string') {
        optionsArray.push({id: data.id, label: _.truncate(data[dataField].toString(), {'length': 40}), value: data[dataField].toString()});
      } else {
        optionsArray.push({id: data.id, label: _.truncate(data[dataField], {'length': 40}), value: data[dataField]});
      }
    });

    componentFunction(optionsArray, dataField);
  })
};

export const ajaxSelectizeFilteredGet = function(tableName, dataField, filter, componentFunction) {
  AXIOS_INSTANCE.get(tableName).then((response) => {

    let optionsArray = [];
    let tableData = _.filter(response.data.resource, filter);

    tableData.map(function(data){
      if (data[dataField] === null || data[dataField] === undefined) {
        optionsArray.push({id: data.id, label: 'n/a - submitted blank', value: 'n/a - submitted blank'});
      } else if (typeof data[dataField] !== 'string') {
        optionsArray.push({id: data.id, label: _.truncate(data[dataField].toString(), {'length': 40}), value: data[dataField].toString()});
      } else {
        optionsArray.push({id: data.id, label: _.truncate(data[dataField], {'length': 40}), value: data[dataField]});
      }
    });

    componentFunction(optionsArray, dataField);
  })
};


export const ajaxDelete = function(tableName, id, componentFunction) {
  var fullUrl = tableName + '?ids=' + id;
  AXIOS_INSTANCE.delete(fullUrl)
  .then((response) => {
    componentFunction(id, tableName);
  })
  .catch((response) => {
    console.log(response)
  })
};

export const ajaxPut = function(tableName, id, data, componentFunction) {
  var fullUrl = tableName + '?ids=' + id;
  AXIOS_INSTANCE.put(fullUrl, data)
  .then((response) => {
    componentFunction(id, tableName);
  })
  .catch((response) => {
    console.log(response)
  })
};

export const ajaxPost = function(tableName, data, componentFunction) {
  var fullUrl = tableName;
  AXIOS_INSTANCE.post(fullUrl, data)
  .then((response) => {
    componentFunction(tableName);
  })
  .catch((response) => {
    console.log(response)
  })

};

export const ajaxGet = function(tableName, componentFunction) {
  AXIOS_INSTANCE.get(tableName)
  .then((response) => {
    componentFunction(response, tableName);
  })
  .catch((response) => {
    console.log(response)
  })
};