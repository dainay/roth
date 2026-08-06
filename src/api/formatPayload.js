
export function formatSendingPayload(selection, data) {
    // const selectedParoi = data.parois.find(
    //     (item) => item.id === selection.paroi
    // )

    // const selectedFinitionParoi = data.finitionsParois.find(
    //     (item) => item.id === selection.finitionParoi
    // )

    // const selectedVerre = data.verres.find(
    //     (item) => item.id === selection.verre
    // )

    // const selectedReceveur = data.receveurs.find(
    //     (item) => item.id === selection.receveur
    // )

    // const selectedReceveurTexture = selectedReceveur?.textures.find(
    //     (item) => item.id === selection.textureReceveur
    // )

    // const vipanelLeft = data.vipanels.find(
    //     (item) => item.id === selection.vipanelLeft
    // )

    // const vipanelRight = data.vipanels.find(
    //     (item) => item.id === selection.vipanelRight
    // )

    // const vipanelNiche = data.vipanels.find(
    //     (item) => item.id === selection.vipanelNiche
    // )

    // return {
    //     configurator: 'pastel',

    //     products: {
    //         paroi: {
    //             id: selectedParoi?.id,
    //             label: selectedParoi?.label,
    //             model: selectedParoi?.model,
    //             width: selectedParoi?.largeurs?.[0] ?? null,
    //             height: selectedParoi?.hauteur,

    //             finish: {
    //                 id: selectedFinitionParoi?.id,
    //                 label: selectedFinitionParoi?.label,
    //             },

    //             glass: {
    //                 id: selectedVerre?.id,
    //                 label: selectedVerre?.label,
    //             },
    //         },

    //         receveur: {
    //             id: selectedReceveur?.id,
    //             label: selectedReceveur?.label,

    //             texture: {
    //                 id: selectedReceveurTexture?.id,
    //                 label: selectedReceveurTexture?.label,
    //             },
    //         },

    //         vipanels: [
    //             {
    //                 zone: 'left',
    //                 id: vipanelLeft?.id,
    //                 label: vipanelLeft?.label,
    //             },
    //             {
    //                 zone: 'right',
    //                 id: vipanelRight?.id,
    //                 label: vipanelRight?.label,
    //             },
    //             {
    //                 zone: 'niche',
    //                 id: vipanelNiche?.id,
    //                 label: vipanelNiche?.label,
    //                 enabled: selection.niche,
    //             },
    //         ],
    //     },

    //     rawSelection: selection,
    // }
}

export function formatSelectionByDefault(data) {
    
    const defaultSelection = {
        paroi: data.parois[2]?.id || null,
        finitionParoi: data.parois[0]?.finitionsDisponibles[4] || data.parois[0]?.finitionsDisponibles[0] || null, 
        verre:  data.parois[0]?.verresDisponibles[0] || null,

        receveur: data.receveurs[0]?.id || null,
        textureReceveur: data.receveurs[0]?.finitionsDisponibles[0] || null,

        vipanelLeft: data.vipanels[0]?.decor || null,
        vipanelRight: data.vipanels[1]?.decor || null,
        vipanelNiche: data.vipanels[2]?.decor || null,

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