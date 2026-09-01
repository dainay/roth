// src/scene/optimizeMaterials.js

import * as THREE from 'three'

export default function optimizeMaterials(materials) {
    Object.values(materials).forEach((material) => {
        if (!material) return

        let needsUpdate = false

        if (material.isMeshPhysicalMaterial) {
            if (material.transmission > 0) {
                material.transmission = 0
                needsUpdate = true
            }

            if (material.thickness > 0) {
                material.thickness = 0
                needsUpdate = true
            }

            if (material.dispersion > 0) {
                material.dispersion = 0
                needsUpdate = true
            }
        }

        // Все модели имеют настоящую толщину:
        // рисовать обратную сторону полигона не нужно.
        if (material.side !== THREE.FrontSide) {
            material.side = THREE.FrontSide
            needsUpdate = true
        }

        if (needsUpdate) {
            material.needsUpdate = true
        }
    })
}