import React from 'react'
import ReactDOM from 'react-dom'
import './autofillPopup.css'

const AutofillPopup: React.FC<{}> = () => {
  return (
    <div>
      <img src="arrow_icon.png" />
    </div>
  )
}


export const displayPopup = () => {
    const root = document.createElement("div");
    document.body.appendChild(root);
    ReactDOM.render(<AutofillPopup />, root);
  };