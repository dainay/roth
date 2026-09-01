import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useShallow } from 'zustand/react/shallow'

import useConfiguratorStore from '../store/useConfiguratorStore';
import DynamicTextureMaterial from './DynamicTextureMaterial'
import { RECEVEUR_ASSETS } from '../conf/lib'

export default function Model(props) {
    const { nodes, materials } = useGLTF('./models/RECEVEURS_compressed.glb')

    const {
        sizeReceveur,
        textureReceveur,

    } = useConfiguratorStore(
        useShallow((state) => ({
            sizeReceveur: state.selection.sizeReceveur,
            textureReceveur: state.selection.textureReceveur
        }))
    );

    // console.log('Model Receveurs:', sizeReceveur, receveur, textureReceveur);

    const receveur1000 = useMemo(() => {
        const geometry = nodes.Natura_1000x900_1.geometry.clone()
        const uv = geometry.attributes.uv

        for (let i = 0; i < uv.count; i++) {
            uv.setY(i, uv.getY(i) * 0.5)
        }

        uv.needsUpdate = true

        return geometry
    }, [nodes])



    const receveur1200 = useMemo(() => {
        const geometry = nodes.Natura_1200x900_1.geometry.clone()
        const uv = geometry.attributes.uv

        for (let i = 0; i < uv.count; i++) {
            uv.setY(i, uv.getY(i) * 0.55)
        }

        uv.needsUpdate = true

        return geometry
    }, [nodes])

    return (
        <group {...props} dispose={null}>
            <DynamicTextureMaterial
                url={RECEVEUR_ASSETS[textureReceveur].img}
                material={materials['+RECEVEUR']}
                roughness={0.9}
                metalness={0}
            />
            <mesh
                receiveShadow
                geometry={nodes.Cube001.geometry}
                material={materials['+White-Wood']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube003.geometry}
                material={materials['+RECEVEUR']}
            />
            <mesh
                receiveShadow
                geometry={nodes.Cube004.geometry}
                material={materials['+White-Wood']}
            />
            <mesh
                geometry={nodes.Cube005.geometry}
                material={materials['+PLASTIC BLACK']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube006.geometry}
                material={materials['Light Onyx Marble']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pot.geometry}
                material={materials['+BROWB GLASS']}
            />
            <mesh
                position={[-0.01, -0.003, 0.028]}
                receiveShadow
                geometry={nodes.Soaps.geometry}
                material={materials['+SOAP']}
            />
            <group position={[-1.712, 0.173, -0.355]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Towel001_1.geometry}
                    material={materials['+TOWEL-futniture']}
                />
                <mesh

                    receiveShadow
                    geometry={nodes.Towel001_2.geometry}
                    material={materials['+TOWEL-LINE']}
                />
            </group>
            <mesh
                castShadow

                geometry={nodes.Aroma_1.geometry}
                material={materials['+BROWB GLASS']}
            />
            <mesh
                castShadow
                geometry={nodes.Aroma_2.geometry}
                material={materials['+BROWN']}
            />
            <mesh
                receiveShadow
                geometry={nodes.Aroma_3.geometry}
                material={materials['white ncj1n .001']}
            />
            <mesh
                geometry={nodes.Aroma_4.geometry}
                material={materials['+PLASTIC BLACK']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Sink_1.geometry}
                material={materials['+White Marbre']}
            />
            <mesh
                geometry={nodes.Sink_2.geometry}
                material={materials['+FINITION']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Decoration_vases_with_pampas001.geometry}
                material={materials['+BROWB GLASS']}
                position={[-0.04, 0, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.pampas_twigs001.geometry}
                    material={materials['+PLUME']}
                    position={[-1.683, 0.666, -1.291]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.pampas_twigs002.geometry}
                    material={materials['+PLUME']}
                    position={[-1.683, 0.671, -1.366]}
                    rotation={[0, 0, -Math.PI]}
                    scale={[-1, -1, -0.794]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.pampas_twigs003.geometry}
                    material={materials['+PLUME']}
                    position={[-1.682, 0.683, -1.335]}
                    rotation={[0.272, 0, -Math.PI]}
                    scale={[-1, -1.224, -0.81]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.pampas_twigs004.geometry}
                    material={materials['+PLUME']}
                    position={[-1.705, 0.678, -1.366]}
                    rotation={[0, 0, -Math.PI]}
                    scale={[-0.737, -1.187, -0.784]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.pampas_twigs005.geometry}
                    material={materials['+PLUME']}
                    position={[-1.743, 0.664, -1.291]}
                    rotation={[0, 0, 0.419]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.pampas_twigs006.geometry}
                    material={materials['+PLUME']}
                    position={[-1.737, 0.698, -1.341]}
                    rotation={[-0.377, 0, 0.419]}
                    scale={[1.095, 1.452, 1.074]}
                />
            </mesh>
            {/* <mesh
                castShadow
                geometry={nodes.Perfume_Botle_2.geometry}
                material={materials['+GLASS']}
            /> */}
            {/* <mesh

                geometry={nodes.Perfume_Botle_3.geometry}
                material={materials['+LIQUID']}
            /> */}
            {/* <mesh
                castShadow
                receiveShadow
                geometry={nodes.Perfume_Botle_4.geometry}
                material={materials['+Plastic-Rose']}
            /> */}
            {(sizeReceveur === 1000 &&
                <mesh
                    receiveShadow
                    geometry={receveur1000}
                    material={materials['+RECEVEUR']}
                    position={[-0.258, 0, 0]}
                    scale={[0.807, 1, 1]}
                />
            )}
            {(sizeReceveur === 1200 &&
                <mesh
                    receiveShadow
                    geometry={receveur1200}
                    material={materials['+RECEVEUR']}
                    position={[-0.02, 0, 0.005]}
                    scale={[0.968, 1, 1]}
                />)}
            {(sizeReceveur === 1600 &&
                <mesh
                    receiveShadow
                    geometry={nodes.Natura_1600x900_1.geometry}
                    material={materials['+RECEVEUR']}
                    position={[-1.076, -0.324, -2.086]}
                    scale={[1.143, 1, 1]}
                />)}
            {(sizeReceveur === 1400 &&
                <group position={[-1.117, -0.324, -2.086]}>
                    <mesh
                        receiveShadow
                        geometry={nodes.Mesh014.geometry}
                        material={materials['+RECEVEUR']}
                    />
                </group>
            )}
        </group>
    )
}

useGLTF.preload('./models/RECEVEURS_compressed.glb')
