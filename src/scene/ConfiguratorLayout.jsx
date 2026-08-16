import Scene from "./Scene";
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
    useEffect(() => {
        loadConfiguratorData()
    }, [loadConfiguratorData])

    if (error) {
        return <div>Erreur : {error}</div>
    }

    if (isLoading || !cleanedData) {
        return <div className={s.loading}>Chargement...</div>
    }

    return (
        <div className={s.configuratorLayout}>
            <UI />
            <div className={s.sceneWrapper}>
                <Scene />
            </div>
          
        </div>
    );
}
