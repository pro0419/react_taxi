import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import cookie from "react-cookie";
import Auth from "../../utils/auth.js";

import Body from "../../../common/components/body/body.jsx";
import GrayButton from "../../../common/components/button/gray-button.jsx";
import EmailField from "../../../common/components/fields/email-field.jsx";
import PasswordField from "../../../common/components/fields/password-field.jsx";
import Registration from "./registration-root.jsx";
import { getUser, checkUser, registerValidationFail, completeRegistration } from "../../actions/user.js";
import * as Texts from "./constants/texts.js";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.loginUser = this.loginUser.bind(this);
    this.loginUserAfterRegister = this.loginUserAfterRegister.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.goToParking = this.goToParking.bind(this);
    this.onRegistrationContinue = this.onRegistrationContinue.bind(this);
  }

  componentWillMount() {
    const checkAuthStatus = this.checkAuthStatus();
    if(checkAuthStatus) {
      if(checkAuthStatus.role === "ApiAdmin") {
        window.location = "/admin";
      } else if (checkAuthStatus.role === "TwpAdmin") {
        window.location = "/admin/township/" + checkAuthStatus.townshipCode;
      } else if (checkAuthStatus.role === "TwpBursar") {
        window.location = "/admin/bursar/" + checkAuthStatus.townshipCode;
      } else if (checkAuthStatus.role === "TwpInspector") {
        window.location = "/admin/inspector/" + checkAuthStatus.townshipCode;
      } else if (checkAuthStatus.role === "Registered") {
        window.location = "/new-vehicle"
      } 
    }
  }

  componentWillReceiveProps(nextProps) {

    const { userId, role, roleId, sessionId, sessionToken, townshipCode, regEmail, regPass} = nextProps.user;
    
    if (regEmail && this.props.user.mode === "REGISTER_SUCCESS") {
      this.loginUserAfterRegister(regEmail, regPass);
    } else if(userId) {
      cookie.save('userId', userId, { path: '/' });
      cookie.save('role', role, { path: '/' });
      cookie.save('roleId', roleId, { path: '/' });
      cookie.save('sessionId', sessionId, { path: '/' });
      cookie.save('sessionToken', sessionToken, { path: '/' });
      cookie.save('townshipCode', townshipCode, { path: '/' });

      switch(role) {
        case "ApiAdmin":
          window.location = "/admin";
          break;
        case "TwpAdmin":
          window.location = "/admin/township/" + townshipCode;
          break;
        case "TwpBursar":
          window.location = "/admin/bursar/" + townshipCode;
          break;
        case "TwpInspector":
          window.location = "/admin/inspector/" + townshipCode;
          break;
        case "Registered":
          window.location = "/new-vehicle"
          break;
      }
    }
  }

  loginUserAfterRegister(email, password) {
    this.refs["email-address"].refs.email.value = email;
    this.refs["user-password"].refs.password.value = password;
    const { dispatch } = this.props;
    const userInfo = {
      email : email,
      password: password
    }
    dispatch(getUser(userInfo));
  }

  checkAuthStatus() {
    const userId = cookie.load('userId');
    const role = cookie.load('role');
    const townshipCode = cookie.load('townshipCode')
    if(userId && role && townshipCode) {
      return {userId: userId, role: role, townshipCode: townshipCode};
    } else {
      return false
    }
  }

  validateUser() {
    this.refs["email-address"].invalidate();
    this.refs["user-password"].invalidate();
    const isEmailValid = this.refs["email-address"].validate();
    const isPasswordValid = this.refs["user-password"].validate();
    if (isEmailValid && isPasswordValid) {
      return true;
    }
  }

  loginUser() {
    const { dispatch } = this.props;
    if(this.validateUser()) {
      const email = this.refs["email-address"].getValue();
      const password = this.refs["user-password"].getValue();
      const userInfo = {
        email : email,
        password: password
      };
      dispatch(getUser(userInfo));
    }
  }

  registerUser() {
    const { dispatch } = this.props;
    if(this.validateUser()) {
      const email = this.refs["email-address"].getValue();
      const password = this.refs["user-password"].getValue();
      const userInfo = {
        email : email,
        password: password
      };
      dispatch(checkUser(userInfo));
    }
  }

  onRegistrationContinue() {
    const { dispatch } = this.props;
    const { regEmail, regPass } = this.props.user;
    const isValid = this.refs["registration-form"].validate();
    if(isValid) {

      let userInfo = this.refs["registration-form"].getUserInfo();
      userInfo.email = regEmail;
      userInfo.password = regPass;
      console.log(userInfo);
      dispatch(registerValidationFail(false));
      dispatch(completeRegistration(userInfo));
    } else {
      //console.log(" ----here ----- ");
      dispatch(registerValidationFail(true));
    }
  }

  goToParking() {
    window.location = "/find-parking";
  }

  renderNotice() {
    const {
      mode,
      userId,
      errorCode,
      errorMessage,
      loading,
      subErrorMessage
    } = this.props.user;

    const validClassNames = classNames({
      "alert": true,
      "alert-info": loading,
      "alert-success": !!userId,
      "alert-danger": !!errorCode
    });
    let displayMsg = "";
    if(loading) {
      displayMsg = mode == "LOGIN" ? Texts.SigningIn : Texts.Registering;
    } else if(userId) {
      displayMsg = mode == "LOGIN" ? Texts.SignInSuccess : Texts.RegistrationSuccess;
    } else if(errorCode) {
      displayMsg = errorMessage;
      subErrorMessage ? displayMsg += " : " + subErrorMessage : null;
    }

    return displayMsg ? (
      <div className={validClassNames}>
        {displayMsg}
      </div>
    ) : null;
  }

  renderForgotPasswordLink() {
    return (
      <div className="forgot-password">
        <a href="#">Forgot Your Password?</a>
      </div>
    );
  }

  renderButtons() {
    return (
      <div className="row sign-in-actions">
        <div className="col s6">
          <GrayButton onClick={this.registerUser}>
            REGISTER
          </GrayButton>
        </div>
        <div className="col s6">
          <GrayButton onClick={this.loginUser}>
            LOGIN
          </GrayButton>
        </div>
      </div>
    );
  }

  renderSkipLink() {
    return (
      <div className="skip-link">
        <a href="javascript:void(0)" onClick={this.goToParking}>SKIP THIS</a>
      </div>
    );
  }

  renderSignInForm() {
    return (
      <div>
        <h1 className="welcome">Welcome</h1>
        <form className="form-signin">
          <EmailField ref="email-address" placeholder="EMAIL ADDRESS"/>
          <PasswordField ref="user-password" placeholder="PASSWORD"/>
        </form>
      </div>
    );
  }

  renderRegistrationForm() {
    const { registrationHasError } = this.props.user;
    return (
      <div className="sign-in-content">
        <Registration onContinue={this.onRegistrationContinue} hasError={registrationHasError} ref="registration-form"/>
      </div>
    );
  }

  renderSignInContent() {
    const notice = this.renderNotice();
    const signInForm = this.renderSignInForm();
    const forgotLink = this.renderForgotPasswordLink();
    const btns = this.renderButtons();
    const skipLink = this.renderSkipLink();
    return (
      <div className="sign-in-content">
        {notice}
        {signInForm}
        {forgotLink}
        {btns}
        {skipLink}
      </div>
    );
  }

  render() {
    const authStatus = this.checkAuthStatus();
    const { loading, regEmail } = this.props.user;
    const signInForm = this.props.user.mode !== "REGISTER_FORM" ? this.renderSignInContent() : this.renderRegistrationForm();
    return !authStatus ? (
      <Body showHeader={true} loading={loading}>
        <div className="sign-in-root">
          {signInForm}
        </div>
      </Body>
    ) : null;
  }
}

const MapStateToProps = (state) => {
  return {
    user: state.User
  };
};

export default connect(MapStateToProps)(SignIn);