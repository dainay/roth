import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function AnimatedDoor({
       children, 
    pivot = [0, 0, 0],
    offset = [0, 0, 0],
    rotation = [0, 0, 0],
    openAngle = 0, 
    slideX = 0, 
    speed = 3,
    
}) {
       const doorRef = useRef()
    const opened = useRef(false)
    const moving = useRef(false)

    const targetRotation = useRef(rotation[1])
    const targetX = useRef(pivot[0])

    const invalidate = useThree((state) => state.invalidate)

    const isSliding = slideX !== 0

    const toggleDoor = (event) => {
        event.stopPropagation()

        if ((event.delta ?? 0) > 5) return

        opened.current = !opened.current

        if (isSliding) {
            targetX.current = opened.current
                ? pivot[0] + slideX
                : pivot[0]
        } else {
            targetRotation.current = opened.current
                ? rotation[1] + openAngle
                : rotation[1]
        }

        moving.current = true
        invalidate()
    }

    useFrame((_, delta) => {
        const door = doorRef.current

        if (!moving.current || !door) return

        const safeDelta = Math.min(delta, 1 / 30)

        if (isSliding) {
            door.position.x = THREE.MathUtils.damp(
                door.position.x,
                targetX.current,
                speed,
                safeDelta
            )

            if (Math.abs(door.position.x - targetX.current) < 0.002) {
                door.position.x = targetX.current
                moving.current = false
                return
            }
        } else {
            door.rotation.y = THREE.MathUtils.damp(
                door.rotation.y,
                targetRotation.current,
                speed,
                safeDelta
            )

            if (
                Math.abs(
                    door.rotation.y - targetRotation.current
                ) < 0.002
            ) {
                door.rotation.y = targetRotation.current
                moving.current = false
                return
            }
        }

        invalidate()
    })

    return (
            <group
           
        ref={doorRef}
        position={pivot}
        rotation={rotation}
        onClick={toggleDoor}
        onPointerEnter={() => {
            document.body.style.cursor = 'pointer'
        }}
        onPointerLeave={() => {
            document.body.style.cursor = 'default'
        }}
    >
        {/* {showPivot && (
            <>
                <axesHelper args={[0.3]} />

                <mesh renderOrder={1000}>
                    <sphereGeometry args={[0.025, 12, 12]} />

                    <meshBasicMaterial
                        color="#ff0000"
                        depthTest={false}
                        toneMapped={false}
                    />
                </mesh>
            </>
        )} */}

        <group position={offset}>
            {children}
        </group>
    </group>
    )
}