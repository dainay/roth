import { useLayoutEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { useProgress } from '@react-three/drei'

const DisableTransmission = () => {
    const scene = useThree((state) => state.scene)
    const invalidate = useThree((state) => state.invalidate)
    const { active } = useProgress()

    useLayoutEffect(() => {
       
        if (active) return

        scene.traverse((object) => {
            if (!object.isMesh || !object.material) return

            const materials = Array.isArray(object.material)
                ? object.material
                : [object.material]

            materials.forEach((material) => {
                if (
                    material.isMeshPhysicalMaterial &&
                    material.transmission > 0
                ) {
                    material.transmission = 0
                    material.thickness = 0
                    material.dispersion = 0
                    material.needsUpdate = true
                }
            })
        })

        invalidate()
    }, [active, scene, invalidate])

    return null
}

export default DisableTransmission