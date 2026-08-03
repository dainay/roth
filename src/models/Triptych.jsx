import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import useConfiguratorStore from '../store/useConfiguratorStore';

export default function Triptych(props) {
  const { nodes, materials } = useGLTF('./models/Triptych.glb')

   const selection = useConfiguratorStore((state) => state.selection);
    const setSelectionValue = useConfiguratorStore((state) => state.setSelectionValue) 

  return (
       <group {...props} dispose={null}>
        {selection.triptychLeft !== 'None' && (
            <mesh 
            receiveShadow
            geometry={nodes.tryptich.geometry}
            material={materials.TRYPTICH}
            position={[-1.942, 0.941, -1.6]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[5, 1, 1]}
        />
        )}

         {selection.triptychRight !== 'None' && selection.nicheColor === 'None' && (
            <mesh 
            receiveShadow
            geometry={nodes.tryptich.geometry}
            material={materials.TRYPTICH}
            position={[-1.197, 0.925, -2.544]} 
            scale={[5, 1, 1]}
        />
        )}
    
            {selection.triptychRight !== 'None' && selection.nicheColor !== 'None' && selection.shower !== 'p' && (
          <mesh 
            receiveShadow
            geometry={nodes.tryptich001.geometry}
            material={materials.TRYPTICH}
            position={[-1.197, 0.925, -2.544]}
            scale={[5, 1, 1]}
          />
      )}
    </group>
  )
}

useGLTF.preload('./models/Triptych.glb')