import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import '../helpers/preload'

import Lighting from "./Lighting";
import { Ambiance } from "../models/Ambiance"; 

export default function Scene() {
    return (
        <Canvas
            camera={{ position: [1, 1, 1], fov: 50 }}
            shadows={{type: THREE.PCFShadowMap}}
            gl={{ antialias: true }}
            linear={false} 
        >
            <color attach="background" args={["#1b1b1b"]} /> 
            <Lighting /> 
            <Ambiance /> 
            <OrbitControls target={[0, 1, 0]} />

        </Canvas>
    );
}