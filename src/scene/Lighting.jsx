import * as THREE from "three";
import {Environment } from "@react-three/drei";


export default function Lighting() {
    return (
        <>

            <ambientLight intensity={0.2}
        color = {new THREE.Color("#d3c093")}
         />

            <directionalLight
                position={[10, 2, 10]}
                intensity={2}
                castShadow
                shadow-mapSize-width={512}
                shadow-mapSize-height={512}
                // shadow-camera-left={-8}
                // shadow-camera-right={8}
                // shadow-camera-top={8}
                // shadow-camera-bottom={-8}
                shadow-camera-near={0.5}
                shadow-camera-far={30}
                shadow-bias={-0.0001}
                shadow-normalBias={0.05}
                color={new THREE.Color("#ffe7ae")}
            />

            {/* <pointLight
                position={[-1, 9, 4.5]}
                intensity={30}
                distance={0}
                decay={2}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-radius={1}
                //   shadow-bias={-0.0001}
                shadow-normalBias={2}
                color={new THREE.Color("#e9e9e9")}
            /> */}

            {/* <pointLight
                position={[-4, 9, 4.5]}
                intensity={80}
                distance={0}
                decay={2}
                //   castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-radius={1}
                //   shadow-bias={-0.0001}
                shadow-normalBias={2}
                color={new THREE.Color("#e4d4b0")}
            /> */}

            <Environment
                preset="city"
                environmentIntensity={0.5}
                environmentBlur={2}
                // environmentRotation={[Math.PI / 2, Math.PI / 2, 0]}
            />
        </>
    );
}