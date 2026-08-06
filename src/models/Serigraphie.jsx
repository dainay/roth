
import React from 'react'
import { useGLTF } from '@react-three/drei'
import useConfiguratorStore from '../store/useConfiguratorStore';


export default function Serigraphie(props) {
    const verre = useConfiguratorStore((state) => state.selection.verre);
    const paroi = useConfiguratorStore((state) => state.selection.paroi);
    const { nodes, materials } = useGLTF('./models/Serigraphie.glb')
    
    if (verre === 'PE' || paroi !==  'PL TWU') {
        return null
    }

    return (
        <group {...props} dispose={null}>
            {verre === 'GP' && (
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Serigraphie_Geometrie.geometry}
                    material={materials['Serigraphie Geometrie']}
                    position={[-0.922, 0.682, -1.66]}
                />
            )}

            {verre === 'MP' && (
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Serigraphie_Shevrons.geometry}
                    material={materials['Serigraphie Shevrons']}
                    position={[-0.922, 0.682, -1.66]}
                />
            )}
        </group>

    )
}

useGLTF.preload('./models/Serigraphie.glb')