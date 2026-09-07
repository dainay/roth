import { useEffect, useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function DynamicTextureMaterial({
    url,
    material,
    delay = 200,
    maxWidth = 512,
    maxHeight = 1082,
    requestTimeout = 20000,
}) {
    const invalidate = useThree(
        (state) => state.invalidate
    )

    const { canvas, texture } = useMemo(() => {
        const canvasElement =
            document.createElement('canvas')

        canvasElement.width = 1
        canvasElement.height = 1

        const canvasTexture =
            new THREE.CanvasTexture(canvasElement)

        canvasTexture.flipY = false
        canvasTexture.colorSpace =
            THREE.SRGBColorSpace

        canvasTexture.wrapS =
            THREE.RepeatWrapping

        canvasTexture.wrapT =
            THREE.RepeatWrapping

        canvasTexture.generateMipmaps = false
        canvasTexture.minFilter =
            THREE.LinearFilter

        canvasTexture.magFilter =
            THREE.LinearFilter

        return {
            canvas: canvasElement,
            texture: canvasTexture,
        }
    }, [])

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
    }, [
        material,
        texture,
        invalidate,
    ])

    useEffect(() => {
        if (!url || !material) {
            return undefined
        }

        let cancelled = false
        let timedOut = false
        let requestTimeoutId = null

        const controller = new AbortController()

        const delayId = window.setTimeout(
            async () => {
                let bitmap = null

                requestTimeoutId =
                    window.setTimeout(() => {
                        timedOut = true
                        controller.abort()
                    }, requestTimeout)

                try {
                    const response = await fetch(
                        url,
                        {
                            signal:
                                controller.signal,

                            cache: 'force-cache',
                        }
                    )

                    if (!response.ok) {
                        throw new Error(
                            `HTTP ${response.status} for ${url}`
                        )
                    }

                    const blob =
                        await response.blob()

                    if (cancelled) return

                    bitmap =
                        await createImageBitmap(blob)

                    if (cancelled) {
                        bitmap.close()
                        return
                    }

                    const scale = Math.min(
                        1,
                        maxWidth / bitmap.width,
                        maxHeight / bitmap.height
                    )

                    const width = Math.max(
                        1,
                        Math.round(
                            bitmap.width * scale
                        )
                    )

                    const height = Math.max(
                        1,
                        Math.round(
                            bitmap.height * scale
                        )
                    )

                    if (
                        canvas.width === 1 &&
                        canvas.height === 1
                    ) {
                        canvas.width = width
                        canvas.height = height
                    }

                    const context =
                        canvas.getContext('2d')

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

                    if (cancelled) {
                        return
                    }

                    if (
                        error?.name === 'AbortError'
                    ) {
                        if (timedOut) {
                            console.error(
                                `Texture loading timeout after ${requestTimeout} ms: ${url}`
                            )
                        }

                        return
                    }

                    console.error(
                        `Texture not loaded: ${url}`,
                        error
                    )
                } finally {
                    if (
                        requestTimeoutId !== null
                    ) {
                        window.clearTimeout(
                            requestTimeoutId
                        )
                    }
                }
            },
            delay
        )

        return () => {
            cancelled = true

            window.clearTimeout(delayId)

            if (requestTimeoutId !== null) {
                window.clearTimeout(
                    requestTimeoutId
                )
            }

            controller.abort()
        }
    }, [
        url,
        material,
        canvas,
        texture,
        delay,
        maxWidth,
        maxHeight,
        requestTimeout,
        invalidate,
    ])

    useEffect(() => {
        return () => {
            texture.dispose()
        }
    }, [texture])

    return null
}