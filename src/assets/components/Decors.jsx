import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Decors(props) {
  const { nodes, materials } = useGLTF('/files/decors4_compressed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Brace.geometry} material={materials.st} />
      <mesh castShadow receiveShadow geometry={nodes.Leg.geometry} material={materials.STAND} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.towel002.geometry}
        material={materials['fabric (towel)']}
        position={[-3.761, 3.838, -4.1]}
        rotation={[1.588, 0.004, 1.562]}
        scale={[3.997, 8.078, 3.997]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.aroma.geometry}
        material={materials['Material.007']}
        position={[8.513, 1.7, 1.383]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BASIN.geometry}
        material={materials.BASIN}
        position={[6.752, 1.598, 1.686]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cutter.geometry}
        material={nodes.Cutter.material}
        position={[6.756, 1.778, 2.358]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.botle_hand_wash.geometry}
        material={materials['Material.010']}
        position={[5.263, 2.175, 2.155]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bottle.geometry}
        material={materials['Material.009']}
        position={[5.23, 0.898, 1.407]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FAUCET.geometry}
        material={materials.FAUCET}
        position={[6.678, 2.28, 2.318]}
      />
      <group position={[6.742, 4.789, 2.945]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle.geometry}
          material={materials.mirror}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle_1.geometry}
          material={materials.emission}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.perfume.geometry}
        material={materials['Material.011']}
        position={[4.887, 0.686, 0.771]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.stand.geometry}
        material={materials.STAND}
        position={[6.888, 0.134, 1.034]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.TOWEL.geometry}
        material={materials.TOWEL}
        position={[5.081, -0.59, 0.985]}
      />
    </group>
  )
}

useGLTF.preload('/files/decors4_compressed.glb')