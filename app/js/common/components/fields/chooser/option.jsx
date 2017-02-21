import React, { Component, PropTypes } from "react";
import classNames from "classnames";

class Option extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { val, text, ...otherProps } = this.props;

    return (
      <option value={val} {...otherProps}>
        {text}
      </option>
    );
  }
}

Option.PropTypes = {
  val: PropTypes.string,
  text: PropTypes.string
};

export default Option;