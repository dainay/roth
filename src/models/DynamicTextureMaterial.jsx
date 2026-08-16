import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

const MAX_CACHED_TEXTURES = 6
const textureLoader = new THREE.TextureLoader()
const textureCache = new Map()

const getTextureKey = (url, repeatX, repeatY) =>
  JSON.stringify([url, repeatX, repeatY])

const touchEntry = (entry) => {
  entry.lastUsed = Date.now()
}

const pruneTextureCache = () => {
  if (textureCache.size <= MAX_CACHED_TEXTURES) return

  const unusedEntries = [...textureCache.values()]
    .filter((entry) => entry.texture && entry.users.size === 0)
    .sort((first, second) => first.lastUsed - second.lastUsed)

  while (textureCache.size > MAX_CACHED_TEXTURES && unusedEntries.length > 0) {
    const entry = unusedEntries.shift()
    entry.texture.dispose()
    textureCache.delete(entry.key)
  }
}

const getTextureEntry = (url, repeatX, repeatY) => {
  const key = getTextureKey(url, repeatX, repeatY)
  const cachedEntry = textureCache.get(key)

  if (cachedEntry) {
    touchEntry(cachedEntry)
    return cachedEntry
  }

  const entry = {
    key,
    texture: null,
    promise: null,
    users: new Set(),
    lastUsed: Date.now(),
  }

  entry.promise = textureLoader.loadAsync(url).then((texture) => {
    texture.flipY = false
    texture.colorSpace = THREE.SRGBColorSpace
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(repeatX, repeatY)
    texture.needsUpdate = true

    entry.texture = texture
    touchEntry(entry)
    pruneTextureCache()

    return texture
  }).catch((error) => {
    if (textureCache.get(key) === entry) {
      textureCache.delete(key)
    }

    throw error
  })

  textureCache.set(key, entry)
  return entry
}

export default function DynamicTextureMaterial({
  url,
  material,
  repeatX = 1,
  repeatY = 1,
  roughness,
  metalness,
}) {
  const invalidate = useThree((state) => state.invalidate)
  const appliedEntryRef = useRef(null)
  const requestIdRef = useRef(0)

  useEffect(() => {
    if (!material) return undefined

    const originalMap = material.map

    return () => {
      requestIdRef.current += 1

      const appliedEntry = appliedEntryRef.current
      if (appliedEntry) {
        appliedEntry.users.delete(material)
        appliedEntryRef.current = null
      }

      material.map = originalMap
      material.needsUpdate = true
      pruneTextureCache()
      invalidate()
    }
  }, [material, invalidate])

  useEffect(() => {
    if (!url || !material) return undefined

    const requestId = requestIdRef.current + 1
    requestIdRef.current = requestId
    const nextEntry = getTextureEntry(url, repeatX, repeatY)

    nextEntry.promise.then((texture) => {
      if (requestIdRef.current !== requestId) return

      const previousEntry = appliedEntryRef.current
      if (previousEntry !== nextEntry) {
        previousEntry?.users.delete(material)
        nextEntry.users.add(material)
        appliedEntryRef.current = nextEntry
      }

      material.map = texture
      material.color.set('#ffffff')

      if (roughness !== undefined) {
        material.roughness = roughness
      }

      if (metalness !== undefined) {
        material.metalness = metalness
      }

      touchEntry(nextEntry)
      material.needsUpdate = true
      pruneTextureCache()
      invalidate()
    }).catch((error) => {
      if (requestIdRef.current === requestId) {
        console.error(`Not loaded: ${url}`, error)
      }
    })

    return () => {
      if (requestIdRef.current === requestId) {
        requestIdRef.current += 1
      }
    }
  }, [
    url,
    material,
    repeatX,
    repeatY,
    roughness,
    metalness,
    invalidate,
  ])

  return null
}
