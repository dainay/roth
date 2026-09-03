import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, Preload, GizmoHelper, GizmoViewport } from "@react-three/drei";

import CameraControls from "./CameraControls";

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
            dpr={1}
            camera={{ position: [0, 1, 2], fov: 60 }}
            // shadows={{ type: THREE.PCFShadowMap }}
            gl={{
                antialias: true,
                // transmissionResolutionScale: 0.5,
                //  antialias: false,
                // alpha: false,
                powerPreference: 'high-performance',
            }}
            linear={false}
        >
            <color attach="background" args={["#141312"]} />
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


                <CameraControls />
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
