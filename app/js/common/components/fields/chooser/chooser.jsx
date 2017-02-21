import React, { Component, PropTypes } from "react";
import classNames from "classnames";
import Option from "./option.jsx";
import * as Texts from "../../../constants/texts.js"

class Chooser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  componentDidMount() {
    $(document).ready(function() {
      $('select').material_select();
    });
  }

  setValue(val) {
    this.refs["select"].value = val;
    $('select').material_select();
  }

  getValue() {
    return this.refs["select"].value;
  }

  validate() {
    const selectedValue = this.getValue();
    if(!selectedValue) {
      this.setState({
        hasError: true
      });
      return;
    }
    return true;
  }

  invalidate() {
    this.setState({
      hasError: false
    });
  }

  renderOption(option, index) {
    return (
      <Option val={option.abbreviation} text={option.name} key={index}/>
    );
  }

  render() {
    const {
      placeholder,
      className,
      selectionEntity,
      optionsData,
      ...otherProps 
    } = this.props;
    const { hasError } = this.state;
    const parentClassNames = classNames({
        "has-error": hasError
      },
      className
    );

    let errorText = "";
    if(hasError) {
      errorText =  Texts.EmptySelection + selectionEntity;
    }

    const options = optionsData.map(this.renderOption);

    return (
      <div className={parentClassNames}>
        <select
          ref="select">
            {options}
        </select>
        <div className="error-msg row">
          <i className="material-icons tiny">error</i> {errorText}
        </div>
      </div>
    );
  }
}

Chooser.PropTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  selectionEntity: PropTypes.string,
  optionsData: PropTypes.array
};

export default Chooser;