import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { GizmoHelper, GizmoViewport, OrbitControls, Preload } from "@react-three/drei";


import Lighting from "./Lighting";

import Switcher from "../models/Switcher";

import Decors from "../models/Decors";
import Receveurs from "../models/Receveurs";
import Parois from "../models/Parois";
import Profiles from "../models/Profiles"; 
import Nichepanels from "../models/Nichepanels";
import Vipanels from "../models/Vipanels";

export default function Scene() {
    return (
        <Canvas 
            frameloop="demand"
            dpr={1}
            camera={{ position: [2, 1, 2], fov: 60 }}
            shadows={{ type: THREE.PCFShadowMap }}
            gl={{ antialias: true }}
            linear={false}
        >
            <color attach="background" args={["#161616"]} />
            <Suspense fallback={null}>
                <Lighting />

                {/* **** scene ****** */}

                <Switcher />

                <Decors />
                <Receveurs />
                <Parois />
                <Profiles />
                <Nichepanels />
                <Vipanels />

                {/* **** scene ****** */}
 
                <OrbitControls target={[-0.5, 1, -1]}
                    enablePan={true}
                    enableZoom={true}
                    // minDistance={0}
                    // maxDistance={2.6}
                    // minPolarAngle={Math.PI / 2.6}
                    // maxPolarAngle={Math.PI / 1.6}
                    // minAzimuthAngle={Math.PI / 8}
                    // maxAzimuthAngle={Math.PI / 2.5}
                    enableDamping={false}
                    rotateSpeed={0.1}
                    zoomSpeed={3}
                    dampingFactor={0.08}
                />
                <GizmoHelper
                    alignment="bottom-right"
                    margin={[80, 80]}
                >
                    <GizmoViewport
                        axisColors={['#ff3653', '#8adb00', '#2c8fff']}
                        labelColor="white"
                    />
                </GizmoHelper>
                <Preload all />
            </Suspense>
        </Canvas>
    );
}
