import React, { Component, PropTypes } from "react";
import classNames from "classnames";
import HeaderController from "../header/header-controller.jsx";
import Footer from "../footer/footer.jsx";
import Spinner from "../spinner/spinner.jsx";

class Body extends Component {
  constructor(props) {
    super(props);
  }

  renderHeader() {
    const { showHeader } = this.props;
    return showHeader ? (
      <HeaderController/>
    ) : null;
  }

  renderFooter() {
    const { showFooter, footerContent } = this.props;
    return showFooter ? (
      <Footer ref="footer">{footerContent}</Footer>
    ) : null;
  }

  render() {
    const { children, loading } = this.props;
    const header = this.renderHeader();
    const footer = this.renderFooter();

    return (
      <div>
        {header}
        <div className="content-wrapper">
          {children}
        </div>
        {footer}
        <Spinner loading={loading}/>
      </div>
    );
  }
}

Body.PropTypes = {
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
  footerContent: PropTypes.node,
  loading: PropTypes.bool,
  children: PropTypes.node
}

export default Body;