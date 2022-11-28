import React from "react";
import "./Modal.css";
import { RiCloseLine } from "react-icons/ri";

const Modal = ({ setIsActive, handleAutofill }) => {
  return (
    <>
      <div className="darkBG" onClick={() => setIsActive(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h4 className="heading">
              <img
                style={{ objectFit: "cover" }}
                className="icon"
                src={chrome.runtime.getURL("arrow_icon.png")}
                alt="logo"
              />
              Youply
            </h4>
          </div>
          <button className="closeBtn" onClick={() => setIsActive(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className="modalContent">
            Youply detected that we can autofill this job application for you
            using your Youply Application. Make sure to review your application
            after the autofill!
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className="deleteBtn" onClick={() => handleAutofill()}>
                Autofill!
              </button>
              <button className="cancelBtn" onClick={() => setIsActive(false)}>
                Fill Manually
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
