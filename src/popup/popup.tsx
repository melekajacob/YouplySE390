import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Box, Grid, InputBase, IconButton, Paper } from "@material-ui/core";
import {
  Add as AddIcon,
  PictureInPicture as PictureInPictureIcon,
} from "@material-ui/icons";
import "fontsource-roboto";
import "./popup.css";

const App: React.FC<{}> = () => {
  const handleOpenOptions = () => {
    chrome.runtime.openOptionsPage();
  };

  return (
    <div>
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

      <div className="btnContainer">
        <button className="deleteBtn" onClick={handleOpenOptions}>
          Update Application
        </button>
      </div>
    </div>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
