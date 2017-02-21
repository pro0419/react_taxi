import React from "react";

const Modal = ({ children }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        {children}
      </div>
      <div className="modal-footer">
        <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">OK</a>
      </div>
    </div>
  );
}; 

export default Modal;