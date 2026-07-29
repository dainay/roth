import { create } from 'zustand';

const useConfiguratorStore = create((set) => ({
  finition: 'or-brosse',
  profile: 'or',
  niche: true,
  wall: false,
  vipanelleft: 'CAR5AF',
  vipanelright: 'CARP5B',
  vipanelniche: 'CARP5B',
  shower: 'f',
  serigraphie: false,
  receveur: 'soft-white',
  nicheColor: 'white',

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
  setNicheColor: (nicheColor) => set({ nicheColor }),

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
      nicheColor: 'white',
    }),
}));

export default useConfiguratorStore;