import React from "react";
import { statesHash } from "./constants/states-hash.js";

const Plate = ({ number, state }) => {
  const stateName = statesHash[state];
  return (
    <div className="plate">
      <div className="number">
        {number}
      </div>
      <div className="state">
        {stateName}
      </div>
    </div>
  );
};

export default Plate;