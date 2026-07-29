import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Tryptich(props) {
  const { nodes, materials } = useGLTF('/models/Tryptich.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tryptich.geometry}
        material={materials.TRYPTICH}
        position={[-1.926, 0.941, -1.6]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[5, 1, 1]}
      />
    </group>
  )
}

useGLTF.preload('/models/Tryptich.glb')