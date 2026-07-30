import * as THREE from "three";
import {ContactShadows, Environment, useHelper, Lightformer, TransformControls, AccumulativeShadows, RandomizedLight  } from "@react-three/drei";
import { useRef } from "react";



export default function Lighting() {
    const pointLightRef = useRef();
    useHelper(pointLightRef, THREE.PointLightHelper, 0.1, "#ffffff");
    const lightformerRef = useRef()

    return (
        <>

            {/* <ambientLight intensity={0.8}
        color = {new THREE.Color("#d3c093")}
         /> */}

        
          
            <directionalLight
                position={[2, 1, 2]}
                intensity={0.5}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-left={-3}
                shadow-camera-right={3}
                shadow-camera-top={3}
                shadow-camera-bottom={-3}
                shadow-camera-near={0.5}
                shadow-camera-far={30}
                shadow-bias={-0.0001}
                shadow-normalBias={0.05}
                shadow-radius={4}
                color={new THREE.Color("#cfaf62")}
            />

            <pointLight
                position={[-1.78,1.2,0.15]}
                intensity={0.7}
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
                position={[-1,2.1,-2]}
                intensity={0.6}
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



            {/* <Environment
            background={true}
            backgroundBlurriness={0}
                backgroundRotation={[Math.PI / 4, Math.PI / 7, 0]}
                files="./textures/studio.hdr"


                preset="apartment"
                environmentIntensity={0.5}
                environmentBlur={2}
                environmentRotation={[Math.PI / 4, Math.PI / 7, 0]}
            /> */}


             

              <Environment 
                preset="apartment"
                environmentIntensity={0.07}
                environmentBlur={1}
                  backgroundBlurriness={1}
                >
                  
                    <Lightformer
                        
                        form="circle"
                        intensity={11}
                        position={[-4, -0.5, 5]}
                        rotation={[0, Math.PI, 0]}
                        scale={[10, 2, 2]}
                        color="#ffccaa"
                    />
 
                <Lightformer
                    form="ring"
                    intensity={10}
                    position={[4, 0, 6]}
                    rotation={[0, Math.PI , 0]}
                    scale={[5, 2, 3]}
                    color="#fdd5a8"
                />
 
           
                </Environment>
        </>
    );
}