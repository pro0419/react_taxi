import * as types from '../constants/actionTypes.js'
import _ from 'lodash';

const initialState = {
  isLoading: true,
  data: [],
  error: false
};

export function townshipUsersFetched(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_USERS_GET_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_USERS_GET_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_USERS_GET_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    default:
      return state;
  }
};

export function townshipUsersEdited(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_USERS_PUT_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_USERS_PUT_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_USERS_PUT_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
}

export function townshipUsersCreated(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_USERS_POST_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_USERS_POST_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_USERS_POST_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
}

export function townshipFacilitiesFetched(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_FACILITIES_GET_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_FACILITIES_GET_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_FACILITIES_GET_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    default:
      return state;
  }
};

export function townshipFacilitiesEdited(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_FACILITIES_PUT_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_FACILITIES_PUT_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_FACILITIES_PUT_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
}

export function townshipFacilitiesCreated(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_FACILITIES_POST_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_FACILITIES_POST_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_FACILITIES_POST_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
}


export function townshipLocationsFetched(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_LOCATIONS_GET_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_LOCATIONS_GET_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_LOCATIONS_GET_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    default:
      return state;
  }
};

export function townshipLocationsEdited(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_LOCATIONS_PUT_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_LOCATIONS_PUT_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_LOCATIONS_PUT_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
}

export function townshipLocationsCreated(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_LOCATIONS_POST_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_LOCATIONS_POST_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_LOCATIONS_POST_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
}

export function townshipPermitRequestsFetched(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_PERMIT_REQUESTS_GET_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_PERMIT_REQUESTS_GET_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_PERMIT_REQUESTS_GET_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    default:
      return state;
  }
};

export function townshipPermitRequestsEdited(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_PERMIT_REQUESTS_PUT_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_PERMIT_REQUESTS_PUT_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_PERMIT_REQUESTS_PUT_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
}

export function townshipPermitTypesFetched(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_PERMIT_TYPES_GET_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_PERMIT_TYPES_GET_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_PERMIT_TYPES_GET_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    default:
      return state;
  }
};

export function townshipPermitTypesEdited(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_PERMIT_TYPES_PUT_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_PERMIT_TYPES_PUT_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_PERMIT_TYPES_PUT_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
};

export function townshipPermitTypesCreated(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_PERMIT_TYPES_POST_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_PERMIT_TYPES_POST_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_PERMIT_TYPES_POST_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
}

export function townshipParkingPermitsFetched(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_PARKING_PERMITS_GET_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_PARKING_PERMITS_GET_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_PARKING_PERMITS_GET_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    default:
      return state;
  }
};

export function townshipParkingPermitsEdited(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_PARKING_PERMITS_PUT_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_PARKING_PERMITS_PUT_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_PARKING_PERMITS_PUT_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
};

export function townshipParkingPermitsCreated(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_PARKING_PERMITS_POST_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_PARKING_PERMITS_POST_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_PARKING_PERMITS_POST_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
}

export function townshipPermitsListFetched(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_PERMITS_LIST_GET_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_PERMITS_LIST_GET_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_PERMITS_LIST_GET_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    default:
      return state;
  }
};


export function townshipPermitsListEdited(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_PERMITS_LIST_PUT_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_PERMITS_LIST_PUT_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_PERMITS_LIST_PUT_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
};

export function townshipPermitsListCreated(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_PERMITS_LIST_POST_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_PERMITS_LIST_POST_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_PERMITS_LIST_POST_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
}

export function townshipLocationsRateFetched(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_LOCATIONS_RATE_GET_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_LOCATIONS_RATE_GET_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_LOCATIONS_RATE_GET_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    default:
      return state;
  }
};

export function townshipLocationsRateCreated(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_LOCATIONS_RATE_POST_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_LOCATIONS_RATE_POST_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_LOCATIONS_RATE_POST_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
};

export function townshipLocationsRateEdited(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_LOCATIONS_RATE_PUT_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_LOCATIONS_RATE_PUT_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_LOCATIONS_RATE_PUT_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
};



export function townshipParkingRulesFetched(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_PARKING_RULES_GET_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_PARKING_RULES_GET_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_PARKING_RULES_GET_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    default:
      return state;
  }
};

export function townshipParkingRulesCreated(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_PARKING_RULES_POST_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_PARKING_RULES_POST_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_PARKING_RULES_POST_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
};

export function townshipParkingRulesEdited(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_PARKING_RULES_PUT_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_PARKING_RULES_PUT_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_PARKING_RULES_PUT_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
};



export function townshipViolationCodeFetched(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_VIOLATION_CODE_GET_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_VIOLATION_CODE_GET_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_VIOLATION_CODE_GET_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
};

export function townshipViolationCodeCreated(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_VIOLATION_CODE_POST_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_VIOLATION_CODE_POST_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_VIOLATION_CODE_POST_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
};

export function townshipViolationCodeEdited(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_VIOLATION_CODE_PUT_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_VIOLATION_CODE_PUT_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_VIOLATION_CODE_PUT_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
};





export function townshipHearingPlaceFetched(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_HEARING_PLACE_GET_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_HEARING_PLACE_GET_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_HEARING_PLACE_GET_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
};

export function townshipHearingPlaceCreated(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_HEARING_PLACE_POST_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_HEARING_PLACE_POST_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_HEARING_PLACE_POST_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
};

export function townshipHearingPlaceEdited(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_HEARING_PLACE_PUT_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_HEARING_PLACE_PUT_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_HEARING_PLACE_PUT_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
};
