import React, { Component, PropTypes } from "react";
import classNames from "classnames";
import ImageCheckbox from "./utils/image-checkbox.jsx";
import * as footerData from "./utils/footer-data.js"

class Footer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;

    return (
      <div className="footer">
        {children}
      </div>
    );
  }
}

Footer.PropTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Footer;
