import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('./files/sb4.glb')
  return (
    <group {...props} dispose={null}> 
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box2131645049.geometry}
        material={materials['Material #2147483646']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object400.geometry}
        material={materials['Material #-2147483648']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rectangle003.geometry}
        material={materials['kafel.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box2131645084.geometry}
        material={materials['10 - Default']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rectangle006.geometry}
        material={materials['kafel.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Line002.geometry}
        material={materials.patalok}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rectangle001.geometry}
        material={materials.Estatuario_tile_2400x1200}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rectangle005.geometry}
        material={materials['kafel.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rectangle004.geometry}
        material={materials['kafel.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object.geometry}
        material={materials['11 - Default']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box004.geometry}
        material={materials['08 - Default']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box002.geometry}
        material={nodes.Box002.material}
      />
      <mesh castShadow receiveShadow geometry={nodes.Plane.geometry} material={materials.vipanel} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials.vipanel}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box004001.geometry}
        material={materials['08 - Default.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rectangle001002.geometry}
        material={materials['Estatuario_tile_2400x1200.002']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rectangle006001.geometry}
        material={materials.kafel}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rectangle006002.geometry}
        material={materials['kafel.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257002'].geometry}
        material={materials.FINITION}
        position={[-1.268, 8.373, -0.886]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257003'].geometry}
        material={materials.FINITION}
        position={[-3.869, 8.385, -0.841]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257004'].geometry}
        material={materials.FINITION}
        position={[1.727, 8.38, -0.871]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257005'].geometry}
        material={materials.FINITION}
        position={[1.743, 8.302, -0.838]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257006'].geometry}
        material={materials.FINITION}
        position={[1.743, 8.479, -0.838]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257007'].geometry}
        material={materials.FINITION}
        position={[1.566, 8.479, -0.855]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257008'].geometry}
        material={materials.FINITION}
        position={[1.566, 8.302, -0.855]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257009'].geometry}
        material={materials.FINITION}
        position={[1.744, 8.479, -0.908]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257010'].geometry}
        material={materials.FINITION}
        position={[1.744, 8.302, -0.908]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257012'].geometry}
        material={materials.FINITION}
        position={[0.031, 8.463, -0.82]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257013'].geometry}
        material={materials.FINITION}
        position={[-2.254, 8.463, -0.806]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257014'].geometry}
        material={materials.FINITION}
        position={[-3.658, 8.423, -0.861]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257015'].geometry}
        material={materials.FINITION}
        position={[-1.909, 8.423, -0.872]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257016'].geometry}
        material={materials.FINITION}
        position={[-2.809, 8.423, -0.854]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257017'].geometry}
        material={materials.FINITION}
        position={[1.465, 8.423, -0.893]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257018'].geometry}
        material={materials.FINITION}
        position={[-0.284, 8.423, -0.882]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257019'].geometry}
        material={materials.FINITION}
        position={[0.616, 8.424, -0.875]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257020'].geometry}
        material={materials.FINITION}
        position={[-1.288, 3.075, -0.866]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257021'].geometry}
        material={materials.FINITION}
        position={[-2.533, 8.331, -0.848]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257022'].geometry}
        material={materials.FINITION}
        position={[0.13, 8.323, -0.885]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257023'].geometry}
        material={materials['GLASS.001']}
        position={[0.847, 5.563, -0.74]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257024'].geometry}
        material={materials.FINITION}
        position={[1.585, 3.154, -0.79]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257025'].geometry}
        material={materials.FINITION}
        position={[1.587, 3.154, -0.928]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257026'].geometry}
        material={materials.FINITION}
        position={[1.585, 2.638, -0.762]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257027'].geometry}
        material={materials.FINITION}
        position={[1.585, 3.669, -0.762]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257028'].geometry}
        material={materials.FINITION}
        position={[1.584, 2.638, -0.727]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257029'].geometry}
        material={materials.FINITION}
        position={[1.584, 3.669, -0.727]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257030'].geometry}
        material={materials.FINITION}
        position={[1.583, 2.638, -0.693]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257032'].geometry}
        material={materials.FINITION}
        position={[1.583, 3.669, -0.693]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257033'].geometry}
        material={materials.FINITION}
        position={[1.583, 3.097, -0.666]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257034'].geometry}
        material={materials.FINITION}
        position={[1.581, 3.154, -0.562]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257035'].geometry}
        material={materials.FINITION}
        position={[1.584, 2.638, -0.739]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257036'].geometry}
        material={materials.FINITION}
        position={[1.584, 3.669, -0.739]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257037'].geometry}
        material={materials.FINITION}
        position={[1.584, 2.638, -0.74]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257038'].geometry}
        material={materials.FINITION}
        position={[1.584, 3.669, -0.74]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257039'].geometry}
        material={materials.FINITION}
        position={[1.584, 3.638, -0.69]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257040'].geometry}
        material={materials.FINITION}
        position={[1.583, 2.607, -0.69]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257041'].geometry}
        material={materials.FINITION}
        position={[-1.309, 3.07, -0.737]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257042'].geometry}
        material={materials.FINITION}
        position={[-0.926, 8.39, -0.772]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257043'].geometry}
        material={materials.FINITION}
        position={[-0.927, 8.364, -0.747]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257044'].geometry}
        material={materials.FINITION}
        position={[-0.928, 8.367, -0.711]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257045'].geometry}
        material={materials.FINITION}
        position={[-0.928, 8.365, -0.698]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257046'].geometry}
        material={materials.FINITION}
        position={[-1, 8.403, -0.816]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257047'].geometry}
        material={materials.FINITION}
        position={[-0.852, 8.403, -0.817]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257048'].geometry}
        material={materials.FINITION}
        position={[-1, 8.403, -0.818]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257049'].geometry}
        material={materials.FINITION}
        position={[-0.852, 8.403, -0.819]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257050'].geometry}
        material={materials.FINITION}
        position={[-0.928, 8.365, -0.707]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257051'].geometry}
        material={materials.FINITION}
        position={[-0.925, 8.367, -0.688]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257052'].geometry}
        material={materials.FINITION}
        position={[1.359, 8.39, -0.786]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257053'].geometry}
        material={materials.FINITION}
        position={[1.359, 8.364, -0.761]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257054'].geometry}
        material={materials.FINITION}
        position={[1.359, 8.367, -0.726]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257055'].geometry}
        material={materials.FINITION}
        position={[1.358, 8.365, -0.712]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257056'].geometry}
        material={materials.FINITION}
        position={[1.286, 8.403, -0.831]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257057'].geometry}
        material={materials.FINITION}
        position={[1.434, 8.403, -0.832]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257058'].geometry}
        material={materials.FINITION}
        position={[1.286, 8.403, -0.832]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257059'].geometry}
        material={materials.FINITION}
        position={[1.434, 8.403, -0.833]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257060'].geometry}
        material={materials.FINITION}
        position={[1.358, 8.365, -0.721]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257061'].geometry}
        material={materials.FINITION}
        position={[1.361, 8.367, -0.702]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257062'].geometry}
        material={materials.FINITION}
        position={[0.218, -2.156, -0.737]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257063'].geometry}
        material={materials.FINITION}
        position={[1.741, 3.154, -0.742]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257064'].geometry}
        material={materials.FINITION}
        position={[1.732, 3.022, 3.169]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257065'].geometry}
        material={materials['GLASS.001']}
        position={[1.79, 3.102, 1.185]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257066'].geometry}
        material={materials.FINITION}
        position={[1.749, -1.728, 3.449]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257067'].geometry}
        material={materials.FINITION}
        position={[1.749, -1.729, 3.46]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257068'].geometry}
        material={materials.FINITION}
        position={[1.749, 3.102, 3.449]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257069'].geometry}
        material={materials.FINITION}
        position={[1.748, 3.102, 3.46]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257070'].geometry}
        material={materials.FINITION}
        position={[1.749, 7.933, 3.449]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257071'].geometry}
        material={materials.FINITION}
        position={[1.748, 7.933, 3.46]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257072'].geometry}
        material={materials.FINITION}
        position={[1.751, 3.075, 3.329]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257073'].geometry}
        material={materials.FINITION}
        position={[1.724, 8.431, 2.767]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257074'].geometry}
        material={materials.FINITION}
        position={[1.421, 8.429, 3.281]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257075'].geometry}
        material={materials.FINITION}
        position={[1.256, 8.464, 3.342]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257076'].geometry}
        material={materials.FINITION}
        position={[1.256, 8.396, 3.342]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257077'].geometry}
        material={materials.FINITION}
        position={[1.546, 8.464, 3.219]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257078'].geometry}
        material={materials.FINITION}
        position={[1.546, 8.396, 3.219]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257079'].geometry}
        material={materials.FINITION}
        position={[1.687, 8.429, 3.268]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257080'].geometry}
        material={materials.FINITION}
        position={[1.7, 8.429, 3.142]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257081'].geometry}
        material={materials.FINITION}
        position={[1.146, 8.429, 3.461]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257082'].geometry}
        material={materials.FINITION}
        position={[1.352, 8.429, 3.459]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257083'].geometry}
        material={materials.FINITION}
        position={[1.352, 8.429, 3.461]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257084'].geometry}
        material={materials.FINITION}
        position={[1.146, 8.429, 3.462]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257085'].geometry}
        material={materials.FINITION}
        position={[1.255, 8.428, 3.349]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257086'].geometry}
        material={materials.FINITION}
        position={[1.551, 8.428, 3.226]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257087'].geometry}
        material={materials.FINITION}
        position={[1.724, 8.429, 2.391]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257088'].geometry}
        material={materials.FINITION}
        position={[1.738, 8.429, 2.391]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257089'].geometry}
        material={materials.FINITION}
        position={[1.726, 8.429, 2.265]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257090'].geometry}
        material={materials.FINITION}
        position={[1.74, 8.429, 2.265]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257091'].geometry}
        material={materials.FINITION}
        position={[1.719, 8.429, 2.766]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257092'].geometry}
        material={materials.FINITION}
        position={[1.732, 8.429, 2.766]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257093'].geometry}
        material={materials.FINITION}
        position={[1.75, -2.198, 3.37]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257094'].geometry}
        material={materials.FINITION}
        position={[1.75, 8.268, 3.37]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257095'].geometry}
        material={materials.FINITION}
        position={[1.844, 8.386, -0.866]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257096'].geometry}
        material={materials.FINITION}
        position={[1.818, 8.472, -0.866]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257097'].geometry}
        material={materials.FINITION}
        position={[1.783, 8.367, -0.906]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257098'].geometry}
        material={materials.FINITION}
        position={[1.782, 8.367, -0.841]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257099'].geometry}
        material={materials.FINITION}
        position={[1.819, 8.373, -0.939]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257100'].geometry}
        material={materials.FINITION}
        position={[-3.893, 3.022, -0.858]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257101'].geometry}
        material={materials.FINITION}
        position={[-4.06, 7.772, -0.857]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257102'].geometry}
        material={materials.FINITION}
        position={[-4.041, 7.772, -0.857]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257103'].geometry}
        material={materials.FINITION}
        position={[-4.061, 2.989, -0.857]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257104'].geometry}
        material={materials.FINITION}
        position={[-4.041, 2.989, -0.857]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257105'].geometry}
        material={materials.FINITION}
        position={[-4.061, -1.793, -0.857]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257106'].geometry}
        material={materials.FINITION}
        position={[-4.041, -1.793, -0.857]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257107'].geometry}
        material={materials.FINITION}
        position={[-3.796, 3.022, -0.836]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257108'].geometry}
        material={materials.FINITION}
        position={[-3.964, 8.188, -0.858]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257109'].geometry}
        material={materials.FINITION}
        position={[-3.964, -2.144, -0.858]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257110'].geometry}
        material={materials.FINITION}
        position={[-1.292, -2.21, -0.847]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257111'].geometry}
        material={materials.FINITION}
        position={[-1.236, -2.186, -0.77]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257112'].geometry}
        material={materials.FINITION}
        position={[-1.235, -2.217, -0.875]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257113'].geometry}
        material={materials.FINITION}
        position={[-1.303, -2.244, -0.839]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257114'].geometry}
        material={materials.FINITION}
        position={[-1.303, -2.179, -0.839]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257115'].geometry}
        material={materials.FINITION}
        position={[-1.3, -2.213, -0.88]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257116'].geometry}
        material={materials.FINITION}
        position={[-1.234, -2.164, -0.785]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257117'].geometry}
        material={materials.FINITION}
        position={[-1.234, -2.25, -0.874]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257118'].geometry}
        material={materials.FINITION}
        position={[0.235, -2.252, -0.886]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257119'].geometry}
        material={materials.FINITION}
        position={[1.666, -2.234, -0.901]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__257120'].geometry}
        material={materials.FINITION}
        position={[0.284, -2.237, -0.865]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['S45SC01+RP__25731'].geometry}
        material={materials['GLASS.001']}
        position={[-2.612, 3.052, -0.872]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mood_Pro_Fixed_Round_195.geometry}
        material={materials.patalok}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mood_Pro_Fixed_Round_199.geometry}
        material={materials.patalok}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mood_Pro_Fixed_Round_191.geometry}
        material={materials.patalok}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box010.geometry}
        material={materials['Material #2147483646']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder412.geometry}
        material={materials['15 - BATHDECOR2']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder413.geometry}
        material={materials['15 - BATHDECOR3']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder414.geometry}
        material={materials['15 - BATHDECOR4']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh013.geometry}
        material={materials.FINITION}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh013_1.geometry}
        material={materials['Material #013']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh013_2.geometry}
        material={materials['Material #-2147483648']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh013_3.geometry}
        material={materials['Material #-2147483648']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh013_4.geometry}
        material={materials['Material #-2147483648']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh062.geometry}
        material={materials['Ekinex v3']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh062_1.geometry}
        material={materials['Ekinex v9']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh046.geometry}
        material={materials['Material #53']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh046_1.geometry}
        material={materials['Material #53.002']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh016.geometry}
        material={materials['Material #44']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh016_1.geometry}
        material={materials['Material #84']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh016_2.geometry}
        material={materials['Material #47']}
      />
      <mesh castShadow receiveShadow geometry={nodes.Mesh019.geometry} material={materials.tbz} />
      <mesh castShadow receiveShadow geometry={nodes.Mesh019_1.geometry} material={materials.tb} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh019_2.geometry}
        material={materials.tb_2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh015.geometry}
        material={materials['Material #803']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh015_1.geometry}
        material={materials['Material #799']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh015_2.geometry}
        material={materials['Material #2147483647']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh015_3.geometry}
        material={materials['Material #-2147483648']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh017.geometry}
        material={materials['Receveur.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh017_1.geometry}
        material={materials['Receveur_black.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh041.geometry}
        material={materials['Reggiani white f445']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh041_1.geometry}
        material={materials['Glass uh34']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh043.geometry}
        material={materials['Reggiani white f445']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh043_1.geometry}
        material={materials['Glass uh34']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh039.geometry}
        material={materials['Reggiani white f445']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh039_1.geometry}
        material={materials['Glass uh34']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh030.geometry}
        material={materials.ytetfrrt122}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh030_1.geometry}
        material={materials.ytetfrrt1223}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh025.geometry}
        material={materials['16 - CoronaMt']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh025_1.geometry}
        material={materials['Material #26']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh025_2.geometry}
        material={materials['Wine White']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh025_3.geometry}
        material={materials['01 - CoronaMtl2']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh026.geometry}
        material={materials.etic__2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh026_1.geometry}
        material={materials.plast1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh026_2.geometry}
        material={materials['04 - CoronaMtl']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh026_3.geometry}
        material={materials.stec1_}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh026_4.geometry}
        material={materials.stec1_1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh027.geometry}
        material={materials['04 - CoronaMtl']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh027_1.geometry}
        material={materials.plast1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh027_2.geometry}
        material={materials.etic_2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh027_3.geometry}
        material={materials.stec1_3}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh028.geometry}
        material={materials['02 - Zara Home_decorative_shampoo']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh028_1.geometry}
        material={materials['02 - Zara Home_hair_conditioner_logo_2']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh028_2.geometry}
        material={materials['02 - Zara Home_hair_conditioner_logo']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh028_3.geometry}
        material={materials['02 - Zara Home_decorative_shampo']}
      />
    </group>
  )
}

useGLTF.preload('./files/sb4.glb')