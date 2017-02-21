import axios from "axios";
import { weatherAPIConfig } from "../utils/api.js";
import { openWeatherAppId } from "../utils/app-ids.js";

export const getWeather = (lat, lon) => {
  return axios(
    Object.assign(
      {
        method: "get",
        url: "?lat=" + lat + "&lon=" + lon + "&appid=" + openWeatherAppId + "&units=imperial"
      }, weatherAPIConfig
    )
  );
};


