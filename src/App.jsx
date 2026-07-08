import { useState } from 'react'
import Scene from './assets/components/Scene'

import './App.css'

function App() {
    const [count, setCount] = useState(0)
    const [metalColor, setMetalColor] = useState("#d0d0d0");
    const [vipanel, setVipanel] = useState("1");
    const [receveur, setReceveur] = useState("1");
    const [paroi, setParoi] = useState("1");
    const [showVipanelLeft, setShowVipanelLeft] = useState(true);
    const [showVipanelRight, setShowVipanelRight] = useState(true);
    const [wallColor, setWallColor] = useState("#4f7a8c");
      const [wall2Color, setWall2Color] = useState("#b7b495");
 
    return (
        <div className="wrapper">
            <div className="app">
                <Scene showVipanelLeft={showVipanelLeft} showVipanelRight={showVipanelRight} paroi={paroi} metalColor={metalColor} vipanel={vipanel} receveur={receveur} wallColor={wallColor} wall2Color={wall2Color} />
            </div>
            <div className="text">
                <div>
                    <p>Configurateur</p>
                    <h2>PASTEL</h2>
                </div>
                <div className="buttons">
                    <button   onClick={() => setMetalColor("#cccccc")}>Silver</button>
                    <button  onClick={() => setMetalColor("#a4904e")}>Gold</button>
                    <button  onClick={() => setMetalColor("#896340")}>Bronze</button>
                    <button  onClick={() => setMetalColor("#ffffff")}>Blanc Mat</button>
                    <button onClick={() => setMetalColor("#1b1b1b")}>Noir Mat</button>
<br />
                    <button data-full= "VIPANEL Gauche" data-short= "VP G" onClick={() => setShowVipanelLeft(prev => !prev)}></button>
                    <button data-full="VIPANEL Droit" data-short= "VP D" onClick={() => setShowVipanelRight(prev => !prev)}></button> 

                      <input value={wall2Color} type="color" onChange={(e) => setWall2Color(e.target.value)} />

                    <input value={wallColor} type="color" onChange={(e) => setWallColor(e.target.value)} />
                </div>
         

            <div className="vipanel-buttons vb1">
                <button data-full="Vipanel 1" data-short="V1" onClick={() => setVipanel("1")}></button>
                <button data-full="Vipanel 2" data-short="V2" onClick={() => setVipanel("2")}></button>
                <button data-full="Vipanel 3" data-short="V3" onClick={() => setVipanel("3")}></button>
                <button data-full="Vipanel 4" data-short="V4" onClick={() => setVipanel("4")}></button>
                <button data-full="Vipanel 5" data-short="V5" onClick={() => setVipanel("5")}></button>
                <button data-full="Vipanel 6" data-short="V6" onClick={() => setVipanel("6")}></button>
                <button data-full="Vipanel 7" data-short="V7" onClick={() => setVipanel("7")}></button>
                <button data-full="Vipanel 8" data-short="V8" onClick={() => setVipanel("8")}></button>  
                <button data-full="Vipanel 9" data-short="V9" onClick={() => setVipanel("9")}></button>  
                <button data-full="Vipanel 10" data-short="V10" onClick={() => setVipanel("10")}></button>
                <button data-full="Vipanel 11" data-short="V11" onClick={() => setVipanel("11")}></button>  
                <button data-full="Vipanel 12" data-short="V12" onClick={() => setVipanel("12")}></button>
                <button data-full="Vipanel 13" data-short="V13" onClick={() => setVipanel("13")}></button> 
            </div>

             <div className="vipanel-buttons  vb2">
                <button data-full="Receveur 1" data-short="R1" onClick={() => setReceveur("1")}></button>
                <button data-full="Receveur 2" data-short="R2" onClick={() => setReceveur("2")}></button>
                <button data-full="Receveur 3" data-short="R3" onClick={() => setReceveur("3")}></button>  
            </div>

             <div className="vipanel-buttons  vb3">
                <button data-full="Paroi 1" data-short="P1" onClick={() => setParoi("1")}></button>
                <button data-full="Paroi 2" data-short="P2" onClick={() => setParoi("2")}></button>  
            </div>

               </div>

        </div>
    )
}

export default App
