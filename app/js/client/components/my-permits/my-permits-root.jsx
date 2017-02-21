import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import cookie from "react-cookie";
import moment from "moment"

import Body from "../../../common/components/body/body.jsx";
import GrayButton from "../../../common/components/button/gray-button.jsx";
//import PermitCard from "./utils/permit-card.jsx";
import { getPermits, getLocations } from "../../actions/permits.js";

class MyPermits extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if(!this.checkAuthStatus()) {
      window.location = "/";
    }
    const userId = cookie.load('userId');
    const { dispatch } = this.props;
    dispatch(getPermits(228));
    dispatch(getLocations());
  }

  checkAuthStatus() {
    const userId = cookie.load('userId');
    if(userId) {
      return true;
    }
  }

  renderNotice() {
    const { errorMessage } = this.props.permits;
    return errorMessage ? (
      <div className="alert alert-danger">
        {errorMessage}
      </div>
    ) : null;
  }

  renderOkButton() {
    return (
      <div className="ok-btn">
        <GrayButton href="/find-parking">
          OK
        </GrayButton>
      </div>
    );
  }

  getLocation(location_code) {
    return this.props.permits.locations[location_code];
  }

  renderPermit(permitData, index) {
    const { township_name, expiry_date, location_code } = permitData;
    const expiry = moment(expiry_date).format("Do MMMM, YYYY");
    const location = this.getLocation(location_code);
    const url = "";
    return (
      <div className="col s12" key={index}>
        <a href={url}>
          <div>
            <h5>{township_name}</h5>
            <p>{location}</p>
            <p>Expires: {expiry}</p>
          </div>
        </a>
      </div>
    )
  }

  renderPermits() {
    const { permitList } = this.props.permits;
    const notice = this.renderNotice();
    const context = this;
    const permits = permitList.map(this.renderPermit, this);
    return (
      <div className="permits-list">
        {notice}
        <h4>My Permits</h4>
        <div className="row">
          {permits} 
        </div>
      </div>
    );
  }

  render() {
    const authStatus = this.checkAuthStatus();
    const { loading } = this.props.permits;
    const content = this.renderPermits();
    const okBtn = this.renderOkButton();
    return authStatus ? (
      <Body showHeader={true} loading={loading}>
        <div className="my-permits-root">
          {content}
        </div>
        {okBtn}
      </Body>
    ) : null;
  }
}

const MapStateToProps = (state) => {
  return {
    permits: state.Permits
  };
};

export default connect(MapStateToProps)(MyPermits);