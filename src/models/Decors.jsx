import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

import useSceneStore from '../store/useSceneStore';

export default function Model(props) {
    const { nodes, materials } = useGLTF('./models/DECOR_compressed.glb')

    const toggleMirrorLight = useSceneStore((state) => state.toggleMirrorLight);
    const mirrorLight = useSceneStore((state) => state.mirrorLight);

    const handlePointerEnter = (e) => {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        // console.log('Pointer entered the light area');
    }

    const handlePointerLeave = (e) => {
        e.stopPropagation()
        document.body.style.cursor = 'default'
    }

    return (
        <group {...props} dispose={null}>
            <mesh
                receiveShadow
                geometry={nodes.Ceiling.geometry}
                material={materials['+CEILING']}
                position={[-2.042, 2.208, -2.619]}
            />
            <mesh
                receiveShadow
                geometry={nodes.Floor.geometry}
                material={materials['Marble floor']}
                position={[-2.165, -0.361, -2.545]}
            />
            <group position={[-1.794, 1.313, 0.138]} rotation={[0, 0, Math.PI]} scale={1.517} >
                <mesh
                    geometry={nodes.ampoule_1004_1.geometry}
                    material={materials['+GLASS']}
                />
                {mirrorLight && (
                    <mesh
                        geometry={nodes.ampoule_1004_2.geometry}
                        material={materials.lumière}
                    />
                )}
                <mesh
                    geometry={nodes.ampoule_1004_3.geometry}
                    material={materials['+PLASTIC BLACK']}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder055.geometry}
                material={materials['+FINITION']}
                position={[-1.794, 1.507, 0.138]}
                rotation={[0, 0, Math.PI]}
                scale={1.517}
            />
            <mesh
                castShadow
                geometry={nodes['httpswwwluminairefrplindby-plafonnier-enrique-ambre-003'].geometry}
                material={materials['+GLASS-VOLUMED']}
                position={[-1.794, 1.303, 0.138]}
                rotation={[0, 0, Math.PI]}
                scale={1.517}
                onClick={(e) => {
                    e.stopPropagation()
                    toggleMirrorLight(false)
                }}
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
            />
            <mesh
                geometry={nodes['Mirror-LeftWall'].geometry}
                material={materials['Material.001']}
                position={[-1.936, 1.267, -0.668]}
                scale={[1, 0.707, 1.404]}
            />
            <group position={[-1.582, -0.346, 0.341]} rotation={[-0.116, 1.032, 0.144]} scale={1.173}>
                <mesh
                    castShadow
                    geometry={nodes.Banana__Plants001_1.geometry}
                    material={materials.Plant_Banan}
                />
                <mesh
                    geometry={nodes.Banana__Plants001_2.geometry}
                    material={materials.Plant_Matti}
                />
                <mesh
                    geometry={nodes.Banana__Plants001_3.geometry}
                    material={materials['+Plant_Dali']}
                />
            </group>
            <mesh

                geometry={nodes.Back_wall.geometry}
                material={nodes.Back_wall.material}
                position={[-1.968, 0.911, -2.597]}
            />

            <mesh
                position={[-1, 2.18, -2]}
                rotation={[0, 0, 0]}
            >
                <cylinderGeometry args={[0.04, 0.04, 0.04, 10]} />

                <meshBasicMaterial
                    color="#fdfdfd"
                />
            </mesh>
        </group>
    )
}

useGLTF.preload('./models/DECOR_compressed.glb')