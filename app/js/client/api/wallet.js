import axios from "axios";
import * as Config from "../utils/api.js";

export const getWalletTransactions = (user_id) => {
  return axios(
    Object.assign(
      {
        method: "get",
        url: "/new_pzly02live7/_table/user_wallet?filter=user_id="+user_id+"&order=date_time%20DESC"
      }, Config.APIConfig
    )
  );
};

export const getWalletBalance = (user_id) => {
	return axios(
    Object.assign(
      {
        method: "get",
        url: "/new_pzly02live7/_table/user_wallet?filter=user_id="+user_id+"&order=date_time%20DESC&limit=1&fields=new_balance"
      }, Config.APIConfig
    )
  );
};

export const makePayment = (paymentObj) => {
  return axios(
    Object.assign(
      {
        method: "post",
        url: "/new_pzly02live7/_table/user_wallet",
        data : [paymentObj]
      }, Config.APIConfig
    )
  );
};


