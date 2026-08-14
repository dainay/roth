import React, { useRef, useState } from 'react'
import { useTexture, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import s from './Evipanel.module.css'

useTexture.preload('/img/evipanel.webp')

export default function Evipanel({ onPointerEnter, onPointerLeave, geometry, gradientTexture, visible }) {

    const heatRef = useRef()

    gradientTexture.center.set(0.3, 0.5)

    useFrame((state) => {
        const t = state.clock.elapsedTime
        gradientTexture.repeat.x = 0.5 + Math.sin(t * 5) * 1
        gradientTexture.repeat.y = 1 + Math.sin(t * -2) * 0.1

        heatRef.current.intensity = 10 + Math.sin(t * 5) * 5
    })

    return (
        <>
            <mesh
                visible={visible}
                geometry={geometry}
                position={[0, 0, 0.02]}
            >
                <meshBasicMaterial
                    toneMapped={false}
                    map={gradientTexture}
                />
            </mesh>
            <Html
                distanceFactor={1}
                className={s.htmlEvipanel}
                transform
                position={[0, 0.8, 0]}>
                <div
                    onPointerEnter={onPointerEnter}
                    onPointerLeave={onPointerLeave}
                    style={{
                         transform: visible ? 'translateY(0)' : 'translateY(8px)',
                        transition: 'opacity 0.7s ease, transform 0.7s ease',
                        opacity: visible ? 1 : 0,
                        pointerEvents: visible ? 'auto' : 'none',
                    }}>
                    <h3>E-VIPANEL</h3>
                    <h4>Panneau mural chauffant pour salle de bain</h4>
                    <a target="_blank" className="btn" href="https://www.roth-france.fr/espace-douche/panneaux-vipanel/e-vipanel">Découvrir</a>
                </div>
            </Html>
            <rectAreaLight
                visible={visible}
                ref={heatRef}
                color="#9b2820"
                intensity={20}
                width={0.3}
                height={2}
                position={[0, 0, 0]}
                rotation={[0, Math.PI, 0]}
            />
        </>
    )
}
