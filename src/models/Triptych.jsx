import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import useConfiguratorStore from '../store/useConfiguratorStore';

export default function Triptych(props) {
  const { nodes, materials } = useGLTF('./models/Triptych.glb')

  const triptychLeft = useConfiguratorStore((state) => state.triptychLeft);
    const triptychRight = useConfiguratorStore((state) => state.triptychRight);
     const nicheColor = useConfiguratorStore((state) => state.nicheColor);
     const shower = useConfiguratorStore((state) => state.shower);

  return (
       <group {...props} dispose={null}>
        {triptychLeft !== 'None' && (
            <mesh 
            receiveShadow
            geometry={nodes.tryptich.geometry}
            material={materials.TRYPTICH}
            position={[-1.942, 0.941, -1.6]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[5, 1, 1]}
        />
        )}

         {triptychRight !== 'None' && nicheColor === 'None' && (
            <mesh 
            receiveShadow
            geometry={nodes.tryptich.geometry}
            material={materials.TRYPTICH}
            position={[-1.197, 0.925, -2.544]} 
            scale={[5, 1, 1]}
        />
        )}
    
            {triptychRight !== 'None' && nicheColor !== 'None' && shower !== 'p' && (
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