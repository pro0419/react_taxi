import React, { Component } from "react";
import Weather from "./weather-root.jsx";
import { Provider } from "react-redux";
import WeatherStore from "../../stores/weather.js";
import LocationsStore from "../../stores/locations.js";

class WeatherController extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={WeatherStore}>
        <Weather/>
      </Provider>
    );
  }
}

export default WeatherController;