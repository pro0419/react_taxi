import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from 'react-redux';
import { setCurrentMenu } from "../header.js"

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.changeMenu = this.changeMenu.bind(this);
  }

  changeMenu(evt) {
    evt.preventDefault();
    const { subMenu, onSetMenu } = this.props;
    onSetMenu(subMenu);
  }

  renderLink() {
    const { text, link, onToggle } = this.props;
    return (
      <Link to={link} onClick={onToggle}>{text}</Link>
    );
  }

  renderSubMenuParent() {
    const { text } = this.props;
    return (
      <a href="javascript:void(0)" onClick={this.changeMenu}>
        {text}
      </a>
    );
  }

  render() {
    const { subMenu, className } = this.props;
    const link = subMenu ? this.renderSubMenuParent() : this.renderLink();
    return (
      <div className="row">
        <li className={className}>
          {link}
        </li>
      </div>
    );
  }
}
MenuItem.PropTypes = {
  text: PropTypes.string,
  link: PropTypes.string,
  subMenu: PropTypes.string,
  className: PropTypes.string,
  onSetMenu: PropTypes.func,
  onToggle: PropTypes.func
};

export default MenuItem;