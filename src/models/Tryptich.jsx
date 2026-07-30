import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import useConfiguratorStore from '../store/useConfiguratorStore';

export default function Tryptich(props) {
  const { nodes, materials } = useGLTF('/models/Tryptich.glb')

  const tryptichLeft = useConfiguratorStore((state) => state.tryptichLeft);
    const tryptichRight = useConfiguratorStore((state) => state.tryptichRight);
     const niche = useConfiguratorStore((state) => state.niche);

  return (
       <group {...props} dispose={null}>
        {tryptichLeft !== 'None' && (
            <mesh 
            receiveShadow
            geometry={nodes.tryptich.geometry}
            material={materials.TRYPTICH}
            position={[-1.926, 0.941, -1.6]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[5, 1, 1]}
        />
        )}

         {tryptichRight !== 'None' && !niche && (
            <mesh 
            receiveShadow
            geometry={nodes.tryptich.geometry}
            material={materials.TRYPTICH}
            position={[-1.197, 0.941, -2.544]} 
            scale={[5, 1, 1]}
        />
        )}
    
            {tryptichRight !== 'None' && niche && (
          <mesh 
            receiveShadow
            geometry={nodes.tryptich001.geometry}
            material={materials.TRYPTICH}
            position={[-1.197, 0.941, -2.544]}
            scale={[5, 1, 1]}
          />
      )}
    </group>
  )
}

useGLTF.preload('/models/Tryptich.glb')