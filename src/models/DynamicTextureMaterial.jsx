import { useEffect } from 'react'
import * as THREE from 'three'

const textureLoader = new THREE.TextureLoader()
const textureCache = new Map()

const getTextureKey = (url, repeatX, repeatY) =>
  JSON.stringify([url, repeatX, repeatY])

const acquireTexture = (url, repeatX, repeatY) => {
  const key = getTextureKey(url, repeatX, repeatY)
  let entry = textureCache.get(key)

  if (!entry) {
    entry = {
      refs: 0,
      texture: null,
      promise: null,
    }

    entry.promise = textureLoader.loadAsync(url).then((texture) => {
      texture.flipY = false
      texture.colorSpace = THREE.SRGBColorSpace
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(repeatX, repeatY)
      texture.needsUpdate = true
      entry.texture = texture

      if (entry.refs === 0) {
        texture.dispose()
        textureCache.delete(key)
      }

      return texture
    }).catch((error) => {
      textureCache.delete(key)
      throw error
    })

    textureCache.set(key, entry)
  }

  entry.refs += 1
  return { entry, key }
}

const releaseTexture = (entry, key) => {
  entry.refs = Math.max(0, entry.refs - 1)

  if (entry.refs === 0 && entry.texture) {
    entry.texture.dispose()
    textureCache.delete(key)
  }
}

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

    const { entry, key } = acquireTexture(url, repeatX, repeatY)

    entry.promise.then((texture) => {
      if (cancelled) return

      material.map = texture
      material.color.set('#ffffff')

      if (roughness !== undefined) {
        material.roughness = roughness
      }

      if (metalness !== undefined) {
        material.metalness = metalness
      }

      material.needsUpdate = true
    }).catch((error) => {
      if (!cancelled) {
        console.error(`Not loaded: ${url}`, error)
      }
    })

    return () => {
      cancelled = true

      if (material.map === entry.texture) {
        material.map = null
        material.needsUpdate = true
      }

      releaseTexture(entry, key)
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
