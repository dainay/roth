import { useThree, useFrame } from '@react-three/fiber'
import { ThreePerf } from 'three-perf'
import { useEffect, useRef } from 'react'

export default function PerfMonitor() {
  const { gl } = useThree()
  const perf = useRef()

  useEffect(() => {
    perf.current = new ThreePerf({
      renderer: gl,
      domElement: document.body,
      anchorX: 'left',
      anchorY: 'bottom',
    })

    return () => {
      perf.current?.dispose?.()
    }
  }, [gl])

  useFrame(() => {
    perf.current?.begin()
    perf.current?.end()
  })

  return null
}