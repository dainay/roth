import { PAROI_ASSETS } from "../conf/lib";


export function formatSendingBody(selection) {


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

        "finition_niche": selection.finitionNiche === null ? 'None' : selection.finitionNiche,
        "largeur_niche": selection.finitionProfile === null ? 'None' : 910,

        "vipanel": {
            "gauche": selection.vipanelLeft,
            "centre": selection.vipanelNiche,
            "droit": selection.vipanelRight
        }
    }
    return body;
}

export function formatSelectionByDefault(data) {
    const defaultSelection = {
        paroi: data.parois[4]?.id || null,
        finitionParoi: data.parois[4]?.finitionsDisponibles[2]?.code || data.parois[0]?.finitionsDisponibles[0]?.code || null,
        verre: data.parois[4]?.verresDisponibles[0] || null,
        sizeParoi: PAROI_ASSETS[data.parois[4]?.id]?.size || 1200,

        receveur: data.receveurs[0]?.id || null,
        textureReceveur: data.receveurs[0]?.finitionsDisponibles[3] || null,
        sizeReceveur: PAROI_ASSETS[data.parois[4]?.id]?.sizeReceveurWithParoi || 1200,

        vipanelLeft: data.vipanels[12]?.decor || null,
        vipanelRight: data.vipanels[11]?.decor || null,
        vipanelNiche: data.vipanels[11]?.decor || null,

        niche: data.niches[0]?.id || null,
        finitionNiche: data.niches[0]?.finitionsDisponibles[0] || null,

        montage: "angle",

        profile: data.profiles[0]?.id || null,
        finitionProfile: data.profiles[0]?.finitionsDisponibles[0] || null,

        triptychLeft: 'None',
        triptychRight: 'None',
    }

    console.log('defaultSelection:', defaultSelection)

    return defaultSelection
}