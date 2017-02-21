import axios from "axios";
import * as Config from "../utils/api.js";
import moment from 'moment';

export const authenticateUser = (userInfo) => {
  const { email, password } = userInfo;
  return axios(
    Object.assign(
      {
        method: "post",
        url: "/user/session",
        data : {
          email: email,
          password: password,
          remember_me: true
        }
      }, Config.APIConfig
    )
  );
};

export const getUserPrivledge = (userId) => {
  return axios(
    Object.assign(
      {
        method: "get",
        url: `/new_pzly02live7/_table/township_users?filter=(user_id=${userId})`,
      }, Config.APIConfig
    )
  );
};

export const checkUser = (userInfo) => {
  const { email, password } = userInfo;
  return axios(
    Object.assign(
      {
        method: "post",
        url: "/user/register",
        data : {
          email: email,
          password: password
        }
      }, Config.APIConfig
    )
  );

};

export const registerUser = (userInfo) => {
  console.log("--------------");
  const { email, password, mobile, address, city, state, zip } = userInfo;

  // Check if user exists
  
  const AXIOS_INSTANCE = axios.create(Config.APIConfig);
  return AXIOS_INSTANCE.get(`system/user?filter=(email=${email})`).then((resUserId) => {
    return axios(
      Object.assign(
        {
          method: "post",
          url: "/new_pzly02live7/_table/user_profile",
          data : {
            email: email,
            password: password,
            mobile: mobile,
            address: address,
            city: city,
            state: state,
            zip: zip,
            user_id: resUserId.data.resource[0].id,
            timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
          }
        }, Config.APIConfig
      )
    );
  })
};

export const signOutUser = () => {

};