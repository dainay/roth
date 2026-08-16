import Scene from "./Scene";
import SceneLoadingOverlay from './SceneLoadingOverlay';
import UI from "../ui/UI";
import s from './ConfiguratorLayout.module.scss'
import { useEffect } from 'react'
import useConfiguratorStore from '../store/useConfiguratorStore'


export default function ConfiguratorLayout() {
    const isLoading = useConfiguratorStore((state) => state.isLoading)
    const error = useConfiguratorStore((state) => state.error)
    const cleanedData = useConfiguratorStore(
        (state) => state.cleanedData
    )

    const loadConfiguratorData = useConfiguratorStore(
        (state) => state.loadConfiguratorData
    )
    const restartConfigurator = useConfiguratorStore(
        (state) => state.restartConfigurator
    )

    useEffect(() => {
        loadConfiguratorData()
    }, [loadConfiguratorData])

    if (error) {
        return (
            <section className={s.errorScreen} role="alert">
                <div className={s.errorCard}>
                    <p className={s.errorLabel}>Une erreur est survenue</p>
                    <h1>Impossible de continuer</h1>
                    <p className={s.errorMessage}>{error}</p>
                    <button type="button" onClick={restartConfigurator}>
                        Recommencer
                    </button>
                </div>
            </section>
        )
    }

    return (
        <>
            <SceneLoadingOverlay forceVisible={isLoading || !cleanedData} />
            {!isLoading && cleanedData && (
                <div className={s.configuratorLayout}>
                    <UI />
                    <div className={s.sceneWrapper}>
                        <Scene />
                    </div>
                </div>
            )}
        </>
    );
}
