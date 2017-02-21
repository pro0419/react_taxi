import axios from "axios";
import { APIConfig, placesAPIConfig } from "../utils/api.js";

export const getNearByParking = (position) => {
  const { lat, lng } = position;

  return axios(
    Object.assign(
      {
        method: "post",
        url: "new_pzly02live7/_proc/find_parking_nearby",
        data : {
          params:
          [
            {
              "name": "in_lat",
              "value": lat
            },
            {
              "name": "in_lng",
              "value": lng
            }
          ]
        }
      }, APIConfig
    )
  );
};

export const getParkingRules = (city, state) => {
  return axios(
    Object.assign(
      {
        method: "get",
        url: "/new_pzly02live7/_table/parking_rules" //"/new_pzly02live7/_table/parking_rules?filter=City="+city+"&state="+state
      }, APIConfig
    )
  );
};

export const getParkingLot = (locationCode) => {

  return axios(
    Object.assign(
      {
        method: "post",
        url: "new_pzly02live7/_proc/managed_lot_status?&order=lot_row%20ASC%2C%20lot_number%20ASC",
        data : {
          "params": [{
            "name": "in_location_code",
            "value": locationCode
          }]
        }
      }, APIConfig
    )
  );
};

export const getTownshipCode = (location_code) => {
  return axios(
    Object.assign(
      {
        method: "get",
        url: "new_pzly02live7/_table/manage_locations?filter=location_code="+location_code
      }, APIConfig
    )
  );
};

export const getExtraFees = (township_code) => {
  return axios(
    Object.assign(
      {
        method: "get",
        url: "new_pzly02live7/_table/service_charges?filter=manager_id="+township_code
      }, APIConfig
    )
  );
};

export const getSubscriptionStatus = (user_id, location_code) => {
  return axios(
    Object.assign(
      {
        method: "get",
        url: "new_pzly02live7/_table/subscriptions?filter=user_name="+user_id+"&location_code="+location_code+"&order=expiry_date%20DESC"
      }, APIConfig
    )
  );
};

export const confirmBooking = (parking_data) => {
  return axios(
    Object.assign(
      {
        method: "post",
        url: "new_pzly02live7/_table/parked_cars",
        data : parking_data
      }, APIConfig
    )
  );
};

export const checkIfAlreadyParked = (plate_no, registered_state) => {
  return axios(
    Object.assign(
      {
        method: "get",
        url: "new_pzly02live7/_table/parked_cars?filter=plate_no="+plate_no+"&pl_state="+registered_state+"&order=id%20DESC"
      }, APIConfig
    )
  );
};

export const exitVehicle = (confirmation_id, exit_date_time) => {
  return axios(
    Object.assign(
      {
        method: "put",
        url: "new_pzly02live7/_table/parked_cars?filter=id="+confirmation_id,
        data : {
          exit_date_time: exit_date_time,
          parking_status: "EXIT"
        }
      }, APIConfig
    )
  );
};

export const getStreetView = (lat, lng) => {
  return axios(
    Object.assign(
      {
        method: "post",
        url: "get-street-view",
        data: {
          lat: lat,
          lng: lng
        }
      }, placesAPIConfig
    )
  );
};

export const getTotalHoursParkedToday = (lat, lng, plate_no, pl_state) => {
  return axios(
    Object.assign(
      {
        method: "post",
        url: "new_pzly02live7/_proc/get_total_hours_parked_today",
        data: {
          "params": 
          [
            [{"name":"in_lat","value":lat}],
            [{"name":"in_lng","value":lng}],
            [{"name":"in_plate_no","value":plate_no}],
            [{"name":"in_pl_state","value":pl_state}]
          ]
        }
      }, APIConfig
    )
  );
};