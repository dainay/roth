import { useMemo, useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const INITIAL_TARGET = [-1, 1, -1]

const TOUCHES = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN,
}

export default function CameraControls({
    showHelpers = import.meta.env.DEV,
}) {
    const controlsRef = useRef()
    const targetHelperRef = useRef()

    const minTarget = useMemo(
        () => new THREE.Vector3(-1.3, 0.5, -1.8),
        []
    )

    const maxTarget = useMemo(
        () => new THREE.Vector3(-0.6, 1.2, -1.2),
        []
    )

    const targetBounds = useMemo(
        () => new THREE.Box3(minTarget, maxTarget),
        [minTarget, maxTarget]
    )

    const clampedTarget = useMemo(
        () => new THREE.Vector3(),
        []
    )

    const correction = useMemo(
        () => new THREE.Vector3(),
        []
    )

    const handleControlsChange = () => {
        const controls = controlsRef.current

        if (!controls) return

        clampedTarget
            .copy(controls.target)
            .clamp(minTarget, maxTarget)

        correction
            .copy(clampedTarget)
            .sub(controls.target)

        if (correction.lengthSq() > 0) {
            //move target and cam
            controls.object.position.add(correction)
            controls.target.copy(clampedTarget)
        }

        //helper
        if (targetHelperRef.current) {
            targetHelperRef.current.position.copy(
                controls.target
            )
        }
    }

    return (
        <>
            <OrbitControls
                ref={controlsRef}
                makeDefault
                target={INITIAL_TARGET}

                enableZoom
                minDistance={1}
                maxDistance={4.7}

                enablePan
                screenSpacePanning

                // vertical rotation
                minPolarAngle={Math.PI / 2.6}
                maxPolarAngle={Math.PI / 1.8}

                // horizontal rotation
                minAzimuthAngle={-Math.PI / 25}
                maxAzimuthAngle={Math.PI / 2}

                touches={TOUCHES}
                onChange={handleControlsChange}

                rotateSpeed={0.35}
                panSpeed={0.5}
                zoomSpeed={0.6}
            />

            {showHelpers && (
                <>

                    <group
                        ref={targetHelperRef}
                        position={INITIAL_TARGET}
                    >
                        <axesHelper
                            args={[0.4]}
                            raycast={() => null}
                        />

                        <mesh
                            renderOrder={1000}
                            raycast={() => null}
                        >
                            <sphereGeometry
                                args={[0.04, 16, 16]}
                            />

                            <meshBasicMaterial
                                color="#ff0000"
                                depthTest={false}
                                depthWrite={false}
                                toneMapped={false}
                            />
                        </mesh>
                    </group>

                    <box3Helper
                        args={[targetBounds, '#ffff00']}
                        raycast={() => null}
                    />
                </>
            )}
        </>
    )
}