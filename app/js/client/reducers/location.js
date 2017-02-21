const initialState = {
  initialLat: null,
  initialLon: null,
  lat: null,
  lon: null
};

const Location = (state = initialState, action) => {
  console.log(action);
  switch(action.type) {
    case "SET_INITIAL_LOCATION":
      return {
        initialLat: action.location.lat,
        initialLon: action.location.lon,
        lat: action.location.lat,
        lon: action.location.lon
      }
    case "SET_CURRENT_LOCATION":
      return {
        ...state,
        lat: action.location.lat,
        lon: action.location.lon
      }
    default:
      return state;
  }
};

export default Location;