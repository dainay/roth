import { create } from 'zustand';
import { getConfiguratorDatabyAPI, sendConfiguratorDatabyAPI } from '../api/api';

import { formatSendingPayload, formatSelectionByDefault } from '../api/formatPayload';

const useConfiguratorStore = create((set, get) => ({

    currentView: 'configurateur', 

    cleanedData: null,
    isLoading: false,
    error: null,
    selection: {
        paroi: null,
        finitionParoi: null,
        verre: null,
        sizeParoi: null,

        montage: null,

        receveur: null,
        textureReceveur: null,
        sizeReceveur: null,

        vipanelLeft: null,
        vipanelRight: null,
        vipanelNiche: null,

        niche: null,
        finitionNiche: null,

        profile: null,
        finitionProfile: null,

        triptychLeft: null,
        triptychRight: null,
    },

    realImg: null,
    products: null,
    pdf: null,

    setCleanedData: (cleanedData) => set({ cleanedData }),

    setSelectionValue: (key, value) =>
        set((state) => {
            if (key !== "paroi") {
                return {
                    selection: {
                        ...state.selection,
                        [key]: value,
                    },
                };
            }

            const nextParoi = state.cleanedData?.parois?.find(
                (item) => item.id === value
            );

            if (!nextParoi) {
                return {
                    selection: {
                        ...state.selection,
                        paroi: value,
                    },
                };
            }

            const availableFinitions =
                nextParoi.finitionsDisponibles ?? [];

            const availableVerres =
                nextParoi.verresDisponibles ?? [];

            const availableMontages = [];

            if (nextParoi["montage en angle"]) {
                availableMontages.push("angle");
            }

            if (nextParoi["montage en niche"]) {
                availableMontages.push("niche");
            }

            const keepOrUseFirst = (currentValue, availableValues) =>
                availableValues.includes(currentValue)
                    ? currentValue
                    : availableValues[0] ?? null;

            return {
                selection: {
                    ...state.selection,

                    paroi: value,

                    finitionParoi: keepOrUseFirst(
                        state.selection.finitionParoi,
                        availableFinitions
                    ),

                    verre: keepOrUseFirst(
                        state.selection.verre,
                        availableVerres
                    ),

                    montage: keepOrUseFirst(
                        state.selection.montage,
                        availableMontages
                    ),

                 
                },
            };
        }),

    setCurrentView: (view) => set({ currentView: view }),

    setRealImg: (img) => set({ realImg: img }),
    setProducts: (products) => set({ products }),
    setPdf: (pdf) => set({ pdf }),

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

        set({
            isLoading: true,
            error: null,
        });

        try {
            const data = await getConfiguratorDatabyAPI();

            const cleanedData = {
                ...data,
                parois: data.parois.filter(
                    (item) => item.id !== "PL FXP" && item.id !== "PL WRL" && item.id !== "PL WRR" && item.id !== "PL 2BT" && item.id !== "PL BAF"
                ),
                vipanels: data.vipanels.filter(
                    (item) => item.files?.["1500x2550"]
                ),
            };

            const selection = formatSelectionByDefault(cleanedData);
            if (!selection) {
                throw new Error('Impossible de créer la sélection par défaut')
            }

            console.log('cleanedData:', cleanedData)

            set({
                cleanedData,
                selection,
                isLoading: false,
            });
        } catch (error) {
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : "Erreur inconnue",
                isLoading: false,
            });
        }
    },

    sendConfiguratorData: async () => {

        const { selection } = get();

        console.log('data sent to API:', selection)
        try {
            const response = await sendConfiguratorDatabyAPI(selection)

            set({
                realImg: response.img,
                products: response.products,
                pdf: response.pdf,
                isLoading: false,
            })

            console.log('response from API:', response)

        } catch (error) {
            console.error("Configurator API error:", error);

            set({
                isLoading: false,
            });

        }
    },
}));

export default useConfiguratorStore