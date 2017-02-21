import axios from "axios";
import * as Config from "../utils/api.js";

export const saveTransaction = (paymentId) => {
  return axios(
    Object.assign(
      {
        method: "post",
        url: "add-funds",
        data: {
          amount: amount
        }
      }, Config.paypalAPIConfig
    )
  );
}

