import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import Bath from "./Bath";
import  Bath3  from "./Bath3";
import { CameraControls } from "@react-three/drei";
import { PointerLockControls } from "@react-three/drei";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

function LookControlsWithZoom() {
  const { camera, gl } = useThree();

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();

      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);

      camera.position.addScaledVector(direction, event.deltaY * 0.01);
    };

    gl.domElement.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      gl.domElement.removeEventListener("wheel", handleWheel);
    };
  }, [camera, gl]);

  return <PointerLockControls />;
}


export default function Scene({ metalColor }) {
  return (
    <Canvas
      camera={{ position: [-10, 4, 10], fov: 50 }}
      shadows={{
        type: THREE.PCFShadowMap,
      }}
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
    >
      <color attach="background" args={["#1b1b1b"]} />

      <Bath metalColor={metalColor} rotation={[0, Math.PI, 0]} />

      {/* <ambientLight intensity={0.2} /> */}

      {/* <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
        shadow-bias={-0.0001}
        shadow-normalBias={0.05}
      /> */} 

      <pointLight
  position={[-1, 10, 3]}
  intensity={80}
  distance={0}
  decay={2}
  castShadow
  shadow-mapSize-width={2048}
  shadow-mapSize-height={2048}
  shadow-radius={5}
  shadow-bias={-0.0001}
  shadow-normalBias={0.05}
/>

      <Environment
        preset="city"
        environmentIntensity={0.5} 
        environmentBlur={1}
      />

      <OrbitControls target={[-2, 4, 0]} />
         {/* <CameraControls
         makeDefault
        dollyToCursor
        smoothTime={0.25}
        />  */}
        {/* <LookControlsWithZoom /> */}
    </Canvas>
  );
}