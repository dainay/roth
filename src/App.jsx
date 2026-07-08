import { useState } from 'react'
import Scene from './assets/components/Scene'

import './App.css'

function App() {
    const [count, setCount] = useState(0)
    const [metalColor, setMetalColor] = useState("#d0d0d0");
    const [vipanel, setVipanel] = useState("1");

    return (
        <div className="wrapper">
            <div className="app">
                <Scene metalColor={metalColor} vipanel={vipanel} />
            </div>
            <div className="text">
                <div>
                    <p>Configurateur</p>
                    <h2>PASTEL</h2>
                </div>
                <div className="buttons">
                    <button onClick={() => setMetalColor("#cccccc")}>Silver</button>
                    <button onClick={() => setMetalColor("#a4904e")}>Gold</button>
                    <button onClick={() => setMetalColor("#896340")}>Bronze</button>
                </div>
         

            <div className="vipanel-buttons">
                <button onClick={() => setVipanel("1")}>VIPANEL 1</button>
                <button onClick={() => setVipanel("2")}>VIPANEL 2</button>
                <button onClick={() => setVipanel("3")}>VIPANEL 3</button>
                <button onClick={() => setVipanel("4")}>VIPANEL 4</button>
                <button onClick={() => setVipanel("5")}>VIPANEL 5</button>
                <button onClick={() => setVipanel("6")}>VIPANEL 6</button>
                <button onClick={() => setVipanel("7")}>VIPANEL 7</button>
                <button onClick={() => setVipanel("8")}>VIPANEL 8</button>  

            </div>
               </div>

        </div>
    )
}

export default App
