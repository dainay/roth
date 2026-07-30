
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import useConfiguratorStore from '../store/useConfiguratorStore';


export default function Serigraphie(props) {
    const shower = useConfiguratorStore((state) => state.shower);
    const serigraphie = useConfiguratorStore((state) => state.serigraphie);
    const { nodes, materials } = useGLTF('./models/Serigraphie.glb')
    
    return (
        <group {...props} dispose={null}>
            {shower === 'f' && serigraphie === 'geometrie' && (
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Serigraphie_Geometrie.geometry}
                    material={materials['Serigraphie Geometrie']}
                    position={[-0.922, 0.682, -1.66]}
                />
            )}

            { shower === 'f' && serigraphie === 'chevrons' && (
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