import React, { useRef, useLayoutEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useShallow } from 'zustand/shallow'

import useConfiguratorStore from '../store/useConfiguratorStore';
import { PROFILE_ASSETS } from '../conf/lib'

export default function Model(props) {
    const { nodes, materials } = useGLTF('./models/PROFILES_compressed.glb')

    const {
        finitionProfile,
        montage,
        sizeReceveur,
    } = useConfiguratorStore(
        useShallow((state) => ({
            finitionProfile: state.selection.finitionProfile,
            montage: state.selection.montage,
            sizeReceveur: state.selection.sizeReceveur,
        }))
    );

    useLayoutEffect(() => {
        const mFinition = materials['+PROFILE']
        const finitionData = PROFILE_ASSETS[finitionProfile]
        // console.log('FINITION DATA', finitionData)

        if (!mFinition || !finitionData) return

        mFinition.roughness = finitionData.roughness
        mFinition.metalness = finitionData.metalness
        mFinition.color.set(finitionData.color)

        mFinition.needsUpdate = true
    }, [materials, finitionProfile])


    return (
        <group {...props} dispose={null}>
            <mesh

                geometry={nodes.shower_profile_FIXED004.geometry}
                material={materials['+PROFILE']}
                position={[-1.412, 0, 0.064]}
            />
            {montage === 'niche' && (
                <group position={ sizeReceveur === 1000 ? [-0.159, 0, 0] : [0, 0, 0] }>
                    <mesh

                        geometry={nodes.shower_profile_FIXED001.geometry}
                        material={materials['+PROFILE']}
                        position={[-1.864, 0, -1.524]}
                        rotation={[0, -1.571, 0]}
                    />
                    <mesh

                        geometry={nodes.shower_profile_FIXED002.geometry}
                        material={materials['+PROFILE']}
                        position={[-0.022, 0.014, 0.063]}
                    />
                </ group>
            )}
        </group>
    )
}

useGLTF.preload('./models/PROFILES_compressed.glb')