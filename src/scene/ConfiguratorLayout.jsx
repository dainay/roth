import Scene from "./Scene";
import UI from "../ui/UI";
import s from './ConfiguratorLayout.module.scss'
import { useEffect } from 'react'


export default function ConfiguratorLayout() {
   


//   useEffect(() => {
//     async function loadData() {
//       try {
//         const response = await getConfiguratorData()

//         setData(response)
//         setSelection(createDefaultSelection(response))
//       } catch (error) {
//         console.error(error)
//       }
//     }

//     loadData()
//   }, [setData, setSelection])

    return (
        <div className={s.configuratorLayout}>
            <UI />
            <Scene />
            <button
                className={s.visualise__button}
                // onClick={ }
            >
                Visualiser ma salle de bain
            </button>
        </div>
    );
}