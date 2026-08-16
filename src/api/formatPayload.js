import { PAROI_ASSETS } from "../conf/lib";

const DEFAULT_PAROI_ID = 'PL WRU'
const DEFAULT_PAROI_FINITION = '4'
const DEFAULT_RECEVEUR_FINITION = 'Soft White'
const DEFAULT_VIPANEL_LEFT = 'Z2'
const DEFAULT_VIPANEL_RIGHT = 'X4'

const findBy = (items, key, value) =>
    items.find((item) => item?.[key] === value) ?? items[0] ?? null


export function formatSendingBody(selection) {
    const hasNiche = Boolean(selection.niche && selection.finitionNiche)

    const body = {
        "scene": "PASTEL02",

        "finition_parois": selection.finitionParoi,
        "verre": selection.verre,

        "parois": [
            { "modele": selection.paroi, "largeur": selection.sizeParoi },
            ...(selection.montage === "angle"
                ? [
                    {
                        "modele": "PL TWU",
                        "largeur": 1000,
                    },
                ]
                : []),
        ],

        "receveur": selection.receveur, 
        "finition_receveur": selection.textureReceveur, 
        "largeur_receveur": selection.sizeReceveur,
        "profondeur_receveur": 900,

        "finition_profile": selection.finitionProfile === null ? 'None' : selection.finitionProfile,

        "finition_niche": hasNiche ? selection.finitionNiche : 'None',
        "largeur_niche": hasNiche ? 910 : 'None',

        "vipanel": {
            "gauche": selection.vipanelLeft,
            "centre": selection.vipanelNiche,
            "droit": selection.vipanelRight
        }
    }
    return body;
}

export function formatSelectionByDefault(data) {
    const defaultParoi = findBy(data.parois, 'id', DEFAULT_PAROI_ID)
    const defaultReceveur = data.receveurs[0] ?? null
    const defaultNiche = data.niches[0] ?? null
    const defaultProfile = data.profiles[0] ?? null
    const defaultVipanelLeft = findBy(
        data.vipanels,
        'decor',
        DEFAULT_VIPANEL_LEFT
    )
    const defaultVipanelRight = findBy(
        data.vipanels,
        'decor',
        DEFAULT_VIPANEL_RIGHT
    )
    const paroiFinitions = defaultParoi?.finitionsDisponibles ?? []
    const defaultParoiFinition = findBy(
        paroiFinitions,
        'code',
        DEFAULT_PAROI_FINITION
    )
    const receveurFinitions = defaultReceveur?.finitionsDisponibles ?? []

    const defaultSelection = {
        paroi: defaultParoi?.id ?? null,
        finitionParoi: defaultParoiFinition?.code ?? null,
        verre: defaultParoi?.verresDisponibles?.[0] ?? null,
        sizeParoi: PAROI_ASSETS[defaultParoi?.id]?.size ?? 1200,

        receveur: defaultReceveur?.id ?? null,
        textureReceveur: receveurFinitions.includes(DEFAULT_RECEVEUR_FINITION)
            ? DEFAULT_RECEVEUR_FINITION
            : receveurFinitions[0] ?? null,
        sizeReceveur: PAROI_ASSETS[defaultParoi?.id]?.sizeReceveurWithParoi ?? 1200,

        vipanelLeft: defaultVipanelLeft?.decor ?? null,
        vipanelRight: defaultVipanelRight?.decor ?? null,
        vipanelNiche: defaultVipanelRight?.decor ?? null,

        niche: defaultNiche?.id ?? null,
        finitionNiche: defaultNiche?.finitionsDisponibles?.[0] ?? null,

        montage: "angle",

        profile: defaultProfile?.id ?? null,
        finitionProfile: defaultProfile?.finitionsDisponibles?.[0] ?? null,

        triptychLeft: 'None',
        triptychRight: 'None',
    }

    return defaultSelection
}
