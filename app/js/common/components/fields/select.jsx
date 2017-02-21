import React, { Component, PropTypes } from "react";
import classNames from "classnames";
import { SimpleSelect } from "react-selectize";
import * as Texts from "../../constants/texts.js"

class Chooser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  setValue(val) {
    this.refs["simple-select"].value(val);
  }

  getValue() {
    console.log(this.refs["simple-select"]);
    const { value } = this.refs["simple-select"];
    if(typeof value === "function") {
      return this.refs["simple-select"].value();
    }
    return false;
  }

  validate() {
    const selectedValue = this.getValue();
    if(!selectedValue) {
      this.setState({
        hasError: true
      });
      return false;
    }
    this.invalidate();
    return true;
  }

  invalidate() {
    this.setState({
      hasError: false
    });
  }

  render() {
    const {
      placeholder,
      options,
      className,
      selectionEntity,
      onValueChange,
      defaultValue,
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

    return (
      <div className={parentClassNames}>
        <SimpleSelect 
          options={options}
          ref="simple-select"
          placeholder ={placeholder} 
          onValueChange={onValueChange}
          defaultValue={defaultValue}
          //value={defaultValue}
          {...otherProps}/>
        <div className="error-msg row">
          <i className="material-icons tiny">error</i> {errorText}
        </div>
      </div>
    );
  }
}

Chooser.PropTypes = {
  placeholder: PropTypes.string,
  options: PropTypes.object,
  defaultValue: PropTypes.object,
  className: PropTypes.string,
  selectionEntity: PropTypes.string,
  onValueChange: PropTypes.func
};

export default Chooser;