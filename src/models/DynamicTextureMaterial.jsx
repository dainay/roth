import { useEffect, useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'



export default function DynamicTextureMaterial({
    url,
    material,
    // roughness,
    // metalness,
    delay = 200,
    maxWidth = 512,
    maxHeight = 1082
}) {
    const invalidate = useThree((state) => state.invalidate)


    const { canvas, texture } = useMemo(() => {
        const canvasElement = document.createElement('canvas')

        // Temporary dimensions until the first image is loaded.
        canvasElement.width = 1
        canvasElement.height = 1

        const canvasTexture = new THREE.CanvasTexture(canvasElement)

        canvasTexture.flipY = false
        canvasTexture.colorSpace = THREE.SRGBColorSpace

        canvasTexture.wrapS = THREE.RepeatWrapping
        canvasTexture.wrapT = THREE.RepeatWrapping

        // Avoid generating mipmaps after every VIPANEL change.
        canvasTexture.generateMipmaps = false
        canvasTexture.minFilter = THREE.LinearFilter
        canvasTexture.magFilter = THREE.LinearFilter

        return {
            canvas: canvasElement,
            texture: canvasTexture,
        }
    }, [])


    useEffect(() => {
        if (!material) return

        // if (roughness !== undefined) {
        //     material.roughness = roughness
        // }

        // if (metalness !== undefined) {
        //     material.metalness = metalness
        // }

        invalidate()
    }, [
        material,
        // roughness,
        // metalness,
        invalidate,
    ])


    useEffect(() => {
        if (!material) return undefined

        const originalMap = material.map

        return () => {
            if (material.map === texture) {
                material.map = originalMap
                material.needsUpdate = true
            }

            invalidate()
        }
    }, [material, texture, invalidate])


    useEffect(() => {
        if (!url || !material) return undefined

        let cancelled = false

        const controller = new AbortController()


        const timeout = window.setTimeout(async () => {
            let bitmap = null

            try {
                const response = await fetch(url, {
                    signal: controller.signal,
                    cache: 'force-cache',
                })

                if (!response.ok) {
                    throw new Error(
                        `HTTP ${response.status} for ${url}`
                    )
                }

                const blob = await response.blob()

                bitmap = await createImageBitmap(blob)

                if (cancelled) {
                    bitmap.close()
                    return
                }

                const MAX_WIDTH = maxWidth
                const MAX_HEIGHT = maxHeight

                const scale = Math.min(
                    1,
                    MAX_WIDTH / bitmap.width,
                    MAX_HEIGHT / bitmap.height
                )

                const width = Math.round(bitmap.width * scale)
                const height = Math.round(bitmap.height * scale)


                if (
                    canvas.width === 1 &&
                    canvas.height === 1
                ) {
                    canvas.width = Math.max(1, width)
                    canvas.height = Math.max(1, height)
                }

                const context = canvas.getContext('2d')

                if (!context) {
                    throw new Error(
                        'Canvas 2D context is unavailable'
                    )
                }

                context.clearRect(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                )


                context.drawImage(
                    bitmap,
                    0,
                    0,
                    canvas.width,
                    canvas.height
                )


                bitmap.close()
                bitmap = null

                if (cancelled) return


                if (material.map !== texture) {
                    material.map = texture
                    material.color.set('#ffffff')
                    material.needsUpdate = true
                }


                texture.needsUpdate = true

                invalidate()
            } catch (error) {
                bitmap?.close()

                if (
                    error?.name === 'AbortError' ||
                    cancelled
                ) {
                    return
                }

                console.error(
                    `VIPANEL texture not loaded: ${url}`,
                    error
                )
            }
        }, delay)

        return () => {
            cancelled = true

            window.clearTimeout(timeout)


            controller.abort()
        }
    }, [
        url,
        material,
        canvas,
        texture,
        delay,
        invalidate,
    ])

    useEffect(() => {
        return () => {
            texture.dispose()
        }
    }, [texture])

    return null
}