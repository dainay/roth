import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, Preload, GizmoHelper, GizmoViewport } from "@react-three/drei";


import Lighting from "./Lighting";

import Switcher from "../models/Switcher";

import Decors from "../models/Decors";
import Receveurs from "../models/Receveurs";
import Parois from "../models/Parois";
import Profiles from "../models/Profiles";
import Nichepanels from "../models/Nichepanels";
import Vipanels from "../models/Vipanels";

import PerfMonitor from "./Perf";

export default function Scene() {

    return (
        <Canvas
            frameloop="demand"
            dpr={0.6}
            camera={{ position: [0, 1, 2], fov: 60 }}
            // shadows={{ type: THREE.PCFShadowMap }}
            gl={{
                // antialias: true,
                // transmissionResolutionScale: 0.5,
                 antialias: false,
                alpha: false,
                powerPreference: 'high-performance',
            }}
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

                <OrbitControls target={[-0.7, 1, -1]}
                    enablePan={false}
                    enableZoom={true}

                    minDistance={0}
                    maxDistance={3}
                    zoomSpeed={2}

                    minPolarAngle={Math.PI / 2.6}
                    maxPolarAngle={Math.PI / 1.6}
                    minAzimuthAngle={Math.PI / 8}
                    maxAzimuthAngle={Math.PI / 2.5}
                    rotateSpeed={0.1}

                    // enableDamping={false}
                    dampingFactor={0.08}
                />
                {import.meta.env.DEV && <GizmoHelper
                    alignment="bottom-right"
                    margin={[80, 80]}
                >
                    <GizmoViewport
                        axisColors={['#ff3653', '#8adb00', '#2c8fff']}
                        labelColor="white"
                    />
                </GizmoHelper>}
                <Preload all />
            </Suspense>

            {import.meta.env.DEV && <PerfMonitor />}

        </Canvas>
    );
}
