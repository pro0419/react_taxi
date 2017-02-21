import React from "react";

const ParkingOverview = (props) => {
  const { locationCode, address, rate, time, allowed } = props;
  return (
    <div className="parking-overview">
      <h4>{locationCode}</h4>
      <div>{address}</div>
      <div className="row parking-details">
        <div className="col s6 title">Rate:</div>
        <div className="col s6 value">{rate}</div>
        <div className="col s6 title">Times:</div>
        <div className="col s6 value">{time}</div>
        <div className="col s6 title">Parking Allowed:</div>
        <div className="col s6 value">{allowed}</div>
      </div>
    </div>
  );
};

export default ParkingOverview;