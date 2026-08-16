import { create } from 'zustand';

const useSceneStore = create((set) => ({
    mirrorLight: true,
    lightingType: 0,


    toggleMirrorLight: () => set((state) => ({ mirrorLight: !state.mirrorLight })),
    setLightingType: (type) => set({ lightingType: type }),

    toggleLightingType: () => set((state) => ({
        lightingType: (state.lightingType + 1) % 3,
    })),
}));

export default useSceneStore;
