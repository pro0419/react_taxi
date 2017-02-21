import React from "react";
import { Router } from "react-router";

export default class BackButton extends React.Component {
  constructor(props, context) {
    super(props);
  }

  render() {
    return (
      <div>
        <a className="back-button" onClick={() => this.context.router.goBack()} />
      </div>
    );
  }
}

BackButton.contextTypes = {
  router: React.PropTypes.object,
}