import { create } from 'zustand';
import { getConfiguratorDatabyAPI, sendConfiguratorDatabyAPI } from '../api/api';

import {formatSendingPayload, formatSelectionByDefault} from '../api/formatPayload';

const useConfiguratorStore = create((set, get) => ({

    data: null,
    isLoading: false,
    error: null,
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
    visualisation: {
        img: null,
        products: null,
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

    //API - first call to load data from the API and set the default selection
    
    loadConfiguratorData: async () => {
        set({ isLoading: true })

        const data = await getConfiguratorDatabyAPI()

        set({
            data,
            // selection: formatSelectionByDefault(data),
            isLoading: false,
        })
        console.log('data from API:', data)
    },

    sendConfiguratorData: async () => {
        set({ isLoading: true })

        const { selection, data } = get();

        console.log('data sent to API:', selection, data)

        const formattedPayload = formatSendingPayload(selection, data)

        const response = await sendConfiguratorDatabyAPI(formattedPayload)

        set({
            visualisation: response, 
            isLoading: false,
        })
        
    }

}));

export default useConfiguratorStore