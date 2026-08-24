const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '')

const getApiUrl = (path) => {
    if (!API_BASE_URL) {
        throw new Error('VITE_API_BASE_URL is not configured')
    }

    return `${API_BASE_URL}/${path.replace(/^\/+/, '')}` 
}

// const getApiUrl = (path) => {
//     return `/${path.replace(/^\/+/, '')}`
// }

const fetchJson = async (path, options, fallbackMessage) => {
    let response

    try {
        response = await fetch(getApiUrl(path), options)
    } catch {
        throw new Error(`${fallbackMessage} : serveur inaccessible`)
    }

    let data

    try {
        data = await response.json()
    } catch {
        throw new Error(`${fallbackMessage} : réponse JSON invalide`)
    }

    const backendReturnedError =
        data?.success === false ||
        data?.ok === false ||
        Boolean(data?.error)

    if (!response.ok || backendReturnedError) {
        const apiMessage =
            typeof data?.message === 'string'
                ? data.message
                : typeof data?.error === 'string'
                    ? data.error
                    : fallbackMessage

        throw new Error(apiMessage)
    }

    return data
}

export async function getConfiguratorDatabyAPI() {
    const data = await fetchJson(
        '/api/xu/getProducts',
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        },
        'Impossible de charger les données du configurateur'
    )

    const requiredCollections = [
        'parois',
        'receveurs',
        'vipanels',
        'niches',
        'profiles',
    ]

    const invalidCollections = requiredCollections.filter(
        (key) => !Array.isArray(data?.[key])
    )

    if (invalidCollections.length > 0) {
        throw new Error(
            `Données du configurateur invalides : ${invalidCollections.join(', ')}`
        )
    }

    return data
}

export async function sendConfiguratorDatabyAPI(payload) {
    const data = await fetchJson(
        '/api/xu/resultProject',
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        },
        'Impossible d’envoyer la configuration'
    )

    if (!data?.img || !data?.pdf || !data?.products) {
        throw new Error('La réponse de visualisation est incomplète')
    }

    return data
}


export async function sendPdfByEmail({
    civility,
    name,
    surname,
    email,
    products,
}) {
    let response

    const request = {
        civility: civility,
        name: name.trim(),
        surname: surname.trim(),
        email: email.trim(),
        products,
    }

    console.info('[API] POST /api/xu/resultProject', request)

    try {
        response = await fetch(
            getApiUrl('/api/xu/resultProject'),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            }
        )
    } catch {
        throw new Error('Serveur inaccessible')
    }

    if (!response.ok) {
        throw new Error('Impossible d’envoyer la configuration')
    }
}
