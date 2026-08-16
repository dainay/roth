import ConfiguratorLayout from './scene/ConfiguratorLayout'
import './App.css'
import VisualisationLayout from './visualisation/VisualisationLayout'
import useConfiguratorStore from './store/useConfiguratorStore'

function App() {
    const sendConfiguratorData = useConfiguratorStore(
        (state) => state.sendConfiguratorData
    )

    const currentView = useConfiguratorStore((state) => state.currentView)
    const setCurrentView = useConfiguratorStore((state) => state.setCurrentView)
    const isSubmitting = useConfiguratorStore((state) => state.isSubmitting)

    const handleVisualisationClick = async () => {
        try {
            await sendConfiguratorData()
            setCurrentView('visualisation')
        } catch {
            // The store exposes the error in the configurator view.
        }
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
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? 'Génération en cours...'
                            : 'Visualiser ma salle de bain'}
                    </button>
                </div>
            
            {currentView === 'visualisation' && <VisualisationLayout />}

        </div>
    )
}

export default App
