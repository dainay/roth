import { Canvas } from "@react-three/fiber";
import s from './Scene.module.scss'
import * as THREE from "three";
// import '../helpers/preload'
import { GizmoHelper, GizmoViewport, OrbitControls } from "@react-three/drei";


import Lighting from "./Lighting";
import { Ambiance } from "../models/Ambiance"; 

import Switcher from "../models/Switcher";

import Decors from "../models/Decors";
import Receveurs from "../models/Receveurs";
import Parois from "../models/Parois";
import Profiles from "../models/Profiles"; 
import Nichepanels from "../models/Nichepanels";
import Vipanels from "../models/Vipanels";

import { Perf } from 'r3f-perf';
import { Preload } from "@react-three/drei";

export default function Scene() {
    return (
        <Canvas
            dpr={1}
            camera={{ position: [2, 1, 2], fov: 60 }}
            shadows={{ type: THREE.PCFShadowMap }}
            gl={{ antialias: true }}
            linear={false}
        >
            <color attach="background" args={["#161616"]} />
            <Lighting />

            {/* <Ambiance /> */}

            {/* **** scene ****** */}

            <Switcher />

            <Decors /> 
            <Receveurs />
            <Parois />
            <Profiles />
            <Nichepanels />
            <Vipanels /> 

            {/* **** scene ****** */}

 {/* <Preload all /> */}
            <Perf position="bottom-left" />


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
        </Canvas>
    );
}