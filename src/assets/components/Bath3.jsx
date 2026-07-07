import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Bath3(props) {
  const { nodes, materials } = useGLTF('/bath__compressed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257001'].geometry}
        material={materials.FINITION}
        position={[0.284, -2.237, -0.865]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257120'].geometry}
        material={materials['GLASS.001']}
        position={[0.284, -2.237, -0.865]}
      />
    </group>
  )
}

useGLTF.preload('/bath__compressed.glb')