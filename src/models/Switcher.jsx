
import { useGLTF } from '@react-three/drei'

import useSceneStore from '../store/useSceneStore';

export default function Switcher(props) {
  const { nodes, materials } = useGLTF('./models/Switcher_compressed.glb')
  const toggleLightingType = useSceneStore((state) => state.toggleLightingType);

  const handlePointerEnter = (event) => {
    event.stopPropagation()
    document.body.style.cursor = 'pointer'
  }

  const handlePointerLeave = (event) => {
    event.stopPropagation()
    document.body.style.cursor = 'default'
  }
  
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.One_Swicth_.geometry}
        material={materials.Rough}
        position={[1.1, 0.8, -2.55]}
        rotation={[Math.PI / 2, 0, 0]}
        onClick={(e) => {
          e.stopPropagation()
          toggleLightingType()
        }}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      />
    </group>
  )
}

useGLTF.preload('./models/Switcher_compressed.glb')
