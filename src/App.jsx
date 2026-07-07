import { useState } from 'react'
import Scene from './assets/components/Scene'
 
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [metalColor, setMetalColor] = useState("#d0d0d0");

  return (
    <div className="wrapper">
    <div className="app">
         <Scene metalColor={metalColor} />
    </div>
    <div className="text">
      <p>Configurateur</p>
      <h2>PASTEL</h2>
       <div className="buttons">
        <button onClick={() => setMetalColor("#cccccc")}>Silver</button>
        <button onClick={() => setMetalColor("#a4904e")}>Gold</button>
        <button onClick={() => setMetalColor("#896340")}>Bronze</button>
      </div>
    </div>
    </div>
  )
}

export default App
