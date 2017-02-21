import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import cookie from "react-cookie";
import BackButton from "./utils/back-button.jsx";
import Logo from "./utils/logo.jsx";
import Menu from "./utils/menu.jsx";
import { setCurrentMenu, toggleMenu  } from "./header.js";
import {
  mainGuestLinks,
  mainUserLinks,
  mainAdminLinks,
  myAccountMenuLinks,
  driveEzlyMenuLinks
} from "./utils/menu-data.js";

import axios from 'axios'

class Header extends Component {
  constructor(props){
    super(props);

    this.state = {
      menuType: null
    }

    this.toggleMenuStatus = this.toggleMenuStatus.bind(this);
    this.setMenu = this.setMenu.bind(this);
  }

  getMenu() {
    const { selectedMenu } = this.props.header;
    const userId = cookie.load('userId');
    const role = cookie.load('role');
    const townshipCode = cookie.load('townshipCode');

    let currentMenu = null;

    switch (selectedMenu) {
      case "mainGuestLinks":
        currentMenu = mainGuestLinks;
        break;
      case "mainUserLinks":
        currentMenu = mainUserLinks;
        break;
      case "myAccountMenuLinks":
        currentMenu = myAccountMenuLinks;
        break;
      case "driveEzlyMenuLinks":
        currentMenu = driveEzlyMenuLinks;
        break;
    }

    if (currentMenu) {
      return currentMenu
    } else {
      switch(role) {
        case "ApiAdmin":
          return mainAdminLinks("")
        case "TwpAdmin":
          return mainAdminLinks("/township/" + townshipCode)
        case "TwpBursar":
          return mainAdminLinks("/bursar/" + townshipCode)
        case "TwpInspector":
          return mainAdminLinks("/inspector/" + townshipCode)
        case "Registered":
          return mainUserLinks
        default:
          return mainGuestLinks
      }
    }

    /*
    return currentMenu ? currentMenu
      : (userId ? mainUserLinks : mainGuestLinks );
    */
  }

  setMenu(menu) {
    const { dispatch } = this.props;
    dispatch(setCurrentMenu(menu));
  }

  toggleMenuStatus() {
    const { dispatch } = this.props;
    const { menuStatus } = this.props.header;
    dispatch(toggleMenu(!menuStatus));
  }

  renderNav() {
    //const menuData = this.getMenu();
    const menuData = this.getMenu();
    const { menuStatus, selectedMenu } = this.props.header;
    return (
      <nav>
        <div className="nav-wrapper">
          <div className="row">
            <div className="col s3">
              <BackButton/>
            </div>
            <div className="col s6">
              <Logo/>
            </div>
            <div className="col s3">
              <Menu
                menuData={menuData}
                menuStatus={menuStatus}
                onToggle={this.toggleMenuStatus}
                onSetMenu={this.setMenu}/>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  render() {
    const nav = this.renderNav();
    return (
      <div className="navbar-fixed">
        {nav}
      </div>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    header: state
  };
};

export default connect(MapStateToProps)(Header);