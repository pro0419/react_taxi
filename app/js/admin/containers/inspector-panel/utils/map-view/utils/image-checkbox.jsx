import React, { Component, PropTypes } from "react";
import classNames from "classnames";

const getState = () => {
  return {
    checked: false
  };
};

class ImageCheckbox extends Component {

  constructor(props) {
    super(props);
    this.state = getState();

    this.toggleCheckIcon = this.toggleCheckIcon.bind(this);
  }

  getValue() {
    return this.state.checked;
  }

  toggleCheckIcon() {
    const { onClick } = this.props;
    const { checked } = this.state;
    this.setState({
      checked: !checked
    });
    onClick();
  }

  render() {
    const { iconClass, label, className } = this.props;
    const validClasses = classNames({
        "img-checkbox-checked": this.state.checked
      },
      className
    );
    const iconClasses = classNames({
        "img-checkbox-icon": true
      },
      iconClass
    );

    return (
      <div className={validClasses} onClick={this.toggleCheckIcon}>
        <div className={iconClasses}>
        </div>
        <div className="img-checkbox-label">
          {label}
        </div>
      </div>
    );
  }
}

ImageCheckbox.PropTypes = {
  iconClass: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
}

export default ImageCheckbox;
