import cookie from 'react-cookie';

export const BASE_URL = 'http://54.83.189.72/api/v2/';
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

import axios from 'axios';
const axiosInstance = axios.create(API_CONFIG);

export default axiosInstance