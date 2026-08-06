export async function getConfiguratorDatabyAPI() {
    const response = await fetch(
        '/api/xu/getProducts',
        {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
            },
        }
    )

    if (!response.ok) {
        throw new Error('Impossible de charger les données du configurateur')
    }

    return response.json()
}

export async function sendConfiguratorDatabyAPI(payload) {

    console.log('payload sent to API:', payload)

    // const response = await fetch('/api/configurator/pastel/selection', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(payload),
    // })

    // if (!response.ok) {
    //     throw new Error('Impossible d’envoyer la configuration')
    // }

    const response = { 
        img: './img/pastel_0001.webp', 
        products: [
            {
                id: "PAROI-PASTEL-ARGENT",
                type: "paroi",
                categoryLabel: "Paroi de douche coulissante",
                name: "PASTEL ARGENT POLI",
                price: 691,
                currency: "€",
                priceSuffix: "PPHT",
                image: "./img/products/pastel-argent-poli.webp",
                link: "/produits/pastel-argent-poli",
            },
            {
                id: "RECEVEUR-EXTRA-PLAT",
                type: "receveur",
                categoryLabel: "Receveur",
                name: "RECEVEUR",
                price: 691,
                currency: "€",
                priceSuffix: "PPHT",
                image: "./img/products/receveur-blanc.webp",
                link: "/produits/receveur",
            },
            {
                id: "PANNEAU-STONE-FLOWERS-01",
                type: "panneau",
                categoryLabel: "Panneau muraux Vipanel",
                name: "STONE FLOWERS",
                price: 691,
                currency: "€",
                priceSuffix: "PPHT",
                image: "./img/products/stone-flowers.webp",
                link: "/produits/stone-flowers",
            },
            {
                id: "PANNEAU-STONE-FLOWERS-02",
                type: "panneau",
                categoryLabel: "Panneau muraux Vipanel",
                name: "STONE FLOWERS",
                price: 691,
                currency: "€",
                priceSuffix: "PPHT",
                image: "./img/products/stone-flowers.webp",
                link: "/produits/stone-flowers",
            },
            {
                id: "PANNEAU-STONE-FLOWERS-03",
                type: "panneau",
                categoryLabel: "Panneau muraux Vipanel",
                name: "STONE FLOWERS",
                price: 691,
                currency: "€",
                priceSuffix: "PPHT",
                image: "./img/products/stone-flowers.webp",
                link: "/produits/stone-flowers",
            },
            {
                id: "RECEVEUR-NICHE",
                type: "niche",
                categoryLabel: "Receveur",
                name: "NICHE",
                price: 691,
                currency: "€",
                priceSuffix: "PPHT",
                image: "./img/products/niche.webp",
                link: "/produits/niche",
            },
            {
                id: "PROFILE-JONCTION-ANGLE",
                type: "profile-jonction",
                categoryLabel: "Profilé de jonction",
                name: "PROFILÉ DE JONCTION",
                price: 89,
                currency: "€",
                priceSuffix: "PPHT",
                image: "./img/products/profile-jonction.webp",
                link: "/produits/profile-jonction",
            },
        ],
        pdf: 'https://www.roth-france.fr/documents/5ecf6ded522d2.pdf',    
    };

    return response 
}