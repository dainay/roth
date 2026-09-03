import { useMemo, useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const TOUCHES = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN,
}

export default function CameraControls() {
    const controlsRef = useRef()

    const minTarget = useMemo(
        () => new THREE.Vector3(-0.8, 0.5, -0.6),
        []
    )

    const maxTarget = useMemo(
        () => new THREE.Vector3(0.8, 1.5, 0.6),
        []
    )

    const clampedTarget = useMemo(
        () => new THREE.Vector3(),
        []
    )

    const correction = useMemo(
        () => new THREE.Vector3(),
        []
    )

    const limitPan = () => {
        const controls = controlsRef.current

        if (!controls) return

        clampedTarget
            .copy(controls.target)
            .clamp(minTarget, maxTarget)

        correction
            .copy(clampedTarget)
            .sub(controls.target)

        if (correction.lengthSq() === 0) return

        controls.object.position.add(correction)
        controls.target.copy(clampedTarget)
    }

    return (
        <OrbitControls
            ref={controlsRef}
            makeDefault

            /* Движение в глубину */
            enableZoom
            minDistance={4}
            maxDistance={7}

            /* Движение в стороны */
            enablePan
            screenSpacePanning

            /* Ограничение вертикального вращения */
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2.1}

            /* Ограничение горизонтального вращения */
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}

            touches={TOUCHES}
            onChange={limitPan}
        />
    )
}