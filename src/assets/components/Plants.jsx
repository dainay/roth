import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Plants(props) {
  const { nodes, materials } = useGLTF('/files/Plants_compressed.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[3.028, -2.292, 2.165]} scale={6.162}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BANANA_25082020024.geometry}
          material={materials.Plant_Banan}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BANANA_25082020024_1.geometry}
          material={materials.Plant_Black}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BANANA_25082020024_2.geometry}
          material={materials.Plant_Matti}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BANANA_25082020024_3.geometry}
          material={materials.Plant_Dali}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/files/Plants_compressed.glb')