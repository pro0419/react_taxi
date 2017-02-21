import cookie from 'react-cookie';

export const BASE_URL = 'http://54.83.189.72/api/v2/new_pzly02live7/_table/';
export const APP_NAME = 'parkezly';
export const API_KEY = 'bd4290ad583ae46c39ab478e34d6b4be8e996b215417b657859c54eb7311bc41';
export const SESSION_TOKEN = cookie.load('sessionToken');

export const API_CONFIG = {
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    'X-DreamFactory-Api-Key' : API_KEY,
    'X-DreamFactory-Application-Name': APP_NAME,
  },
};
//'X-DreamFactory-Session-Token': SESSION_TOKEN
//'X-DreamFactory-Application-Name': APP_NAME, 
//'Content-Type': 'application/x-www-form-urlencoded'
/*
  transformRequest: [function (data) {
    console.log(data);
    return {"resource": data};
  }],
  */