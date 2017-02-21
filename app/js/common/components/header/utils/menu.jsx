import React, { Component, PropTypes } from "react";
import classNames from "classnames";
import MenuList from "./menu-list.jsx";

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  renderMenuButton() {
    const { onToggle } = this.props;
    return (
      <a onClick={onToggle} className="hamburger-trigger">
        <i className="material-icons large">toc</i>
      </a>
    );
  }

  render() {
    const { menuData, menuStatus, onSetMenu, onToggle, className } = this.props;
    const validClasses = classNames({
        "menu-btn-container": true
      },
      className
    );
    const menuBtn = this.renderMenuButton();

    return (
      <div className={validClasses}>
        {menuBtn}
        <MenuList
          open={menuStatus}
          menuData={menuData}
          onSetMenu={onSetMenu}
          onToggle={onToggle}
          className="hamburger-menu-container"/>
      </div>
    );
  }
}

Menu.PropTypes = {
  menuData: PropTypes.array,
  className: PropTypes.string,
  menuStatus: PropTypes.bool,
  onToggle: PropTypes.func,
  onSetMenu: PropTypes.func
}

export default Menu;
