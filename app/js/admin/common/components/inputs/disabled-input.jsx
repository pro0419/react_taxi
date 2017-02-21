import React, {Component} from 'react';
import Formsy from 'formsy-react';

const GenericInput = React.createClass({
  mixins: [Formsy.Mixin],
  componentWillMount() {
    this.setValue(this.props.value);
  },
  componentDidMount() {
    this.setValue(this.props.value);
  },
  render() {
    const className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;
    const errorMessage = this.getErrorMessage();
    return (
      <div className={className}>
        <span>{errorMessage}</span>
      </div>
    );
  }
});

export default GenericInput;