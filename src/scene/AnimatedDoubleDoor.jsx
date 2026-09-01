import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function AnimatedDoubleDoor({
    leftDoor,
    rightDoor,

    leftPivot = [0, 0, 0],
    leftOffset = [0, 0, 0],
    leftRotation = [0, 0, 0],
    leftOpenAngle = -Math.PI / 4,

    rightPivot = [0, 0, 0],
    rightOffset = [0, 0, 0],
    rightRotation = [0, 0, 0],
    rightOpenAngle = Math.PI / 4,

    speed = 3,
}) {
    const leftDoorRef = useRef()
    const rightDoorRef = useRef()

    const opened = useRef(false)
    const moving = useRef(false)

    const leftTarget = useRef(leftRotation[1])
    const rightTarget = useRef(rightRotation[1])

    const invalidate = useThree((state) => state.invalidate)

    const toggleDoors = (event) => {
        event.stopPropagation()

        // Do not open after rotating the camera.
        if ((event.delta ?? 0) > 5) return

        opened.current = !opened.current

        leftTarget.current = opened.current
            ? leftRotation[1] + leftOpenAngle
            : leftRotation[1]

        rightTarget.current = opened.current
            ? rightRotation[1] + rightOpenAngle
            : rightRotation[1]

        moving.current = true
        invalidate()
    }

    useFrame((_, delta) => {
        const left = leftDoorRef.current
        const right = rightDoorRef.current

        if (!moving.current || !left || !right) return

        const safeDelta = Math.min(delta, 1 / 30)

        left.rotation.y = THREE.MathUtils.damp(
            left.rotation.y,
            leftTarget.current,
            speed,
            safeDelta
        )

        right.rotation.y = THREE.MathUtils.damp(
            right.rotation.y,
            rightTarget.current,
            speed,
            safeDelta
        )

        const leftFinished =
            Math.abs(
                left.rotation.y - leftTarget.current
            ) < 0.002

        const rightFinished =
            Math.abs(
                right.rotation.y - rightTarget.current
            ) < 0.002

        if (leftFinished) {
            left.rotation.y = leftTarget.current
        }

        if (rightFinished) {
            right.rotation.y = rightTarget.current
        }

        if (leftFinished && rightFinished) {
            moving.current = false
            return
        }

        invalidate()
    })

    return (
        <group
            onClick={toggleDoors}
            onPointerEnter={() => {
                document.body.style.cursor = 'pointer'
            }}
            onPointerLeave={() => {
                document.body.style.cursor = 'default'
            }}
        >
            <group
                ref={leftDoorRef}
                position={leftPivot}
                rotation={leftRotation}
            >
                <group position={leftOffset}>
                    {leftDoor}
                </group>
            </group>

            <group
                ref={rightDoorRef}
                position={rightPivot}
                rotation={rightRotation}
            >
                <group position={rightOffset}>
                    {rightDoor}
                </group>
            </group>
        </group>
    )
}