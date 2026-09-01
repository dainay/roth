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
                // receiveShadow
                geometry={nodes.Ceiling_1.geometry}
                // material={materials['+CEILING']}
                position={[-2.042, 2.208, -2.619]}
            >
                <meshStandardMaterial
                    color="#fdfdfd"
                    roughness={0.8}
                    metalness={0}
                />
            </mesh>
            <mesh
                receiveShadow
                geometry={nodes.Floor_1.geometry}
                material={materials['Marble floor']}
                position={[-2.165, -0.361, -2.545]}
            />
            <group position={[-1.794, 2.172, 0.138]} rotation={[0, 0, Math.PI]} scale={1.517}>
                <group position={[0, 0.566, 0]}>
                    <mesh
                        geometry={nodes.ampoule_1004_1.geometry}
                        material={materials['+GLASS']}
                    />
                    {/*                    
                         <mesh
                            geometry={nodes.ampoule_1004_2.geometry}
                             material={materials.lumière}
                        /> */}


                    <mesh
                        geometry={nodes.ampoule_1004_3.geometry}
                        material={materials['+PLASTIC BLACK']}
                    >
                        {mirrorLight && (
                            <meshStandardMaterial
                                color="#fff4df"
                                emissive="#ff9f3f"
                                emissiveIntensity={25}
                                roughness={0.25}
                                metalness={0}
                                toneMapped={false}
                            />
                        )}
                    </mesh>
                </group>
                <mesh
                    geometry={nodes.Cylinder054.geometry}
                    material={materials['+PLASTIC BLACK']}
                    position={[0, 0.536, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder055.geometry}
                    material={materials['+FINITION']}
                    position={[0, 0.439, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder056.geometry}
                    material={materials['+FINITION']}
                    position={[0, 0.01, 0]}
                />
                <mesh
                    castShadow
                    geometry={nodes['httpswwwluminairefrplindby-plafonnier-enrique-ambre-003'].geometry}
                    // material={materials['+GLASS-VOLUMED']}
                    // material={glassGlobeMaterial}
                    position={[0, 0.573, 0]}
                    onClick={(e) => {
                        e.stopPropagation()
                        toggleMirrorLight(false)
                    }}
                    onPointerEnter={handlePointerEnter}
                    onPointerLeave={handlePointerLeave}
                >
                    <meshStandardMaterial
                        color="#1d160c"
                        transparent
                        opacity={0.5}
                        roughness={0}
                        metalness={0}
                        // envMapIntensity={0.8}
                        depthWrite={false}
                    />

                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Sphere010.geometry}
                    material={materials['+FINITION']}
                    position={[0, 0.516, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Sphere011.geometry}
                    material={materials['+PLASTIC BLACK']}
                    position={[0, 0.453, 0]}
                />
            </group>

            <mesh
                geometry={nodes['Mirror-LeftWall_1'].geometry}
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
                    material={materials['+PLASTIC BLACK']}
                />
                <mesh

                    geometry={nodes.Banana__Plants001_3.geometry}
                    material={materials.Plant_Matti}
                />
                <mesh

                    geometry={nodes.Banana__Plants001_4.geometry}
                    material={materials['+Plant_Dali']}
                />
            </group>
            <mesh

                geometry={nodes.Back_wall.geometry}
                material={nodes.Back_wall.material}
                position={[-1.968, 0.911, -2.597]}
            />
            <mesh

                geometry={nodes.Corner.geometry}
                material={nodes.Corner.material}
                position={[-1.696, 0.922, -2.555]}
                scale={[10, 1, 0.2]}
            />

            <mesh

                geometry={nodes.Right_wall.geometry}
                material={nodes.Right_wall.material}
                position={[-2.003, 0.916, -2.58]}
                scale={[0.83, 1, 1]}
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
