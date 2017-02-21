import React, { Component, PropTypes } from "react";
import classNames from "classnames";
import MenuItem from "./menu-item.jsx";

class MenuList extends Component {

  constructor(props) {
    super(props);
  }

  renderMenuItem(menuLinkData, index) {
    const { onSetMenu, onToggle } = this.props;
    return (
      <MenuItem
        text={menuLinkData.text}
        link={menuLinkData.link}
        className={menuLinkData.icon}
        subMenu={menuLinkData.subMenu}
        onSetMenu={onSetMenu}
        onToggle={onToggle}
        key={index}/>
    );
  }

  renderMenu() {
    const { menuData } = this.props;
    const menu = menuData.map(this.renderMenuItem, this);
    return (
      <ul className="hamburger-list">
        {menu}
      </ul>
    );
  }

  render() {
    const { open, menuData, className, children } = this.props;
    const validClasses = classNames({
        "hamburger-menu": true,
        "hamburger-show": open
      },
      className
    );
    const menu = this.renderMenu();

    return (
      <div className={validClasses}>
        {menu}
      </div>
    );
  }
}

MenuList.PropTypes = {
  open: React.PropTypes.bool,
  menuData: React.PropTypes.array,
  className: React.PropTypes.string,
  onSetMenu: React.PropTypes.func,
  onToggle: React.PropTypes.func
};

export default MenuList;
