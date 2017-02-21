import * as AuthAPI from "../api/user.js"
import * as Actions from "../constants/actions.js";
import { GenericError } from "../constants/texts.js";

const initiateSignIn = () => {
  return {
    type: Actions.AUTH_INITIATE
  };
};

const userAuthenticated = (data) => {
  return {
    type: Actions.AUTH_SUCCESS,
    data
  };
};


const authenticationFailed = (error) => {
  return {
    type: Actions.AUTH_FAIL,
    error
  };
};

export const getUser = (userInfo) => {
  return dispatch => {
    dispatch(initiateSignIn());
    return AuthAPI.authenticateUser(userInfo)
      .then((response) => {
        const sessionData = response.data;
        AuthAPI.getUserPrivledge(sessionData.id)
        .then((response) => {
          console.log(sessionData);
          if(sessionData.role_id === 5 || sessionData.role_id === 6 || response.data.resource.length === 0) {
            dispatch(userAuthenticated({
              userId: sessionData.id,
              role: sessionData.role,
              roleId: sessionData.role_id,
              sessionId: sessionData.session_id,
              sessionToken: sessionData.session_token,
              townshipCode: null
            }));
          } else {
            const townshipCode = response.data.resource[0].township_code;
            dispatch(userAuthenticated({
              userId: sessionData.id,
              role: sessionData.role,
              roleId: sessionData.role_id,
              sessionId: sessionData.session_id,
              sessionToken: sessionData.session_token,
              townshipCode: townshipCode
            }));
          }
        })
        .catch((response) => {
          console.log(response);
          let errorCode = "503";
          let errorMessage = GenericError;
          let subErrorMessage = "";
          if (response && response.data) {
            const { error } = response.data;
            if (error) {
              const { error } = data;
              errorCode = error.code;
              errorMessage = error.message;
            }
          }
          dispatch(authenticationFailed({
            errorCode: errorCode,
            errorMessage: errorMessage
          }));
        });
      })
      .catch((response) => {
        console.log(response);
        let errorCode = "503";
        let errorMessage = GenericError;
        let subErrorMessage = "";
        if (response && response.data) {
          const { error } = response.data;
          if (error) {
            const { error } = data;
            errorCode = error.code;
            errorMessage = error.message;
          }
        }
        dispatch(authenticationFailed({
          errorCode: errorCode,
          errorMessage: errorMessage
        }));
      });
  }
};

const initiateRegistration = () => {
  return {
    type: Actions.REG_INITIATE
  };
};

const registrationSucceded = (data) => {
  return {
    type: Actions.REG_SUCCESS,
    data
  };
};

const registrationFailed = (error) => {
  return {
    type: Actions.REG_FAIL,
    error
  };
};

export const completeRegistration = (userInfo) => {
  return dispatch => {
    dispatch(initiateRegistration());
    return AuthAPI.registerUser(userInfo)
      .then((response) => {
        // Should be dreamfactory user ID?
        let userData = {
          id: response.data.resource[0].id,
          email: userInfo.email,
          password: userInfo.password
        }
        dispatch(registrationSucceded(userData));
      })
      .catch((response) => {
        console.log(response);
        dispatch(registrationFailed());
      });
  }
};

const saveUserInfo = (userInfo) => {
  return {
    type: Actions.SAVE_USER_INFO,
    userInfo
  };
};

export const checkUser = (userInfo) => {
  return dispatch => {
    dispatch(initiateRegistration());
    return AuthAPI.checkUser(userInfo)
      .then((response) => {
        //dispatch(registerUser(userInfo));
        dispatch(saveUserInfo(userInfo));
      })
      .catch((response) => {
        console.log(response);
        let errorCode = "503";
        let errorMessage = GenericError;
        let subErrorMessage = "";
        if (response && response.data) {
          const { error } = response.data;
          if (error) {
            errorCode = error.code;
            errorMessage = error.message;
            subErrorMessage += error.context.email ?  error.context.email[0] : "";
            subErrorMessage += error.context.password ? error.context.password[0] : "";
          }
        }
        
        dispatch(registrationFailed({
          errorCode: errorCode,
          errorMessage: errorMessage,
          subErrorMessage: subErrorMessage
        }));
      });
  }
};

export const registerValidationFail = (status) => {
  return {
    type: Actions.REGISTER_VALIDATION_FAILED,
    status
  };
};