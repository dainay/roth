import { useLayoutEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useShallow } from 'zustand/shallow'

import useConfiguratorStore from '../store/useConfiguratorStore';
import { NICHE_FINITION_ASSETS } from '../conf/lib';

export default function Model(props) {
    const { nodes, materials } = useGLTF('./models/NICHEPANEL_compressed.glb')
    const invalidate = useThree((state) => state.invalidate)

    const {
        finitionNiche,
        paroi
    } = useConfiguratorStore(
        useShallow((state) => ({

            finitionNiche: state.selection.finitionNiche,
            paroi: state.selection.paroi,
        }))
    );

    useLayoutEffect(() => {
        const mNiche = materials['+NICHE']
        const nicheData = NICHE_FINITION_ASSETS[finitionNiche] 
        if (!mNiche || !nicheData) return

        mNiche.color.set(nicheData.color)
        mNiche.metalness = 0.4
        mNiche.roughness = 0.5

        mNiche.needsUpdate = true
        invalidate()
    }, [materials, finitionNiche, invalidate])


    if ( finitionNiche === null || paroi === 'PL PIV') {
        return null
    } 

    return (
        <group {...props} dispose={null} 
        position={[0.00, -0.015, -0.01]}
        >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Niche_910x305x68.geometry}
                material={materials['+NICHE']}
                position={[-0.828, 1.069, -2.566]}
                scale={[0.441, 0.148, 0.035]}
            />
            <group position={[-0.997, 0.97, -2.574]}>
                <mesh
                    geometry={nodes.Niche_Bottles_1.geometry}
                    material={materials['+PLASTIC BLACK']}
                />
                <mesh
                    castShadow
                    geometry={nodes.Niche_Bottles_2.geometry}
                    material={materials['+BROWB GLASS']} 
                />
            </group>
            <group position={[-0.609, 0.981, -2.573]} rotation={[Math.PI, -1.38, Math.PI]}>
                <mesh
                    castShadow

                    geometry={nodes.Bath_soak_Cap001003_1.geometry}
                    material={materials['+GLASS.001']}
                />
                <mesh

                    geometry={nodes.Bath_soak_Cap001003_2.geometry}
                    material={materials['Bathroom_set_2_Label.001']}
                    position={[0, -0.005, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Bath_soak_Cap001003_3.geometry}
                    material={materials['+CEILING.001']}
                    position={[0, -0.005, 0]}
                />
            </group>

              <mesh
               
                geometry={nodes.Bottle_3004.geometry}
                material={materials['+GEL']}
                position={[-1.115, 0.992, -2.573]}
            />

            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Meraki_conditioner_Cap001002.geometry}
                material={materials['+GLASS.001']}
                 position={[-0.677, 0.984, -2.571]}
        rotation={[-Math.PI, -0.79, -Math.PI]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Soap001.geometry}
        material={materials['+SOAP']}
        position={[-0.856, 0.928, -2.579]}
        scale={0.744}
            />
        </group>
    )
}

useGLTF.preload('./models/NICHEPANEL_compressed.glb')
