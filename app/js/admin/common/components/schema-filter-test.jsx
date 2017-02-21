import React from 'react';
import axios from 'axios';
import {reset} from 'redux-form';

import * as apiTownship from '../../api/api-township.js';
import {createFilter} from 'react-search-input';

const BASE_URL = 'http://54.83.189.72/api/v2/new_pzly02live7/';
const APP_NAME = 'parkezly';
const API_KEY = 'dbed451c5e4e1518d301c118ffe078ca16a2c287d5efff98515b938538abb5b5';

const API_CONFIG = {
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    'X-DreamFactory-Application-Name': APP_NAME, 
    'X-DreamFactory-Api-Key' : API_KEY 
  }
};

const AXIOS_INSTANCE = axios.create(API_CONFIG);
const NAME_TO_SEARCH = 'permit_status';

export const SchemaFilterTest = function() {
  AXIOS_INSTANCE.get('_table').then(function(response) {
    console.log("- Tables containing: " + NAME_TO_SEARCH + " -")
    response.data.resource.map((data) => {
      AXIOS_INSTANCE.get('_schema/' + data.name).then((response) => {
        response.data.field.map((data) => {
          if(data.name == NAME_TO_SEARCH) {
            console.log(response.data.name);
          }
        })
      })
    })
  })
};