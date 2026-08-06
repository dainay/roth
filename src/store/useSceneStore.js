import { create } from 'zustand';

const useSceneStore = create((set) => ({
    mirrorLight: true,
    lighingType: 0,


    toggleMirrorLight: () => set((state) => ({ mirrorLight: !state.mirrorLight })),
    setLightingType: (type) => set({ lighingType: type }),

    toggleLightingType: () => set((state) => ({ lighingType: (state.lighingType + 1) % 3 })),

    setCurrentView: (view) => set({ currentView: view }),
    

    reset: () =>
        set({
            mirrorLight: true,
        }),
}));

export default useSceneStore;