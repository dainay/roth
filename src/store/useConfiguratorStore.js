import { create } from 'zustand';

const useConfiguratorStore = create((set) => ({
  finition: 'or-brosse',
  profile: 'white',
  niche: true,
  wall: false,
  vipanelleft: 'marble',
  vipanelright: 'marble',
  vipanelniche: 'marble',
  shower: 'f',
  serigraphie: false,
  receveur: 'black',

  setFinition: (finition) => set({ finition }), 
  setProfile: (profile) => set({ profile }), 
  setNiche: (niche) => set({ niche }), 
  toggleNiche: () => set((state) => ({ niche: !state.niche })), 
  setWall: (wall) => set({ wall }), 
  toggleWall: () => set((state) => ({ wall: !state.wall })), 
  setVipanelLeft: (vipanelleft) => set({ vipanelleft }),
  setVipanelRight: (vipanelright) => set({ vipanelright }),
  setVipanelNiche: (vipanelniche) => set({ vipanelniche }),
  setShower: (shower) => set({ shower }),
  setSerigraphie: (serigraphie) => set({ serigraphie }),
  setReceveur: (receveur) => set({ receveur }),

  reset: () =>
    set({
      finition: 'or-brosse',
      profile: 'white',
      niche: false,
      wall: false,
      vipanelleft: 'marble',
      vipanelright: 'marble',
      vipanelniche: 'marble',
      shower: 'f',
      serigraphie: false,
      receveur: 'black',
    }),
}));

export default useConfiguratorStore;