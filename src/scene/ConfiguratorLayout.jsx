import Scene from "./Scene";
import UI from "../ui/UI";
import s from './ConfiguratorLayout.module.scss'
import { useEffect } from 'react'
import useConfiguratorStore from '../store/useConfiguratorStore'


export default function ConfiguratorLayout() {
 const data = useConfiguratorStore((state) => state.data)
  const isLoading = useConfiguratorStore((state) => state.isLoading)
  const error = useConfiguratorStore((state) => state.error)
 const loadConfiguratorData = useConfiguratorStore(
    (state) => state.loadConfiguratorData
  )

  const sendConfiguratorData = useConfiguratorStore(
    (state) => state.sendConfiguratorData
  )

  useEffect(() => {
    loadConfiguratorData()
  }, [loadConfiguratorData])

  if (isLoading) {
    return <div>Chargement...</div>
  }

  if (error) {
    return <div>Erreur : {error}</div>
  }

    return (
        <div className={s.configuratorLayout}>
            <UI />
            <Scene />
            <button
                className={s.visualise__button}
                onClick={sendConfiguratorData}
            >
                Visualiser ma salle de bain
            </button>
        </div>
    );
}