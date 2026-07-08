
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Fixe({ metalColor, ...props }) {
  const { nodes, materials } = useGLTF('/fixe_compressed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        // castShadow
        receiveShadow
        geometry={nodes.Object001.geometry}
        material={materials['GLASS.002']}
        position={[-27.978, 46.067, 0.04]}
        scale={[0.945, 0.86, 0.1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['W01SC01-1000X2000-2025-04-02'].geometry}
        
        position={[-10.253, -4.099, -2.148]}
        scale={1.05}
      >
         <meshStandardMaterial color={metalColor} metalness={1} roughness={metalColor === '#ffffff' || metalColor === '#1b1b1b' ? 0.3 : 0} />
            </mesh>
      <mesh
        // castShadow
        receiveShadow
        geometry={nodes['W01SC01-1000X2000-2025-04-02025'].geometry}
        // material={materials['GLASS.001']}
        position={[-10.253, -4.461, -2.148]}
        scale={1.05}>
      <meshStandardMaterial color='#ffffff' metalness={1} roughness={0.1} transparent
                    opacity={0.2} />
            </mesh>
    </group>
  )
}

useGLTF.preload('/fixe_compressed.glb')