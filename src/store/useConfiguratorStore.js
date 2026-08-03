import { create } from 'zustand';

const useConfiguratorStore = create((set) => ({

   data: null,
 
  selection: {
    paroi: null,
    largeurParoi: null,
    finitionParoi: null,
    verre: null,

    receveur: null,
    textureReceveur: null,

    vipanelLeft: "dd",
    vipanelRight: "dddd",
    vipanelNiche: "dddd",

    niche: true,
    finitionNiche: null,

    profile: null,
    finitionProfile: null,

    triptychLeft: 'None',
    triptychRight: 'None',
  },

   setData: (data) => set({ data }),

   setSelectionValue: (key, value) =>
    set((state) => ({
      selection: {
        ...state.selection,
        [key]: value
      }
    })),

  setSelection: (partialSelection) =>
    set((state) => ({
      selection: {
        ...state.selection,
        ...partialSelection
      }
    })),

  reset: () =>
    set({
      selection: {
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
        triptychLeft: '',
        triptychRight: '',
      }
    }),
}));

export default useConfiguratorStore;