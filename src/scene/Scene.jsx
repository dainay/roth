import { Canvas } from "@react-three/fiber";
import s from './Scene.module.scss'
import * as THREE from "three";
import '../helpers/preload'
import {Bounds,  GizmoHelper, GizmoViewport, OrbitControls, } from "@react-three/drei";

import Lighting from "./Lighting";
import { Ambiance } from "../models/Ambiance"; 

export default function Scene() {
    return (
        <Canvas
            camera={{ position: [1, 1, 1], fov: 50 }}
            shadows={{ type: THREE.PCFShadowMap }}
            gl={{ antialias: true }}
            linear={false} 
        >
            <color attach="background" args={["#1b1b1b"]} /> 
            <Lighting /> 

            <Ambiance />
         
            <OrbitControls target={[0, 1, 0]} makeDefault  />
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