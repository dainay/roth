import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import Bath from "./Bath";
import  Bath3  from "./Bath3";
import { CameraControls } from "@react-three/drei";
import { PointerLockControls } from "@react-three/drei";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

 


export default function Scene({ metalColor, vipanel }) {
  return (
    <Canvas
      camera={{ position: [-10, 4, 10], fov: 50 }}
      shadows={{
        type: THREE.PCFShadowMap,
      }}
        gl={{ antialias: true }}
    linear={false}
       
    >
      <color attach="background" args={["#1b1b1b"]} />

      <Bath vipanel={vipanel} metalColor={metalColor} rotation={[0, Math.PI, 0]} />

      <ambientLight intensity={0.1} />

        <directionalLight
        position={[-5, 4, 5]}
        intensity={1}
        // castShadow
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
        color={new THREE.Color("#d3c093")}
      />  

      <pointLight
  position={[-1, 9, 4.5]}
  intensity={70}
  distance={0}
  decay={2}
  castShadow
  shadow-mapSize-width={1024}
  shadow-mapSize-height={1024}
  shadow-radius={1}
//   shadow-bias={-0.0001}
  shadow-normalBias={2}
/>

 <pointLight
  position={[-4, 9, 4.5]}
  intensity={70}
  distance={0}
  decay={2}
  castShadow
  shadow-mapSize-width={1024}
  shadow-mapSize-height={1024}
  shadow-radius={1}
//   shadow-bias={-0.0001}
  shadow-normalBias={2}
/>

      <Environment
        preset="city"
        environmentIntensity={0.5} 
        environmentBlur={1}
      />

      <OrbitControls target={[-2, 4, 0]} />
       
    </Canvas>
  );
}