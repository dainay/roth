import { useEffect } from 'react'
import * as THREE from 'three'

const textureCache = new Map()

export default function DynamicTextureMaterial({
  url,
  material,
  repeatX = 1,
  repeatY = 1,
  roughness,
  metalness,
}) {
  useEffect(() => {
    if (!url || !material) return

    let cancelled = false

    const applyTexture = (texture) => {
      if (cancelled) return

      texture.flipY = false
      texture.colorSpace = THREE.SRGBColorSpace
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(repeatX, repeatY)
      texture.needsUpdate = true
 
      material.map = texture
      material.color.set('#ffffff')

      if (roughness !== undefined) {
        material.roughness = roughness
      }

      if (metalness !== undefined) {
        material.metalness = metalness
      }

      material.needsUpdate = true
    }

    const cachedTexture = textureCache.get(url)

    if (cachedTexture) {
      applyTexture(cachedTexture)
    } else {
      new THREE.TextureLoader().load(
        url,
        (texture) => {
          textureCache.set(url, texture)
          applyTexture(texture)
        },
        undefined,
        (error) => {
          console.error(`Not loaded: ${url}`, error)
        }
      )
    }

    return () => {
      cancelled = true
    }
  }, [
    url,
    material,
    repeatX,
    repeatY,
    roughness,
    metalness,
  ])

  return null
}