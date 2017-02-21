/*
import React from 'react';
import axios from 'axios';
import {API_CONFIG} from '../../config/api.js';
import _ from 'lodash';

export const BASE_URL = 'http://108.30.248.212:8006/api/v2/pzly02live7/_table/';
export const APP_NAME = 'parkezly';
export const API_KEY = 'dbed451c5e4e1518d301c118ffe078ca16a2c287d5efff98515b938538abb5b5';

export const API_CONFIG2 = {
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    'X-DreamFactory-Application-Name': APP_NAME, 
    'X-DreamFactory-Api-Key' : API_KEY 
  }
};

const AXIOS_INSTANCE = axios.create(API_CONFIG);

const AXIOS_INSTANCE2 = axios.create(API_CONFIG2);
let tableDataS3;
let tableNewDataS3;

const replicateTable = () => {
  AXIOS_INSTANCE2.get('townships_manager').then((response) => {
    let tableDataS3 = response.data.resource;
    AXIOS_INSTANCE.get('townships_manager').then((response) => {
	    let tableNewDataS3 = response.data.resource;
	    tableDataS3.map((data) => {
	    	tableNewDataS3.map((dataNew) => {
	    		if (data.id == dataNew.id) {
	    			console.log(data.id);
	    			dataNew.township_logo = data.township_logo;
	    		}
	    	});
	    });
	    console.log(tableNewDataS3);
	    tableNewDataS3.map((data) => {
	    	let url = 'townships_manager?ids=' + data.id;
			AXIOS_INSTANCE.put('townships_manager?ids=' + data.id, {"township_logo": data.township_logo});
	   	});
	})
  })
};


export const transferImages = () => {
  replicateTable();
};

*/