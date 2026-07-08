import React, { useRef, useEffect, useLayoutEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

export default function Bath({ metalColor, vipanel, ...props }) {
     const { nodes, materials } = useGLTF('/sb4.glb')

     const textures = useTexture([
        '/textures/1.webp',
        '/textures/2.webp',
        '/textures/3.webp',
        '/textures/4.webp',
        '/textures/5.webp',
        '/textures/6.webp',
        '/textures/7.webp',
        '/textures/8.webp',
    ])

     const selectedTexture = useMemo(() => {
        return textures[Number(vipanel) - 1]
    }, [textures, vipanel])

    useLayoutEffect(() => {
        if (!selectedTexture || !materials.vipanel) return

        selectedTexture.flipY = true
        selectedTexture.colorSpace = THREE.SRGBColorSpace

          selectedTexture.repeat.set(1, -1)
  selectedTexture.offset.set(0, 1)

        materials.vipanel.map = selectedTexture
        materials.vipanel.needsUpdate = true 
        selectedTexture.needsUpdate = true
    }, [selectedTexture, materials])

  return (
     <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box2131645049.geometry}
        material={materials['Material #2147483646']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object400.geometry}
        material={materials['Material #-2147483648']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rectangle003.geometry}
        material={materials['kafel.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box2131645084.geometry}
        material={materials['10 - Default']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rectangle006.geometry}
        material={materials['kafel.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Line002.geometry}
        material={materials.patalok}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rectangle001.geometry}
        material={materials.Estatuario_tile_2400x1200}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rectangle005.geometry}
        material={materials['kafel.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rectangle004.geometry}
        material={materials['kafel.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object.geometry}
        material={materials['11 - Default']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box004.geometry}
        material={materials['08 - Default']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box002.geometry}
        material={nodes.Box002.material}
      />

        <mesh receiveShadow
              geometry={nodes.Plane.geometry} 
              material={materials.vipanel} 
        />


      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials.vipanel}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box004001.geometry}
        material={materials['08 - Default.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rectangle001002.geometry}
        material={materials['Estatuario_tile_2400x1200.002']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rectangle006001.geometry}
        material={materials.kafel}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rectangle006002.geometry}
        material={materials['kafel.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257001'].geometry}
        // material={materials.METAL}
      >
        <meshStandardMaterial color={metalColor} metalness={1} roughness={0} />
      </mesh>
      <mesh
        // castShadow
        // receiveShadow
        geometry={nodes['S45SC01+RP__257120'].geometry}
          >
        <meshStandardMaterial color='#ffffff' metalness={1} roughness={0.1}   transparent
  opacity={0.2}/>
      </mesh>
   
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mood_Pro_Fixed_Round_195.geometry}
        material={materials.patalok}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh041.geometry}
        material={materials['Reggiani white f445']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh041_1.geometry}
        material={materials['Glass uh34']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh013.geometry}
        material={materials.FINITION}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh013_1.geometry}
        material={materials['Material #013']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh013_2.geometry}
        material={materials['Material #-2147483648']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh013_3.geometry}
        material={materials['Material #-2147483648']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh013_4.geometry}
        material={materials['Material #-2147483648']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh062.geometry}
        material={materials['Ekinex v3']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh062_1.geometry}
        material={materials['Ekinex v9']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mood_Pro_Fixed_Round_199.geometry}
        material={materials.patalok}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh043.geometry}
        material={materials['Reggiani white f445']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh043_1.geometry}
        material={materials['Glass uh34']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mood_Pro_Fixed_Round_191.geometry}
        material={materials.patalok}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh039.geometry}
        material={materials['Reggiani white f445']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh039_1.geometry}
        material={materials['Glass uh34']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh046.geometry}
        material={materials['Material #53']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh046_1.geometry}
        material={materials['Material #53.002']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh016.geometry}
        material={materials['Material #44']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh016_1.geometry}
        material={materials['Material #84']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh016_2.geometry}
        material={materials['Material #47']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh030.geometry}
        material={materials.ytetfrrt122}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh030_1.geometry}
        material={materials.ytetfrrt1223}
      />
      <mesh castShadow receiveShadow geometry={nodes.Mesh019.geometry} material={materials.tbz} />
      <mesh castShadow receiveShadow geometry={nodes.Mesh019_1.geometry} material={materials.tb} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh019_2.geometry}
        material={materials.tb_2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh015.geometry}
        material={materials['Material #803']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh015_1.geometry}
        material={materials['Material #799']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh015_2.geometry}
        material={materials['Material #2147483647']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh015_3.geometry}
        material={materials['Material #-2147483648']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box010.geometry}
        material={materials['Material #2147483646']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder412.geometry}
        material={materials['15 - BATHDECOR2']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder413.geometry}
        material={materials['15 - BATHDECOR3']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder414.geometry}
        material={materials['15 - BATHDECOR4']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh025.geometry}
        material={materials['16 - CoronaMt']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh025_1.geometry}
        material={materials['Material #26']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh025_2.geometry}
        material={materials['Wine White']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh025_3.geometry}
        material={materials['01 - CoronaMtl2']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh026.geometry}
        material={materials.etic__2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh026_1.geometry}
        material={materials.plast1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh026_2.geometry}
        material={materials['04 - CoronaMtl']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh026_3.geometry}
        material={materials.stec1_}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh026_4.geometry}
        material={materials.stec1_1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh027.geometry}
        material={materials['04 - CoronaMtl']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh027_1.geometry}
        material={materials.plast1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh027_2.geometry}
        material={materials.etic_2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh027_3.geometry}
        material={materials.stec1_3}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh028.geometry}
        material={materials['02 - Zara Home_decorative_shampoo']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh028_1.geometry}
        material={materials['02 - Zara Home_hair_conditioner_logo_2']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh028_2.geometry}
        material={materials['02 - Zara Home_hair_conditioner_logo']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh028_3.geometry}
        material={materials['02 - Zara Home_decorative_shampo']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh017.geometry}
        material={materials['Receveur.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh017_1.geometry}
        material={materials['Receveur_black.001']}
      />
    </group>
  )
}

useGLTF.preload('/sb4.glb')