import { useEffect, useLayoutEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

import { useShallow } from 'zustand/react/shallow'

import useConfiguratorStore from '../store/useConfiguratorStore';
import { FINITION_ASSETS } from '../conf/lib'

export default function Model(props) {
    const { nodes, materials } = useGLTF('./models/PAROIS_compressed.glb')
    const invalidate = useThree((state) => state.invalidate)

    const protectionMaterial = useMemo(
        () => new THREE.MeshStandardMaterial({
            name: '+ PROTECTION (web)',
            color: '#ffffff',
            roughness: 0,
            metalness: 0,
            transparent: true,
            opacity: 0.3,
            depthWrite: false,
            side: THREE.DoubleSide,
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

            {(paroi === 'PL CLS' && montage === 'niche') && (
                <>
                    <group position={[-0.668, 0.755, -1.721]}>
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
                    <group position={[-0.673, 0.749, -1.705]}>
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
                    <group >
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
                    <group position={[-0.94, 0.655, -1.668]}>
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

                    <group position={[-1.394, 0.691, -1.665]} rotation={[-1.567, 0, -Math.PI]}>
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
                    <group position={[-0.447, 1.681, -2.517]} rotation={[-3.137, Math.PI / 2, 0]}>

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
                            geometry={nodes.PLTWU_1000x2000_2.geometry}
                            material={protectionMaterial}
                        />
                        <mesh
                            castShadow
                            geometry={nodes.PLTWU_1000x2000_3.geometry}
                            material={materials['+FINITION']}
                        />
                        <mesh
                            geometry={nodes.PLTWU_1000x2000_4.geometry}
                            material={materials['+GLASS']}
                        />
                    </group>
                </>
            )}

            {(paroi === 'PL WRU') && (
                <>
                    <group position={[-1.321, 1.674, -1.657]} rotation={[Math.PI / 2, 0, -Math.PI / 2]}>
                        <mesh
                            castShadow
                            geometry={nodes.PLWRU_1000X2000_2.geometry}
                            material={materials['+FINITION']}
                        />
                        <mesh
                            geometry={nodes.PLWRU_1000X2000_3.geometry}
                            material={materials['+GLASS']}
                        />
                        <mesh
                            geometry={nodes.PLWRU_1000X2000_4.geometry}
                            material={protectionMaterial}
                        />
                    </group>
                </>
            )}

            {(paroi === 'PL WRU' && verre === 'CR') && (
                <mesh
                    geometry={nodes.Serigraphie_Chevrons_arondie.geometry}
                    material={materials['Serigraphie Shevrons arrondi']}
                    position={[-0.464, 0.677, -1.665]}
                    scale={[0.317, 0.33, 0.094]}
                />
            )}

            {/* <mesh
                geometry={nodes.Serigraphie_Geometrie_arondie.geometry}
                material={materials['Serigraphie Geometrie arrondie']}
                position={[-0.464, 0.677, -1.665]}
                scale={[0.317, 0.33, 0.094]}
            /> */}

            {(paroi === 'PL TWU' && verre === 'MP') && (
                <>
                    <mesh
                        geometry={nodes.Serigraphie_Chevrons_carrée.geometry}
                        material={materials['Serigraphie Shevrons']}
                        position={[-0.948, 0.682, -1.67]}
                    />
                </>
            )}

            {(paroi === 'PL TWU' && verre === 'GP') && (
                <>
                    <mesh
                        geometry={nodes.Serigraphie_Geometrie_carré.geometry}
                        material={materials['Serigraphie Geometrie.001']}
                        position={[-0.948, 0.682, -1.66]}
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
