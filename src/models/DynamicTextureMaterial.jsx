import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Keep recent textures so returning to a decor is immediate.
const MAX_CACHED_TEXTURES = 6
const loader = new THREE.TextureLoader()
const cache = new Map()

const markAsRecent = (entry) => {
  cache.delete(entry.key)
  cache.set(entry.key, entry)
}

const removeOldTextures = () => {
  for (const [key, entry] of cache) {
    if (cache.size <= MAX_CACHED_TEXTURES) return

    // Never dispose a texture currently displayed by a material.
    if (entry.materials.size === 0 && entry.texture) {
      entry.texture.dispose()
      cache.delete(key)
    }
  }
}

const loadTexture = (url) => {
  const existingEntry = cache.get(url)

  if (existingEntry) {
    markAsRecent(existingEntry)
    return existingEntry
  }

  const entry = {
    key: url,
    texture: null,
    materials: new Set(),
  }

  entry.promise = loader.loadAsync(url).then((texture) => {
    texture.flipY = false
    texture.colorSpace = THREE.SRGBColorSpace
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.needsUpdate = true

    entry.texture = texture
    return texture
  }).catch((error) => {
    cache.delete(url)
    throw error
  })

  cache.set(url, entry)
  return entry
}

export default function DynamicTextureMaterial({
  url,
  material,
  roughness,
  metalness,
}) {
  const invalidate = useThree((state) => state.invalidate)
  const currentEntry = useRef(null)
  const requestNumber = useRef(0)

  // Restore the GLB material when this component or material disappears.
  useEffect(() => {
    if (!material) return undefined

    const originalMap = material.map

    return () => {
      requestNumber.current += 1
      currentEntry.current?.materials.delete(material)
      currentEntry.current = null
      material.map = originalMap
      material.needsUpdate = true
      removeOldTextures()
      invalidate()
    }
  }, [material, invalidate])

  // Load a new texture without removing the one currently on screen.
  useEffect(() => {
    if (!url || !material) return undefined

    const thisRequest = ++requestNumber.current
    const nextEntry = loadTexture(url)

    nextEntry.promise.then((texture) => {
      // Ignore an old request if another decor is already selected.
      if (thisRequest !== requestNumber.current) {
        removeOldTextures()
        return
      }

      currentEntry.current?.materials.delete(material)
      nextEntry.materials.add(material)
      currentEntry.current = nextEntry
      markAsRecent(nextEntry)

      material.map = texture
      material.color.set('#ffffff')

      if (roughness !== undefined) material.roughness = roughness
      if (metalness !== undefined) material.metalness = metalness

      material.needsUpdate = true
      removeOldTextures()
      invalidate()
    }).catch((error) => {
      if (thisRequest === requestNumber.current) {
        console.error(`Texture not loaded: ${url}`, error)
      }
    })

    return () => {
      requestNumber.current += 1
    }
  }, [url, material, roughness, metalness, invalidate])

  return null
}
