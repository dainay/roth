import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import useConfiguratorStore from '../store/useConfiguratorStore';
import { useShallow } from 'zustand/react/shallow'

export default function Triptych(props) {
  const { nodes, materials } = useGLTF('./models/Triptych.glb')

   const selection = useConfiguratorStore(
    useShallow((state) => ({
      triptychLeft: state.selection.triptychLeft,
      triptychRight: state.selection.triptychRight,
      niche: state.selection.niche,
      paroi: state.selection.paroi,
    }))
   );
    const setSelectionValue = useConfiguratorStore((state) => state.setSelectionValue) 
// console.log('triptychRight', selection.triptychRight, 'triptychLeft', selection.triptychLeft, 'niche', selection.niche, 'paroi', selection.paroi)
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

        {selection.triptychRight !== 'None'  && selection.paroi === 'PL PIV'  &&(
            <mesh 
            receiveShadow
            geometry={nodes.tryptich.geometry}
            material={materials.TRYPTICH}
            position={[-1.197, 0.925, -2.544]} 
            scale={[5, 1, 1]}
        />
        )}
    
            {selection.triptychRight !== 'None' && selection.paroi !== 'PL PIV'  && (
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