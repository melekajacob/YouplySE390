import React from 'react'
import ReactDOM from 'react-dom'
import './popup.css'

const App: React.FC<{}> = () => {
  return (
    <div>
      <img src="arrow_icon.png" />
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
