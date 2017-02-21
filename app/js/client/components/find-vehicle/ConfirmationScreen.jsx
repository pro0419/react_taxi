import React from "react";
import GrayButton from "../../../common/components/button/gray-button.jsx";
import Timer from "../../../common/components/timer/timer.jsx";

import "./styles/find-vehicle.scss";

const ConfirmationScreen = (props) => {
  const {
    timeRemaining,
    plate_no,
    max_time,
    address1,
    address2,
    city,
    state,
    zip,
    country,
    parkedTime,
    expiresAt,
    onExit,
    onPrint,
    onRenew
  } = props;

  return (
    <div className="parking-confirmation">
      <Timer timeLeft={timeRemaining}/>
      <div>
        <div className="row">
          <div className="col s4 header">
            Plate#:
          </div>
          <div className="col s8 field-value">
            {plate_no}
          </div>
        </div>

        <div className="row">
          <div className="col s4 header">
            Parked At:
          </div>
          <div className="col s8 field-value">
            {parkedTime}
          </div>
        </div>

        <div className="row">
          <div className="col s4 header">
            Expires At:
          </div>
          <div className="col s8 field-value">
            {expiresAt}
          </div>
        </div>

        <div className="row">
          <div className="col s4 header">
            Max Time:
          </div>
          <div className="col s8 field-value">
            {max_time} Hours
          </div>
        </div>

        <div className="row">
          <div className="col s4 header">
            Address:
          </div>
          <div className="col s8 field-value">
            <div>{address1}</div>
            <div>{address2}</div>
            <div>{city}, {state}, {zip}, {country}</div>
          </div>
        </div>
      </div>

      <GrayButton className="yellow-btn margin-bottom-10" onClick={onExit}>
        Exit Parking
      </GrayButton>

      <GrayButton className="gray-btn margin-bottom-10" onClick={onRenew}>
        Renew
      </GrayButton>

      <GrayButton className="blue-btn margin-bottom-10" onClick={null}>
        Directions to my vehicle
      </GrayButton>

      <GrayButton className="red-btn margin-bottom-10" onClick={onPrint}>
        Print Entry Ticket
      </GrayButton>

      <GrayButton onClick={null}>
        Hide
      </GrayButton>

    </div>
  );
};

export default ConfirmationScreen;