import React, { ReactDOM, Component, PropTypes } from "react";

class ParkingModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { heading, children, onHide, className } = this.props;
    return (
      <div className="parking-overlay">
        <div className={className}>
          <div className="row heading">
            <h4 className="col s11">{heading}</h4>
            <div className="col s1">
              <span className="close-btn" onClick={onHide}/>
            </div>
          </div>
          {children}
        </div>
      </div>
    );
  }
}

ParkingModal.PropTypes = {
  heading: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  onHide: PropTypes.func
}

export default ParkingModal;