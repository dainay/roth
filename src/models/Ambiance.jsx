import React, { useRef, useLayoutEffect } from 'react'
import { useGLTF, useTexture, Outlines, Edges } from '@react-three/drei'
import * as THREE from 'three'

import { SERIGRAPHIE, NICHES, VIPANEL_TEXTURES, RECEVEUR_TEXTURES, SHOWER_TYPES, FINITIONS, PROFILES } from '../conf/textures'
import useConfiguratorStore from '../store/useConfiguratorStore';
import useSceneStore from '../store/useSceneStore';

export function Ambiance(props) {
  const { nodes, materials } = useGLTF('./models/Ambiance_compressed.glb')
  const toggleMirrorLight = useSceneStore((state) => state.toggleMirrorLight);

  const finition = useConfiguratorStore((state) => state.finition);
  const profile = useConfiguratorStore((state) => state.profile);
  const wall = useConfiguratorStore((state) => state.wall);
  const vipanelleft = useConfiguratorStore((state) => state.vipanelleft);
  const vipanelright = useConfiguratorStore((state) => state.vipanelright);
  const vipanelniche = useConfiguratorStore((state) => state.vipanelniche);
  const receveur = useConfiguratorStore((state) => state.receveur);
  const shower = useConfiguratorStore((state) => state.shower);
  const serigraphie = useConfiguratorStore((state) => state.serigraphie);
  const nicheColor = useConfiguratorStore((state) => state.nicheColor);

  // console.log('STORE', 'nich color:', nicheColor, 'serigraphie:', serigraphie, 'finition:', finition, 'profile:', profile, 'wall:', wall, 'vipanelleft:', vipanelleft, 'vipanelright:', vipanelright, 'vipanelniche:', vipanelniche, 'receveur:', receveur, 'shower:', shower);

  const handlePointerEnter = (e) => {
    e.stopPropagation()
    document.body.style.cursor = 'pointer'
    console.log('Pointer entered the light area');
  }

  const handlePointerLeave = (e) => {
    e.stopPropagation()
    document.body.style.cursor = 'default'
  }

  //************************************* */
  //CHANGE Finition MATERIAL
  //************************************* */
  useLayoutEffect(() => {
    const mFinition = materials['+FINITION']
    const finitionData = FINITIONS.find(item => item.id === finition)
    console.log('FINITION DATA', finitionData)

    if (!mFinition || !finitionData) return

    mFinition.roughness = finitionData.roughness
    mFinition.metalness = finitionData.metalness
    mFinition.color.set(finitionData.color)

    mFinition.needsUpdate = true
  }, [materials, finition])

  //************************************* */
  //CHANGE Niche MATERIAL
  //************************************* */
  useLayoutEffect(() => {
    const mNiche = materials['+NICHE']
    const nicheData = NICHES.find(item => item.id === nicheColor)
    console.log('NICHE DATA', nicheData)

    if (!mNiche || !nicheData) return

    mNiche.color.set(nicheData.color)
    mNiche.metalness = 0.4
    mNiche.roughness = 0.5

    mNiche.needsUpdate = true
  }, [materials, nicheColor])

  //************************************* */
  //CHANGE profile MATERIAL
  //************************************* */
  useLayoutEffect(() => {
    const mProfile = materials['+PROFILE']
    const profileData = PROFILES.find(item => item.id === profile)
    // console.log('PROFILE DATA', profileData)

    if (!mProfile || !profileData) return

    mProfile.roughness = profileData.roughness
    mProfile.metalness = profileData.metalness
    mProfile.color.set(profileData.color)

    mProfile.needsUpdate = true
  }, [materials, profile])

  useLayoutEffect(() => {
    const mGlass = materials['+GLASS']

    if (!mGlass) return

    mGlass.roughness = 0.08
    mGlass.metalness = 1
    mGlass.depthWrite = false
    mGlass.transparent
    mGlass.opacity = 0.2
    mGlass.color.set(new THREE.Color("#ffffff"))

    mGlass.needsUpdate = true
  }, [])

  //************************************* */
  //CHANGE SERIGRAPHIE MATERIAL
  //************************************* */ 

  const serigraphieTextureArray = useTexture(
    SERIGRAPHIE.map((item) => item.url)
  )
  const serigraphieTexturesById = Object.fromEntries(
    SERIGRAPHIE.map((item, index) => [
      item.id,
      serigraphieTextureArray[index],
    ])
  )

  useLayoutEffect(() => {
    const mSerigraphie = materials['GLASS.002']
    const tSerigraphie = serigraphieTexturesById[serigraphie]

    if (!mSerigraphie || !tSerigraphie) return

    tSerigraphie.flipY = false

    // like Blender Mapping Scale X/Y
    tSerigraphie.repeat.set(0.75, 1)

    mSerigraphie.map = tSerigraphie
    mSerigraphie.color.set('#ffffff')

    mSerigraphie.needsUpdate = true
    tSerigraphie.needsUpdate = true
  }, [materials, serigraphie, serigraphieTexturesById])



  //************************************* */
  //CHANGE RECEVEUR MATERIAL
  //************************************* */ 

  const receveurTextureArray = useTexture(
    RECEVEUR_TEXTURES.map((item) => item.url)
  )
  const receveurTexturesById = Object.fromEntries(
    RECEVEUR_TEXTURES.map((item, index) => [
      item.id,
      receveurTextureArray[index],
    ])
  )


  useLayoutEffect(() => {
    const mReceveur = materials['+RECEVUER']
    const tReceveur = receveurTexturesById[receveur]

    if (!mReceveur || !tReceveur) return

    tReceveur.flipY = false

    // like Blender Mapping Scale X/Y
    tReceveur.repeat.set(0.75, 1)

    mReceveur.map = tReceveur
    mReceveur.color.set('#ffffff')
    mReceveur.roughness = 0.9
    mReceveur.metalness = 0

    mReceveur.needsUpdate = true
    tReceveur.needsUpdate = true
  }, [materials, receveur, receveurTexturesById])


  //************************************* */
  //CHANGE left VIPANEL MATERIAL
  //************************************* */

  const vipanelTextureArray = useTexture(
    VIPANEL_TEXTURES.map((item) => item.url)
  )
  const vipanelTexturesById = Object.fromEntries(
    VIPANEL_TEXTURES.map((item, index) => [
      item.id,
      vipanelTextureArray[index],
    ])
  )

  useLayoutEffect(() => {
    const mVipanel = materials['VIPANEL-BIG-left']
    const tVipanel = vipanelTexturesById[vipanelleft]
    const vipanelData = VIPANEL_TEXTURES.find(item => item.id === vipanelleft)

    if (!mVipanel || !tVipanel) return

    tVipanel.flipY = false

    // like Blender Mapping Scale X/Y
    tVipanel.repeat.set(1, 1)

    mVipanel.map = tVipanel
    mVipanel.color.set('#ffffff')
    mVipanel.roughness = vipanelData.roughness
    mVipanel.metalness = vipanelData.metalness

    mVipanel.needsUpdate = true
    tVipanel.needsUpdate = true
  }, [materials, vipanelleft, vipanelTexturesById])

  useLayoutEffect(() => {
    const mVipanel = materials['VIPANEL-BIG-right']
    const tVipanel = vipanelTexturesById[vipanelright]
    const vipanelData = VIPANEL_TEXTURES.find(item => item.id === vipanelright)

    if (!mVipanel || !tVipanel) return

    tVipanel.flipY = false

    // like Blender Mapping Scale X/Y
    tVipanel.repeat.set(1, 1)

    mVipanel.map = tVipanel
    mVipanel.color.set('#ffffff')
    mVipanel.roughness = vipanelData.roughness
    mVipanel.metalness = vipanelData.metalness

    mVipanel.needsUpdate = true
    tVipanel.needsUpdate = true
  }, [materials, vipanelright, vipanelTexturesById])

  useLayoutEffect(() => {
    const mVipanel = materials['VIPANEL-BIG']
    const tVipanel = vipanelTexturesById[vipanelniche]
    const vipanelData = VIPANEL_TEXTURES.find(item => item.id === vipanelniche)

    if (!mVipanel || !tVipanel) return

    tVipanel.flipY = false

    // like Blender Mapping Scale X/Y
    tVipanel.repeat.set(1, 1)

    mVipanel.map = tVipanel
    mVipanel.color.set('#ffffff')
    mVipanel.roughness = vipanelData.roughness
    mVipanel.metalness = vipanelData.metalness

    mVipanel.needsUpdate = true
    tVipanel.needsUpdate = true
  }, [materials, vipanelniche, vipanelTexturesById])


  return (
    <group {...props} dispose={null}>


      <mesh
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials['+WHITE WOOD']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={materials['+RECEVUER']}
        position={[-0.02, 0.002, 0]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={materials['+WHITE WOOD']}
      />
      <mesh
        geometry={nodes.Cube005.geometry}
        material={materials['+BLACK Metall']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube006.geometry}
        material={materials['Light Onyx Marble']}
      >
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Faucet.geometry}
        material={materials['+FINITION']}
      />
      <mesh
        castShadow
        geometry={nodes.pot.geometry}
        material={materials['+GLASS VOLUME']}
        position={[-0.009, 0.008, 0.008]}
      />
      <mesh
        geometry={nodes.Soap001.geometry}
        material={materials['+CEILING']}
        position={[-1.878, 0.636, -1.152]}
        rotation={[0.036, 0.034, 0.039]}
      />
      <mesh
        geometry={nodes.Soaps.geometry}
        material={materials.PLASTIC_CAP}
        position={[-0.004, 0, 0.024]}
      />
      <mesh
        castShadow
        geometry={nodes.Aroma_1.geometry}
        material={materials['+BROWB GLASS']}
      />
      <mesh castShadow geometry={nodes.Aroma_2.geometry} material={materials.Wood} />
      <mesh
        receiveShadow
        geometry={nodes.Aroma_3.geometry}
        material={materials['white ncj1n .001']}
      />
      <mesh
        castShadow
        geometry={nodes.Aroma_4.geometry}
        material={materials['+PLASTIC BLACK']}
      />
      <mesh
        geometry={nodes.Holder_1.geometry}
        material={materials['+BLACK Metall']}
      />
      <mesh
        geometry={nodes.Holder_2.geometry}
        material={materials['+FINITION']}
      />
      <mesh
        geometry={nodes.Mirror_1.geometry}
        material={materials['+MIRROR']}
      />
      <mesh
        castShadow
        geometry={nodes.Mirror_2.geometry}
        material={materials['+LUMIERE']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sink_1.geometry}
        material={materials['+SINK']}
      />
      <mesh
        geometry={nodes.Sink_2.geometry}
        material={materials['+FINITION']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Towel_4_1.geometry}
        material={materials['+TOWEL-GREY']}
      />
      <mesh
        castShadow
        geometry={nodes.Towel_4_2.geometry}
        material={materials['+TOWEL-WHITE']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Towel_5_1.geometry}
        material={materials['+TOWEL-GREY']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Towel_5_2.geometry}
        material={materials['+TOWEL-WHITE']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Towel_6_1.geometry}
        material={materials['+TOWEL-GREY']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Towel_6_2.geometry}
        material={materials['+TOWEL-WHITE']}
      />
      <mesh
        castShadow
        geometry={nodes.Decoration_vases_with_pampas001.geometry}
        material={materials['+GLASS VOLUME']}
        position={[-0.04, 0, 0]}>
        <mesh
          castShadow
          geometry={nodes.pampas_twigs005.geometry}
          material={materials['+PLUME']}
        />
        <mesh
          castShadow
          geometry={nodes.pampas_twigs007.geometry}
          material={materials['+PLUME']}
        />
        <mesh
          castShadow
          geometry={nodes.pampas_twigs009.geometry}
          material={materials['+PLUME']}
        />
      </mesh>
      <group position={[0, 0.001, 0]}>
        <mesh
          castShadow
          geometry={nodes.Body001.geometry}
          material={materials['+PARFUM']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cap.geometry}
          material={materials.PLASTIC_CAP}
        />
        <mesh
          geometry={nodes.Liquid.geometry}
          material={materials['+PARFUM']}
        />
      </group>
      <group
        onClick={(e) => {
          e.stopPropagation()
          toggleMirrorLight(false)
        }} 
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        position={[-1.794, 2.172, 0.138]} rotation={[0, 0, Math.PI]} scale={1.517}>
        <group position={[0, 0.566, 0]}>
          <mesh
            geometry={nodes.ampoule_1004_1.geometry}
            material={materials['+GLASS']}
          />
          <mesh
            geometry={nodes.ampoule_1004_2.geometry}
            material={materials['+LUMIERE']}
          />
          <mesh
            geometry={nodes.ampoule_1004_3.geometry}
            material={materials['+MIRROR']}
          />
          <mesh
            castShadow
            geometry={nodes.ampoule_1004_4.geometry}
            material={materials['+FINITION']}
          />

          <mesh
            castShadow
            geometry={nodes.ampoule_1004_5.geometry}
            material={materials['+GLASS VOLUME']}
          />
        </group>
      </group>

      {shower === 'pp' && wall && (
        //pivotante en niche
        <group >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['+_Pastel__PASTEL_PLPIF_1200X2000__2'].geometry}
            material={materials['+FINITION']}
          />
          <mesh
            geometry={nodes['+_Pastel__PASTEL_PLPIF_1200X2000__3'].geometry}
            material={materials['+GLASS']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['+_Pastel__PASTEL_PLPIF_1200X2000__4'].geometry}
            material={materials['+ PROTECTION']}
          />
          <group className="door-group" position={[-0.983, 0.669, -1.657]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Door001_1.geometry}
              material={materials['+FINITION']}
            />
            <mesh
              geometry={nodes.Door001_2.geometry}
              material={materials['+GLASS']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Door001_3.geometry}
              material={materials['+ PROTECTION']}
            />
          </group>
        </group>
      )}

      {shower === 'pp' && !wall && (
        //pivotante avec prolongation avec paroi fixe
        <group position={[-0.883, -0.186, -1.678]}>
          <mesh
            geometry={
              nodes['+_Pastel__PASTEL_PLPIF_1200X2000_+_PLTWU_prolongation_900x2000_2'].geometry
            }
            material={materials['+ PROTECTION']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes['+_Pastel__PASTEL_PLPIF_1200X2000_+_PLTWU_prolongation_900x2000_3'].geometry
            }
            material={materials['+FINITION']}
          />
          <mesh
            geometry={
              nodes['+_Pastel__PASTEL_PLPIF_1200X2000_+_PLTWU_prolongation_900x2000_4'].geometry
            }
            material={materials['+GLASS']}
          />
          <group position={[-0.06, 0.859, 0.02]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Door002_1.geometry}
              material={materials['+FINITION']}
            />
            <mesh
              geometry={nodes.Door002_2.geometry}
              material={materials['+GLASS']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Door002_3.geometry}
              material={materials['+ PROTECTION']}
            />
          </group>
        </group>
      )}

      {shower === 'f' && (
        <group position={[-1.443, -0.316, -1.662]} rotation={[1.567, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Fixe_1000x2000_2.geometry}
            material={materials['+FINITION']}
          />
          <mesh
            geometry={nodes.Fixe_1000x2000_3.geometry}
            material={materials['+GLASS']}
          />
          <mesh
            geometry={nodes.Fixe_1000x2000_4.geometry}
            material={materials['+ PROTECTION']}
          />
        </group>
      )}


      {shower !== 'f' && wall && (
        //nichewall
        <group position={shower === 'p' ? [-0.266, 0, -1.243] : [-0.097, 0, -1.243]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.shower_profile_FIXED001.geometry}
            material={materials['+PROFILE']}
            position={[-1.767, 0, -0.281]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.shower_profile_FIXED002.geometry}
            material={materials['+PROFILE']}
            position={[0.075, 0.014, 1.307]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['vp-n3'].geometry}
            material={materials['VIPANEL-BIG']}
            position={[-0.145, 0.917, -0.815]}
            rotation={[0, -1.571, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['vp-r1'].geometry}
            material={materials['VIPANEL-BIG-right']}
            position={[-0.041, 0.917, -0.314]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['vp-r2'].geometry}
            material={materials['VIPANEL-BIG-right']}
            position={[0.041, 0.917, -0.817]}
            rotation={[0, 1.571, 0]}
          />
        </group>
      )}

      {shower === 'p' && wall && (
        //pivotante avec prolongation sans paroi fixe
        <group position={[-0.43, -0.319, -1.669]} scale={0.999}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Pastel__PLPV_Pivotante_1000x2000__2.geometry}
            material={materials['+FINITION']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Pastel__PLPV_Pivotante_1000x2000__3.geometry}
            material={materials['+ PROTECTION']}
          />
          <group position={[-0.957, 1.012, 0.004]} rotation={[1.575, 0, -Math.PI / 2]} scale={1.001}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Door004_1.geometry}
              material={materials['+FINITION']}
            />
            <mesh
              geometry={nodes.Door004_2.geometry}
              material={materials['+GLASS']}
            />
          </group>
        </group>
      )}

      {shower === 'p' && !wall && (
        <group>
          <group position={[-1.401, 0.689, -1.638]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Door_1.geometry}
              material={materials['+FINITION']}
            />
            <mesh
              geometry={nodes.Door_2.geometry}
              material={materials['+GLASS']}
            />
          </group>
          <group position={[-0.447, 1.681, -2.517]} rotation={[-3.137, Math.PI / 2, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes['Pastel__PLPV_Pivotante_1000x2000_+_PLFXP_900x2000_2'].geometry}
              material={materials['+ PROTECTION']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes['Pastel__PLPV_Pivotante_1000x2000_+_PLFXP_900x2000_3'].geometry}
              material={materials['+FINITION']}
            />
            <mesh
              geometry={nodes['Pastel__PLPV_Pivotante_1000x2000_+_PLFXP_900x2000_4'].geometry}
              material={materials['+GLASS']}
            />
          </group>
        </group>
      )}

      {shower === 'c' && wall && (
        <group>
          <group position={[-0.673, 0.751, -1.676]}>
            <mesh
              geometry={nodes.MovingDoor003_1.geometry}
              material={materials['+GLASS']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.MovingDoor003_2.geometry}
              material={materials['+FINITION']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.MovingDoor003_3.geometry}
              material={materials['+ PROTECTION']}
            />
          </group>

          <group position={[-0.825, 0.755, -1.689]}>
            <mesh
              geometry={nodes.PL_CLS_1200x2000_2.geometry}
              material={materials['+GLASS']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.PL_CLS_1200x2000_3.geometry}
              material={materials['+ PROTECTION']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.PL_CLS_1200x2000_4.geometry}
              material={materials['+FINITION']}
            />
          </group>
        </group>
      )}

      {shower === 'c' && !wall && (
        <group position={[-0.824, 0.749, -1.696]}>
          <mesh
            geometry={nodes['PL_CLS_1200x2000_+_Fixe_900x2000_2'].geometry}
            material={materials['+GLASS']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['PL_CLS_1200x2000_+_Fixe_900x2000_3'].geometry}
            material={materials['+ PROTECTION']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['PL_CLS_1200x2000_+_Fixe_900x2000_4'].geometry}
            material={materials['+FINITION']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['PL_CLS_1200x2000_+_Fixe_900x2000_5'].geometry}
            material={materials['+ PROTECTION']}
          />
          <group position={[0.151, 0.015, 0]}>
            <mesh
              geometry={nodes.MovingDoor002_1.geometry}
              material={materials['+GLASS']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.MovingDoor002_2.geometry}
              material={materials['+FINITION']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.MovingDoor002_3.geometry}
              material={materials['+ PROTECTION']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.MovingDoor002_4.geometry}
              material={materials['+ PROTECTION']}
            />
          </group>
        </group>
      )}

      <group position={[-1.582, -0.346, 0.341]} rotation={[-0.116, 1.032, 0.144]} scale={1.173}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Banana__Plants001_1.geometry}
          material={materials['+Plant_Banan']}
        />
        <mesh
          castShadow
          geometry={nodes.Banana__Plants001_2.geometry}
          material={materials['+PLASTIC BLACK']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Banana__Plants001_3.geometry}
          material={materials.Plant_Matti}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Banana__Plants001_4.geometry}
          material={materials.Plant_Dali}
        />
      </group>

      <mesh
        geometry={nodes.profile.geometry}
        material={materials['+PROFILE']}
        position={[-1.412, 0, 0.064]}
      />

      {(shower === 'c' || shower === 'pp') && (
        <group position={[-1.169, -0.328, -2.104]}>
          <mesh
            receiveShadow
            geometry={nodes.Natura_1200x900_2.geometry}
            material={materials['+RECEVUER']}
          />
        </group>
      )}
      {(shower === 'f') && (
        <group position={[-1.076, -0.324, -2.086]}>
          <mesh
            receiveShadow
            geometry={nodes.Natura_1600x900_2.geometry}
            material={materials['+RECEVUER']}
          />

        </group>
      )}

      {(shower === 'p') && (
        <group position={[-1.199, -0.328, -2.104]} scale={[1.025, 1, 1]}>
          <mesh
            receiveShadow
            geometry={nodes.Natura_100x900.geometry}
            material={materials['+RECEVUER']}
          />

        </group>
      )}



      <mesh
        geometry={nodes.Back_wall.geometry}
        material={nodes.Back_wall.material}
        position={[-1.968, 0.922, -2.597]}
      />
      <mesh
        // castShadow
        receiveShadow
        geometry={nodes.Ceiling.geometry}
        material={materials['+CEILING']}
        position={[-2.063, 2.21, -2.614]}
      />

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Corner.geometry}
        material={nodes.Corner.material}
        position={[-1.696, 0.922, -2.555]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Floor.geometry}
        material={materials['Marble floor']}
        position={[-2.165, -0.361, -2.545]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Right_wall.geometry}
        material={nodes.Right_wall.material}
        position={[-2.003, 0.91, -2.58]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Shower_system_1.geometry}
        material={materials['+FINITION']}
      />
      <mesh
        geometry={nodes.Shower_system_2.geometry}
        material={materials['+BLACK Metall']}
      />
      <mesh
        geometry={nodes.Shower_system_3.geometry}
        material={materials['+BLACK Metall']}
      />
      <mesh
        geometry={nodes.Shower_system_4.geometry}
        material={materials['+BLACK Metall']}
      />
      <mesh
        castShadow
        geometry={nodes.Towel_hanger_rpund_1.geometry}
        material={materials['+FINITION']}
        position={[-1.654, 1.019, -1.519]}>
        <group position={[1.654, -1.019, 1.519]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.towel005001_1.geometry}
            material={materials['+TOWEL-WHITE']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.towel005001_2.geometry}
            material={materials['+TOWEL-BROWN']}
          />
        </group>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Towle.geometry}
        material={materials['+TOWEL-WHITE']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube016.geometry}
        material={materials['+FINITION']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.towel001_1.geometry}
        material={materials['+TOWEL-WHITE']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.towel001_2.geometry}
        material={materials['+TOWEL-BROWN']}
      />

      {(nicheColor !== 'None' && shower !== 'p') && (
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['Vipanel-niche'].geometry}
          material={materials['VIPANEL-BIG']}
          position={[-0.809, 0.917, -2.554]}
          scale={[1, 1, 0.1]}>
          <mesh
            receiveShadow
            geometry={nodes.Niche_910x305x68.geometry}
            material={materials['+NICHE']}
            position={[-0.018, 0.136, -0.211]}
            scale={[0.441, 0.148, 0.348]}
          />
          <group position={[-0.188, 0.042, -0.197]} scale={[1, 1, 10]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Niche_Bottles_1.geometry}
              material={materials['+PLASTIC BLACK']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Niche_Bottles_2.geometry}
              material={materials['+PLASTIC BLACK']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Niche_Bottles_3.geometry}
              material={materials['+BROWB GLASS']}
            />
            <group position={[0.392, 0.006, -0.003]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Bath_soak_Cap001003_1.geometry}
                material={materials['+PLASTIC BLACK']}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Bath_soak_Cap001003_2.geometry}
                material={materials['+GLASS']}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Bath_soak_Cap001003_3.geometry}
                material={materials.Bathroom_set_2_Label}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Bath_soak_Cap001003_4.geometry}
                material={materials['+CEILING']}
              />
            </group>
            <group position={[-0.111, 0.013, -0.005]}>
              <mesh

                receiveShadow
                geometry={nodes.Bottle_3002_1.geometry}
                material={materials['+ETIQUETTE1']}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Bottle_3002_2.geometry}
                material={materials['+BROWB GLASS']}
              />
              <mesh
                geometry={nodes.Bottle_3002_3.geometry}
                material={materials['+GEL']}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Bottle_3002_4.geometry}
                material={materials['+PLASTIC BLACK']}
              />
            </group>
            <group position={[0.321, 0.01, 0.003]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Meraki_conditioner_Cap001002_1.geometry}
                material={materials['+PLASTIC BLACK']}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Meraki_conditioner_Cap001002_2.geometry}
                material={materials['+GLASS']}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Meraki_conditioner_Cap001002_3.geometry}
                material={materials['+CEILING']}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Meraki_conditioner_Cap001002_4.geometry}
                material={materials.Bathroom_set_2_Label}
              />
            </group>
            <mesh
              geometry={nodes.Soap.geometry}
              material={materials['+CEILING']}
              position={[0.141, -0.047, -0.005]}
              scale={0.744}
            />
          </group>



        </mesh>
      )}

      <mesh
        geometry={nodes.Soap.geometry}
        material={materials['+CEILING']}
        position={[-1, 2.17, -2]}
        scale={[1.5, 1, 1.5]}
      />
      <mesh
        receiveShadow
        geometry={nodes['vp-l1'].geometry}
        material={materials['VIPANEL-BIG-left']}
        position={[-1.944, 0.917, 0.691]}
      />
      <mesh
        receiveShadow
        geometry={nodes['vp-l2'].geometry}
        material={materials['VIPANEL-BIG-left']}
        position={[-1.943, 0.917, -0.806]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1, 0.1]}
      />
      <mesh
        receiveShadow
        geometry={nodes['vp-l3'].geometry}
        material={materials['VIPANEL-BIG-left']}
        position={[-2.199, 0.917, -1.558]}
        scale={[1, 1, 0.1]}
      />
      <mesh
        receiveShadow
        geometry={nodes['vp-n1'].geometry}
        material={materials['VIPANEL-BIG']}
        position={[-1.446, 0.917, -2.311]}
      />
      {(nicheColor === 'None' || shower === 'p') && (
        <mesh
          receiveShadow
          geometry={nodes['vp-n2'].geometry}
          material={materials['VIPANEL-BIG']}
          position={[-0.81, 0.917, -2.555]}
          scale={[1, 1, 0.1]}
        />
      )}
      <mesh
        receiveShadow
        geometry={nodes['vp-r3'].geometry}
        material={materials['VIPANEL-BIG-right']}
        position={[0.44, 0.917, -2.554]}
      />
      <mesh
        receiveShadow
        geometry={nodes['vp-r4'].geometry}
        material={materials['VIPANEL-BIG-right']}
        position={[1.682, 0.917, -2.554]}
        scale={[1, 1, 0.1]}
      />
    </group>
  )
}

useGLTF.preload('./models/Ambiance_compressed.glb')

