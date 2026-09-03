import { create } from 'zustand';
import { getConfiguratorDatabyAPI, sendConfiguratorDatabyAPI } from '../api/api';
import { PAROI_ASSETS } from '../conf/lib'
import { formatSendingBody, formatSelectionByDefault } from '../api/formatPayload';

const useConfiguratorStore = create((set, get) => ({

    currentView: 'configurateur',

    cleanedData: null,
    isLoading: false,
    isSubmitting: false,
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
    api_code: null,

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

            const paroiAsset = PAROI_ASSETS[value]

            if (!nextParoi) {
                return {
                    selection: {
                        ...state.selection,
                        paroi: value,
                    },
                };
            }

            const availableFinitions = (nextParoi.finitionsDisponibles ?? [])
                .map((item) => typeof item === 'string' ? item : item?.code)
                .filter(Boolean);

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

                    sizeParoi:
                        paroiAsset?.size ??
                        state.selection.sizeParoi,

                    sizeReceveur:
                        paroiAsset?.sizeReceveurWithParoi ??
                        state.selection.sizeReceveur,

                    verre: keepOrUseFirst(
                        state.selection.verre,
                        availableVerres
                    ),

                    montage: keepOrUseFirst(
                        state.selection.montage,
                        availableMontages
                    ),
                    niche:
                        value === 'PL PIV'
                            ? null
                            : state.selection.niche,

                    finitionNiche:
                        value === 'PL PIV'
                            ? null
                            : state.selection.finitionNiche,


                },
            };
        }),

    setSelectionValues: (values) =>
        set((state) => ({
            selection: {
                ...state.selection,
                ...values,
            },
        })),

    setCurrentView: (view) => set({ currentView: view }),

    restartConfigurator: async () => {
        set({
            currentView: 'configurateur',
            cleanedData: null,
            realImg: null,
            products: null,
            pdf: null,
            error: null,
        })

        await get().loadConfiguratorData()
    },

    //API - first call to load data from the API and set the default selection

    loadConfiguratorData: async () => {
        if (get().isLoading || get().cleanedData) return

        set({
            isLoading: true,
            error: null,
        });
        const hiddenParoiIds = ["PL FXP", "PL WRL", "PL BAF"]

        try {
            const data = await getConfiguratorDatabyAPI();
            console.log('[API] Données reçues du configurateur :', data)

            const cleanedData = {
                ...data,
                parois: data.parois
                    .filter((item) => !hiddenParoiIds.includes(item.id))
                    .map((item) => ({
                        ...item,
                        finitionsDisponibles: [
                            ...(item.finitionsDisponibles ?? []),
                            // {
                            //     code: '999',
                            //     libelle: 'Profilé Acier brossé',
                            // },
                        ],
                        verresDisponibles: [...(item.verresDisponibles ?? [])],
                    })),
                vipanels: data.vipanels.filter(
                    (item) => item.files?.["1500x2550"] && item.files?.["1000x2550"] && item.files?.["1000x2550"].length > 0
                ),
            };

            //delte repeating arrondie fix mergin glasses
            const plWru = cleanedData.parois.find((item) => item.id === 'PL WRU')
            const plWrr = cleanedData.parois.find((item) => item.id === 'PL WRR')

            if (plWru && plWrr) {
                plWru.verresDisponibles = [
                    ...new Set([
                        ...(plWru.verresDisponibles ?? []),
                        ...(plWrr.verresDisponibles ?? []),
                    ]),
                ]

                cleanedData.parois = cleanedData.parois.filter((item) => item.id !== 'PL WRR')
            }

            console.log('[Configurateur] Données nettoyées :', cleanedData)

            const selection = formatSelectionByDefault(cleanedData);
            console.log('[Configurateur] Sélection par défaut :', selection)

            if (
                !selection.paroi ||
                !selection.finitionParoi ||
                !selection.verre ||
                !selection.receveur ||
                !selection.textureReceveur ||
                !selection.vipanelLeft ||
                !selection.vipanelRight ||
                !selection.vipanelNiche
            ) {
                throw new Error('Impossible de créer la sélection par défaut')
            }

            set({
                cleanedData,
                selection,
                isLoading: false,
            });
        } catch (error) {
            if (!error?.alreadyLogged) {
                console.error('[Configurateur] Erreur de chargement :', error)
            }
            set({
                error: 'Impossible de charger le configurateur. Veuillez réessayer.',
                isLoading: false,
            });
        }
    },

    sendConfiguratorData: async () => {
        set({
            isSubmitting: true,
            error: null,
        });
        const { selection } = get();

        const body = formatSendingBody(selection);
        console.log('[API] Données envoyées pour la visualisation :', body)

        try {
            const visualizationData = await sendConfiguratorDatabyAPI(body)
            console.log('[API] Réponse de visualisation reçue :', visualizationData)

            set({
                realImg: visualizationData.img,
                products: visualizationData.products,
                pdf: visualizationData.pdf,
                api_code: visualizationData.api_code,
            })

            return visualizationData
        } catch (error) {
            if (!error?.alreadyLogged) {
                console.error('[API] Erreur de génération de la visualisation :', error)
            }
            set({
                error: 'Impossible de générer la visualisation. Veuillez réessayer.',
            })
            throw error
        } finally {
            set({ isSubmitting: false })
        }
    },
}));

export default useConfiguratorStore
