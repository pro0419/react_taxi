import React from "react";

const Spinner = ({ loading }) => {

  return loading ? (
    <div className="spinner">
    </div>
  ) : <div/>;
}

export default Spinner;