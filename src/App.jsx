import ConfiguratorLayout from './scene/ConfiguratorLayout'
import './App.css'
import VisualisationLayout from './visualisation/VisualisationLayout'
import useConfiguratorStore from './store/useConfiguratorStore'

import { FEATURES } from './conf/appMode'

function App() {
    const sendConfiguratorData = useConfiguratorStore(
        (state) => state.sendConfiguratorData
    )


    const currentView = useConfiguratorStore((state) => state.currentView)
    const setCurrentView = useConfiguratorStore((state) => state.setCurrentView)
    const isSubmitting = useConfiguratorStore((state) => state.isSubmitting)
    const isLoading = useConfiguratorStore((state) => state.isLoading)
    const cleanedData = useConfiguratorStore((state) => state.cleanedData)
    const submitError = useConfiguratorStore((state) => state.submitError)

    const handleVisualisationClick = async () => {
            if (!canVisualise) return
        try {
            await sendConfiguratorData()
            setCurrentView('visualisation')
        } catch {
            console.error('Error while sending configurator data')
             return
        }
    }

    const canVisualise = Boolean(cleanedData) && !isLoading && !isSubmitting

    return (
        <div>
            {FEATURES.logoLink ? (
                <a href="https://admin.roth-france.fr/salons/menu"><img src="./img/logo.svg" alt="Logo" className="logo-roth" /></a>
            ) : (
                <img src="./img/logo.svg" alt="Logo" className="logo-roth" />
            )}

            <div style={{
                visibility: currentView === "configurateur" ? "visible" : "hidden",
                pointerEvents: currentView === "configurateur" ? "auto" : "none",
            }}>
                <ConfiguratorLayout />
                <button
                    type="button"
                    className="visualise__button"
                    onClick={handleVisualisationClick}
                    disabled={!canVisualise}
                    aria-busy={isSubmitting}
                >
                    {isSubmitting
                        ? 'Génération en cours...'
                        : 'Visualiser ma salle de bain'}
                </button>

                {submitError && (
                    <p
                        className="visualise__error"
                        role="alert"
                    >
                        {submitError}
                    </p>
                )}
            </div>

            {currentView === 'visualisation' && <VisualisationLayout />}

        </div>
    )
}

export default App
