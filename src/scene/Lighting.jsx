import * as THREE from "three";
import { ContactShadows, Environment, Lightformer, TransformControls, AccumulativeShadows, RandomizedLight,   useHelper } from "@react-three/drei";
import { useRef } from "react";

import { RectAreaLightHelper } from
  "three/addons/helpers/RectAreaLightHelper.js";

import useSceneStore from "../store/useSceneStore";

const lightingSchemas = [
    {
        id: 'evening',
        label: 'Warm evening',
        dIntensity: 0.5,
        dColor: '#cfaf62',
        dPosition: [2, 1, 2],
        lfColor: '#ffccaa',
        lfIntensity: 11,
        lfScale: [10, 2, 2],
    },
    {
        id: 'daylight',
        label: 'Natural daylight',
        dIntensity: 1.5,
        dColor: '#f8f0e0',
        dPosition: [6, 5, 4],
        lfColor: '#fff4ee',
        lfIntensity: 11,
        lfScale: [10, 5, 2],
    },
    {
        id: 'showroom',
        label: 'Cool showroom',
        dIntensity: 0.9,
        dColor: '#dcecff',
        dPosition: [-2, 4, 3],
        lfColor: '#ffccaa',
        lfIntensity: 11,
        lfScale: [2, 10, 2],
    },
]

export default function Lighting() {
    const mirrorLight = useSceneStore((state) => state.mirrorLight);

    const blueRectLightRef = useRef();

useHelper(
  blueRectLightRef,
  RectAreaLightHelper,
  "#f5dc97"
);

    const lightingType = useSceneStore((state) => state.lighingType);

    return (
        <>
            {/* <ambientLight intensity={0.8}
        color = {new THREE.Color("#d3c093")}
         /> */}

            <directionalLight
                position={lightingSchemas[lightingType].dPosition}
                intensity={lightingSchemas[lightingType].dIntensity}
                castShadow
                shadow-mapSize-width={512}
                shadow-mapSize-height={512}
                shadow-camera-left={-3}
                shadow-camera-right={3}
                shadow-camera-top={3}
                shadow-camera-bottom={-3}
                shadow-camera-near={0.1}
                shadow-camera-far={15}
                shadow-bias={0.001}
                shadow-normalBias={0.03}
                shadow-radius={4}
                color={new THREE.Color(lightingSchemas[lightingType].dColor)}
            />


            <rectAreaLight
                color="#ffd9a3"
                intensity={2}
                width={1.3}
                height={0.2}
                position={[-1.95, 0, -0.7]}
                rotation={[0, -Math.PI * 0.5, 0]}
            />

            <rectAreaLight
                ref={blueRectLightRef}
                color="#d6b385"
                intensity={50}
                width={0.87}
                height={0.01}
                position={[-0.83, 1.201, -2.605]}
                rotation={[-Math.PI /2, 0, 0]}
            />
 

            <pointLight
                position={[-1.78, 1.2, 0.15]}
                intensity={mirrorLight ? 0.7 : 0}
                distance={4}
                decay={1}
                // castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-radius={10}
                shadow-bias={-0.0001}
                shadow-normalBias={0.005}
                color={new THREE.Color("#fce7b8")}
            />

            <pointLight
                position={[-1, 2.1, -2]}
                intensity={0.6}
                distance={4}
                decay={1}
                color={new THREE.Color("#fce7b8")}
            />

            <Environment
                resolution={16}
                preset="apartment"
                environmentIntensity={0.07}

            >
                <Lightformer

                    form="circle"
                    intensity={lightingSchemas[lightingType].lfIntensity}
                    position={[4, 0, 5]}
                    rotation={[0, Math.PI, 0]}
                    scale={lightingSchemas[lightingType].lfScale}
                    color={lightingSchemas[lightingType].lfColor}
                />
                {/* window */}
                <Lightformer
                    form="rect"
                    intensity={30}
                    position={[-4, 0, 6]}
                    target={[0, 0, 0]}
                    scale={[1, 1]}
                    color="#fff4e8"
                />

                <Lightformer
                    form="ring"
                    intensity={10}
                    position={[6, -0.5, -6]}
                    target={[0, 0, 2]}
                    scale={[2, 2]}
                    color="#967d62"
                />
            </Environment>
        </>
    );
}