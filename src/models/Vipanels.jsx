import { useState, useMemo, useEffect } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useShallow } from 'zustand/react/shallow'
import * as THREE from 'three'

import useConfiguratorStore from '../store/useConfiguratorStore';
import DynamicTextureMaterial from './DynamicTextureMaterial'
import { FINITION_VIPANELS } from '../conf/lib'
import Evipanel from './Evipanel'
import { getPhotoUrl } from '../helpers/getPhotoUrl'
import { useLayoutEffect } from 'react'
import optimizeMaterials from '../scene/optimizeMaterials'

import { IS_EXPO_MODE } from '../conf/appMode'

export default function Model(props) {
    const { nodes, materials } = useGLTF('./models/VIPANELS_compressed.glb')

    useLayoutEffect(() => {
        optimizeMaterials(materials)

    }, [materials])

    const gradientTexture = useTexture('./img/evipanel.webp');

    const [meshHover, setMeshHover] = useState(false)
    const [htmlHover, setHtmlHover] = useState(false)
    const [touchOpen, setTouchOpen] = useState(false)

    const heating = meshHover || htmlHover || touchOpen

    const handleMeshEnter = (event) => {
        if (event.pointerType === 'mouse') {
            setMeshHover(true)
        }
    }

    const handleMeshLeave = (event) => {
        if (event.pointerType === 'mouse') {
            setMeshHover(false)
        }
    }

    const handleMeshPointerDown = (event) => {
        event.stopPropagation()

        if (event.pointerType !== 'mouse') {
            setTouchOpen((current) => !current)
        }
    }

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

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                closeEvipanel()
            }
        }

        window.addEventListener('blur', closeEvipanel)
        document.addEventListener(
            'visibilitychange',
            handleVisibilityChange
        )

        return () => {
            window.removeEventListener('blur', closeEvipanel)
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange
            )
        }
    }, [])


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

    const eVipanelMaterial = useMemo(() => {
        const material =
            materials['VIPANEL-1500x2550-right'].clone()

        material.side = THREE.FrontSide

        return material
    }, [materials])

    const closeEvipanel = () => {
        setMeshHover(false)
        setHtmlHover(false)
        setTouchOpen(false)
    }

      const MAX_WIDTH = IS_EXPO_MODE ? 1027 : 768
        const MAX_HEIGHT = IS_EXPO_MODE ? 1280 : 1024

    return (
        <group {...props} dispose={null}>
            {choosenVipanelLLeft && (
                <DynamicTextureMaterial
                    url={getPhotoUrl(choosenVipanelLLeft.files?.['1500x2550'])}
                    material={materials['VIPANEL-1500x2550-left']}
                    roughness={FINITION_VIPANELS[choosenVipanelLLeft.finition]?.roughness}
                    metalness={FINITION_VIPANELS[choosenVipanelLLeft.finition]?.metalness}
                    maxWidth = {MAX_WIDTH}
                    maxHeight = {MAX_HEIGHT}
                />
            )}
            {choosenVipanelRight && (
                <>
                    <DynamicTextureMaterial
                        url={getPhotoUrl(choosenVipanelRight.files?.['1500x2550'])}
                        material={materials['VIPANEL-1500x2550-right']}
                        roughness={FINITION_VIPANELS[choosenVipanelRight.finition]?.roughness}
                        metalness={FINITION_VIPANELS[choosenVipanelRight.finition]?.metalness}
                        maxWidth = {MAX_WIDTH}
                        maxHeight = {MAX_HEIGHT}
                    />
                    <DynamicTextureMaterial
                        url={getPhotoUrl(choosenVipanelRight.files?.['1000x2550'])}
                        material={eVipanelMaterial}
                        roughness={FINITION_VIPANELS[choosenVipanelRight.finition]?.roughness}
                        metalness={FINITION_VIPANELS[choosenVipanelRight.finition]?.metalness}
                            maxWidth = {MAX_WIDTH}
                        maxHeight = {MAX_HEIGHT}
                    />
                </>
            )}

            {choosenVipanelNiche && (

                <DynamicTextureMaterial
                    url={getPhotoUrl(choosenVipanelNiche.files?.['1500x2550'])}
                    material={materials['VIPANEL-1500x2550-niche']}
                    roughness={FINITION_VIPANELS[choosenVipanelNiche.finition]?.roughness}
                    metalness={FINITION_VIPANELS[choosenVipanelNiche.finition]?.metalness}
                        maxWidth = {MAX_WIDTH}
                        maxHeight = {MAX_HEIGHT}
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
                geometry={nodes.vipanel_1500x2550x3011.geometry}
                material={eVipanelMaterial}
                position={[0.44, 0.917, -2.554]}
                onPointerEnter={handleMeshEnter}
                onPointerLeave={handleMeshLeave}
                onPointerDown={handleMeshPointerDown}
                onPointerCancel={closeEvipanel}
                onPointerMissed={closeEvipanel}
            >


                <Evipanel
                    gradientTexture={gradientTexture}
                    geometry={vipanelRight1Geometry}
                    visible={heating}
                    onHtmlEnter={() => setHtmlHover(true)}
                    onHtmlLeave={() => setHtmlHover(false)}
                />


            </mesh>
        </group>
    )
}

useGLTF.preload('./models/VIPANELS_compressed.glb')
