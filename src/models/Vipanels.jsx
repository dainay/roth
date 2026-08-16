import { useState, useMemo } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useShallow } from 'zustand/react/shallow'

import useConfiguratorStore from '../store/useConfiguratorStore';
import DynamicTextureMaterial from './DynamicTextureMaterial'
import { FINITION_VIPANELS } from '../conf/lib'
import Evipanel from './Evipanel'
import { getPhotoUrl } from '../helpers/getPhotoUrl'

export default function Model(props) {
    const { nodes, materials } = useGLTF('./models/VIPANELS_compressed.glb')

    const gradientTexture = useTexture('./img/evipanel.webp');

    const [meshHover, setMeshHover] = useState(false)
    const [htmlHover, setHtmlHover] = useState(false)

    const heating = meshHover || htmlHover

    // console.log('heating: ', heating, 'meshHover: ', meshHover, 'htmlHover: ', htmlHover)

    const {
        cleanedData,
        sizeReceveur,
        niche,
        vipanelLeft,
        vipanelRight,
        vipanelNiche,
        montage
    } = useConfiguratorStore(
        useShallow((state) => ({
            cleanedData: state.cleanedData,
            sizeReceveur: state.selection.sizeReceveur,
            niche: state.selection.niche,
            vipanelLeft: state.selection.vipanelLeft,
            vipanelRight: state.selection.vipanelRight,
            vipanelNiche: state.selection.vipanelNiche,
            montage: state.selection.montage
        }))
    );


    // // console.log('sizeReceveur Vipanels: ', sizeReceveur)

    const choosenVipanelLLeft = cleanedData?.vipanels?.find((item) => item.decor === vipanelLeft)
    const choosenVipanelRight = cleanedData?.vipanels?.find((item) => item.decor === vipanelRight)
    const choosenVipanelNiche = cleanedData?.vipanels?.find((item) => item.decor === vipanelNiche)


    const vipanelCoverGeometry = useMemo(() => {
        const geometry = nodes.vipanel_1500x2550x3016.geometry.clone()
        const uv = geometry.attributes.uv

        for (let i = 0; i < uv.count; i++) {
            uv.setX(i, uv.getX(i) * 0.9)
        }

        uv.needsUpdate = true

        return geometry
    }, [nodes])

    const vipanelRight1Geometry = useMemo(() => {
        const geometry = nodes.vipanel_1500x2550x3011.geometry.clone()
        const uv = geometry.attributes.uv

        for (let i = 0; i < uv.count; i++) {
            uv.setX(i, uv.getX(i) * 0.6)
        }

        uv.needsUpdate = true

        return geometry
    }, [nodes])

    const vipanelRight2Geometry = useMemo(() => {
        const geometry = nodes.vipanel_1500x2550x3010.geometry.clone()
        const uv = geometry.attributes.uv

        for (let i = 0; i < uv.count; i++) {
            uv.setX(i, uv.getX(i) * 0.8)
        }

        uv.needsUpdate = true

        return geometry
    }, [nodes])

    return (
        <group {...props} dispose={null}>
            {choosenVipanelLLeft && (
                <DynamicTextureMaterial
                    url={getPhotoUrl(choosenVipanelLLeft.files?.['1500x2550'])}
                    material={materials['VIPANEL-1500x2550-left']}
                    repeatX={1}
                    repeatY={1}
                    roughness={FINITION_VIPANELS[choosenVipanelLLeft.finition]?.roughness}
                    metalness={FINITION_VIPANELS[choosenVipanelLLeft.finition]?.metalness}
                />
            )}

            {choosenVipanelRight && (
                <DynamicTextureMaterial
                    url={getPhotoUrl(choosenVipanelRight.files?.['1500x2550'])}
                    material={materials['VIPANEL-1500x2550-right']}
                    repeatX={1}
                    repeatY={1}
                    roughness={FINITION_VIPANELS[choosenVipanelRight.finition]?.roughness}
                    metalness={FINITION_VIPANELS[choosenVipanelRight.finition]?.metalness}
                />
            )}

            {choosenVipanelNiche && (
                <DynamicTextureMaterial
                    url={getPhotoUrl(choosenVipanelNiche.files?.['1500x2550'])}
                    material={materials['VIPANEL-1500x2550-niche']}
                    repeatX={1}
                    repeatY={1}
                    roughness={FINITION_VIPANELS[choosenVipanelNiche.finition]?.roughness}
                    metalness={FINITION_VIPANELS[choosenVipanelNiche.finition]?.metalness}
                />
            )}

            {(montage === 'niche' &&
                <group position={sizeReceveur === 1000 ? [-0.159, 0, 0] : [0, 0, 0]}>
                    <mesh
                        geometry={nodes.Niche.geometry}
                        material={nodes.Niche.material}
                        position={[-0.242, 0.922, -2.555]}
                        scale={[3.705, 1, 0.2]}
                    />

                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.vipanel_1500x2550x3012.geometry}
                        material={materials['VIPANEL-1500x2550-right']}
                        position={[-0.055, 0.917, -2.06]}
                        rotation={[0, Math.PI / 2, 0]}
                    />

                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.vipanel_1500x2550x3013.geometry}
                        material={materials['VIPANEL-1500x2550-niche']}
                        position={[-0.242, 0.917, -2.058]}
                        rotation={[0, -Math.PI / 2, 0]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.vipanel_1500x2550x3014.geometry}
                        material={materials['VIPANEL-1500x2550-right']}
                        position={[-0.138, 0.91, -1.558]}
                    />
                </group>
            )}

            {/* <mesh
                castShadow
                receiveShadow
                geometry={nodes.tryptich.geometry}
                material={materials.TRYPTICH}
                position={[-1.926, 0.941, -1.6]}
                rotation={[0, Math.PI / 2, 0]}
                scale={[5, 1, 1]}
            /> */}
            {/* <mesh
                castShadow
                receiveShadow
                geometry={nodes.tryptich001.geometry}
                material={materials.TRYPTICH}
                position={[-1.197, 0.941, -2.553]}
                scale={[5, 1, 1]}
            /> */}

            {(sizeReceveur === 1000 &&
                <mesh

                    receiveShadow
                    geometry={vipanelCoverGeometry}
                    material={materials['VIPANEL-1500x2550-right']}
                    position={[-0.22, 0.917, -2.552]}
                    scale={[1, 1, 0.001]}
                />
            )}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.vipanel_1500x2550x3002.geometry}
                material={materials['VIPANEL-1500x2550-left']}
                position={[-1.944, 0.9169, 0.6]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.vipanel_1500x2550x3004.geometry}
                material={materials['VIPANEL-1500x2550-left']}
                position={[-1.943, 0.917, -0.806]}
                rotation={[0, Math.PI / 2, 0]}
                scale={[1, 1, 0.1]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.vipanel_1500x2550x3005.geometry}
                material={materials['VIPANEL-1500x2550-left']}
                position={[-2.199, 0.917, -1.558]}
                scale={[1, 1, 0.1]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.vipanel_1500x2550x3001.geometry}
                material={materials['VIPANEL-1500x2550-niche']}
                position={[-1.446, 0.917, -2.311]}
            />
            {(!niche || sizeReceveur === 1000) && (
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.vipanel_1500x2550x30081.geometry}
                    material={materials['VIPANEL-1500x2550-niche']}
                    position={[-0.81, 0.916, -2.554]}
                    scale={[1, 1, 0.1]}
                />
            )}
            {(niche && sizeReceveur !== 1000 &&
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.vipanel_1500x2550x30082.geometry}
                    material={materials['VIPANEL-1500x2550-niche']}
                    position={[-0.809, 0.916, -2.554]}
                    scale={[1, 1, 0.1]}
                />)}
            <mesh
                castShadow
                receiveShadow
                geometry={vipanelRight2Geometry}
                material={materials['VIPANEL-1500x2550-right']}
                position={[1.69, 0.917, -2.554]}
                scale={[1, 1, 0.1]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={vipanelRight1Geometry}
                material={materials['VIPANEL-1500x2550-right']}
                position={[0.44, 0.917, -2.554]}
                onPointerEnter={() => setMeshHover(true)}
                onPointerLeave={() => setMeshHover(false)}
            >

              
                    <Evipanel gradientTexture={gradientTexture} geometry={vipanelRight1Geometry}
                     visible={heating}
                        onPointerEnter={() => setHtmlHover(true)}
                        onPointerLeave={() => setHtmlHover(false)}
                    />
             

            </mesh>
        </group>
    )
}

useGLTF.preload('./models/VIPANELS_compressed.glb')
