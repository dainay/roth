import ConfiguratorLayout from './scene/ConfiguratorLayout'
import './App.css'
import VisualisationLayout from './visualisation/VisualisationLayout'
import useConfiguratorStore from './store/useConfiguratorStore'
import { useState } from 'react'

function App() {
    const sendConfiguratorData = useConfiguratorStore(
        (state) => state.sendConfiguratorData
    )

    const currentView = useConfiguratorStore((state) => state.currentView)
    const setCurrentView = useConfiguratorStore((state) => state.setCurrentView)

    const handleVisualisationClick = async () => {
        await sendConfiguratorData()
        setCurrentView('visualisation')
    }

    return (
        <div>
            
                <div style={{
                    visibility: currentView === "configurateur" ? "visible" : "hidden",
                    pointerEvents: currentView === "configurateur" ? "auto" : "none",
                }}>
                    <ConfiguratorLayout />
                    <button
                        className="visualise__button"
                        onClick={handleVisualisationClick}
                    >
                        Visualiser ma salle de bain
                    </button>
                </div>
            
            {currentView === 'visualisation' && <VisualisationLayout />}

        </div>
    )
}

export default App
