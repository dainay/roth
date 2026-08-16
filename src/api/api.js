const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '')

if (!API_BASE_URL) {
    throw new Error('VITE_API_BASE_URL is not configured')
}

const getApiUrl = (path) => `${API_BASE_URL}/${path.replace(/^\/+/, '')}`

const parseJsonResponse = async (response, errorMessage) => {
    if (!response.ok) {
        throw new Error(errorMessage)
    }

    try {
        return await response.json()
    } catch {
        throw new Error(`${errorMessage} : réponse JSON invalide`)
    }
}

export async function getConfiguratorDatabyAPI() {
    const response = await fetch(
        getApiUrl('/api/xu/getProducts'),
        {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        }
    )

    const data = await parseJsonResponse(
        response,
        'Impossible de charger les données du configurateur'
    )

    const requiredCollections = [
        'parois',
        'receveurs',
        'vipanels',
        'niches',
        'profiles',
    ]

    if (
        !data ||
        typeof data !== 'object' ||
        requiredCollections.some(
            (key) => !Array.isArray(data[key]) || data[key].length === 0
        )
    ) {
        throw new Error('Les données du configurateur sont incomplètes')
    }

    return data
}

export async function sendConfiguratorDatabyAPI(payload) {
    const response = await fetch(
        getApiUrl('/api/xu/resultProject'),
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })


    const data = await parseJsonResponse(
        response,
        'Impossible d’envoyer la configuration'
    )

    const productCollections = [
        'parois',
        'receveur',
        'profile',
        'niches',
        'vipanels',
    ]
    if (
        !data ||
        typeof data !== 'object' ||
        typeof data.img !== 'string' ||
        !data.img.trim() ||
        typeof data.pdf !== 'string' ||
        !data.pdf.trim() ||
        !data.products ||
        typeof data.products !== 'object' ||
        Array.isArray(data.products)
    ) {
        throw new Error('La réponse de visualisation est incomplète')
    }

    const products = Object.fromEntries(
        productCollections.map((key) => [
            key,
            Array.isArray(data.products[key])
                ? data.products[key].filter(
                    (product) => product && typeof product === 'object' && !Array.isArray(product)
                )
                : [],
        ])
    )

    return {
        ...data,
        products: {
            ...data.products,
            ...products,
        },
    }
}
