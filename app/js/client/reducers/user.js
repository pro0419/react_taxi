import { combineReducers } from 'redux';

const initialState = {
  mode: null,
  userId: null,
  sessionId: null,
  sessionToken: null,
  errorCode: null,
  errorMessage: null,
  subErrorMessage: null,
  regEmail: null,
  regPass: null,
  registrationHasError: false
};

const User = (state = initialState, action) => {
  switch(action.type) {
    case "AUTH_INITIATE":
      return {
        mode: "LOGIN",
        loading: true
      }
    case "AUTH_SUCCESS":
      return {
        mode: "LOGIN",
        loading : false,
        ...action.data
      }
    case "AUTH_FAIL":
      return {
        mode: "LOGIN",
        loading : false,
        ...action.error
      }
    case "REG_INITIATE":
      return {
        mode: "REGISTER",
        loading: true
      }
    case "REG_SUCCESS":
      return {
        mode: "REGISTER_SUCCESS",
        loading : false,
        userId: action.data.id,
        regEmail: action.data.email,
        regPass: action.data.password
      }
    case "REG_FAIL":
      return {
        mode: "REGISTER",
        loading : false,
        ...action.error
      }
    case "SAVE_USER_INFO":
      console.log(action);
      return {
        ...state,
        mode: "REGISTER_FORM",
        loading: false,
        regEmail: action.userInfo.email,
        regPass: action.userInfo.password,
      }
    case "REGISTER_VALIDATION_FAILED":
      return {
        ...state,
        registrationHasError: action.status
      }
    default:
      return state;
  }
};

const UserReducers = combineReducers({
  User
});

export default UserReducers;