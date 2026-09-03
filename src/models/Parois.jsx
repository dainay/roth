import { useEffect, useLayoutEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

import { useShallow } from 'zustand/react/shallow'

import useConfiguratorStore from '../store/useConfiguratorStore';
import { FINITION_ASSETS } from '../conf/lib'
import AnimatedDoor from '../scene/AnimatedDoor'
import AnimatedDoubleDoor from '../scene/AnimatedDoubleDoor'
import optimizeMaterials from '../scene/optimizeMaterials'

export default function Model(props) {
    const { nodes, materials } = useGLTF('./models/PAROIS_compressed.glb')
    const invalidate = useThree((state) => state.invalidate)

    useLayoutEffect(() => {
        optimizeMaterials(materials)
        invalidate()
    }, [materials, invalidate])

    const protectionMaterial = useMemo(
        () => new THREE.MeshStandardMaterial({
            name: '+ PROTECTION (web)',
            color: '#ffffff',
            roughness: 0,
            metalness: 0,
            transparent: true,
            opacity: 0.4,
            depthWrite: false,
            side: THREE.FrontSide,
        }),
        []
    )

    useEffect(
        () => () => protectionMaterial.dispose(),
        [protectionMaterial]
    )

    const {
        finitionParoi,
        paroi,
        verre,
        montage
    } = useConfiguratorStore(
        useShallow((state) => ({
            finitionParoi: state.selection.finitionParoi,
            verre: state.selection.verre,
            paroi: state.selection.paroi,
            montage: state.selection.montage
        }))
    );

    //************************************* */
    //CHANGE Glass MATERIAL for better web
    //************************************* */
    useLayoutEffect(() => {
        const mGlass = materials['+GLASS']

        if (!mGlass) return

        mGlass.roughness = 0.08
        mGlass.metalness = 1
        mGlass.depthWrite = false
        mGlass.transparent = true
        mGlass.opacity = 0.2
        mGlass.color.set("#ffffff")

        mGlass.needsUpdate = true
        invalidate()
    }, [materials, invalidate])

    useLayoutEffect(() => {
        const mSerigraphie = materials['Serigraphie Shevrons arrondi']

        if (!mSerigraphie) return

        mSerigraphie.roughness = 0
        mSerigraphie.metalness = 0
        mSerigraphie.opacity = 1
        mSerigraphie.transparent = true
        mSerigraphie.depthWrite = false

        // mSerigraphie.needsUpdate = true
        invalidate()
    }, [materials, invalidate])


    //************************************* */
    //CHANGE Finition MATERIAL
    //************************************* */
    useLayoutEffect(() => {
        const mFinition = materials['+FINITION']
        const finitionData = FINITION_ASSETS[finitionParoi]
        // console.log('FINITION DATA', finitionData)

        if (!mFinition || !finitionData) return

        mFinition.roughness = finitionData.roughness
        mFinition.metalness = finitionData.metalness
        mFinition.color.set(finitionData.color)

        // mFinition.needsUpdate = true
        invalidate()
    }, [materials, finitionParoi, invalidate])


    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                geometry={nodes.Faucet_1.geometry}
                material={materials['+FINITION']}
            />
            <mesh castShadow receiveShadow geometry={nodes.Soap.geometry} material={materials['+SOAP']} />
            <mesh
                castShadow
                geometry={nodes.Holder_1.geometry}
                material={materials['+PLASTIC BLACK']}
            />
            <mesh
                castShadow
                geometry={nodes.Holder_2.geometry}
                material={materials['+FINITION']}
            />
            {(paroi === "PL 2BT" && montage === 'niche') && (
                <group>
                    <mesh
                        castShadow
                        geometry={nodes.frame001.geometry}
                        material={materials['+FINITION']}
                        position={[-0.268, -0.319, -1.644]}
                        rotation={[Math.PI / 2, 0, 0]}
                    />

                    <AnimatedDoubleDoor
                        leftPivot={[-1.42, 0.687, -1.637]}
                        leftOffset={[0.47, 0, 0]}
                        leftOpenAngle={-Math.PI / 4}

                        rightPivot={[-0.28, 0.687, -1.648]}
                        rightOffset={[-0.466, 0, 0]}
                        rightOpenAngle={Math.PI / 4}
                        leftDoor={
                            <group
                                // position={[-0.95, 0.687, -1.637]} 
                                rotation={[-Math.PI / 2, 0, 3.108]}
                            >
                                <mesh
                                    geometry={nodes['BL-P11SC01004'].geometry}
                                    material={materials['+GLASS']}
                                />
                                <mesh
                                    castShadow
                                    geometry={nodes['BL-P11SC01004_1'].geometry}
                                    material={materials['+FINITION']}
                                />
                                <mesh
                                    castShadow
                                    geometry={nodes['BL-P11SC01004_2'].geometry}
                                    material={materials['+ PROTECTION']}
                                />
                            </group>
                        }
                        rightDoor={

                            <group
                                // position={[-0.729, 0.687, -1.637]}
                                rotation={[-Math.PI / 2, 0, 0]}
                            >
                                <mesh
                                    geometry={nodes['BL-P11SC01005'].geometry}
                                    material={materials['+GLASS']}
                                />
                                <mesh
                                    castShadow
                                    geometry={nodes['BL-P11SC01005_1'].geometry}
                                    material={materials['+FINITION']}
                                />
                                <mesh
                                    castShadow
                                    geometry={nodes['BL-P11SC01005_2'].geometry}
                                    material={materials['+ PROTECTION']}
                                />
                            </group>}
                    />

                </group>
            )}

            {(paroi === "PL 2BT" && montage === 'angle') && (
                <group position={[0, 0.01, 0]}>
                    <group position={[-0.246, 1.669, -2.378]} rotation={[Math.PI / 2, 0, 3.139]}>
                        <mesh

                            geometry={nodes.DIANPIAN_1003.geometry}
                            material={materials['+ PROTECTION']}
                        />
                        <mesh

                            geometry={nodes.DIANPIAN_1003_1.geometry}
                            material={materials['+GLASS']}
                        />
                        <mesh
                            castShadow

                            geometry={nodes.DIANPIAN_1003_2.geometry}
                            material={materials['+FINITION']}
                        />
                    </group>


                    <AnimatedDoubleDoor
                        leftPivot={[-1.42, 0.687, -1.637]}
                        leftOffset={[0.47, 0, 0]}
                        leftOpenAngle={-Math.PI / 4}

                        rightPivot={[-0.28, 0.687, -1.648]}
                        rightOffset={[-0.466, 0, 0]}
                        rightOpenAngle={Math.PI / 4}
                        leftDoor={
                            <group
                                // position={[-0.961, 0.687, -1.646]} 
                                rotation={[-Math.PI / 2, 0, -3.139]}
                            >
                                <mesh

                                    geometry={nodes.leftDoor_1.geometry}
                                    material={materials['+GLASS']}
                                />
                                <mesh
                                    castShadow
                                    geometry={nodes.leftDoor_2.geometry}
                                    material={materials['+FINITION']}
                                />
                                <mesh

                                    geometry={nodes.leftDoor_3.geometry}
                                    material={materials['+ PROTECTION']}
                                />
                            </group>

                        }
                        rightDoor={
                            <group
                                // position={[-0.739, 0.687, -1.648]} 
                                rotation={[-Math.PI / 2, 0, 0.002]}>
                                <mesh

                                    geometry={nodes.RightDoor_1.geometry}
                                    material={materials['+GLASS']}
                                />
                                <mesh
                                    castShadow

                                    geometry={nodes.RightDoor_2.geometry}
                                    material={materials['+FINITION']}
                                />
                                <mesh

                                    geometry={nodes.RightDoor_3.geometry}
                                    material={materials['+ PROTECTION']}
                                />
                            </group>

                        }
                    />

                </group>
            )}
            {(paroi === 'PL CLS' && montage === 'niche') && (
                <>
                    <AnimatedDoor
                        rotation={[0, 0, 0]}
                        pivot={[-0.673, 0.749, -1.705]}
                        // offset={[-0.86, 0.005, 0.95]}
                        slideX={-0.54}
                    >
                        <group
                            position={[0, 0, -0.018]}
                        // rotation={[-1.567, 0, -Math.PI]}
                        >
                            {/* <group position={[-0.668, 0.755, -1.721]}> */}
                            <mesh
                                geometry={nodes.MovingDoor_1.geometry}
                                material={materials['+GLASS']}
                            />
                            <mesh
                                castShadow
                                geometry={nodes.MovingDoor_2.geometry}
                                material={materials['+FINITION']}
                            />
                            <mesh
                                castShadow
                                geometry={nodes.MovingDoor_3.geometry}
                                material={protectionMaterial}
                            />
                        </group>
                    </AnimatedDoor>

                    <group position={[-0.819, 0.755, -1.721]}>
                        <mesh
                            geometry={nodes.PLCLS_1200x2000_2.geometry}
                            material={materials['+GLASS']}
                        />
                        <mesh
                            castShadow
                            geometry={nodes.PLCLS_1200x2000_3.geometry}
                            material={protectionMaterial}
                        />
                        <mesh
                            castShadow
                            geometry={nodes.PLCLS_1200x2000_4.geometry}
                            material={materials['+FINITION']}
                        />
                    </group>
                </>
            )}

            {(paroi === 'PL CLS' && montage === 'angle') && (
                <>
                    <AnimatedDoor
                        rotation={[0, 0, 0]}
                        pivot={[-0.673, 0.749, -1.705]}
                        // offset={[-0.86, 0.005, 0.95]}
                        slideX={-0.51}
                    >
                        <group
                            position={[0, 0, -0.018]}
                        // rotation={[-1.567, 0, -Math.PI]}
                        >
                            {/* <group position={[-0.673, 0.749, -1.705]}> */}
                            <mesh
                                geometry={nodes.MovingDoor001_1.geometry}
                                material={materials['+GLASS']}
                            />
                            <mesh
                                castShadow
                                geometry={nodes.MovingDoor001_2.geometry}
                                material={materials['+FINITION']}
                            />
                            <mesh
                                castShadow
                                geometry={nodes.MovingDoor001_3.geometry}
                                material={protectionMaterial}
                            />
                            <mesh
                                castShadow
                                geometry={nodes.MovingDoor001_4.geometry}
                                material={protectionMaterial}
                            />
                        </group>
                    </AnimatedDoor>
                    <group position={[-0.824, 0.749, -1.705]}>
                        <mesh
                            castShadow
                            geometry={nodes['PLCLS_1200x2000_+_PLTWU_900x2000_2'].geometry}
                            material={materials['+FINITION']}
                        />
                        <mesh
                            receiveShadow
                            geometry={nodes['PLCLS_1200x2000_+_PLTWU_900x2000_3'].geometry}
                            material={protectionMaterial}
                        />
                        <mesh
                            geometry={nodes['PLCLS_1200x2000_+_PLTWU_900x2000_4'].geometry}
                            material={materials['+GLASS']}
                        />
                        <mesh
                            castShadow
                            geometry={nodes['PLCLS_1200x2000_+_PLTWU_900x2000_5'].geometry}
                            material={protectionMaterial}
                        />
                    </group>
                </>
            )}

            {(paroi === 'PL PIF' && montage === 'niche') && (
                <>
                    <AnimatedDoor
                        rotation={[0, 0, 0]}
                        pivot={[-0.98, 0.691, -1.665]}
                        offset={[0.98, -0.691, 1.67]}
                        openAngle={-Math.PI / 7}
                    >
                        <group
                            position={[0, 0, 0]}
                        // rotation={[-1.567, 0, -Math.PI]}
                        >
                            {/* <group > */}
                            <mesh
                                castShadow
                                geometry={nodes.Moving_door__1.geometry}
                                material={materials['+FINITION']}
                            />
                            <mesh
                                geometry={nodes.Moving_door__2.geometry}
                                material={materials['+GLASS']}
                            />
                            <mesh
                                castShadow
                                geometry={nodes.Moving_door__3.geometry}
                                material={protectionMaterial}
                            />
                        </group>
                    </AnimatedDoor>

                    <group>
                        <mesh
                            castShadow
                            geometry={nodes.PLPIF_1200X2000_2.geometry}
                            material={materials['+FINITION']}
                        />
                        <mesh
                            castShadow
                            geometry={nodes.PLPIF_1200X2000_3.geometry}
                            material={protectionMaterial}
                        />
                        <mesh
                            geometry={nodes.PLPIF_1200X2000_4.geometry}
                            material={materials['+GLASS']}
                        />
                    </group>

                </>
            )}

            {(paroi === 'PL PIF' && montage === 'angle') && (
                <>
                    <AnimatedDoor
                        rotation={[0, 0, 0]}
                        pivot={[-0.94, 0.655, -1.668]}
                        // offset={[-0.86, 0.005, 0.95]}
                        openAngle={-Math.PI / 7}
                    >
                        <group
                            position={[0, 0, 0]}
                        // rotation={[-1.567, 0, -Math.PI]}
                        >
                            {/* <group position={[-0.94, 0.655, -1.668]}> */}
                            <mesh
                                geometry={nodes.Door002_1.geometry}
                                material={materials['+GLASS']}
                            />
                            <mesh
                                geometry={nodes.Door002_2.geometry}
                                material={protectionMaterial}
                            />
                            <mesh
                                castShadow
                                geometry={nodes.Door002_3.geometry}
                                material={materials['+FINITION']}
                            />
                        </group>
                    </AnimatedDoor>
                    <group position={[-0.883, -0.186, -1.678]}>
                        <mesh
                            castShadow
                            geometry={nodes['PLPIF_1200X2000_+_PLTWU_900x2000_2'].geometry}
                            material={materials['+FINITION']}
                        />
                        <mesh
                            castShadow
                            geometry={nodes['PLPIF_1200X2000_+_PLTWU_900x2000_3'].geometry}
                            material={protectionMaterial}
                        />
                        <mesh
                            geometry={nodes['PLPIF_1200X2000_+_PLTWU_900x2000_4'].geometry}
                            material={materials['+GLASS']}
                        />
                    </group>
                </>
            )}

            {(paroi === 'PL PIV' && montage === 'niche') && (
                <>
                    <group position={[-1.424, 0.689, -1.666]}
                        rotation={[1.575, 0, -1.571]}>
                        <mesh
                            castShadow
                            geometry={nodes.PLPIV_1000x2000001_1.geometry}
                            material={materials['+FINITION']}
                        />
                        <mesh
                            castShadow
                            geometry={nodes.PLPIV_1000x2000001_2.geometry}
                            material={protectionMaterial}
                        />
                    </group>

                    <AnimatedDoor
                        rotation={[0, 0, 0]}
                        pivot={[-1.394, 0.691, -1.665]}
                        // offset={[-0.86, 0.005, 0.95]}
                        openAngle={-Math.PI / 7}
                    >
                        <group
                            position={[0, 0, 0]}
                            rotation={[-1.567, 0, -Math.PI]}
                        >

                            {/* <group position={[-1.394, 0.691, -1.665]} rotation={[-1.567, 0, -Math.PI]}> */}
                            <mesh
                                geometry={nodes.Moving_door001_1.geometry}
                                material={materials['+GLASS']}
                            />
                            <mesh
                                castShadow
                                geometry={nodes.Moving_door001_2.geometry}
                                material={materials['+FINITION']}
                            />
                            <mesh
                                castShadow
                                geometry={nodes.Moving_door001_3.geometry}
                                material={protectionMaterial}
                            />
                        </group>
                    </AnimatedDoor>
                </>
            )}

            {(paroi === 'PL PIV' && montage === 'angle') && (
                <>
                    {/* <group position={[-1.391, 0.687, -1.652]} rotation={[1.575, 0, -Math.PI / 2]}>
                        <mesh
                            castShadow
                            geometry={nodes.Moving_door_1.geometry}
                            material={materials['+FINITION']}
                        />
                        <mesh
                            geometry={nodes.Moving_door_2.geometry}
                            material={materials['+GLASS']}
                        />
                    </group> */}

                    <AnimatedDoor
                        rotation={[-3.137, Math.PI / 2, 0]}
                        pivot={[-1.38, 1.681, -1.65]}
                        offset={[-0.86, 0.005, 0.95]}
                        openAngle={Math.PI / 7}
                    >
                        <group
                            // position={[-0.447, 1.681, -2.517]}
                            // rotation={[-3.137, Math.PI / 2, 0]}
                            position={[0, 0, 0]}
                            rotation={[0, 0, 0]}
                        >

                            <mesh
                                geometry={nodes['PLPIV_1000x2000_+_PLTWU_900x2000001_1'].geometry}
                                material={materials['+ PROTECTION']}
                            />

                            <mesh
                                geometry={nodes['PLPIV_1000x2000_+_PLTWU_900x2000001_2'].geometry}
                                material={materials['+FINITION']}
                            />

                            <mesh
                                geometry={nodes['PLPIV_1000x2000_+_PLTWU_900x2000001_3'].geometry}
                                material={materials['+GLASS']}
                            />
                        </group>
                    </AnimatedDoor>

                    <group position={[-0.447, 1.681, -2.517]} rotation={[-3.137, Math.PI / 2, 0]}>
                        <mesh
                            castShadow
                            geometry={nodes['PLPIV_1000x2000_+_PLTWU_900x2000002_2'].geometry}
                            material={protectionMaterial}
                        />
                        <mesh
                            castShadow
                            geometry={nodes['PLPIV_1000x2000_+_PLTWU_900x2000002_1'].geometry}
                            material={materials['+FINITION']}
                        />
                        <mesh
                            geometry={nodes['PLPIV_1000x2000_+_PLTWU_900x2000002_3'].geometry}
                            material={materials['+GLASS']}
                        />
                    </group>
                </>
            )}

            {(paroi === 'PL TWU') && (
                <>
                    <group position={[-1.41, -0.333, -1.669]} rotation={[1.567, 0, Math.PI / 2]}>
                        <mesh

                            geometry={nodes.PLTWU_1000x2000_1.geometry}
                            material={materials['+ PROTECTION']}
                        />
                        <mesh
                            castShadow
                            geometry={nodes.PLTWU_1000x2000_2.geometry}
                            material={materials['+FINITION']}
                        />
                        <mesh
                            geometry={nodes.PLTWU_1000x2000_3.geometry}
                            material={materials['+GLASS']}
                        />
                    </group>
                </>
            )}

            {(paroi === 'PL WRU') && (
                <>
                    <group >
                        <mesh

                            geometry={nodes.PLWRU_1000X2000_1.geometry}
                            material={materials['+GLASS']}
                            position={[-1.087, 1.674, -1.657]}
                            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                        />
                        <mesh
                            castShadow
                            geometry={nodes.PLWRU_1000X2000001.geometry}
                            material={materials['+FINITION']}
                            position={[-1.321, 1.674, -1.657]}
                            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                        />
                        <mesh
                            geometry={nodes.PLWRU_1000X2000002.geometry}
                            material={materials['+ PROTECTION']}
                            position={[-1.321, 1.674, -1.657]}
                            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                        />
                    </group>
                </>
            )}

            {(paroi === 'PL WRU' && verre === 'CR') && (
                <mesh
                    geometry={nodes.Serigraphie_Chevrons_arondie.geometry}
                    material={materials['Serigraphie Shevrons arrondi']}
                    position={[-0.237, 0.677, -1.665]}
                    scale={[0.317, 0.33, 0.094]}
                />
            )}

            {(paroi === 'PL TWU' && verre === 'MP') && (
                <>
                    <mesh
                        geometry={nodes.Serigraphie_Chevrons_carrée.geometry}
                        material={materials['Serigraphie Shevrons']}
                        position={[-0.955, 0.682, -1.67]}
                    />
                </>
            )}

            {(paroi === 'PL TWU' && verre === 'GP') && (
                <>
                    <mesh
                        geometry={nodes.Serigraphie_Geometrie_carré.geometry}
                        material={materials['Serigraphie Geometrie.001']}
                        position={[-0.955, 0.682, -1.66]}
                    />
                </>
            )}
            <mesh
                geometry={nodes.Shower_system_1.geometry}
                material={materials['+PLASTIC BLACK']}
            />
            <mesh
                castShadow
                geometry={nodes.Shower_system_2.geometry}
                material={materials['+FINITION']}
            />
            <mesh
                castShadow
                geometry={nodes.Towel_rack_1.geometry}
                material={materials['+FINITION']}
            />
            <group position={[0.335, 1.022, -2.483]} >
                <mesh

                    geometry={nodes.towel002_1.geometry}
                    material={materials['+TOWEL-LINE']}
                />
                <mesh
                    castShadow
                    geometry={nodes.towel002_2.geometry}
                    material={materials['+TOWEL']}
                />
            </group>
            <group position={[0.502, 0.869, -2.42]}
                rotation={[3.022, 0, 0]}
                scale={[-0.995, -1, -1]}>
                <mesh
                    geometry={nodes.towel002_1.geometry}
                    material={materials['+TOWEL-LINE']}
                />
                <mesh
                    castShadow
                    geometry={nodes.towel002_2.geometry}
                    material={materials['+TOWEL']}
                />
            </group>
        </group>
    )
}

useGLTF.preload('./models/PAROIS_compressed.glb')
