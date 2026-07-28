
import { useTexture } from '@react-three/drei'
import { VIPANEL_TEXTURES, RECEVEUR_TEXTURES } from '../conf/textures'

useTexture.preload(VIPANEL_TEXTURES.map(t => t.url))
useTexture.preload(RECEVEUR_TEXTURES.map(t => t.url))